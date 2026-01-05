import { useEffect, useMemo, useState } from 'react'
import './App.css'
import TopicSelector from './components/TopicSelector'
import ZikrCard from './components/ZikrCard'
import TodaySummaryOverlay from './components/TodaySummaryOverlay'
import useZikrHistory from './hooks/useZikrHistory'
import duasByTopic from './data/duas.json'
import { TOPICS, TOPIC_LABELS } from './data/topics'

const THEME_KEY = 'zikr_theme_v1'

function App() {
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0])
  const [isTodayOpen, setIsTodayOpen] = useState(false)

  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem(THEME_KEY)
    if (saved === 'light' || saved === 'dark') return saved
    return 'dark'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const { increment, todayCountsByTopic } = useZikrHistory()

  const currentDua = useMemo(() => {
    const list = duasByTopic?.[selectedTopic] || []
    return list[0] || null
  }, [selectedTopic])

  const handleTapZikr = () => {
    if (!currentDua) return
    increment({ topic: selectedTopic, duaId: currentDua.id })
  }

  return (
    <div className="app">
      <header className="app__topbar" aria-label="Top bar">
        <button
          type="button"
          className="topbarIconButton"
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {theme === 'dark' ? (
            // Sun (subtle)
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                opacity="0.9"
              />
              <path
                d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
          ) : (
            // Moon (subtle)
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M21 14.5A7.5 7.5 0 0 1 9.5 3a6.5 6.5 0 1 0 11.5 11.5Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
                opacity="0.85"
              />
            </svg>
          )}
        </button>

        <button
          type="button"
          className="topbarIconButton"
          onClick={() => setIsTodayOpen(true)}
          aria-label="Open today summary"
          title="Today"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M7 2v2M17 2v2M4.5 7.5h15M6.5 11.5h4M6.5 15.5h4M14 12l1.5 1.5L18 11"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.9"
            />
            <path
              d="M6 4h12a2 2 0 0 1 2 2v13a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.55"
            />
          </svg>
        </button>
      </header>

      <main className="app__main" aria-label="Zikr area">
        {currentDua ? (
          <ZikrCard
            topicLabel={TOPIC_LABELS[selectedTopic]}
            arabic={currentDua.arabic}
            transliteration={currentDua.transliteration}
            meaning={currentDua.meaning}
            onTapZikr={handleTapZikr}
          />
        ) : (
          <div className="app__empty">No du’a found for this topic.</div>
        )}
      </main>

      <div className="app__divider" role="separator" aria-hidden="true" />

      <footer className="app__footer" aria-label="Topic selector">
        <TopicSelector
          topics={TOPICS}
          selectedTopic={selectedTopic}
          getLabel={(t) => TOPIC_LABELS[t]}
          onSelect={setSelectedTopic}
        />
      </footer>

      <TodaySummaryOverlay
        open={isTodayOpen}
        onClose={() => setIsTodayOpen(false)}
        topics={TOPICS}
        getLabel={(t) => TOPIC_LABELS[t]}
        countsByTopic={todayCountsByTopic}
      />
    </div>
  )
}

export default App
