<script setup lang="ts">
import { isDark, toggleDark } from '~/logic'


</script>

<template>
  <nav class="text-xl mt-6">
    <router-link class="icon-btn mx-2" to="/" title="button.home">
      <carbon-campsite />
    </router-link>

    <button class="icon-btn mx-2 !outline-none" title="button.toggle_dark" @click="toggleDark()">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </button>

    <a class="icon-btn mx-2" title="button.toggle_langs" >
      <carbon-language />
    </a>

    <router-link class="icon-btn mx-2" to="/about" title="button.about">
      <carbon-dicom-overlay />
    </router-link>

    <a class="icon-btn mx-2" rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank" title="GitHub">
      <carbon-logo-github />
    </a>
  </nav>
</template>
