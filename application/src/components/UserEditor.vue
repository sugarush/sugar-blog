<template>
  <div class="ui blue card">
    <div class="content">
      <button class="ui button" :class="{ green: isModified() }" @click="save">Save</button>
      <button class="ui button" @click="remove">Remove</button>
      <button class="ui red button" v-if="isRemoving" @click="removeAgree">Agree</button>
    </div>
    <div class="extra content">
      <div class="ui large transparent left icon input">
        <i class="user icon"></i>
        <input type="text" placeholder="Set Username..." v-model="user.attributes.username">
      </div>
    </div>
    <div class="extra content">
      <div class="ui large transparent left icon input">
        <i class="shield icon"></i>
        <input type="password" placeholder="Set Password..." v-model="user.attributes.password">
      </div>
    </div>
    <div class="extra content">
      <div class="ui form">
        <div class="ui field">
          <select multiple="" class="ui search dropdown" v-model="user.attributes.groups">
            <option value="administrator">Administrator</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import DivEditable from "./DivEditable.vue";

  export default {
    props: {
      user: Object
    },
    components: {
      DivEditable
    },
    methods: {
      async save() {
        await this.user.save();
        if(!this.user.errors.length) {
          this.currentUsername = this.user.attributes.username;
          this.currentGroups = this.user.attributes.groups;
        }
        for(let error of this.user.errors) {
          this.$store.commit("addMessage", {
            class: "error",
            title: error.title,
            detail: error.detail,
            timeout: 5
          });
        }
      },
      remove() {
        this.isRemoving = !this.isRemoving;
      },
      async removeAgree() {
        await this.user.delete();
        if(!this.user.errors.length) {
          this.$store.commit("addMessage", {
            class: "success",
            title: "Remove User Success",
            detail: "User successfully removed.",
            timeout: 5
          });
        }
        for(let error of this.user.errors) {
          this.$store.commit("addMessage", {
            class: "error",
            title: error.title,
            detail: error.detail,
            timeout: 5
          });
        }
        this.$parent.reloadUsers();
      },
      isModified() {
        if(this.user.attributes.password) {
          return true;
        }
        if(this.currentUsername !== this.user.attributes.username) {
          return true;
        }
        if(!_.isEqual(this.currentGroups, this.user.attributes.groups)) {
          return true;
        }
      }
    },
    created() {
      this.currentUsername = this.user.attributes.username;
      this.currentGroups = this.user.attributes.groups;
    },
    mounted() {
      $(this.$el).find(".ui.search.dropdown").dropdown();
    },
    data() {
      return {
        isRemoving: false,
        currentUsername: "",
        currentGroups: [ ]
      };
    }
  }
</script>
