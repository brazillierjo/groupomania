<template>
  <div class="container">
    <headerPosts />
    <div class="profile">
      <h1>Mes publications</h1>
    </div>
  </div>
</template>

<script>
const token_user = sessionStorage.getItem("token_user");
import headerPosts from "@/components/headerPosts.vue";

export default {
  name: "postsID",
  //   data: () => {
  //     return {
  //     };
  //   },
  components: {
    headerPosts,
  },
  beforeMount() {
    this.$axios
      .get(`http://localhost:3000/api/posts/${token_user}`)
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
* {
  font-family: "Open Sans Condensed", sans-serif;
}
</style>