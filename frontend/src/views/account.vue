<template>
  <div class="container">
    <headerPosts />
    <div class="profile">
      <h1>Mon profil</h1>
    </div>
    <div v-for="user in users" :key="user.id" class="user-details">
      <div class="container-profile">
        <div class="header-profile">
          <div class="user-first_name" id="first_name">Prénom : {{ user.first_name }}</div>
          <div class="user-last_name">Nom : {{ user.last_name }}</div>
          <div class="user-email">E-mail : {{ user.email }}</div>
          <div class="user-password">Mot de passe : ***********</div>
          <div class="button-profile">
            <button v-on:click="modifyProfile">Modifier</button>
            <button>Supprimer</button>
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
    };
  },
  components: {
    headerPosts,
  },
  methods: {
    modifyProfile: function () {
      document.querySelector("#first_name").value = "toto";
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
* {
  font-family: "Open Sans Condensed", sans-serif;
}

.container-profile {
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  background-color: white;
  width: 50%;
  border: 1px solid lightgrey;
  border-radius: 2px;
}

.header-profile {
  width: 100%;
  border: 1px solid lightgrey;
  border-radius: 2px;
}

.user-first_name,
.user-last_name,
.user-email,
.user-password {
  text-align: left;
  padding: 10px;
}

.button-profile {
  text-align: right;
}
</style>