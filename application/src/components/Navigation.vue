<template>
  <div class="ui primary pointing menu">
    <router-link class="item" :to="{ name: 'tree' }">All Posts</router-link>
    <router-link class="item" v-if="isAdministrator()" :to="{ name: 'users', params: {} }">Users</router-link>
    <div class="right menu">
      <router-link class="item" v-if="!WebToken.authenticated" :to="{ name: 'login' }">Login</router-link>
      <router-link class="item" v-else :to="{ name: 'logout' }">Logout</router-link>
    </div>
  </div>
</template>

<script>
  import WebToken from "../../bower_components/sugar-data/lib/webtoken.js";

  export default {
    methods:{
      isAdministrator() {
        if(WebToken.authenticated && WebToken.payload.data.groups.includes("administrator")) {
          return true;
        }
        return false;
      }
    },
    data() {
      return {
        WebToken
      };
    }
  }
</script>
