<template>
  <button
    type="button"
    class="group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-700 hover:bg-slate-900 focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 focus:outline-hidden md:h-14 md:w-14"
    @click="player.toggle()"
    :aria-label="isPlaying ? 'Pauză' : 'Redă'"
  >
    <div class="absolute -inset-3 md:hidden" />
    <component
      :is="isPlaying ? PauseIcon : PlayIcon"
      class="h-5 w-5 fill-white group-active:fill-white/80 md:h-7 md:w-7"
    />
  </button>
</template>

<script setup>
import { computed, inject, unref } from 'vue'
import { AudioPlayerKey } from '@/composables/useAudioPlayer'
import PauseIcon from '@/components/PauseIcon.vue'
import PlayIcon from '@/components/PlayIcon.vue'

const player = inject(AudioPlayerKey)
const isPlaying = computed(() => unref(player.playing))
</script>
