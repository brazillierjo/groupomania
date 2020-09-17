<template>
  <div>
    <headerPosts />
    <div id="wrapper">
      <div class="main-content">
        <form class method="put" v-on:submit.prevent="updateNow()">
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
let post_id = window.location.href.split('/')[5];

import headerPosts from "@/components/headerPosts.vue";

export default {
  name: "updatePost",
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
    updateNow() {
      const formData = new FormData();
      formData.append("content", this.$data.content);
      formData.append("image", this.$data.image);

      this.$axios
        .put(`http://localhost:3000/api/posts/${token_user}/${post_id}`, formData)
        .then((response) => {
          console.log(response)
          location.href = `/myposts/${token_user}`;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
@import "../style.css";
</style>