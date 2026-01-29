<script setup>
import { computed, unref } from 'vue'
import { useAudioPlayer } from '@/composables/useAudioPlayer'

const props = defineProps({
  episode: {
    type: Object,
    required: true,
  },
})

const player = useAudioPlayer(computed(() => props.episode))
const isPlaying = computed(() => unref(player.playing))
</script>

<template>
  <button
    type="button"
    :aria-label="`${isPlaying ? 'Pauză' : 'Redă'} episodul ${props.episode.title}`"
    @click="player.toggle()"
  >
    <slot v-if="isPlaying" name="playing" />
    <slot v-else name="paused" />
  </button>
</template>
