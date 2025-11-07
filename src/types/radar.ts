export interface OverlayMetadata {
  timestamp: string
  image_url: string
  bounds: [[number, number], [number, number]] // [[south, west], [north, east]]
  resolution: string
  updated_at: string
}

export interface RadarStatus {
  scheduler: string
  latest_data: string | null
  cache_dir: string
  update_interval: number
}

