<script>
import { api } from '../api';

export default {
  data() {
    return {
      posts: [],
      conteudo: '',
      file: '',
      perfilOpcoes: false
    };
  },
  methods: {
    async getUserDetails() {
      try {
        const token = localStorage.getItem('token');
        const idUser = localStorage.getItem('idUser');

        const response = await api.get(`/users/${idUser}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        this.nome = response.data.nome;
        this.formacao = response.data.formacao;
        this.bio = response.data.bio;
        this.file = response.data.file;
        this.tags = response.data.tags;
      } catch (error) {
        console.error('Erro ao buscar detalhes do usuário:', error);
      }
    },

    async sair() {
    try {
    const response = await api.get('/logout');
    
    localStorage.removeItem('token');
    localStorage.removeItem('idUser');

    window.location.href = '/login';
  } catch (error) {
    console.error('Erro no logout', error);
  }
},
    async atualizarPosts() {
      try {
        const token = localStorage.getItem('token');

            // if (!token) {
            //   console.error('Usuário não autenticado. Redirecionando para a página de login.');
            //   window.location.href = '/login';
            //   return; 
            // }

        const response = await api.get('/posts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        this.posts = response.data.data.reverse();
        console.log(response.data.data)
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    },

    async enviarPost() {
      if (this.conteudo.trim() === '') {
        alert('Por favor, escreva algo.');
        return;
      }

      const token = localStorage.getItem('token');
      try {
        const response = await api.post('/posts', {
          conteudo: this.conteudo
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Novo post criado:', response.data);

        this.posts.unshift(response.data);

        this.atualizarPosts();

        this.conteudo = '';
      } catch (error) {
        console.error('Erro ao criar post:', error);
      }
    },
    
    mostrarPerfilOpcoes() {
      this.perfilOpcoes = !this.perfilOpcoes;
    }
  },
  created() {
    this.atualizarPosts();
    this.getUserDetails();
  },
  mounted() {
    document.title = 'Home';
  }
};
</script>

<template>
    <div class="container">
      <div class="areaConteudo">
        <img class="imgPerfilHomeAtual" v-if="!file" src=".././assets/account.png">
        <img class="imgPerfilHomeAtual" v-else :src="`http://localhost:3000/uploads/${file}`"/>

        <form @submit.prevent="enviarPost" style="display: flex; align-items: center;">
          <textarea placeholder="O que você está pensando?" v-model="conteudo" required></textarea>
          <button type="submit">
            <img id="botaoEnviarPost" src=".././assets/send.png" alt="" />
          </button>
        </form>
      </div>

      <div class="listaPosts">
        <div v-for="data in posts" :key="data.postId" style="margin-top: 40px; display: flex;">
          <img v-if="data.idUser.file" :src="`http://localhost:3000/uploads/${data.idUser.file}`" class="imgPerfilHome" />
          <img v-else src=".././assets/account_circle (1).png" class="imgPerfilHome" />
          <div class="post">
            {{ data.conteudo }}
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
body {
  font-family: Montserrat;
}
p {
  margin: 0;
}
textarea {
  font-family: Montserrat;
  font-size: 1em;
  margin-left: 0%;
  width: 535px;
  height: 150px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid black;
  box-sizing: border-box;
  background-color: white;
  color: black;
  border-radius: 15px 80px 80px 40px;
  resize: none;
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
.redes {
  align-items: center;
}
.container {
  max-width: 600px;
  margin-top: 80px;
  margin-left: 8%;
  padding: 0px;
  border-radius: 8px;
}
.areaConteudo {
  margin-left: -5%;
  display: flex;
  align-items: center;
}
.imgPerfilHome {
  clip-path: circle(20px at center);
  margin-right: 10px;
  height: 50px;
  width: 50px;
}
.imgPerfilHomeAtual {
  clip-path: circle(34px at center);
  margin-right: 10px;
  height: 80px;
  width: 80px;
}
#botaoEnviarPost {
  height: 20px;
  width: 20px;
}
.listaPosts {
  margin-top: 80px;
}
.post {
  width: 600px;
  padding: 40px;
  border-radius: 15px 80px 80px 40px;
  background-color: #E4E7FF;
  border: 1px solid black;
}
.logo {
  height: 40%;
  width: 40%;
  margin-left: 20px;
}
.contatos, .endereco, .redesSociais {
  margin-left: 40px;
}
.perfilOpcoes {
  position: absolute;
  height: 100px;
  width: 100px;
  margin-left: 92%;
}
.opcaoPerfil, .opcaoSair {
  color: black;
  border: 1px solid black;
  background-color: #F2F3FF;
  padding: 20px;
}
</style>
