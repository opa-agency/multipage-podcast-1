<template>
  <AudioProvider>
    <div class="w-full">
      <header
        class="bg-slate-50 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-md lg:items-start lg:overflow-y-auto xl:w-120"
      >
        <div
          class="hidden lg:sticky lg:top-0 lg:flex lg:w-16 lg:flex-none lg:items-center lg:px-12 lg:text-sm/7 lg:whitespace-nowrap lg:[writing-mode:vertical-rl]"
        >
          <span class="font-mono text-slate-500">Hosted by</span>
          <span class="mt-6 flex gap-6 font-bold text-slate-900">
            <span v-for="(host, idx) in hosts" :key="host">
              <span
                v-if="idx !== 0"
                aria-hidden="true"
                class="text-slate-400"
              >
                /
              </span>
              {{ host }}
            </span>
          </span>
        </div>
        <div
          class="relative z-10 mx-auto px-4 pt-10 pb-4 sm:px-6 md:max-w-2xl md:px-4 lg:min-h-full lg:flex-auto lg:border-x lg:border-slate-200 lg:px-8 lg:py-12 xl:px-12"
        >
          <RouterLink
            to="/"
            class="relative mx-auto block w-48 overflow-hidden rounded-lg bg-slate-200 shadow-xl shadow-slate-200 sm:w-64 sm:rounded-xl lg:w-auto lg:rounded-2xl"
            aria-label="Homepage"
          >
            <img
              class="w-full"
              :src="posterImage"
              alt=""
              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
            />
            <div
              class="absolute inset-0 rounded-lg ring-1 ring-black/10 ring-inset sm:rounded-xl lg:rounded-2xl"
            />
          </RouterLink>
          <div class="mt-10 text-center lg:mt-12 lg:text-left">
            <p class="text-xl font-bold text-slate-900">
              <RouterLink to="/">Their Side</RouterLink>
            </p>
            <p class="mt-3 text-lg/8 font-medium text-slate-700">
              Conversations with the most tragically misunderstood people of our
              time.
            </p>
          </div>
          <AboutSection class="mt-12 hidden lg:block" />
          <section class="mt-10 lg:mt-12">
            <h2
              class="sr-only flex items-center font-mono text-sm/7 font-medium text-slate-900 lg:not-sr-only"
            >
              <TinyWaveFormIcon
                :colors="['fill-indigo-300', 'fill-blue-300']"
                class="h-2.5 w-2.5"
              />
              <span class="ml-2.5">Listen</span>
            </h2>
            <div
              class="h-px bg-linear-to-r from-slate-200/0 via-slate-200 to-slate-200/0 lg:hidden"
            />
            <ul
              role="list"
              class="mt-4 flex justify-center gap-10 text-base/7 font-medium text-slate-700 sm:gap-8 lg:flex-col lg:gap-4"
            >
              <li
                v-for="[label, icon] in podcastLinks"
                :key="label"
                class="flex"
              >
                <a
                  href="/"
                  class="group flex items-center"
                  :aria-label="label"
                >
                  <component
                    :is="icon"
                    class="h-8 w-8 fill-slate-400 group-hover:fill-slate-600"
                  />
                  <span class="hidden sm:ml-3 sm:block">{{ label }}</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
      </header>
      <main
        class="border-t border-slate-200 lg:relative lg:mb-28 lg:ml-112 lg:border-t-0 xl:ml-120"
      >
        <Waveform class="absolute top-0 left-0 h-20 w-full" />
        <div class="relative">
          <RouterView />
        </div>
      </main>
      <footer class="border-t border-slate-200 bg-slate-50 py-10 pb-40 sm:py-16 sm:pb-32 lg:hidden">
        <div class="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4">
          <AboutSection />
          <h2 class="mt-8 flex items-center font-mono text-sm/7 font-medium text-slate-900">
            <PersonIcon class="h-3 w-auto fill-slate-300" />
            <span class="ml-2.5">Hosted by</span>
          </h2>
          <div class="mt-2 flex gap-6 text-sm/7 font-bold text-slate-900">
            <span v-for="(host, idx) in hosts" :key="host">
              <span
                v-if="idx !== 0"
                aria-hidden="true"
                class="text-slate-400"
              >
                /
              </span>
              {{ host }}
            </span>
          </div>
        </div>
      </footer>
      <div class="fixed inset-x-0 bottom-0 z-10 lg:left-112 xl:left-120">
        <AudioPlayer />
      </div>
    </div>
  </AudioProvider>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AudioProvider from '@/components/AudioProvider.vue'
import AudioPlayer from '@/components/player/AudioPlayer.vue'
import AboutSection from '@/components/AboutSection.vue'
import TinyWaveFormIcon from '@/components/TinyWaveFormIcon.vue'
import Waveform from '@/components/Waveform.vue'
import PersonIcon from '@/components/PersonIcon.vue'
import SpotifyIcon from '@/components/SpotifyIcon.vue'
import ApplePodcastIcon from '@/components/ApplePodcastIcon.vue'
import OvercastIcon from '@/components/OvercastIcon.vue'
import RSSIcon from '@/components/RSSIcon.vue'
import posterImage from '@/assets/poster.png'

const hosts = ['Eric Gordon', 'Wes Mantooth']

const podcastLinks = [
  ['Spotify', SpotifyIcon],
  ['Apple Podcast', ApplePodcastIcon],
  ['Overcast', OvercastIcon],
  ['RSS Feed', RSSIcon],
]
</script>
