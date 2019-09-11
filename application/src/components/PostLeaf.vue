<template>
  <div>
    <router-link class="dot" :to="{ name: 'tree-slug', params: { slug: post.attributes.slug } }"></router-link>
    <h2 v-if="!isEditing"><router-link :to="{ name: 'tree-slug', params: { slug: post.attributes.slug } }">{{ post.attributes.title }}</router-link></h2>
    <h2-editable class="header" v-if="isEditing" v-model="post.attributes.title" v-on:input="onInput" />
    <p>{{ post.attributes.created | date }}</p>
    <p>{{ owner.attributes.username }}</p>
    <post-rendered v-if="isActiveSlug() && !isEditing" :post="post" />
    <div-editable class="editor" v-if="isActiveSlug() && isEditing" v-model="post.attributes.content" v-on:input="onInput" />
    <div class="ui row">
      <button class="ui button" :class="{ green: isChanged }" v-if="isOwner() && isActiveSlug()" @click="save">Save</button>
      <button class="ui button" :class="{ red: isEditing }" v-if="isOwner() && isActiveSlug()" @click="isEditing = !isEditing">Edit</button>
      <!--button class="ui button" :class="{ red: isRemoving }" v-if="isOwner() && isActiveSlug()" @click.stop="remove">Remove</button-->
      <button class="ui button" v-if="canSeeRemoveButton()" @click.stop="remove">Remove</button>
      <button class="ui red button" v-if="canSeeRemoveButton() && isRemoving" @click="removeAgree">Agree</button>
    </div>
  </div>
</template>

<script>
  import { HOST } from "../settings.js";
  import { Model } from "../../bower_components/sugar-data/lib/model.js";
  import WebToken from "../../bower_components/sugar-data/lib/webtoken.js";

  import DivEditable from "./DivEditable.vue";
  import H2Editable from "./H2Editable.vue";
  import PostRendered from "./PostRendered.vue";

  export default {
    props: {
      post: Object,
      editing: Boolean
    },
    components: {
      DivEditable,
      H2Editable,
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
      canSeeRemoveButton() {
        if(this.isActiveSlug()) {
          if(WebToken.authenticated && WebToken.payload.data.groups.includes("administrator")) {
            return true;
          } else if(this.isOwner()) {
            return true;
          }
          return false;
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
          if(this.post.errors.length == 1) {
            let error = this.post.errors[0];
            if(error.detail.startsWith("E11000 duplicate key error")) {
              this.$store.commit('addMessage', {
                class: "error",
                title: "Duplicate Slug",
                detail: "Change your title.",
                timeout: 5
              });
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
        this.isEditing = false;
        this.isChanged = false;
        this.$parent.reloadPosts();
        this.$parent.isPosting = false;
      },
      remove() {
        this.isRemoving = !this.isRemoving;
      },
      async removeAgree() {
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
      if(this.editing) {
        this.isEditing = true;
      }
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
        isRemoving: false,
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

  a.dot
    height: 25px
    width: 25px
    border-radius: 50%
    display: inline-block
    position: relative
    left: -46px
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
    padding-bottom: 1rem
</style>
