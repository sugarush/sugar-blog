<template>
  <div v-if="post.id">
    <router-link class="dot" :to="{ name: 'tree-slug', params: { slug: post.attributes.slug } }"></router-link>
    <h2 v-if="!isEditing"><router-link :to="{ name: 'tree-slug', params: { slug: post.attributes.slug } }">{{ post.attributes.title }}</router-link></h2>
    <title-editable class="header" v-if="isEditing" v-model="post.attributes.title" v-on:input="onInput"></title-editable>
    <p>{{ post.attributes.created | date }}</p>
    <p>{{ owner.attributes.username }}</p>
    <post-rendered v-if="isActiveSlug() && !isEditing" :post="post" />
    <content-editable class="editor" v-if="isActiveSlug() && isEditing" v-model="post.attributes.content" v-on:input="onInput" />
    <div class="ui row">
      <button class="ui button" :class="{ green: isChanged }" v-if="isOwner() && isActiveSlug()" @click="save">Save</button>
      <button class="ui button" :class="{ red: isEditing }" v-if="isOwner() && isActiveSlug()" @click="isEditing = !isEditing">Edit</button>
      <button class="ui button" v-if="isOwner() && isActiveSlug()" @click="remove">Remove</button>
    </div>
  </div>
</template>

<script>
  import { HOST } from "../settings.js";
  import { Model } from "../../bower_components/sugar-data/lib/model.js";
  import WebToken from "../../bower_components/sugar-data/lib/webtoken.js";

  import ContentEditable from "./ContentEditable.vue";
  import TitleEditable from "./TitleEditable.vue";
  import PostRendered from "./PostRendered.vue";

  export default {
    props: {
      post: Object
    },
    components: {
      ContentEditable,
      TitleEditable,
      PostRendered
    },
    methods: {
      onInput() {
        this.isChanged = true;
      },
      isOwner() {
        if(WebToken.authenticated && WebToken.payload.data.id === this.post.attributes.owner) {
          return true;
        }
        return false;
      },
      isActiveSlug() {
        if(this.$route.params.slug === this.post.attributes.slug) {
          return true;
        }
        return false;
      },
      async save() {
        let previous_slug = this.post.attributes.slug;
        this.post.attributes.slug = slug(this.post.attributes.title, {
          lower: true
        });
        if(!(previous_slug === this.post.attributes.slug)) {
          this.$router.push({ name: "tree-slug", params: {
            slug: this.post.attributes.slug
          } });
        }
        await this.post.save();
        if(this.post.errors.length) {
          for(let error of this.post.errors) {
            this.$store.commit('addMessage', {
              class: "error",
              title: error.title,
              detail: error.detail,
              timeout: 5
            });
          }
        } else {
          this.isEditing = false;
          this.isChanged = false;
        }
      },
      async remove() {
        await this.post.delete();
        for(let error of this.post.errors) {
          this.$store.commit('addMessage', {
            class: "error",
            title: error.title,
            detail: error.detail,
            timeout: 5
          });
        }
        this.$parent.reloadPosts();
      }
    },
    async created() {
      this.owner.id = this.post.attributes.owner;
      await this.owner.load();
      for(let error of this.owner.errors) {
        console.error(error);
      }
      this.currentSlug = this.post.attributes.slug;
      this.currentContent = this.post.attributes.content;
    },
    data() {
      return {
        isEditing: false,
        isChanged: false,
        owner: new Model({
          host: HOST,
          uri: "v1",
          type: "users"
        })
      };
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/color.sass"

  div
    color: $light-purple



  a.dot
    height: 25px
    width: 25px
    background-color: #bbb
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

  h2
    a
      color: $light-purple
      transition: color 1s ease

      &.active.exact

        color: $purple

  div.editor
    border-left: 2px solid $light-purple
    padding: 1rem 0rem 1rem 1rem
    color: black

  div.row
    padding-top: 1rem
</style>
