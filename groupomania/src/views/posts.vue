<template>
  <div>
    <headerPosts />
    <addPost />
    <div v-for="post in posts" :key="post.id" class="post-comments">
      <div class="container-post">
        <div class="header-post">
          <div class="user-id">{{ post.first_name + ' ' + post.last_name }}</div>
          <div class="time-post">{{ post.post_create }}</div>
        </div>
        <div>
          <img class="image-post" src="..\assets\test-post.jpg" title="post-img" />
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
      <comments v-if="showComments" />
    </div>
  </div>
</template>

<script>
import headerPosts from "@/components/headerPosts.vue";
import comments from "@/components/comments.vue";
import addPost from "@/components/addPost.vue";

export default {
  name: "posts",
  data: () => {
    return {
      showComments: true,
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
      .get("http://localhost:3000/api/posts")
      .then((response) => (this.posts = response.data.result))
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

.container-post {
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  background-color: white;
  width: 50%;
  border: 1px solid lightgrey;
  border-radius: 2px;
}

.header-post {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 1px solid lightgrey;
  border-radius: 2px;
}

.user-id {
  text-align: left;
  padding: 10px;
}

.time-post {
  padding: 10px;
  color: gray;
}

.image-post {
  width: 300px;
}

.post-content {
  text-align: left;
  padding: 10px;
  border: 1px solid lightgrey;
  border-radius: 2px;
}

.like-comments {
  margin-top: 1px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.like,
.dislike,
.see-comments {
  background-color: white;
  width: 50px;
  height: 30px;
  border-radius: 2px;
  margin-left: 5px;
  margin-right: 5px;
}

.fa-thumbs-up,
.fa-thumbs-down,
.fa-comments {
font-size: 1.3em;
}

.fa-thumbs-up {
  color: blue;
}

.fa-thumbs-down {
  color: red;
}

.fa-comments {
  color: green;
}

.see-comments {
  border-radius: 3px;
  justify-content: right;
}
</style>