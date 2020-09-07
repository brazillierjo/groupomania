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
            <div class="import-file">
              <input type="file" />
              <button @click="postNow"></button>
            </div>
          </div>
          <input type="submit" name="upload" class="btn" />
        </form>
      </div>
    </div>
  </div>
</template>



<script>
import headerPosts from "@/components/headerPosts.vue";

export default {
  name: "posts",
  data() {
    return {
      content: "",
      imageUrl: "",
      selectedFile: null,
    };
  },
  components: {
    headerPosts,
  },
  methods: {
    postNow() {
      this.$axios
        .post(`http://localhost:3000/api/post`, {
          content: this.content,
          imageUrl: (this.selectedFile = event.target.files[0]),
        })
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
* {
  margin: 0px;
  padding: 0px;
  font-family: "Open Sans Condensed", sans-serif;
}

body {
  background-color: #eee;
}

#wrapper {
  width: 70%;
  overflow: hidden;
  border: 0px solid #000;
  margin: 50px auto;
  padding: 10px;
}

.main-content {
  width: 250px;
  height: 40%;
  margin: 10px auto;
  background-color: #fff;
  border: 2px solid #e6e6e6;
  padding: 40px 50px;
}

.header img {
  width: 175px;
  margin-left: auto;
  margin-right: auto;
}

.input-1,
.input-2 {
  width: 100%;
  margin-bottom: 30px;
  padding: 8px 12px;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 3px;
}

.overlap-text {
  position: relative;
}

.overlap-text a {
  position: absolute;
  top: 8px;
  right: 10px;
  color: #003569;
  font-size: 14px;
  text-decoration: none;
  font-family: "Overpass Mono", monospace;
}

.btn {
  width: 100%;
  background-color: #3897f0;
  border: 1px solid #3897f0;
  padding: 5px 12px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  border-radius: 3px;
  font-family: Arial, Helvetica, sans-serif;
}

.sub-content {
  width: 250px;
  height: 40%;
  margin: 10px auto;
  border: 1px solid #e6e6e6;
  padding: 20px 50px;
  background-color: #fff;
  font-family: Arial, Helvetica, sans-serif;
}

.s-part {
  text-align: center;
}

.s-part a {
  text-decoration: none;
  cursor: pointer;
  color: #3897f0;
  font-family: "Overpass Mono", monospace;
  word-spacing: -3px;
  letter-spacing: -2px;
  font-weight: normal;
}

input:focus {
  background-color: lightgrey;
}

#custom-button {
  padding: 10px;
  color: white;
  background-color: #009578;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
}

#custom-button:hover {
  background-color: #00b28f;
}

.import-file {
  border: 1px solid lightgrey;
  border-radius: 3px;
  margin-bottom: 30px;
}
</style>