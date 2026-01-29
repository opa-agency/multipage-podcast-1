<template>
  <div v-if="episode" class="flex items-center gap-6 bg-white/90 px-4 py-4 shadow-sm ring-1 shadow-slate-200/80 ring-slate-900/5 backdrop-blur-xs md:px-6">
    <div class="hidden md:block">
      <PlayButton />
    </div>
    <div class="mb-[env(safe-area-inset-bottom)] flex flex-1 flex-col gap-3 overflow-hidden p-1">
      <RouterLink
        :to="`/${episode.id}`"
        class="truncate text-center text-sm/6 font-bold md:text-left"
        :title="episode.title"
      >
        {{ episode.title }}
      </RouterLink>
      <div class="flex justify-between gap-6">
        <div class="flex items-center md:hidden">
          <MuteButton />
        </div>
        <div class="flex flex-none items-center gap-4">
          <RewindButton />
          <div class="md:hidden">
            <PlayButton />
          </div>
          <ForwardButton />
        </div>
        <Slider
          label="Timp curent"
          :max-value="duration"
          :step="1"
          :value="currentTime ?? playerCurrentTime"
          @change="handleSliderChange"
          @change-end="handleSliderChangeEnd"
          @change-start="handleSliderChangeStart"
        />
        <div class="flex items-center gap-4">
          <div class="flex items-center">
            <PlaybackRateButton />
          </div>
          <div class="hidden items-center md:flex">
            <MuteButton />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, watch, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { AudioPlayerKey } from '@/composables/useAudioPlayer'
import PlayButton from './PlayButton.vue'
import RewindButton from './RewindButton.vue'
import ForwardButton from './ForwardButton.vue'
import MuteButton from './MuteButton.vue'
import PlaybackRateButton from './PlaybackRateButton.vue'
import Slider from './Slider.vue'

const player = inject(AudioPlayerKey)

const currentTime = ref(null)
const wasPlaying = ref(false)

// Create computed properties to unwrap refs
const episode = computed(() => player.episode?.value)
const duration = computed(() => player.duration?.value)
const playerCurrentTime = computed(() => player.currentTime?.value)

watch(() => playerCurrentTime.value, () => {
  currentTime.value = null
})

const handleSliderChange = (value) => {
  currentTime.value = value
}

const handleSliderChangeStart = () => {
  wasPlaying.value = player.playing?.value
  player.pause()
}

const handleSliderChangeEnd = (value) => {
  player.seek(value)
  if (wasPlaying.value) {
    player.play()
  }
}
</script>
