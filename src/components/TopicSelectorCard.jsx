export default function TopicSelectorCard({ label, selected, onClick }) {
  return (
    <button
      type="button"
      className={`topicSelectorCard ${selected ? 'is-selected' : ''}`}
      onClick={onClick}
      aria-current={selected ? 'true' : undefined}
    >
      {label}
    </button>
  )
}