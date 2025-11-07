import { useQuery } from '@tanstack/react-query'
import type { OverlayMetadata } from '../types/radar'

const API_BASE_URL = '/api'

async function fetchRadarOverlay(quality: 'web' | 'high'): Promise<OverlayMetadata> {
  const response = await fetch(`${API_BASE_URL}/radar/overlay/latest`)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch radar overlay: ${response.statusText}`)
  }
  
  const data: OverlayMetadata = await response.json()
  
  // Append quality parameter to image URL
  data.image_url = `${data.image_url}?quality=${quality}`
  
  return data
}

export function useRadarOverlay(quality: 'web' | 'high' = 'web', enabled = true) {
  return useQuery({
    queryKey: ['radarOverlay', quality],
    queryFn: () => fetchRadarOverlay(quality),
    enabled,
    refetchInterval: enabled ? 30000 : false, // Refetch every 30 seconds if enabled
  })
}

