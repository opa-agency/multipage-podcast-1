<script setup>
import { ref } from 'vue'
import TinyWaveFormIcon from '@/components/TinyWaveFormIcon.vue'

const isExpanded = ref(false)
</script>

<template>
  <section>
    <h2 class="flex items-center font-mono text-sm/7 font-medium text-slate-900">
      <TinyWaveFormIcon
        :colors="['fill-violet-300', 'fill-pink-300']"
        class="h-2.5 w-2.5"
      />
      <span class="ml-2.5">About</span>
    </h2>
    <p
      class="mt-2 text-base/7 text-slate-700"
      :class="{ 'lg:line-clamp-4': !isExpanded }"
    >
      In this show, Eric and Wes dig deep to get to the facts with guests who
      have been labeled villains by a society quick to judge, without actually
      getting the full story. Tune in every Thursday to get to the truth with
      another misunderstood outcast as they share the missing context in their
      tragic tale.
    </p>
    <button
      v-if="!isExpanded"
      type="button"
      class="mt-2 hidden text-sm/6 font-bold text-pink-500 hover:text-pink-700 active:text-pink-900 lg:inline-block"
      @click="isExpanded = true"
    >
      Show more
    </button>
  </section>
</template>
