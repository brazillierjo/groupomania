<template>
  <header>
    <h1>
      <img class="logo-header-log" src="../assets\banner-groupomania.png" />
    </h1>
    <nav>
      <router-link to="/">Se connecter</router-link>|
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
.logo-header-log {
  height: 100px;
  margin: 0;
  padding: 0;
}

header {
  background-color: rgba(211, 211, 211, 0.836);
  border-radius: 20px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  padding: 20px;
}

nav {
  vertical-align: middle;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
</style>