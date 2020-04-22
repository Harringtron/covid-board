<template>
  <div>
    <selectbox name="testSelectbox" :valueRange="countries" :showValues="false" />
    <textbox name="testTextbox" />
  </div>
</template>

<script>
import Selectbox from "../components/Selectbox.vue";
import Textbox from "../components/Textbox.vue";

let covidUri = "https://api.covid19api.com/summary";

export default {
  components: { Selectbox, Textbox },
  data() {
    return {
      covidData: {},
      countries: []
    };
  },
  beforeMount: function() {
    this.$http.get(covidUri).then(result => {
      this.covidData = result.data;
      this.covidData.Countries.forEach(record =>
        this.countries.push({ name: record.Country, value: record.Slug })
      );
      console.log(result.data);
    });
  }
};
</script>
<style></style>
