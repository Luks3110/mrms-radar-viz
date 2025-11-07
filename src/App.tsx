import { useState } from 'react'
import RadarMap from './components/RadarMap'
import { useRadarOverlay } from './hooks/useRadarOverlay'
import './App.css'

function App() {
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [quality, setQuality] = useState<'web' | 'high'>('web')
  const { data, isLoading, isError, error, refetch } = useRadarOverlay(quality, autoRefresh)

  return (
    <div className="app">
      <div className="controls">
        <div className="controls-header">
          <h1>MRMS Radar Visualization</h1>
          <div className="controls-group">
            <label>
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
              Auto-refresh (30s)
            </label>
            <label>
              Quality:
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value as 'web' | 'high')}
              >
                <option value="web">Web (faster)</option>
                <option value="high">High (slower)</option>
              </select>
            </label>
            <button onClick={() => refetch()} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>

        {isError && (
          <div className="error">
            <strong>Error:</strong> {error?.message || 'Failed to load radar data'}
          </div>
        )}

        {data && (
          <div className="info">
            <div className="info-item">
              <strong>Timestamp:</strong>{' '}
              {new Date(data.timestamp).toLocaleString('en-US', {
                timeZone: 'UTC',
                timeZoneName: 'short',
              })}
            </div>
            <div className="info-item">
              <strong>Resolution:</strong> {data.resolution}
            </div>
            <div className="info-item">
              <strong>Updated:</strong>{' '}
              {new Date(data.updated_at).toLocaleTimeString('en-US', {
                timeZone: 'UTC',
              })}
            </div>
          </div>
        )}
      </div>

      <RadarMap overlayData={data} isLoading={isLoading} quality={quality} />
    </div>
  )
}

export default App

