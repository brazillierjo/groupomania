<template>
  <div>
    <headerPosts />
    <div id="wrapper">
      <div class="main-content">
        <form class method="post" v-on:submit.prevent="postNow">
          <div class="overlap-text">
            <input
              id="content"
              type="content"
              name
              value
              v-model="content"
              placeholder="Description"
              class="input-1"
            />
            <div class="custom-file">
              <input
                name="imageUrl"
                type="file"
                class="custom-file-input"
                required
                @change="onSelectedFile($event)"
              />
            </div>
          </div>
          <input type="submit" name="upload" class="btn" />
        </form>
      </div>
    </div>
  </div>
</template>



<script>
const token_user = sessionStorage.getItem("token_user");

import headerPosts from "@/components/headerPosts.vue";

export default {
  name: "publish",
  data() {
    return {
      content: "",
      image: null,
    };
  },
  components: {
    headerPosts,
  },
  methods: {
    onSelectedFile(event) {
      console.log(event.target.files[0]);
      this.image = event.target.files[0];
    },
    postNow() {
      const formData = new FormData();
      formData.append("content", this.$data.content);
      formData.append("image", this.$data.image);

      this.$axios
        .post(`http://localhost:3000/api/posts/${token_user}`, formData)
        .then((response) => {
          console.log(response);
          location.href = "/posts";
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.message = "Erreur dans la publication";
          }
          if (error.response.status === 500) {
            this.message = "Erreur serveur";
          }
        });
    },
  },
};
</script>


<style>
@import '../style.css';
</style>