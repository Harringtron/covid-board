<template>
  <!-- Selectbox -->
  <div class="container" v-click-outside="[name]">
    <input
      class="input-class"
      :ref="name"
      v-model="inputText"
      :placeholder="placeholder"
      @click="showOptions = !showOptions"
    />
    <div :class="iconClass" @click="iconClicked"></div>
    <ul class="option-container" v-if="showOptions && valueRange.length > 0">
      <li
        v-for="(option, index) in filteredOptions"
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
export default {
  name: "Selectbox",
  components: {},
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
  computed: {
    filteredOptions: function() {
      return this.valueRange.filter(option => {
        return option.name.toUpperCase().includes(this.inputText.toUpperCase());
      });
    },
    iconClass: function() {
      return this.inputText !== "" ? "close-icon" : "arrow-icon";
    }
  },
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
    },
    inputClicked: function() {
      this.showOptions = !this.showOptions;
    },
    iconClicked: function() {
      if (this.inputText !== "") {
        this.inputText = "";
        this.selectedOption = null;
        this.showOptions = true;
      } else {
        this.showOptions = !this.showOptions;
      }
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
  position: relative;
  width: 250px;
  color: rgba(0, 0, 0, 0.5);
}
.input-class {
  color: rgba(0, 0, 0, 0.5);
  font-family: sans-serif;
  font-size: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 1rem 0.5rem;
  border: 2px solid rgba(0, 0, 0, 0.4);
  border-radius: 3px;
  width: 215px;
  cursor: pointer;
}
.container:hover {
  cursor: pointer;
}
.arrow-icon {
  top: 13px;
  right: 10px;
  position: absolute;
  align-content: right;
  border-right: 2px solid rgba(0, 0, 0, 0.4);
  border-bottom: 2px solid rgba(0, 0, 0, 0.4);
  width: 5px;
  height: 5px;
  transform: rotate(45deg);
}
.close-icon {
  position: absolute;
  top: 12px;
  right: 30px;
}
.close-icon:before,
.close-icon:after {
  position: absolute;
  left: 15px;
  content: " ";
  height: 12px;
  width: 2px;
  background-color: rgba(0, 0, 0, 0.4);
}
.close-icon:before {
  transform: rotate(45deg);
}
.close-icon:after {
  transform: rotate(-45deg);
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
