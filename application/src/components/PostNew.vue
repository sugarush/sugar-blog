<template>
  <div>
    <div v-if="WebToken.authenticated">
      <button class="ui button" :class="{ blue: isPosting }" @click="postClick">{{ buttonText }}</button>
      <button class="ui button" v-if="isPosting" @click="clearClick">Clear</button>
    </div>
    <div v-if="isPosting">
      <router-link class="dot" :to="{ name: 'tree' }"></router-link>
      <h2-editable v-model="post.attributes.title" />
      <div-editable v-model="post.attributes.content" />
    </div>
  </div>
</template>

<script>
  import { HOST } from "../settings.js";
  import { Model } from "../../bower_components/sugar-data/lib/model.js";
  import WebToken from "../../bower_components/sugar-data/lib/webtoken.js";

  import H2Editable from "./H2Editable.vue";
  import DivEditable from "./DivEditable.vue";

  export default {
    components: {
      H2Editable,
      DivEditable
    },
    methods: {
      refreshPost() {
        this.post = new Model({
          host: HOST,
          uri: "v1",
          type: "posts",
          attributes: {
            title: "Title",
            content: "Content",
            owner: WebToken.authenticated && WebToken.payload.data.id
          }
        });
      },
      async postClick() {
        this.isPosting = !this.isPosting;
        if(this.isPosting) {
          this.buttonText = "Post"
          this.$router.push({ name: "tree" });
        } else {
          this.post.attributes.slug = slug(this.post.attributes.title, {
            lower: true
          });
          this.post.attributes.created = new Date().toISOString();
          await this.post.save();
          for(let error of this.post.errors) {
              this.$store.commit('addMessage', {
                class: "error",
                title: error.title,
                detail: error.detail,
                timeout: 5
              });
          }
          if(this.post.errors.length) {
            if(this.post.errors.length == 1) {
              let error = this.post.errors[0];
              if(error.detail.startsWith("E11000 duplicate key error")) {
                this.$store.commit('addMessage', {
                  class: "error",
                  title: "Duplicate Slug",
                  detail: "Change your title.",
                  timeout: 5
                });
                this.isPosting = true;
                return;
              }
            } else {
              for(let error of this.post.errors) {
                  this.$store.commit('addMessage', {
                    class: "error",
                    title: error.title,
                    detail: error.detail,
                    timeout: 5
                  });
              }
            }
          }
          this.buttonText = "New Post"
          this.$router.push({ name: "tree-slug", params: {
            slug: this.post.attributes.slug
          } });
          this.refreshPost();
          await this.$parent.$parent.reloadPosts();
        }
      },
      clearClick() {
        this.buttonText = "New Post";
        this.isPosting = false;
        this.refreshPost();
      }
    },
    created() {
      this.refreshPost();
    },
    data() {
      return {
        WebToken,
        buttonText: "New Post",
        isPosting: false,
        post: null
      };
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/color.sass"

  a.dot
    height: 25px
    width: 25px
    border-radius: 50%
    display: inline-block
    position: relative
    left: -44px
    top: 26px
    background-color: $light-purple
    float: left
    transition: background-color 1s ease

    &.exact
      background-color: $purple

  iframe
    border: 1px solid black

</style>
