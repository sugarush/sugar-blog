<template>
  <div class="ui primary pointing menu">
    <router-link class="item" :to="{ name: 'tree' }">All Posts</router-link>
    <div class="right menu">
      <router-link class="item" v-if="!WebToken.authenticated" :to="{ name: 'login' }">Login</router-link>
      <router-link class="item" v-else :to="{ name: 'logout' }">Logout</router-link>
    </div>
  </div>
</template>

<script>
  import WebToken from "../../bower_components/sugar-data/lib/webtoken.js";

  export default {
    data() {
      return {
        WebToken
      };
    }
  }
</script>
