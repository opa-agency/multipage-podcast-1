<script setup>
const props = defineProps({
  date: {
    type: Date,
    required: true,
  },
})

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
</script>

<template>
  <time :dateTime="props.date.toISOString()">
    {{ dateFormatter.format(props.date) }}
  </time>
</template>
