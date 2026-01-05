import TopicSelectorCard from './TopicSelectorCard'

export default function TopicSelector({ topics, selectedTopic, onSelect, getLabel }) {
  return (
    <nav className="topicSelector" aria-label="Topics">
      <div className="topicSelector__rail">
        {topics.map((topic) => (
          <TopicSelectorCard
            key={topic}
            label={getLabel ? getLabel(topic) : topic}
            selected={topic === selectedTopic}
            onClick={() => onSelect(topic)}
          />
        ))}
      </div>
    </nav>
  )
}