<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, defineEmits, defineProps } from 'vue'
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
  XIcon,
} from '@heroicons/vue/outline'
import Branding from '@/components/Branding.vue'
import type { MenuItem } from '@/types'

defineProps({
  menu: {
    type: Array as PropType<MenuItem[]>,
    required: true,
  },
  sidebarOpen: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['update:sidebarOpen'])
const route = useRoute()
const currentPath = computed(() => route.path)

function closeSidebar() {
  emit('update:sidebarOpen', false)
}
</script>

<template>
  <!-- Mobile Menu Start -->
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog as="div" class="fixed inset-0 flex z-40 md:hidden" @close="closeSidebar()">
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </TransitionChild>
      <TransitionChild
        as="template"
        enter="transition ease-in-out duration-300 transform"
        enter-from="-translate-x-full"
        enter-to="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leave-from="translate-x-0"
        leave-to="-translate-x-full"
      >
        <div class="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <TransitionChild
            as="template"
            enter="ease-in-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in-out duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                @click="closeSidebar()"
              >
                <span class="sr-only">Close sidebar</span>
                <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </TransitionChild>
          <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div class="flex-shrink-0 flex items-center px-4">
              <img class="h-8 w-auto" src="/logo.png" alt="TiVitesse">
            </div>
            <nav class="mt-5 px-2 space-y-1">
              <router-link
                v-for="item in menu"
                :key="item.name"
                :to="item.path"
                class="group flex items-center px-2 py-2 text-base font-medium rounded-md" :class="[item.path === currentPath ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900']"
              >
                <component
                  :is="item.icon"
                  aria-hidden="true"
                  class="mr-4 flex-shrink-0 h-6 w-6" :class="[item.path === currentPath ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500']"
                />
                {{ item.name }}
              </router-link>
            </nav>
          </div>
          <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
            <a href="#" class="flex-shrink-0 group block">
              <div class="flex items-center">
                <div>
                  <img
                    class="inline-block h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  >
                </div>
                <div class="ml-3">
                  <p class="text-base font-medium text-gray-700 group-hover:text-gray-900">Tom Cook</p>
                  <p
                    class="text-sm font-medium text-gray-500 group-hover:text-gray-700"
                  >View profile</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </TransitionChild>
      <div class="flex-shrink-0 w-14">
        <!-- Force sidebar to shrink to fit close icon -->
      </div>
    </Dialog>
  </TransitionRoot>
  <!-- Mobile Menu End -->

  <!-- Static sidebar for desktop -->
  <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
      <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div class="flex items-center flex-shrink-0 px-4">
          <Branding>Ti Vitesse</Branding>
        </div>

        <nav class="mt-5 flex-1 px-2 bg-white space-y-1">
          <router-link
            v-for="item in menu"
            :key="item.name"
            :to="item.path"
            class="group flex items-center px-2 py-2 text-sm font-medium rounded-md" :class="[item.path === currentPath ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900']"
          >
            <component
              :is="item.icon"
              aria-hidden="true"
              class="mr-3 flex-shrink-0 h-6 w-6" :class="[item.path === currentPath ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500']"
            />
            {{ item.name }}
          </router-link>
        </nav>
      </div>
      <SidebarUserMenu />
    </div>
  </div>
</template>
