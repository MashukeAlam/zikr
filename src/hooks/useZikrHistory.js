import { useEffect, useMemo, useState } from 'react'
import { getNowTimeHHMM, getTodayDateYYYYMMDD } from '../utils/dateTime'

const STORAGE_KEY = 'zikr_history_v1'

function safeParse(json) {
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

function loadHistory() {
  const raw = window.localStorage.getItem(STORAGE_KEY)
  const parsed = raw ? safeParse(raw) : null
  return Array.isArray(parsed) ? parsed : []
}

function saveHistory(entries) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export default function useZikrHistory() {
  const [entries, setEntries] = useState(() => loadHistory())

  useEffect(() => {
    saveHistory(entries)
  }, [entries])

  const increment = ({ topic, duaId }) => {
    const date = getTodayDateYYYYMMDD()
    const time = getNowTimeHHMM()

    setEntries((prev) => {
      const next = [...prev]
      const idx = next.findIndex((e) => e.date === date && e.topic === topic && e.dua_id === duaId)

      if (idx >= 0) {
        next[idx] = {
          ...next[idx],
          time, // update "last touched" time
          count: (next[idx].count || 0) + 1,
        }
        return next
      }

      next.push({
        date,
        time,
        topic,
        dua_id: duaId,
        count: 1,
      })
      return next
    })
  }

  const todayCountsByTopic = useMemo(() => {
    const date = getTodayDateYYYYMMDD()
    const map = Object.create(null)

    for (const e of entries) {
      if (e?.date !== date) continue
      if (!e?.topic) continue
      map[e.topic] = (map[e.topic] || 0) + (Number(e.count) || 0)
    }

    return map
  }, [entries])

  return { entries, increment, todayCountsByTopic }
}