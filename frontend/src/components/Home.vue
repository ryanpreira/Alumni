<template>
  <div>
    <div class="header">
      <div id="logo">
        <img class="logo" src=".././assets/logo_alumni.png" />
      </div>

      <div class="botoes">
        <img id="botoes" src=".././assets/settings (1).png" alt="" />
        <img id="botoes" src=".././assets/mail.png" alt="" />
        <img id="botoes" src=".././assets/notifications.png" alt="" />
        <img id="botoes" src=".././assets/account_circle.png" alt="" />
      </div>
    </div>

    <div class="container">
      <div class="contentArea">
        <form @submit.prevent="submitPost" style="display: flex; align-items: center;">
          <textarea v-model="conteudo" required></textarea>
          <button type="submit">
            <img id="botaoSubmit" src=".././assets/send.png" alt="" />
          </button>
        </form>
      </div>

      <div class="posts-list">
        <div v-for="data in posts" :key="data.postId" style="margin-top: 40px; display: flex;">
          <img v-if="data.idUser.file" :src="`http://localhost:3000/uploads/${data.idUser.file}`" alt="User profile image" class="user-image" />
          <div class="post">
            {{ data.conteudo }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../api';

export default {
  data() {
    return {
      conteudo: '',
      posts: []
    };
  },
  methods: {
    async fetchPosts() {
      try {
        const token = localStorage.getItem('token'); // Recupera o token
        const response = await api.get('/posts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        this.posts = response.data.data; // Atribui os posts retornados à variável posts
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    },

    async submitPost() {
      if (this.conteudo.trim() === '') {
        alert('Por favor, escreva algo.');
        return;
      }

      const token = localStorage.getItem('token');
      try {
        await api.post(
          '/posts',
          { conteudo: this.conteudo },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        this.conteudo = '';
        this.fetchPosts();
      } catch (error) {
        console.error('Erro ao criar post:', error);
      }
    }
  },
  created() {
    this.fetchPosts();
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin-top: 25px;
  margin-left: 8%;
  padding: 0px;
  border-radius: 8px;
}

.contentArea {
  display: flex;
  align-items: center;
}

.user-image {
  clip-path: circle(20px at center);
  margin-right: 10px;
  height: 50px;
  width: 50px;
}

textarea {
  margin-left: 8%;
  width: 600px;
  height: 150px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid black;
  box-sizing: border-box;
}

button {
  margin-top: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #F2F3FF;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

#botaoSubmit {
  height: 20px;
  width: 20px;
}

.posts-list {
  margin-top: 20px;
}

.post {
  width: 600px;
  padding: 40px;
  border-radius: 15px 80px 80px 40px;
  background-color: #E4E7FF;
  border: 1px solid black; /* Define uma borda de 2px de largura, com cor preta */
}

.logo {
  height: 25%;
  width: 25%;
  margin-left: 20px;
}

textarea {
  background-color: white;
  color: black;
  border-radius: 15px 80px 80px 40px;
  resize: none;
}

.read-the-docs {
  color: #888;
}
</style>
