<template>
  <!-- Textbox -->
  <div>
    <input class="textbox-class" v-model="inputText" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  name: "Textbox",
  data() {
    return {
      inputText: ""
    };
  },
  props: {
    placeholder: { type: String, default: "Enter a Value" },
    name: { type: String, required: true },
    loadText: { type: String, required: false }
  },
  computed: {},
  methods: {},
  watch: {
    inputText: function() {
      this.$emit("change", {
        name: this.name,
        value: this.inputText
      });
    }
  }
};
</script>

<style>
.textbox-class {
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
}
::placeholder {
  opacity: 1;
}
</style>
