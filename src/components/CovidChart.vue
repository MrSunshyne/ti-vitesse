<template>
    <div class="w-full">
        <h1 class="text-xl font- mt-10">Covid Chart for {{ selectedCountry }}</h1>
        <div v-if="series">
            <VueApexCharts
                width="100%"
                class="w-full"
                type="line"
                :options="chartOptions"
                :series="series"
            ></VueApexCharts>
        </div>

        <div class="flex gap-4 flex-wrap">
            <div
                class="hover:bg-gray-400 p-1 cursor-pointer text-xs"
                :class="country === selectedCountry ? 'bg-gray-500' : ''"
                v-for="country in allCountries"
                @click="selectedCountry = country"
            >{{ country }}</div>
        </div>
        <!-- <pre>
            {{ allCountries }}
        </pre>-->
        <!-- <pre>
            {{ variable }}
            {{ series }}
        </pre>-->
    </div>
</template>

<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts';
import { ref, onMounted, watchEffect } from 'vue'
interface dataPoint {
    "date": String,
    "confirmed": Number,
    "deaths": Number,
    "recovered": Number
}

interface Timeline {
    x: String,
    y: Number
}
interface Series {
    name: String,
    data?: Timeline[]
}

let dataFromEndpoint = ref(null);
let series = ref(null) as any
let allCountries = ref([]) as any
let selectedCountry = ref('Mauritius') as string;
let variable = ref(null) as any

function fetchData() {
    return fetch('https://pomber.github.io/covid19/timeseries.json')
        .then(response => response.json())
};

function pickCountry(countries: any, countryName: string) {
    const country = countries[countryName];
    return country;
};

function populateCountriesList(countries: any) {
    const countryNames = Object.keys(countries);
    allCountries.value = countryNames;
};


function buildSeries(data) {
    const series: Series[] = [];
    const confirmed: Timeline[] = [];
    const deaths: Timeline[] = [];
    const recovered: Timeline[] = [];

    const country = data;

    // country.forEach((dataPoint: dataPoint) => {
    //     confirmed.push({
    //         x: dataPoint.date,
    //         y: dataPoint.confirmed
    //     });
    //     deaths.push({
    //         x: dataPoint.date,
    //         y: dataPoint.deaths
    //     });
    //     recovered.push({
    //         x: dataPoint.date,
    //         y: dataPoint.recovered
    //     });
    // });

    for (let index = 0; index < country.length; index++) {
        const element = country[index];

        confirmed.push({
            x: element.date,
            y: element.confirmed
        });
        deaths.push({
            x: element.date,
            y: element.deaths
        });
        recovered.push({
            x: element.date,
            y: element.recovered
        });

    }

    series.push({
        name: 'Confirmed',
        data: confirmed
    });
    series.push({
        name: 'Deaths',
        data: deaths
    });
    series.push({
        name: 'Recovered',
        data: recovered
    });

    return series;
}

function buildChart(data, country) {
    // let data = dataFromEndpoint.value
    let pickedCountry = pickCountry(data, country);
    series.value = buildSeries(pickedCountry);

    console.log(series)
}

let chartOptions = {
    chart: {
    }
}

onMounted(() => {
    console.log('mounted');
    variable.value = 'y'
});

watchEffect(() => {
    console.log('watchEffect');
    fetchData().then(data => {
        // dataFromEndpoint.value = data;
        populateCountriesList(data);
        buildChart(data, selectedCountry.value);
    });
});


</script>