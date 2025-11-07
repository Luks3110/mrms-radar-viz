import { MapContainer, TileLayer, ImageOverlay } from 'react-leaflet'
import { LatLngBoundsExpression } from 'leaflet'
import type { OverlayMetadata } from '../types/radar'
import RadarLegend from './RadarLegend'
import './RadarMap.css'

interface RadarMapProps {
  overlayData?: OverlayMetadata
  isLoading: boolean
  quality: 'web' | 'high'
}

const DEFAULT_CENTER: [number, number] = [37.0902, -95.7129]
const DEFAULT_ZOOM = 4

function RadarMap({ overlayData, isLoading, quality }: RadarMapProps) {
  // Build the full image URL with downsample parameter
  const imageUrl = overlayData
    ? `${import.meta.env.VITE_BACKEND_URL}${overlayData.image_url}?downsample=${quality === 'web' ? 2 : 1}`
    : null

  const bounds: LatLngBoundsExpression | undefined = overlayData?.bounds

  return (
    <div className="map-container">
      {isLoading && (
        <div className="map-loading">
          <div className="spinner"></div>
          <p>Loading radar data...</p>
        </div>
      )}
      
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {imageUrl && bounds && (
          <ImageOverlay
            url={imageUrl}
            bounds={bounds}
            opacity={0.7}
            interactive={false}
          />
        )}
      </MapContainer>
      
      <RadarLegend />
    </div>
  )
}

export default RadarMap

