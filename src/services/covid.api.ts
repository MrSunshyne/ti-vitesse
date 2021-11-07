export const getCovidData = (countryName: string) => {
  // eslint-disable-next-line no-console
  console.log(countryName)
  return fetch('https://pomber.github.io/covid19/timeseries.json')
    .then(response => response.json())
}
