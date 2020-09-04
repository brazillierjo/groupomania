<template>
  <div class="container">
    <headerPosts />
    <div class="profile">
      <h1>Mon profil</h1>
    </div>
    </div>
</template>

<script>
const axios = require("axios").default;

import headerPosts from "@/components/headerPosts.vue";

export default {
  name: "account",
  //   data: () => {
  //     return {
  //     };
  //   },
  components: {
    headerPosts,
  },
  beforeMount() {
    axios
      .get("http://localhost:3000/api/auth/profile/:id")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
</style>