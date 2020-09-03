<template>
  <div>
    <headerPosts />
    <div class="container-post">
      <div class="user-id"></div>
      <div class="image-post"></div>
      <div class="post-content"></div>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;

import headerPosts from "@/components/headerPosts.vue";

export default {
  name: "posts",
  components: {
    headerPosts,
  },
  beforeMount() {
      axios
        .get("http://localhost:3000/api/posts")
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
  },
};
</script>