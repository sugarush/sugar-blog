<template>
  <div class="ui green card form">
    <div class="content">
      <button class="ui blue button" @click="add">New</button>
    </div>
    <div class="extra content">
      <div class="field">
        <div class="ui large transparent left icon input">
          <i class="user icon"></i>
          <input type="text" placeholder="Set Username..." v-model="user.attributes.username">
        </div>
      </div>
    </div>
    <div class="extra content">
      <div class="ui large transparent left icon input">
        <i class="shield icon"></i>
        <input type="password" placeholder="Set Password..." v-model="user.attributes.password">
      </div>
    </div>
    <div class="extra content">
      <div class="field">
        <select multiple="" class="ui search dropdown" v-model="user.attributes.groups">
          <option value="administrator">Administrator</option>
          <option value="user">User</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
  import { HOST } from "../settings.js";
  import { Model } from "../../bower_components/sugar-data/lib/model.js";

  import DivEditable from "./DivEditable.vue";

  export default {
    components: {
      DivEditable
    },
    methods: {
      refreshUser() {
        this.user = new Model({
          host: HOST,
          uri: "v1",
          type: "users",
          attributes: {
            username: "",
            password: "",
            groups: [ ]
          }
        });
      },
      async add() {
        await this.user.save();
        if(!this.user.errors.length) {
          this.$store.commit("addMessage", {
            class: "success",
            title: "User Add Success",
            detail: "User successfully added.",
            timeout: 5
          });
          this.refreshUser();
        }
        for(let error of this.user.errors) {
          this.$store.commit("addMessage", {
            class: "error",
            title: error.title,
            detail: error.detail,
            timeout: 5
          });
        }
        this.$parent.$parent.reloadUsers();
      }
    },
    created() {
      this.refreshUser();
    },
    mounted() {
      $(this.$el).find(".ui.search.dropdown").dropdown();
    },
    data() {
      return {
        user: null,
        selectedGroups: null,
      };
    }
  }
</script>
