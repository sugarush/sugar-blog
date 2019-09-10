<template>
  <div>
    <navigation />
    <messages />
    <router-view></router-view>
  </div>
</template>

<script>
import WebToken from "../bower_components/sugar-data/lib/webtoken.js";
import Messages from "./components/Messages.vue";
import Navigation from "./components/Navigation.vue";

export default {
  components: {
    Messages,
    Navigation
  }
}
</script>
