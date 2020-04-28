<template>
  <div>
    <h1 class="header">Get some Covid-19 related information on a country:</h1>
    <selectbox
      name="testSelectbox"
      :valueRange="countries"
      :showValues="false"
      placeholder="Select a Country"
      @change="onCountrySelect"
    />
    <h2
      v-if="selectedCountryData !== null"
      class="header"
    >Here are some Coronavirus stats for {{selectedCountryData.Country}}</h2>
  </div>
</template>

<script>
import Selectbox from "../components/Selectbox.vue";
// import Textbox from "../components/Textbox.vue";

let covidUri = "https://api.covid19api.com/summary";

export default {
  components: { Selectbox },
  data() {
    return {
      covidData: {},
      countries: [],
      selectedCountryData: null
    };
  },
  beforeMount: function() {
    this.$http.get(covidUri).then(result => {
      this.covidData = result.data;
      this.covidData.Countries.forEach(record =>
        this.countries.push({ name: record.Country, value: record.Slug })
      );
    });
  },
  methods: {
    onCountrySelect: function(object) {
      if (object.value) {
        this.selectedCountryData = this.covidData.Countries.find(
          country => country.Slug === object.value
        );
      } else {
        this.selectedCountryData = null;
      }
    }
  }
};
</script>
<style>
.header {
  font-family: sans-serif;
  color: rgba(0, 0, 0, 0.7);
}
</style>
