<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import SampleChartVue from '@/components/SampleChart.vue'

const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()
const go = () => {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}
</script>

<template>
  <div>
    <p class="text-4xl">
      <carbon-campsite class="inline-block" />
    </p>
    <p>
      <a rel="noreferrer" href="https://github.com/MrSunshyne/ti-vitesse" target="_blank">Ti-Vitesse</a>
    </p>
    <p>
      <em class="text-sm opacity-75">Opinionated vite starter</em>
    </p>

    <div class="py-4" />

    <input
      id="input"
      v-model="name"
      placeholder="Whats your name"
      aria-label="intro.whats-your-name"
      type="text"
      autocomplete="false"
      class="outline-none active:outline-none px-5 py-4 w-[250px] text-center bg-transparent rounded border-gray-200 dark:border-gray-700"
      @keydown.enter="go"
    />
    <label class="hidden" for="input">What's your name</label>

    <div>
      <button class="m-3 text-sm btn" :disabled="!name" @click="go">go</button>
    </div>

    <div class="mx-auto">
      <h2>Hello</h2>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis laudantium eum cum nemo quibusdam quia magnam ab consequatur commodi molestiae facere eius nesciunt, odio, voluptate, praesentium voluptates sed sequi delectus.</p>
    </div>

    <SampleChartVue />
  </div>
</template>

<route lang="yaml">
meta:
  layout: dashboard
</route>
