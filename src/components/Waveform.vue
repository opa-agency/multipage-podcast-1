<template>
  <svg aria-hidden="true" v-bind="$attrs">
    <defs>
      <linearGradient :id="`${id}-fade`" x1="0" x2="0" y1="0" y2="1">
        <stop offset="40%" stop-color="white" />
        <stop offset="100%" stop-color="black" />
      </linearGradient>
      <linearGradient :id="`${id}-gradient`">
        <stop offset="0%" stop-color="#4989E8" />
        <stop offset="50%" stop-color="#6159DA" />
        <stop offset="100%" stop-color="#FF54AD" />
      </linearGradient>
      <mask :id="`${id}-mask`">
        <rect width="100%" height="100%" :fill="`url(#${id}-pattern)`" />
      </mask>
      <pattern
        :id="`${id}-pattern`"
        :width="bars.total * bars.width + bars.total * bars.gap"
        height="100%"
        patternUnits="userSpaceOnUse"
      >
        <rect
          v-for="(height, index) in barHeights"
          :key="index"
          :width="bars.width"
          :height="`${height}%`"
          :x="bars.gap * (index + 1) + bars.width * index"
          :fill="`url(#${id}-fade)`"
        />
      </pattern>
    </defs>
    <rect
      width="100%"
      height="100%"
      :fill="`url(#${id}-gradient)`"
      :mask="`url(#${id}-mask)`"
      opacity="0.25"
    />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const id = `waveform-${Math.random().toString(36).substr(2, 9)}`

const bars = {
  total: 100,
  width: 2,
  gap: 2,
  minHeight: 40,
  maxHeight: 100,
}

function randomBetween(min, max, seed = 1) {
  return () => {
    let rand = Math.sin(seed++) * 10000
    rand = rand - Math.floor(rand)
    return Math.floor(rand * (max - min + 1) + min)
  }
}

const barHeights = computed(() => {
  return Array.from(
    { length: bars.total },
    randomBetween(bars.minHeight, bars.maxHeight)
  )
})

defineOptions({
  inheritAttrs: true
})
</script>
