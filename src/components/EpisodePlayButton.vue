<script setup>
import { computed } from 'vue'
import { useAudioPlayer } from '@/composables/useAudioPlayer'

const props = defineProps({
  episode: {
    type: Object,
    required: true,
  },
})

const player = useAudioPlayer(computed(() => props.episode))
</script>

<template>
  <button
    type="button"
    :aria-label="`${player.playing ? 'Pause' : 'Play'} episode ${props.episode.title}`"
    @click="player.toggle()"
  >
    <slot v-if="player.playing" name="playing" />
    <slot v-else name="paused" />
  </button>
</template>
