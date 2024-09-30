
<template>
<div class="header">
    <div id="logo">
      <router-link to='/home'><img class="logo" src=".././assets/group 28.png" /></router-link>
    </div>

    <div class="botoes">
      <img id="botoes" src=".././assets/settings (1).png" alt="" />
      <img id="botoes" src=".././assets/mail.png" alt="" />
      <img id="botoes" src=".././assets/notifications.png" alt="" />
      <img id="botoes" @click="mostrarPerfilOpcoes" src=".././assets/account_circle.png" alt="" />
      <img id="botoes" @click="mostrarMenu" style="height: 16px; width: 16px;margin-top: 2px" src=".././assets/icons8-menu-50.png" alt="" />

    </div>
  </div>

  <div v-if="perfilOpcoes" class="perfilOpcoes">
      <router-link to='/perfil'><div class="opcaoPerfil">Perfil</div></router-link>
      <router-link to='/login'><div @click="sair" class="opcaoSair">Sair</div></router-link>
  </div>

  <div v-if="menu" class="menuOpcoes">
      <div class="opcaoPerfil">Oportunidades</div>
      <div @click="sair" class="opcaoSair">Eventos</div>
      <div class="opcaoPerfil">Mentoria</div>
      <div @click="sair" class="opcaoSair">Seja um doador</div>
  </div>
</template>

<script>

import { api } from '../api';

export default {
    data() {
      return {
        posts: [],
        conteudo: '',
        file: '',
        perfilOpcoes: false,
        menu: false

      };
    },
    methods: {
      async acessarPerfil() {
        window.location.href = '/perfil';
      },
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
  
          if (!token) {
            console.error('Usuário não autenticado. Redirecionando para a página de login.');
            window.location.href = '/login';
            return; 
          }
  
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
        this.menu = false;
      },
      mostrarMenu() {
        this.menu = !this.menu;
        this.perfilOpcoes = false;
      }
    },
    created() {
      this.atualizarPosts();
      this.getUserDetails();
    },
  };
  </script>

<style scoped>
p {
  margin: 0;
}
textarea {
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
  clip-path: circle(30px at center);
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
.menuOpcoes {
  position: absolute;
  height: 200px;
  width: 180px;
  margin-left: 86.72%;
}
.opcaoPerfil, .opcaoSair {
  color: black;
  border: 1px solid black;
  background-color: #F2F3FF;
  padding: 20px;
}
</style>
