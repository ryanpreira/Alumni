
<template>
<div v-if="overlayVisible" class="dark-overlay"></div>

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
      <router-link to='/login'><div @click="sair" class="opcaoPerfil">Sair</div></router-link>
  </div>

  <div v-if="menu" class="menuOpcoes">
      <div @click="mostrarOpcoesOportunidades" class="opcaoMenu">Oportunidades<img style="height: 20px;width: 20px;" src=".././assets/angulo.png"/></div>
      <div v-if="opcoesOportunidadesVisible" class="opcoesOportunidades">
          <div style="background-color: #E3E7FF;" class="opcaoMenu">Divulgar</div>
          <div style="background-color: #E3E7FF;" class="opcaoMenu">Buscar</div>
      </div>

      <div @click="mostrarOpcoesMentorias" class="opcaoMenu">Mentorias<img style="height: 20px;width: 20px;" src=".././assets/angulo.png"/></div>
      <div v-if="opcoesMentoriasVisible" class="opcoesOportunidades">
          <div style="background-color: #E3E7FF;" class="opcaoMenu">Solicitar</div>
          <div style="background-color: #E3E7FF;" class="opcaoMenu">Pendentes</div>
      </div>

      <div @click="mostrarOpcoesEventos" class="opcaoMenu">Eventos<img style="height: 20px;width: 20px;" src=".././assets/angulo.png"/></div>
      <div v-if="opcoesEventosVisible" class="opcoesOportunidades">
          <router-link to="/eventos"><div style="background-color: #E3E7FF;" class="opcaoMenu">Anunciar</div></router-link>
          <div style="background-color: #E3E7FF;" class="opcaoMenu">Participar</div>
      </div>

      <div @click="mostrarOpcoesDoador" class="opcaoMenu">Seja um Doador<img style="height: 20px;width: 20px;" src=".././assets/angulo.png"/></div>
      <div v-if="opcoesDoadorVisible" class="opcoesOportunidades">
          <div style="background-color: #E3E7FF;" class="opcaoMenu">Como doar</div>
          <div style="background-color: #E3E7FF;" class="opcaoMenu">Campanhas</div>
      </div>
  </div>

      <div v-if="overlayVisible" class="areaEventosGeral">

        <div class="areaEventos">
          <p style="color: black;font-weight: bold;margin-left: 0px;margin-bottom: 12px;  font-size: 1.1em;">Criar um evento</p>
          <form @submit.prevent="enviarEvento">
    <input v-model="nomeEvento" id="nomeEvento" placeholder="nome" required />
    <input type="date" v-model="dataEvento" id="date" placeholder="data" required />
    <input type="time" v-model="hora" id="hora" placeholder="hora" required />
    <textarea class="descricaoTextarea" v-model="descricao" placeholder="descricao" required></textarea>

    <div style="display: flex; font-size: 1.1em;" class="modalidade">
      <div class="online">
        <input type="radio" id="online" value="online" v-model="modalidade" />
        <label for="online">online</label>
      </div>
      <div class="presencial">
        <input type="radio" id="presencial" value="presencial" v-model="modalidade" />
        <label for="presencial">presencial</label>
      </div>
    </div>

    <div class="displayflex" style="display: flex; align-items: center; justify-content: space-between">
      Fazer upload da capa
      <label for="imgUpload" class="custom-file-upload">upload</label>
      <input style="margin-bottom: 5px" type="file" id="imgUpload" @change="onImageSelected" accept="image/*" />
    </div>

    <button id="publicar" type="submit">Publicar</button>
  </form>
        </div>

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
        menu: false,
        nomeEvento: '',
        descricao: '',
        dataEvento: '',
        hora: '',
        modalidade: '',
        imagem: '',
        opcoesOportunidadesVisible: false,
        opcoesMentoriasVisible: false,
        opcoesEventosVisible: false,
        opcoesDoadorVisible: false,
        overlayVisible: false,
        overlay: false,
      };
    },
    methods: {
      onImageSelected(event) {
      this.imagem = event.target.files[0];
      console.log(this.imagem);
    },
      async enviarEvento() {


        const token = localStorage.getItem('token');
        console.log('Token:', token);

        const formData = new FormData();

        formData.append('descricao', this.descricao);
        formData.append('nomeEvento', this.nomeEvento);
        formData.append('dataEvento', this.dataEvento);
        formData.append('hora', this.hora);
        formData.append('modalidade', this.modalidade);

if (this.imagem) {
  formData.append('imagem', this.imagem);
}
      try {
        console.log(token);

        const response = await api.post('/events', formData, {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});

        console.log('Evento cadastrado:', response.data);

        this.nomeEvento = '';
        this.descricao = '';
        this.dataEvento = '';
        this.hora = '';
        this.modalidade = '';
        this.imagem = '';
        document.getElementById('imgUpload').value = '';

      } catch (error) {
        console.error('Erro ao cadastrar evento:', error);
      }
    }
    ,
      alternarOverlay() {
      this.isVissible = !this.isVissible;
      },
      async abaDivulgarEventos() {
        this.overlayVisible = !this.overlayVisible;
  this.overlay = !this.overlay;
  console.log(this.overlayVisible);
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
      },
      mostrarOpcoesOportunidades() {
        this.opcoesOportunidadesVisible = !this.opcoesOportunidadesVisible;
        this.opcoesMentoriasVisible = false;
        this.opcoesDoadorVisible = false;
        this.opcoesEventosVisible = false;

      },
      mostrarOpcoesMentorias() {
        this.opcoesMentoriasVisible = !this.opcoesMentoriasVisible;
        this.opcoesEventosVisible = false;
        this.opcoesDoadorVisible = false;
        this.opcoesOportunidadesVisible = false;
      },
      mostrarOpcoesEventos() {
        this.opcoesEventosVisible = !this.opcoesEventosVisible;
        this.opcoesMentoriasVisible = false;
        this.opcoesOportunidadesVisible = false;
        this.opcoesDoadorVisible = false;

      },
      mostrarOpcoesDoador() {
        this.opcoesDoadorVisible = !this.opcoesDoadorVisible;
        this.opcoesMentoriasVisible = false;
        this.opcoesEventosVisible = false;
        this.opcoesOportunidadesVisible = false;
      },
    },
    created() {
      this.atualizarPosts();
      this.getUserDetails();
    },
  };
  </script>

<style scoped>
.custom-file-upload {
  width: 100px;
  height: 10px;
  margin-left: 0px;
  background-color: white;
  padding: 20px;
  border: 1px solid black;
  justify-content: center;
  display: flex;       
  justify-content: center;  
  align-items: center;  
}
input[type="file"] {
  display: none;
}
#nomeEvento {
  width: 92.7%;
}
#data {
  width: 10%;

}
#hora {
  width: 47.1%;

}
.descricaoTextarea {
  width: 99%;
}
#online, #presencial {
  margin: 0.6em 0.4em 0.6em 0.3em;
}
.areaEventos {
    position: absolute;
    margin-left: 34%;
    margin-top: 1%;
    z-index: 1000;
    display: inline-flexbox;
    flex-direction: row;
    flex-wrap: wrap;
    height: auto;
    padding: 70px;
    place-items: center;
    background-color: #E3E7FF;
    border-radius: 40px 40px 40px 40px;
    border: 1px solid black;
    max-width: 400px;
}
.areaEventos input {
  margin-top: 15px;
  margin-right: 5px;
}
.areaEventos textarea {
  margin-top: 15px;
}
.areaEventos .modalidade {
  margin-top: 15px;
}
input {
  font-family: Inter;
}
p {
  margin: 0;
}
textarea {
  font-family: Inter;
  font-size: 1.1em;
  margin-left: 0%;
  width: 59%;
  height: 150px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid black;
  box-sizing: border-box;
  background-color: white;
  color: black;
  border-radius: 15px 15px 15px 15px;
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
  background-color: #2E2E81;
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
.dark-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.menuOpcoes {
  position: absolute;
  height: 200px;
  width: 190px;
  margin-left: 86.72%;
}
.opcaoPerfil {
  color: black;
  border: 1px solid black;
  background-color: #F2F3FF;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px;
}
.opcaoMenu {
  color: black;
  border: 0.1px solid black;
  background-color: #F2F3FF;
  padding: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}
</style>
