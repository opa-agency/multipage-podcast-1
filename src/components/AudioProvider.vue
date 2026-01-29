<script setup>
import { provide, reactive, ref, toRefs } from 'vue'
import { AudioPlayerKey } from '@/composables/useAudioPlayer'

const state = reactive({
  playing: false,
  muted: false,
  duration: 0,
  currentTime: 0,
  episode: null,
})

const playerRef = ref(null)

function setEpisode(episode) {
  state.episode = episode
}

function play(episode) {
  if (episode) {
    setEpisode(episode)

    if (playerRef.value && playerRef.value.currentSrc !== episode.audio.src) {
      const playbackRate = playerRef.value.playbackRate || 1
      playerRef.value.src = episode.audio.src
      playerRef.value.load()
      playerRef.value.pause()
      playerRef.value.playbackRate = playbackRate
      playerRef.value.currentTime = 0
    }
  }

  playerRef.value?.play()
}

function pause() {
  playerRef.value?.pause()
}

function toggle(episode) {
  isPlaying(episode) ? pause() : play(episode)
}

function seekBy(amount) {
  if (playerRef.value) {
    playerRef.value.currentTime += amount
  }
}

function seek(time) {
  if (playerRef.value) {
    playerRef.value.currentTime = time
  }
}

function playbackRate(rate) {
  if (playerRef.value) {
    playerRef.value.playbackRate = rate
  }
}

function toggleMute() {
  state.muted = !state.muted
  if (playerRef.value) {
    playerRef.value.muted = state.muted
  }
}

function isPlaying(episode) {
  return episode
    ? state.playing && playerRef.value?.currentSrc === episode.audio.src
    : state.playing
}

const api = {
  ...toRefs(state),
  play,
  pause,
  toggle,
  seekBy,
  seek,
  playbackRate,
  toggleMute,
  isPlaying,
}

provide(AudioPlayerKey, api)
</script>

<template>
  <slot />
  <audio
    ref="playerRef"
    :muted="state.muted"
    @play="state.playing = true"
    @pause="state.playing = false"
    @timeupdate="state.currentTime = Math.floor($event.currentTarget.currentTime)"
    @durationchange="state.duration = Math.floor($event.currentTarget.duration)"
  />
</template>
