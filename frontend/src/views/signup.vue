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
      user_token: "",
    };
  },
  methods: {
    postNow() {
      this.$axios
        .post("http://localhost:3000/api/auth/signup", {
          email: this.email,
          password: this.password,
          first_name: this.first_name,
          last_name: this.last_name,
          user_token: this.user_token,
        })
        .then((response) => {
          console.log(response);
          sessionStorage.setItem("token_user", response.data.token_user);
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
@import '../style.css';
</style>