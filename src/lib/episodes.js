export async function getAllEpisodes() {
  const response = await fetch('/episodes.json')

  if (!response.ok) {
    throw new Error(`Failed to load episodes: ${response.status}`)
  }

  const episodes = await response.json()

  if (!Array.isArray(episodes)) {
    throw new Error('Invalid episodes data')
  }

  return episodes
}
