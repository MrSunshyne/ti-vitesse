<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { useQuery } from 'vue-query'
import { refDefault } from '@vueuse/core'
import { getCovidData } from '@/services/covid.api'

export interface CountryEntity {
  date: string
  confirmed: number
  deaths: number
  recovered: number
}

export interface CountryData {
  [key: string]: CountryEntity[]
}

interface Timeline {
  x: string
  y: number
}
interface Series {
  name: string
  data?: Timeline[]
}

const selectedCountry = ref('Mauritius') as Ref<string>
const chartOptions: ApexOptions = reactive({
  chart: {},
  noData: {
    text: 'No Data available',
    align: 'center',
    verticalAlign: 'middle',
    offsetX: 0,
    offsetY: 0,
    style: {
      color: '#000000',
      fontSize: '14px',
    },
  },
})

const { data, isLoading, isFetched } = useQuery('countries', getCovidData, {
  initialData: [],
  placeholderData: [],
})

const countries = refDefault(data, []) // computed(() => data.value || [])

const pickedCountry = computed(() => pickCountry(countries.value, selectedCountry.value))

const series = computed(() => buildSeries(pickedCountry.value))

const allCountries = computed(() => Object.keys(countries.value))

function pickCountry(countries: any, countryName: string) {
  return countries[countryName] || []
}

function buildSeries(data: CountryEntity[]) {
  const series: Series[] = []
  const confirmed: Timeline[] = []
  const deaths: Timeline[] = []
  const recovered: Timeline[] = []

  for (let index = 0; index < data.length; index++) {
    const element = data[index]

    confirmed.push({
      x: element.date,
      y: element.confirmed,
    })
    deaths.push({
      x: element.date,
      y: element.deaths,
    })
    recovered.push({
      x: element.date,
      y: element.recovered,
    })
  }

  series.push({
    name: 'Confirmed',
    data: confirmed,
  })
  series.push({
    name: 'Deaths',
    data: deaths,
  })
  series.push({
    name: 'Recovered',
    data: recovered,
  })

  return series
}

function clearChart() {
  // countries.value = []
  // console.log(remove.value)
  // remove.value()
}
</script>

<template>
  <div class="w-full">
    <div class="flex justify-between">
      <h1 class="text-xl font- mt-10">
        Vue Query Covid Chart for
        <template v-if="isLoading">loading...</template>
        <template v-else>{{ selectedCountry }}</template>
      </h1>
      <button @click="clearChart()">Clear Chart</button>
    </div>
    <div v-if="series">
      <VueApexCharts
        width="100%"
        class="w-full"
        type="line"
        :options="chartOptions"
        :series="series"
      />
    </div>

    <div class="flex gap-2 flex-wrap">
      <div
        v-for="country in allCountries"
        :key="country"
        class="hover:bg-gray-400 p-1 cursor-pointer text-xs"
        :class="country === selectedCountry ? 'bg-gray-500' : ''"
        @click="selectedCountry = country"
      >{{ country }}</div>
    </div>
    <!-- <pre>
            {{ pickedCountry }}
    </pre> -->
    <!-- <pre>
            {{ variable }}
            {{ series }}
    </pre> -->
  </div>
</template>
