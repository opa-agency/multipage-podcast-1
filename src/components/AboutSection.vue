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
      <span class="ml-2.5">Despre</span>
    </h2>
    <p
      class="mt-2 text-base/7 text-slate-700"
      :class="{ 'lg:line-clamp-4': !isExpanded }"
    >
      În acest show, Eric și Wes caută în profunzime faptele alături de invitați
      care au fost etichetați drept răufăcători de o societate grăbită să judece,
      fără să cunoască de fapt întreaga poveste. Ascultă în fiecare joi pentru a
      afla adevărul alături de un alt proscris neînțeles, pe măsură ce își împărtășește
      contextul lipsă din povestea sa tragică.
    </p>
    <button
      v-if="!isExpanded"
      type="button"
      class="mt-2 hidden text-sm/6 font-bold text-pink-500 hover:text-pink-700 active:text-pink-900 lg:inline-block"
      @click="isExpanded = true"
    >
      Afișează mai mult
    </button>
  </section>
</template>
