<template>
  <div>
    <i class="fas fa-plus-circle"></i>
    <router-link to="publish">Publier du contenu</router-link>
  </div>
</template>

<script>
export default {
  name: "addPost"
};
</script>

<style>
.publish {
  background-color: white;
  font-size: 1.2em;
  color: #008cba;
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin: 20px;
  transition-duration: 0.3s;
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