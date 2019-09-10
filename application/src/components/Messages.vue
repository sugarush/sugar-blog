<template>
  <div class="ui container">
    <div class="close-all"
      v-if="$store.state.messages.length"
      v-on:click="closeAll()">
      Close All <i class="fas fa-window-close"></i>
    </div>
    <div class="ui message"
      v-for="message in $store.state.messages"
      v-bind:class="message.class"
    >
      <i class="close icon" v-on:click="close(message)"></i>
      <div class="header">{{ message.title }}</div>
      <p>{{ message.detail }}</p>
    </div>
    <!--button class="ui primary button" v-on:click="addMessage">Add Message</button-->
  </div>
</template>

<script>
  let interval = null;

  export default {
    methods: {
      addMessage() {
        this.$store.commit('addMessage', {
          class: "success",
          title: "Test Message",
          detail: "This is a test message.",
          timeout: 5
        });
      },
      closeAll() {
        for(let message of this.$store.state.messages) {
          this.$store.commit('removeMessage', message);
        }
      },
      close(message) {
        this.$store.commit('removeMessage', message);
      }
    },
    mounted() {
      interval = setInterval(() => {
        this.$store.commit('removeExpiredMessages');
      }, 1000)
    },
    destroyed() {
      clearInterval(interval);
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/color.sass"

  div.close-all
    color: gray
    text-align: right
    margin: 0rem 0rem 1rem 1rem

  div.close-all:hover
    cursor: pointer

  div.container
    margin: 0rem 0rem 1rem 0rem
</style>
