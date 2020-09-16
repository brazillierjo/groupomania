<template>
  <div>
    <headerPosts />
    <div v-for="post in posts" :key="post.id" class="post-comments">
      <div class="container-post">
        <div class="header-post">
          <div class="user-id">
            {{ post.first_name + " " + post.last_name }}
          </div>
          <div class="time-post">{{ post.post_create }}</div>
          <div class="time-post">{{ post.id }}</div>
        </div>
        <div>
          <img class="image-post" v-bind:src="post.imageUrl" title="post-img" />
        </div>
        <div class="post-content">
          <div>{{ post.content }}</div>
          <div class="like-comments">
            <button class="like">
              <i class="fas fa-thumbs-up"></i>
            </button>
            <button class="dislike">
              <i class="fas fa-thumbs-down"></i>
            </button>
          </div>
        </div>
      </div>
      <comments
        v-bind:post_id="post.id"
        v-bind:first_name="post.first_name"
        v-bind:last_name="post.last_name"
      />
    </div>
  </div>
</template>

<script>
import headerPosts from "@/components/headerPosts.vue";
import comments from "@/components/comments.vue";

export default {
  name: "postDetails",
  data: () => {
    return {
      posts: [],
      post_id: "",
    };
  },
  components: {
    headerPosts,
    comments,
  },
  beforeMount() {
    this.$axios
      .get(`http://localhost:3000/api/posts/${this.post_id}`)
      .then((response) => {
        this.posts = response.data.result;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  created() {
    this.post_id = this.$route.params.post_id;
  }
};
</script>

<style>
@import "../style.css";
</style>
