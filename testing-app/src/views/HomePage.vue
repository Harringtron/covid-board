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
    <display-panel
      v-if="selectedCountryData !== null"
      :displayData="displayArray"
      class="header"
      :titleString="'Here are some Coronavirus stats for ' + selectedCountryData.Country"
    ></display-panel>
  </div>
</template>

<script>
import Selectbox from "../components/Selectbox.vue";
import DisplayPanel from "../components/DisplayPanel.vue";

let covidUri = "https://api.covid19api.com/summary";

export default {
  components: { Selectbox, DisplayPanel },
  data() {
    return {
      covidData: {},
      countries: [],
      selectedCountryData: null,
      displayArray: [],
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
        this.displayArray = this.createDisplayArray();
      } else {
        this.selectedCountryData = null;
      }
    },
    createDisplayArray: function() {
      let array = [];
      for (let [name, value] of Object.entries(this.selectedCountryData)) {
        array.push({
          name: name,
          value: value
        });
      }
      console.log({array});
      return array;
    }
  },
  computed: {
    displayData: function () {
      return [];
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
