<template>
  <div class="container">
    <headerPosts />
    <div class="profile">
      <h1>Mon profil</h1>
    </div>

    <div v-for="user in users" :key="user.id" class="user-details">
      <div class="container-profile">
        <div class="header-profile">
          <p v-if="edit" class="input">
            Entrez votre Prénom :
            <input class="input" required v-model="first_name" />
          </p>
          <p v-else class="user-first_name">Prénom : {{ user.first_name }}</p>

          <p v-if="edit" class="input">
            Entrez votre Nom :
            <input class="input" required v-model="last_name" />
          </p>
          <p v-else class="user-last_name">Nom : {{ user.last_name }}</p>

          <p v-if="edit" class="input">
            Entrez votre adresse E-mail :
            <input class="input" required v-model="email" />
          </p>
          <p v-else class="user-email">Email : {{ user.email }}</p>

          <p v-if="edit" class="input">
            Entrez votre mot de passe :
            <input type="password" class="input" required v-model="password" />
          </p>
          <p v-else class="user-password">Mot de passe : ********</p>

          <div class="button-profile">
            <button v-if="edit" @click="edit = false">Annuler les modifications</button>
            <button v-else @click="edit = true">Modifier</button>
            <button v-if="edit" v-on:click="updateDetails">Sauvegarder</button>
            <button v-else v-on:click="deleteUser">Supprimer le compte</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const token_user = sessionStorage.getItem("token_user");

import headerPosts from "@/components/headerPosts.vue";

export default {
  name: "account",
  data: () => {
    return {
      users: [],
      edit: false,
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    };
  },
  components: {
    headerPosts,
  },
  methods: {
    deleteUser() {
      this.$axios
        .delete(`http://localhost:3000/api/auth/delete/${token_user}`)
        .then((response) => {
          console.log(response);
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("token_user");
          location.href = "/";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateDetails() {
      this.$axios
        .put(`http://localhost:3000/api/auth/update/${token_user}`, {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          location.href = `/account/${token_user}`;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  beforeMount() {
    this.$axios
      .get(`http://localhost:3000/api/auth/profile/${token_user}`)
      .then((response) => (this.users = response.data.result))
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
@import '../style.css';
</style>