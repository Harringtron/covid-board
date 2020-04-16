<template>
  <!-- Selectbox -->
  <div class="container" :ref="name" v-click-outside="[name, 'countryCombobox']">
    <div class="selectbox-class" @click="showOptions = !showOptions">
      <span>{{ inputText !== "" ? inputText : placeholder }}</span>
      <div class="arrow"></div>
    </div>
    <!-- <textbox name="countryCombobox" :placeholder="placeholder" @click="showOptions = !showOptions"></textbox> -->
    <!-- Value Range -->
    <ul class="option-container" v-if="showOptions && valueRange.length > 0">
      <li
        v-for="(option, index) in options"
        v-bind:key="index"
        :class="optionClass(index)"
        :id="option.value"
        @click="optionClicked(option)"
        @mouseenter="optionHovered(index)"
      >
        <div class="option-test">{{ option.name }}</div>
        <div v-if="showValues" class="value">{{ option.value }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
// import Textbox from "./Textbox.vue";

export default {
  name: "Selectbox",
  components: {  },
  data() {
    return {
      selectedOption: null,
      hoveredIndex: null,
      showOptions: false,
      options: this.valueRange,
      inputText: ""
    };
  },
  props: {
    name: { type: String, required: true },
    placeholder: { type: String, default: "Select an Option" },
    showValues: { type: Boolean, default: false },
    valueRange: { type: Array, required: true }
  },
  computed: {},
  methods: {
    optionClass: function(index) {
      return index === this.hoveredIndex ? "hovered-option" : "option";
    },
    optionClicked: function(option) {
      this.inputText = option.name;
      this.selectedOption = option.value;
      this.showOptions = false;
    },
    optionHovered: function(index) {
      this.hoveredIndex = index;
    },
    clickedOutside: function() {
      this.showOptions = false;
    }
  },
  watch: {
    inputText: function() {
      this.$emit("change", {
        name: this.name,
        value: this.selectedOption
      });
    }
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  width: 250px;
  color: rgba(0, 0, 0, 0.5);
}
.selectbox-class {
  font-family: sans-serif;
  font-size: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 1rem 0.5rem;
  border: 2px solid rgba(0, 0, 0, 0.4);
  border-radius: 3px;
  user-select: none;
}
.selectbox-class:focus {
  outline: none;
}
.selectbox-class:hover {
  cursor: default;
}
.arrow {
  top: 3px;
  position: relative;
  align-content: right;
  border-right: 2px solid rgba(0, 0, 0, 0.4);
  border-bottom: 2px solid rgba(0, 0, 0, 0.4);
  width: 5px;
  height: 5px;
  transform: rotate(45deg);
}
.option-container {
  min-width: 100%;
  position: absolute;
  top: 18px;
  border: 2px solid rgba(0, 0, 0, 0.4);
  border-radius: 3px;
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  background: white;
}
.option,
.hovered-option {
  padding: 0.5rem 1rem 0.5rem;
  list-style-type: none;
  white-space: nowrap;
  user-select: none;
  cursor: default;
  color: rgba(0, 0, 0, 0.5);
}
.hovered-option {
  color: white;
  background: #0b9bb8;
}
.option-test {
  font-family: sans-serif;
  font-size: 90%;
}
.value {
  font-family: sans-serif;
  padding-top: 3px;
  font-size: 70%;
}
/* TODO: Clean up CSS  */
</style>
