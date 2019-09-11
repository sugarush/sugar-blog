<template>
  <div class="ui container">
    <post-new class="new-post" />
    <post-leaf v-for="post in posts.models" :key="post.id" :post="post" />
  </div>
</template>

<script>
  import { HOST } from "../settings.js";
  import { Model } from "../../bower_components/sugar-data/lib/model.js";
  import { Collection } from "../../bower_components/sugar-data/lib/collection.js";
  import WebToken from "../../bower_components/sugar-data/lib/webtoken.js";

  import PostNew from "../components/PostNew.vue";
  import PostLeaf from "../components/PostLeaf.vue";

  export default {
    components: {
      PostNew,
      PostLeaf
    },
    methods: {
      async reloadPosts() {
        await this.posts.find({
          sort: [ "-created" ]
        });
        for(let error of this.posts.errors) {
          this.$store.commit('addMessage', {
            class: "error",
            title: error.title,
            detail: error.detail,
            timeout: 5
          });
        }
      }
    },
    async created() {
      await this.reloadPosts();
    },
    data() {
      return {
        WebToken,
        posts: new Collection({
          host: HOST,
          uri: "v1",
          type: "posts"
        })
      };
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/color.sass"

  div.ui.container
    border-left: 5px solid $light-purple
    padding-left: 31px
    color: $light-purple

  .new-post
    padding-top: 2.5rem
</style>
