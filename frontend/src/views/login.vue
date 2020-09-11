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
          </div>
          <button type="submit" name="button" class="btn">Se connecter</button>
        </form>
      </div>
      <div class="sub-content">
        <div class="s-part">
          Don't have an account?
          <router-link to="signup">Inscrivez-vous</router-link>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import headerLog from "@/components/headerLog.vue";

export default {
  name: "login",
  components: {
    headerLog,
  },
  data() {
    return {
      email: "",
      password: "",
      user_id: "",
      token_user: "",
    };
  },
  methods: {
    postNow() {
      this.$axios
        .post("http://localhost:3000/api/auth/login", {
          email: this.email,
          password: this.password,
          id: this.user_id,
          token_user: this.token_user,
        })
        .then((response) => {
          console.log(response);
          sessionStorage.setItem('token_user', response.data.token_user)
          sessionStorage.setItem('token', response.data.token);          
          this.$axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.token;
          location.href = "/posts";
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.message = "Email ou mot de passe invalide";
          }
          if (error.response.status === 500) {
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