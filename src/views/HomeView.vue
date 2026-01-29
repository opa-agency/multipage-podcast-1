<template>
  <div class="pt-16 pb-12 sm:pb-4 lg:pt-12">
    <Container>
      <h1 class="text-2xl/7 font-bold text-slate-900">Episodes</h1>
    </Container>
    <div v-if="loading" class="py-20 text-center">
      <p class="text-slate-500">Loading episodes...</p>
    </div>
    <div v-else-if="error" class="py-20 text-center">
      <p class="text-red-500">Error loading episodes: {{ error }}</p>
    </div>
    <div v-else-if="episodes.length === 0" class="py-20 text-center">
      <p class="text-slate-500">No episodes found</p>
    </div>
    <div v-else class="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
      <article
        v-for="episode in episodes"
        :key="episode.id"
        :aria-labelledby="`episode-${episode.id}-title`"
        class="py-10 sm:py-12"
      >
        <Container>
          <div class="flex flex-col items-start">
            <h2
              :id="`episode-${episode.id}-title`"
              class="mt-2 text-lg font-bold text-slate-900"
            >
              <RouterLink :to="`/${episode.id}`">{{ episode.title }}</RouterLink>
            </h2>
            <FormattedDate
              :date="new Date(episode.published)"
              class="order-first font-mono text-sm/7 text-slate-500"
            />
            <p class="mt-1 text-base/7 text-slate-700">
              {{ episode.description }}
            </p>
            <div class="mt-4 flex items-center gap-4">
              <EpisodePlayButton
                :episode="episode"
                class="flex items-center gap-x-3 text-sm/6 font-bold text-pink-500 hover:text-pink-700 active:text-pink-900"
              >
                <template #playing>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 10 10"
                    class="h-2.5 w-2.5 fill-current"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z"
                    />
                  </svg>
                  <span aria-hidden="true">Listen</span>
                </template>
                <template #paused>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 10 10"
                    class="h-2.5 w-2.5 fill-current"
                  >
                    <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
                  </svg>
                  <span aria-hidden="true">Listen</span>
                </template>
              </EpisodePlayButton>
              <span
                aria-hidden="true"
                class="text-sm font-bold text-slate-400"
              >
                /
              </span>
              <RouterLink
                :to="`/${episode.id}`"
                class="flex items-center text-sm/6 font-bold text-pink-500 hover:text-pink-700 active:text-pink-900"
                :aria-label="`Show notes for episode ${episode.title}`"
              >
                Show notes
              </RouterLink>
            </div>
          </div>
        </Container>
      </article>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import Container from '@/components/Container.vue'
import EpisodePlayButton from '@/components/EpisodePlayButton.vue'
import FormattedDate from '@/components/FormattedDate.vue'
import { getAllEpisodes } from '@/lib/episodes'

const episodes = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    loading.value = true
    episodes.value = await getAllEpisodes()
    console.log('Episodes loaded:', episodes.value.length)
  } catch (err) {
    error.value = err.message
    console.error('Error loading episodes:', err)
  } finally {
    loading.value = false
  }
})
</script>
