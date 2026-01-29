<template>
  <article class="py-16 lg:py-36">
    <Container v-if="episode">
      <header class="flex flex-col">
        <div class="flex items-center gap-6">
          <EpisodePlayButton
            :episode="episode"
            class="group relative flex h-18 w-18 shrink-0 items-center justify-center rounded-full bg-slate-700 hover:bg-slate-900 focus:ring-3 focus:ring-slate-700 focus:ring-offset-4 focus:outline-hidden"
          >
            <template #playing>
              <PauseIcon class="h-9 w-9 fill-white group-active:fill-white/80" />
            </template>
            <template #paused>
              <PlayIcon class="h-9 w-9 fill-white group-active:fill-white/80" />
            </template>
          </EpisodePlayButton>
          <div class="flex flex-col">
            <h1 class="mt-2 text-4xl font-bold text-slate-900">
              {{ episode.title }}
            </h1>
            <FormattedDate
              :date="new Date(episode.published)"
              class="order-first font-mono text-sm/7 text-slate-500"
            />
          </div>
        </div>
        <p class="mt-3 ml-24 text-lg/8 font-medium text-slate-700">
          {{ episode.description }}
        </p>
      </header>
      <hr class="my-12 border-gray-200" />
      <div
        class="prose mt-14 prose-slate [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm/7 [&>h2]:font-medium [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>h2:nth-of-type(3n)]:before:bg-violet-200 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5"
        v-html="episode.content"
      />
    </Container>
  </article>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Container from '@/components/Container.vue'
import EpisodePlayButton from '@/components/EpisodePlayButton.vue'
import FormattedDate from '@/components/FormattedDate.vue'
import PauseIcon from '@/components/PauseIcon.vue'
import PlayIcon from '@/components/PlayIcon.vue'
import { getAllEpisodes } from '@/lib/episodes'

const route = useRoute()
const episode = ref(null)

onMounted(async () => {
  const episodes = await getAllEpisodes()
  episode.value = episodes.find((ep) => ep.id.toString() === route.params.id)
})
</script>
