<template>
  <header>
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
* {
  font-family: 'Open Sans Condensed', sans-serif;
}

.logo-header-log {
  height: 50px;
  margin: 0;
  padding: 0;
}

header {
  background-color: white;
  border: 1px solid lightgrey;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
}

nav {
  font-family: 'Open Sans Condensed', sans-serif;
  width: 50%;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.publish {
  background-color: white;
  font-size: 1.2em;
  color: #008cba;
  border: 1px solid lightgrey;
  margin: 20px;
  transition-duration: 0.4s;
}
.publish:hover {
  background-color: lightgrey;
  color: white;
  cursor: pointer;
}

.fa-plus-circle {
  padding-right: 20px;
  font-size: 0.8em;
  color: #008cba;
}
</style>