import './RadarLegend.css'

interface RadarLegendProps {
  className?: string
}

// NWS-style radar reflectivity color scale (matches backend colormap)
const LEGEND_COLORS = [
  { dbz: 75, color: 'rgb(255, 255, 255)', label: '75+' },
  { dbz: 70, color: 'rgb(255, 255, 255)', label: '70' },
  { dbz: 65, color: 'rgb(153, 85, 201)', label: '65' },
  { dbz: 60, color: 'rgb(255, 0, 255)', label: '60' },
  { dbz: 55, color: 'rgb(192, 0, 0)', label: '55' },
  { dbz: 50, color: 'rgb(214, 0, 0)', label: '50' },
  { dbz: 45, color: 'rgb(255, 0, 0)', label: '45' },
  { dbz: 40, color: 'rgb(255, 144, 0)', label: '40' },
  { dbz: 35, color: 'rgb(231, 192, 0)', label: '35' },
  { dbz: 30, color: 'rgb(255, 255, 0)', label: '30' },
  { dbz: 20, color: 'rgb(0, 144, 0)', label: '20' },
  { dbz: 10, color: 'rgb(0, 200, 0)', label: '10' },
  { dbz: 0, color: 'rgb(0, 255, 0)', label: '0' },
  { dbz: -10, color: 'rgb(0, 0, 246)', label: '-10' },
  { dbz: -20, color: 'rgb(1, 160, 246)', label: '-20' },
  { dbz: -30, color: 'rgb(0, 236, 236)', label: '-30' },
]

function RadarLegend({ className = '' }: RadarLegendProps) {
  return (
    <div className={`radar-legend ${className}`}>
      <div className="radar-legend-header">
        <h3>Reflectivity</h3>
        <span className="radar-legend-unit">dBZ</span>
      </div>
      <div className="radar-legend-scale">
        {LEGEND_COLORS.map((item, index) => (
          <div key={item.dbz} className="radar-legend-item">
            <div 
              className="radar-legend-color"
              style={{ backgroundColor: item.color }}
            />
            <span className="radar-legend-label">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="radar-legend-footer">
        <div className="legend-intensity">
          <div className="intensity-item">
            <span className="intensity-icon" style={{ color: 'rgb(0, 255, 0)' }}>●</span>
            <span>Light</span>
          </div>
          <div className="intensity-item">
            <span className="intensity-icon" style={{ color: 'rgb(255, 255, 0)' }}>●</span>
            <span>Moderate</span>
          </div>
          <div className="intensity-item">
            <span className="intensity-icon" style={{ color: 'rgb(255, 0, 0)' }}>●</span>
            <span>Heavy</span>
          </div>
          <div className="intensity-item">
            <span className="intensity-icon" style={{ color: 'rgb(255, 0, 255)' }}>●</span>
            <span>Severe</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RadarLegend

