<template>
  <div class="ui container">
    <div v-if="WebToken.authenticated">
      <div class="editor">
        <content-editable class="input title"
          v-model="newPost.attributes.title" />
        <content-editable class="input content"
          v-model="newPost.attributes.content" />
        <button class="ui primary button" @click="save">New Post</button>
      </div>
    </div>
    <post-leaf v-for="post in posts.models" :key="post.id" :post="post" />
  </div>
</template>

<script>
  import { HOST } from "../settings.js";
  import { Model } from "../../bower_components/sugar-data/lib/model.js";
  import { Collection } from "../../bower_components/sugar-data/lib/collection.js";
  import WebToken from "../../bower_components/sugar-data/lib/webtoken.js";

  import ContentEditable from "../components/ContentEditable.vue";
  import PostLeaf from "../components/PostLeaf.vue";

  export default {
    components: {
      ContentEditable,
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
      },
      async save() {
        this.newPost.attributes.slug = slug(this.newPost.attributes.title, {
          lower: true
        });
        this.newPost.attributes.created = Date.now();
        this.newPost.attributes.owner = WebToken.payload.data.id;
        await this.newPost.save();
        if(this.newPost.errors.length) {
          for(let error of this.newPost.errors) {
            this.$store.commit("addMessage", {
              class: "error",
              title: error.title,
              detail: error.detail,
              timeout: 5
            });
          }
        }
        this.newPost.id = null;
        this.newPost.attributes.title = "Title";
        this.newPost.attributes.content = "Content";
        let title = this.$el.getElementsByClassName("editor title")[0];
        let content = this.$el.getElementsByClassName("editor content")[0];
        title.innerText = this.newPost.attributes.title;
        content.innerText = this.newPost.attributes.content;
        await this.reloadPosts();
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
        }),
        newPost: new Model({
          host: HOST,
          uri: "v1",
          type: "posts",
          attributes: {
            title: "Title",
            content: "Content"
          }
        })
      };
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/color.sass"

  div.ui.container
    border-left: 2px solid $light-purple
    padding-left: 31px

  div.editor
    padding-top: 1rem

  div.input
    margin: 1rem 0rem 1rem 0rem

    &.title
      font-size: 1.5rem
</style>
