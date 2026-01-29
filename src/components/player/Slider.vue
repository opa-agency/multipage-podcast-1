<template>
  <div
    class="absolute inset-x-0 bottom-full flex flex-auto touch-none items-center gap-6 md:relative"
  >
    <label v-if="label" class="sr-only">{{ label }}</label>
    <div
      ref="trackRef"
      class="relative w-full bg-slate-100 md:rounded-full"
      @mousedown="handleMouseDown"
      @pointerdown="handlePointerDown"
    >
      <div
        class="h-2 md:rounded-l-xl md:rounded-r-md"
        :class="isFocused || isDragging ? 'bg-slate-900' : 'bg-slate-700'"
        :style="{ width: getProgressWidth() }"
      />
      <div
        class="absolute top-1/2 -translate-x-1/2"
        :style="{ left: `${percent * 100}%` }"
      >
        <div
          class="h-4 rounded-full"
          :class="
            isFocused || isDragging
              ? 'w-1.5 bg-slate-900'
              : 'w-1 bg-slate-700'
          "
        />
      </div>
    </div>
    <div class="hidden items-center gap-2 md:flex">
      <output
        :aria-live="isDragging ? 'polite' : 'off'"
        class="hidden rounded-md px-1 py-0.5 font-mono text-sm/6 md:block"
        :class="[
          maxValue === 0 && 'opacity-0',
          isFocused || isDragging
            ? 'bg-slate-100 text-slate-900'
            : 'text-slate-500',
        ]"
      >
        {{ formatTime(currentValue, maxValue) }}
      </output>
      <span class="text-sm/6 text-slate-300" aria-hidden="true"> / </span>
      <span
        class="text-sm/6"
        :class="isFocused || isDragging ? 'text-slate-900' : 'text-slate-500'"
      >
        {{ formatTime(maxValue, maxValue) }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  label: String,
  maxValue: {
    type: Number,
    default: 0,
  },
  value: {
    type: Number,
    default: 0,
  },
  step: {
    type: Number,
    default: 1,
  },
})

const emit = defineEmits(['change', 'changeStart', 'changeEnd'])

const trackRef = ref(null)
const isDragging = ref(false)
const isFocused = ref(false)
const currentValue = ref(props.value)

const percent = computed(() => {
  if (props.maxValue === 0) return 0
  return currentValue.value / props.maxValue
})

const parseTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds - hours * 3600) / 60)
  const secs = seconds - hours * 3600 - minutes * 60
  return [hours, minutes, Math.floor(secs)]
}

const formatTime = (seconds, totalSeconds = seconds) => {
  const current = parseTime(seconds)
  const total = parseTime(totalSeconds)
  const totalWithoutLeadingZeroes = total.findIndex((x) => x !== 0)

  return current
    .slice(current.length - (total.length - totalWithoutLeadingZeroes))
    .map((x) => String(x).padStart(2, '0'))
    .join(':')
}

const getProgressWidth = () => {
  const thumbSize =
    isFocused.value || isDragging.value ? 0.3125 : 0.25
  return currentValue.value === 0
    ? 0
    : `calc(${percent.value * 100}% - ${thumbSize}rem)`
}

const handleMouseDown = () => {
  isDragging.value = true
  emit('changeStart')
}

const handlePointerDown = () => {
  isDragging.value = true
  emit('changeStart')
}

const handleMouseUp = () => {
  if (isDragging.value) {
    isDragging.value = false
    emit('changeEnd', currentValue.value)
  }
}

const handleMouseMove = (e) => {
  if (!isDragging.value || !trackRef.value) return

  const rect = trackRef.value.getBoundingClientRect()
  const percent = Math.max(
    0,
    Math.min(1, (e.clientX - rect.left) / rect.width)
  )
  currentValue.value = Math.round(percent * props.maxValue)
  emit('change', currentValue.value)
}

const handleFocus = () => {
  isFocused.value = true
}

const handleBlur = () => {
  isFocused.value = false
}

window.addEventListener('mouseup', handleMouseUp)
window.addEventListener('mousemove', handleMouseMove)
</script>
