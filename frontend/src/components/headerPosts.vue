 <template>
  <div>
    <header class="header-posts">
      <img class="logo-header-log" src="../assets\banner-groupomania.png" />
      <nav>
        <router-link :to="{ name: 'posts'}">Acceuil</router-link>
        <router-link :to="{ name: 'account', params: { token_user: token_user }}">Mon compte</router-link>
        <router-link :to="{ name: 'myPosts', params: { token_user: token_user }}">Mes publications</router-link>
        <a class="disconnect" href="#" v-on:click="disconnect">Se déconnecter</a>
      </nav>
    </header>
  </div>
</template>



<script>
const token_user = sessionStorage.getItem("token_user");
export default {
  name: "headerPosts",
  data() {
    return {
      token_user,
    };
  },
  methods: {
    disconnect() {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("token_user");
      location.href = "/";
    },
  },
};
</script>



<style>
@import '../style.css';
</style>