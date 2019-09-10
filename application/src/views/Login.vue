<template>
  <div class="ui two column centered grid container">
    <div class="row">
      <h1>Login</h1>
    </div>
    <div class="row">
      <div class="ui left icon input">
        <input
          type="text"
          v-model="username"
          v-on:keypress.enter="login"
        ></input>
        <i class="user icon"></i>
      </div>
    </div>
    <div class="row">
      <div class="ui left icon input">
        <input
          type="password"
          v-model="password"
          v-on:keypress.enter="login"
        ></input>
        <i class="shield icon"></i>
      </div>
    </div>
    <div class="row">
      <button class="ui primary button" v-on:click="login">Login</button>
    </div>
  </div>
</template>

<script>
  import { HOST } from "../settings.js";
  import WebToken from "../../bower_components/sugar-data/lib/webtoken.js";

  export default {
    methods: {
      async login() {
        await WebToken.authenticate(`${HOST}/v1/authentication`, {
          data: {
            attributes: {
              username: this.username,
              password: this.password
            }
          }
        });

        if(WebToken.authenticated) {
          this.$store.commit("addMessage", {
            class: "success",
            title: "Login Success",
            detail: "Successfully logged in.",
            timeout: 5
          });
          this.$router.push({ name: "tree" });
        } else {
          for(let error of WebToken.errors) {
            this.$store.commit("addMessage", {
              class: "error",
              title: "Login Failure",
              detail: error.detail,
              timeout: 5
            });
          }
        }
      }
    },
    data() {
      return {
        username: "",
        password: ""
      };
    }
  }
</script>
