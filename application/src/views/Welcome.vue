<template>
  <div>
  </div>
</template>

<script>
  import ContentEditable from "../components/ContentEditable.vue";

  export default {
    components: {
      ContentEditable
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/color.sass"

  h1
    color: $purple

  .editor
    border: 1px solid $purple
</style>
