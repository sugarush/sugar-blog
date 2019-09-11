<template>
  <h2 contenteditable="true" v-on:input="update"></h2>
</template>

<script>
  export default {
    props: {
      value: String
    },
    methods: {
      update() {
        this.$emit("input", this.$el.innerText);
      }
    },
    mounted() {
      this.$el.innerText = this.value;
    }
  }
</script>

<style lang="sass" scoped>
  h2
    outline: none
    color: black
</style>
