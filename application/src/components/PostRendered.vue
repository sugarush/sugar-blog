<template>
  <div class="post-rendered markdown-body"></div>
</template>

<script>
  export default {
    props: {
      post: Object
    },
    mounted() {
      let converter = new showdown.Converter();
      let html = converter.makeHtml(this.post.attributes.content);
      this.$el.innerHTML = html;
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/color.sass"

  /*.post-rendered
    border-left: 2px solid $gray
    padding: 1rem 0rem 1rem 1rem
    color: black*/
</style>
