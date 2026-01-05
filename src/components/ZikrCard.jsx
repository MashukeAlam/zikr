import { useEffect, useRef, useState } from 'react'

export default function ZikrCard({ topicLabel, arabic, transliteration, meaning, onTapZikr }) {
//   const [showMeaning, setShowMeaning] = useState(false)
  const [isTapping, setIsTapping] = useState(false)
  const tapTimeoutRef = useRef(null)
  const tapSurfaceRef = useRef(null)

  useEffect(() => {
    return () => {
      if (tapTimeoutRef.current) window.clearTimeout(tapTimeoutRef.current)
    }
  }, [])

  const handleTapSurfacePointerDown = (e) => {
    // Always count, even if reduced motion is enabled.
    onTapZikr?.()

    // Respect reduced motion: skip animation only.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return

    const el = tapSurfaceRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    el.style.setProperty('--tap-x', `${x}%`)
    el.style.setProperty('--tap-y', `${y}%`)

    setIsTapping(false)
    // Force reflow so the animation can restart reliably
    // eslint-disable-next-line no-unused-expressions
    el.offsetHeight
    setIsTapping(true)

    if (tapTimeoutRef.current) window.clearTimeout(tapTimeoutRef.current)
    tapTimeoutRef.current = window.setTimeout(() => setIsTapping(false), 700)
  }

  return (
    <section className="zikrCard" aria-label="Zikr card">
      <div className="zikrCard__topic" aria-label="Selected topic">
        {topicLabel}
      </div>

      <div
        ref={tapSurfaceRef}
        className={`zikrCard__content ${isTapping ? 'is-tapping' : ''}`}
        aria-label="Du’a content"
        onPointerDown={handleTapSurfacePointerDown}
      >
        <div className="zikrCard__arabic" lang="ar" dir="rtl">
          {arabic}
        </div>

        <div className="zikrCard__transliteration">{transliteration}</div>

        {/* <button
          type="button"
          className="zikrCard__meaningToggle"
          onClick={() => setShowMeaning((v) => !v)}
          aria-expanded={showMeaning ? 'true' : 'false'}
        >
          {showMeaning ? 'Hide meaning' : 'Show meaning'}
        </button> */}

        <div className={`zikrCard__meaningWrap is-open`}>
          <div className="zikrCard__meaning">{meaning}</div>
        </div>
      </div>
    </section>
  )
}