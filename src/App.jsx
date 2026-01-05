import { useMemo, useState } from 'react'
import './App.css'
import TopicSelector from './components/TopicSelector'
import ZikrCard from './components/ZikrCard'
import duasByTopic from './data/duas.json'
import { TOPICS, TOPIC_LABELS } from './data/topics'

function App() {
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0])

  const currentDua = useMemo(() => {
    const list = duasByTopic?.[selectedTopic] || []
    return list[0] || null
  }, [selectedTopic])

  return (
    <div className="app">
      <header className="app__topbar" aria-label="Top bar" />

      <main className="app__main" aria-label="Zikr area">
        {currentDua ? (
          <ZikrCard
            topicLabel={TOPIC_LABELS[selectedTopic]}
            arabic={currentDua.arabic}
            transliteration={currentDua.transliteration}
            meaning={currentDua.meaning}
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
    </div>
  )
}

export default App
