import { computed, inject, unref } from 'vue'

export const AudioPlayerKey = Symbol('AudioPlayer')

export function useAudioPlayer(episode) {
  const player = inject(AudioPlayerKey)

  if (!player) {
    throw new Error('AudioPlayer is not available in the component tree.')
  }

  const episodeValue = computed(() => unref(episode))

  return {
    ...player,
    play: () => player.play(episodeValue.value),
    toggle: () => player.toggle(episodeValue.value),
    playing: computed(() => player.isPlaying(episodeValue.value)),
  }
}
