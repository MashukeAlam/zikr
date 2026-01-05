import { useMemo } from 'react'
import { getTodayDateYYYYMMDD } from '../utils/dateTime'

export default function TodaySummaryOverlay({ open, onClose, topics, getLabel, countsByTopic }) {
  const today = useMemo(() => getTodayDateYYYYMMDD(), [])

  if (!open) return null

  const handleBackdropPointerDown = (e) => {
    if (e.target === e.currentTarget) onClose?.()
  }

  return (
    <div
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Today summary"
      onPointerDown={handleBackdropPointerDown}
    >
      <div className="overlay__sheet">
        <div className="overlay__header">
          <div className="overlay__titleBlock">
            <div className="overlay__title">Today</div>
            <div className="overlay__subtitle">{today}</div>
          </div>

          <button type="button" className="overlay__close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M7 7l10 10M17 7L7 17"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                opacity="0.8"
              />
            </svg>
          </button>
        </div>

        <div className="overlay__grid" aria-label="Counts by topic">
          {topics.map((t) => {
            const label = getLabel ? getLabel(t) : t
            const count = countsByTopic?.[t] || 0
            return (
              <div key={t} className="todayCard" aria-label={`${label} count`}>
                <div className="todayCard__label">{label}</div>
                <div className="todayCard__count">
                  {count} <span className="todayCard__unit">today</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="overlay__hint">Counts are saved locally on this device.</div>
      </div>
    </div>
  )
}