export const getCovidData = () => {
  return fetch('https://pomber.github.io/covid19/timeseries.json')
    .then(response => response.json())
}
