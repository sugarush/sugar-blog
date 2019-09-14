<template>
  <promised :promise="promise">
    <template #pending>
      <div class="ui active inverted dimmer">
        <div class="ui text loader">Loading</div>
      </div>
    </template>
    <template #default>
      <div class="ui container">
        <post-new class="new-post" />
        <post-leaf v-for="post in posts.models" :key="post.id" :post="post" />
      </div>
    </template>
  </promised>
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
      reloadPosts() {
        this.posts.clear();
        this.promise = this.posts.find({
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
    created() {
      this.reloadPosts();
    },
    data() {
      return {
        WebToken,
        posts: new Collection({
          host: HOST,
          uri: "v1",
          type: "posts"
        }),
        promise: null
      };
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/color.sass"

  div.ui.container
    border-left: 5px solid $light-purple
    padding-left: 31px

  .new-post
    padding-top: 2.5rem
</style>
