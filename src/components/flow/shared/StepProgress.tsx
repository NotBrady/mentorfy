'use client'

interface Props {
  current: number
  total: number
  label?: string
}

export function StepProgress({ current, total, label }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      {label && (
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {label}
        </span>
      )}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`
              h-1.5 rounded-full transition-all duration-300
              ${i < current
                ? 'bg-emerald-500 w-1.5'
                : i === current
                  ? 'bg-black w-6'
                  : 'bg-gray-200 w-1.5'
              }
            `}
          />
        ))}
      </div>
    </div>
  )
}
