 <template>
  <div>
    <header>
      <img class="logo-header-log" src="../assets\banner-groupomania.png" />
      <hr />
      <nav>
        <router-link to="/account">Mon compte</router-link>
        <router-link to="/myposts">Mes publications</router-link>
        <a class="disconnect" href="#" v-on:click="disconnect">Se déconnecter</a>
      </nav>
    </header>
    <div>
      <button class="publish">
        <i class="fas fa-plus-circle"></i>Publier du contenu
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "headerPosts",
  methods: {
    disconnect() {
      sessionStorage.removeItem("token");
      location.href = "/";
    },
  },
};
</script>

<style>
hr {
  margin-top: 30px;
  margin-bottom: 30px;
}

.logo-header-log {
  height: 100px;
  margin: 0;
  padding: 0;
}

header {
  background-color: white;
  border-radius: 20px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  padding: 20px;
}

nav {
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.publish {
  background-color: white;
  font-size: 1.5em;
  color: #008cba;
  border: 1px solid;
  border-radius: 5px;
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
  font-size: 1em;
  color: #008cba;
}
</style>