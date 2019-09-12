<template>
  <promised :promise="promise">
    <template #pending>
      <div class="ui active inverted dimmer">
        <div class="ui text loader">Loading</div>
      </div>
    </template>
    <template #default>
      <div>
        <div class="ui grid container cards">
          <user-add />
          <user-editor v-for="user in users.models" :user="user" :key="user.id" />
        </div>
      </div>
    </template>
  </promised>
</template>

<script>
  import { HOST } from "../settings.js";
  import { Collection } from "../../bower_components/sugar-data/lib/collection.js";

  import UserAdd from "../components/UserAdd.vue";
  import UserEditor from "../components/UserEditor.vue";

  export default {
    components: {
      UserAdd,
      UserEditor
    },
    methods: {
      async reloadUsers() {
        this.promise = this.users.find({
          sort: [ "username" ]
        });
        for(let error of this.users.errors) {
          this.$store.commit("addMessage", {
            class: "error",
            title: error.title,
            detail: error.detail,
            timeout: 5
          });
        }
      }
    },
    created() {
      this.reloadUsers();
    },
    data() {
      return {
        users: new Collection({
          host: HOST,
          uri: "v1",
          type: "users"
        }),
        promise: null
      };
    }
  }
</script>
