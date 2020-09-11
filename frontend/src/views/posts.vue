<template>
  <div>
    <headerPosts />
    <addPost />
    <div v-for="post in posts" :key="post.id" class="post-comments">
      <div class="container-post">
        <div class="header-post">
          <div class="user-id">{{ post.first_name + ' ' + post.last_name }}</div>
          <div class="time-post">{{ post.post_create }}</div>
          <div class="id-post">{{ post.id }}</div>
        </div>
        <div>
          <img class="image-post" v-bind:src="post.imageUrl" title="post-img" />
        </div>
        <div class="post-content">{{ post.content }}</div>
      </div>
      <div class="like-comments">
        <button class="like">
          <i class="fas fa-thumbs-up"></i>
        </button>
        <button class="dislike">
          <i class="fas fa-thumbs-down"></i>
        </button>
        <button @click="showComments = !showComments" class="see-comments">
          <i class="fas fa-comments"></i>
        </button>
      </div>
      <comments v-if="showComments" v-bind:props_post_id="post.id" />
    </div>
  </div>
</template>

<script>
import headerPosts from "@/components/headerPosts.vue";
import comments from "@/components/comments.vue";
import addPost from "@/components/addPost.vue";

export default {
  name: "posts",
  props: {
    props_post_id: Number,
    first_name: String,
    last_name: String,
    date_comment: String,
  },
  data: () => {
    return {
      showComments: false,
      posts: [],
    };
  },
  components: {
    headerPosts,
    comments,
    addPost,
  },
  beforeMount() {
    this.$axios
      .get(`http://localhost:3000/api/posts/`)
      .then((response) => {
        this.posts = response.data.result;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
@import '../style.css';
</style>