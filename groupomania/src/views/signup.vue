<template>
  <div>
    <headerLog />
    <div id="wrapper">
      <div class="main-content">
        <div class="header">
          <img src="../assets\icon-above-font.png" />
        </div>
        <form class method="post" v-on:submit.prevent="postNow">
          <div class="overlap-text">
            <input
              id="email"
              type="email"
              name
              value
              v-model="email"
              placeholder="E-mail"
              class="input-1"
            />
            <input
              id="password"
              type="password"
              name
              value
              v-model="password"
              placeholder="Mot de passe"
              class="input-2"
            />
            <input
              id="last_name"
              type="text"
              name
              value
              v-model="last_name"
              placeholder="Nom"
              class="input-2"
            />
            <input
              id="first_name"
              type="text"
              name
              value
              v-model="first_name"
              placeholder="Prénom"
              class="input-2"
            />
          </div>
          <button type="submit" name="button" class="btn">S'inscrire</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;

import headerLog from "@/components/headerLog.vue";

export default {
  name: "signup",
  components: {
    headerLog,
  },
  data() {
    return {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    };
  },
  methods: {
    postNow() {
      axios
        .post("http://localhost:3000/api/auth/signup", {
          email: this.email,
          password: this.password,
          first_name: this.first_name,
          last_name: this.last_name,
        })
        .then((response) => {
          console.log(response);
          sessionStorage.setItem("token", response.data.token);
          this.$axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.token;
          location.href = "/posts";
        })
        .catch((e) => {
          if (e.response.status === 500) {
            this.message = "Erreur serveur";
          }
          sessionStorage.removeItem("token");
        });
    },
  },
};
</script>


<style>
* {
  margin: 0px;
  padding: 0px;
}

body {
  background-color: #eee;
}

#wrapper {
  width: 50%;
  height: 50%;
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

.header {
  border: 0px solid #000;
  margin-bottom: 5px;
}

.header img {
  width: 175px;
  margin-left: auto;
  margin-right: auto;
}

.input-1,
.input-2 {
  width: 100%;
  margin-bottom: 5px;
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
</style>