<template>
  <header class="header-posts">
    <img class="logo-header-log" src="../assets\banner-groupomania.png" />
    <nav>
      <router-link to="/">Se connecter</router-link>
      <router-link to="/Signup">S'inscrire</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "headerLog",
};
</script>

<style>
@import "../style.css";
</style>
