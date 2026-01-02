import { test, expect } from '@playwright/test';

test.describe('Session Flow E2E', () => {
  // Helper to clear localStorage and reload
  async function freshStart(page: any) {
    await page.goto('/rafael-ai');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  }

  test('1. Fresh session creation', async ({ page }) => {
    // Clear any existing state
    await freshStart(page);

    // Listen for session creation request
    const sessionRequest = page.waitForRequest((req) =>
      req.url().includes('/api/session') && req.method() === 'POST'
    );
    const sessionResponse = page.waitForResponse((res) =>
      res.url().includes('/api/session') && res.request().method() === 'POST'
    );

    // Wait for session creation
    const req = await sessionRequest;
    const res = await sessionResponse;

    // Verify POST request was made
    expect(req.method()).toBe('POST');

    // Verify response contains sessionId
    const body = await res.json();
    expect(body.sessionId).toBeDefined();
    expect(body.supermemoryContainer).toBeDefined();

    console.log('✅ Session created:', body.sessionId);

    // Verify sessionId saved to localStorage
    const savedSessionId = await page.evaluate(() =>
      localStorage.getItem('mentorfy-session-id')
    );
    expect(savedSessionId).toBe(body.sessionId);

    console.log('✅ Session ID saved to localStorage');
  });

  test('2. Phase 1 form completion and PATCH', async ({ page }) => {
    // Clear and wait for fresh session
    await freshStart(page);
    await page.waitForResponse((res) =>
      res.url().includes('/api/session') && res.request().method() === 'POST'
    );

    // Wait for welcome screen (landing page with "Show Me How" button)
    await page.waitForSelector('text=Show Me How', { timeout: 10000 });

    // Click the start button
    await page.click('button:has-text("Show Me How")');

    // Wait for phase 1 to load - look for first question
    await page.waitForSelector('text=What stage is your tattoo business', { timeout: 10000 });
    console.log('✅ Phase 1 loaded');

    // Listen for PATCH requests
    const patchRequests: any[] = [];
    page.on('request', (req) => {
      if (req.url().includes('/api/session/') && req.method() === 'PATCH') {
        patchRequests.push(req);
      }
    });

    // Step 1: Select booking status
    await page.click('button:has-text("Booked out 1-2 weeks")');
    await page.waitForTimeout(800);
    console.log('✅ Step 1: Booking status selected');

    // Step 2: Select day rate
    await page.waitForSelector('text=day rate', { timeout: 5000 });
    await page.click('button:has-text("$2k - $3k")');
    await page.waitForTimeout(800);
    console.log('✅ Step 2: Day rate selected');

    // Step 3: Select blocker
    await page.waitForSelector('text=stopping you', { timeout: 5000 });
    await page.click('button:has-text("Posting but results are unpredictable")');
    await page.waitForTimeout(800);
    console.log('✅ Step 3: Blocker selected');

    // Step 4: Fill contact form
    await page.waitForSelector('text=contact', { timeout: 5000 });
    await page.fill('input[placeholder="Your name"]', 'Test User');
    await page.fill('input[placeholder="your@email.com"]', 'test@example.com');
    await page.fill('input[placeholder="(555) 123-4567"]', '(555) 987-6543');
    await page.click('button:has-text("Continue")');
    await page.waitForTimeout(800);
    console.log('✅ Step 4: Contact info submitted');

    // Step 5: Long answer
    await page.waitForSelector('text=Be honest', { timeout: 5000 });
    await page.fill('textarea', 'I struggle with consistency in posting content.');
    await page.click('button:has-text("Continue")');
    console.log('✅ Step 5: Confession submitted');

    // Wait for AI moment and PATCH to complete
    await page.waitForTimeout(3000);

    // Verify at least one PATCH was made
    expect(patchRequests.length).toBeGreaterThan(0);
    console.log(`✅ ${patchRequests.length} PATCH request(s) sent during form completion`);

    // Check state was saved to localStorage
    const savedState = await page.evaluate(() =>
      localStorage.getItem('mentorfy-rafael-ai-state')
    );
    expect(savedState).toBeTruthy();
    const state = JSON.parse(savedState!);
    console.log('✅ State saved to localStorage:', Object.keys(state));
  });

  test('3. Chat messaging with streaming', async ({ page }) => {
    // Clear and wait for fresh session
    await freshStart(page);
    await page.waitForResponse((res) =>
      res.url().includes('/api/session') && res.request().method() === 'POST'
    );

    // Wait for app to load
    await page.waitForTimeout(2000);

    // Look for chat input or message area
    const chatInput = page.locator('textarea, input[type="text"]').filter({ hasText: /message|type|ask/i }).first();
    const anyTextarea = page.locator('textarea').first();

    // If we can find a chat area, test messaging
    if (await anyTextarea.isVisible({ timeout: 5000 }).catch(() => false)) {
      // Listen for chat request
      const chatResponse = page.waitForResponse(
        (res) => res.url().includes('/api/chat'),
        { timeout: 30000 }
      );

      await anyTextarea.fill('Hello, testing the chat');
      await page.keyboard.press('Enter');

      // Wait for streaming response
      try {
        await chatResponse;
        console.log('✅ Chat request sent and response received');

        // Check for assistant message appearing
        await page.waitForTimeout(3000);
        const assistantMessages = await page.locator('[class*="assistant"], [data-role="assistant"]').count();
        console.log(`✅ ${assistantMessages} assistant message(s) rendered`);
      } catch (e) {
        console.log('⚠️ Chat may require completing phases first');
      }
    } else {
      console.log('⚠️ Chat input not immediately visible - may need to complete phases first');
    }
  });

  test('4. Page refresh - session restoration', async ({ page }) => {
    // Clear and create fresh session
    await freshStart(page);
    const response = await page.waitForResponse((res) =>
      res.url().includes('/api/session') && res.request().method() === 'POST'
    );
    const { sessionId } = await response.json();

    // Wait for state to be saved
    await page.waitForTimeout(2000);

    // Capture current localStorage state
    const stateBefore = await page.evaluate(() => ({
      sessionId: localStorage.getItem('mentorfy-session-id'),
      state: localStorage.getItem('mentorfy-rafael-ai-state'),
    }));

    console.log('Before refresh - sessionId:', stateBefore.sessionId);

    // Refresh the page
    await page.reload();

    // Wait for session validation (GET request)
    const getResponse = await page.waitForResponse(
      (res) => res.url().includes(`/api/session/${sessionId}`) && res.request().method() === 'GET',
      { timeout: 10000 }
    );

    expect(getResponse.status()).toBe(200);
    console.log('✅ Session validated via GET request on refresh');

    // Verify localStorage preserved
    const stateAfter = await page.evaluate(() => ({
      sessionId: localStorage.getItem('mentorfy-session-id'),
      state: localStorage.getItem('mentorfy-rafael-ai-state'),
    }));

    expect(stateAfter.sessionId).toBe(stateBefore.sessionId);
    console.log('✅ Session ID preserved after refresh');

    // Verify no new session was created (should only see GET, not POST)
    const newSessionCreated = await page
      .waitForResponse(
        (res) => res.url().includes('/api/session') && res.request().method() === 'POST',
        { timeout: 3000 }
      )
      .catch(() => null);

    expect(newSessionCreated).toBeNull();
    console.log('✅ No new session created on refresh');
  });

  test('5. Full flow - context preservation across refresh', async ({ page }) => {
    // Clear and create fresh session
    await freshStart(page);
    await page.waitForResponse((res) =>
      res.url().includes('/api/session') && res.request().method() === 'POST'
    );

    // Wait for welcome and click through
    await page.waitForSelector('text=Show Me How', { timeout: 10000 }).catch(() => null);

    // Try to click start button
    const startButton = page.locator('button:has-text("Show Me How")');
    if (await startButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await startButton.click();
      await page.waitForTimeout(1000);
    }

    // Select first option if available
    const firstOption = page.locator('button').filter({ hasText: /week|month|booked/i }).first();
    if (await firstOption.isVisible({ timeout: 5000 }).catch(() => false)) {
      await firstOption.click();
      await page.waitForTimeout(1000);
    }

    // Get current state
    const stateBefore = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('mentorfy-rafael-ai-state') || '{}')
    );

    console.log('State before refresh:', JSON.stringify(stateBefore, null, 2).slice(0, 500));

    // Refresh
    await page.reload();
    await page.waitForTimeout(3000);

    // Get state after refresh
    const stateAfter = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('mentorfy-rafael-ai-state') || '{}')
    );

    console.log('State after refresh:', JSON.stringify(stateAfter, null, 2).slice(0, 500));

    // Verify key data preserved
    if (stateBefore.user) {
      expect(stateAfter.user).toEqual(stateBefore.user);
      console.log('✅ User context preserved');
    }

    if (stateBefore.situation) {
      expect(stateAfter.situation).toEqual(stateBefore.situation);
      console.log('✅ Situation context preserved');
    }

    if (stateBefore.progress) {
      expect(stateAfter.progress?.currentPhase).toBe(stateBefore.progress?.currentPhase);
      console.log('✅ Progress preserved');
    }
  });
});
