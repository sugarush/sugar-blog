<template>
  <div contenteditable="true" v-on:input="update">
  </div>
</template>

<script>
  export default {
    props: {
      value: String
    },
    methods: {
      update() {
        this.$emit('input', this.$el.innerText);
      }
    },
    mounted() {
      this.$el.innerText = this.value;
    }
  }
</script>

<style lang="sass" scoped>
  div
    outline: none
    color: black
</style>
