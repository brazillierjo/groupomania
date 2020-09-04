<template>
  <div class="container-comments">
    <div class="payload">
      <div class="textarea-container">
        <div class="user_id">Johan BRAZILLIER</div>
        <input placeholder="Écrivez un commentaire..." class="post-text-area" />
        <button class="send-comment">Publier</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comments",
};
</script>

<style>
.container-comments {
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 30px;
  background-color: white;
  width: 50%;
  border: 1px solid grey;
  border-radius: 5px;
}

.user_id {
  padding: 5px;
  width: 40%;
}

.textarea-container {
  display: flex;
  justify-content: space-between;
}

.post-text-area {
  padding: 2px;
  border-radius: 10px;
  width: 60%;
  height: 30px;
  margin-top: 5px;
}

.send-comment {
  background-color: #008cba;
  border: none;
  border-radius: 4px;
  color: white;
  margin: 5px;
  padding: 3px 8px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>