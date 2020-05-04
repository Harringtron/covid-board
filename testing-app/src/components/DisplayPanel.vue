<template>
  <div>
    <h2 v-if="titleString" class="header">{{titleString}}</h2>
    <div class="grid-container">
      <div class="col" v-for="(column,index) in columns" :key="index">
        <div class="element" v-for="(field,index) in column" :key="index">
          <label :for="field.name">{{field.name}}{{delimeter}}{{field.value}}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//TODO: display array of objects
export default {
  name: "DisplayPanel",
  components: {},
  data() {
    return {};
  },
  props: {
    titleString: { type: String, required: false },
    displayData: { type: Array, required: true },
    delimeter: { type: String, default: " : " },
    columnCount: { type: Number, default: 2 }
  },
  computed: {
    columns: function() {
      let columns = [];
      let mid = Math.ceil(this.displayData.length / this.columnCount);
      for (let col = 0; col < this.columnCount; col++) {
        columns.push(this.displayData.slice(col * mid, col * mid + mid));
      }
      return columns;
    }
  }
};
</script>

<style>
.grid-container {
  display: flex;
  flex-direction: row;
}
.col {
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.element {
  padding-bottom: 10px;
}
</style>
