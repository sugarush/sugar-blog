<template>
  <div class="ui two column centered grid container">
    <div class="row">
      <h1>Logout</h1>
    </div>
    <button class="ui orange button" v-on:click="logout">Logout</button>
  </div>
</template>

<script>
  import WebToken from "../../bower_components/sugar-data/lib/webtoken.js";

  export default {
    methods: {
      async logout() {
        if(WebToken.authenticated) {
          await WebToken.deauthenticate();
          this.$router.push({ name: "tree" });
          this.$store.commit('addMessage', {
            class: "blue",
            title: "Logout Success",
            detail: "Sucessfully logged out.",
            timeout: 5
          });
        }
      }
    }
  }
</script>
