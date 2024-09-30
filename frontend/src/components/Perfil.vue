<script>
import axios from 'axios'
import { api } from '../api';
import { ref } from 'vue';

export default {
data() {
    return {
        userId: null,
        nome: '',
        formacao: '',
        bio: '',
        file: '',
        conteudo: '',
        posts: [],
        users: [],
        tags: ref([]),
        overlayVisible: false,
        bioInputVisible: false,
        bioVisible: true,
        overlay: false,
    };
},
methods: {
  alternarOverlay() {
    this.isVissible = !this.isVissible;
  },
  async abaTags() {
    this.overlayVisible = !this.overlayVisible;
    this.overlay = !this.overlay;
  },
  async abaBio() {
    this.bioInputVisible = !this.bioInputVisible;
    this.bioVisible = !this.bioVisible;
  },
  async addTag(event) {
  try {
    const tag = event.currentTarget.textContent.trim();

    if (!Array.isArray(this.tags)) {
      this.tags = [];
    }

    const index = this.tags.indexOf(tag);

    if (!this.tags.includes(tag)) {
      if (this.tags.length < 6) {
        this.tags.push(tag);
      } else {
        console.log('Limite de 6 tags atingido.');
      }
    } else {
      this.tags.splice(index, 1);
    }

    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('idUser');

    if (!token || !idUser) {
      throw new Error('Token ou id de usuário não encontrado.');
    }

    const response = await api.put(`/users/${idUser}`, {
      tags: this.tags,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

  } catch (error) {
    console.error('Erro ao adicionar Tag:', error);
  }
}
, async alterarBio() {
  try {
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('idUser');
    
    const response = await api.put(`/users/${idUser}`, {
      bio: this.bio,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

  } catch (error) {
    console.error('Erro ao alterar Bio:', error);
  }
},
    async atualizarPosts() {
      try {
        const token = localStorage.getItem('token');
        const idUser = localStorage.getItem('idUser');

        const response = await api.get('/posts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        this.posts = response.data.data.filter(post => post.idUser.id === Number(idUser));
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
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

    async getUsers() {
      try {
        const token = localStorage.getItem('token');

        const response = await api.get('/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        this.users = response.data.data;
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    }
},
    created() {
        this.atualizarPosts();
        this.getUserDetails();

    },
    mounted() {
    document.title = 'Perfil';
  }
};
</script>

<template>
  <div v-if="overlayVisible" class="dark-overlay"></div>
    <div style="position: relative" class="perfilHeader">
        <div class="retorno">
            <router-link to="/home"><img class="retornoIcone" src=".././assets/001-back.png"/></router-link>
        </div>
        <div class="userInfo">
            <img class="imgPerfil" v-if="!file" src=".././assets/account.png">
            <img class="imgPerfil" style="clip-path: circle(50px at center);" v-else :src="`http://localhost:3000/uploads/${file}`"/>
            <div class="userBio">
                <h1 style="color: black;margin-bottom: 10%;">{{ nome }}</h1>
                <p>{{ formacao }}</p>
            </div>
            <div class="editDiv">
          <router-link to="/edicaoPerfil"><img style="position: absolute; margin-top: 20px;height: 22px;right: 9%" src="./../assets/edit.png"></router-link>
          <img style="position: absolute; margin-top: 20px;height: 22px;right: 7%" src="./../assets/download.png">

        </div>
        </div>
    </div>

    <div class="campos">
      <div class="bio">
          <div style="display: flex;justify-content: space-between" class="footerBio">
            <div id="footerBio">
              <p style="color: black;font-weight: bold;margin-left: 5px;margin-bottom: 4px;">Biografia</p>
              <p v-if="bio && bioVisible" style="margin-left: 5px; margin-top: 8px;">{{ bio }}</p>
              <p v-else style="margin-left: 5px; margin-top: 8px;">Adicione uma bio</p>
            </div>

          <div class="iconeBio">
            <form @submit.prevent="alterarBio" style="align-items: center;">
            <button id="alterarBio" style="background-color: #E3E7FF" type="submit">
              <img @click="abaBio" style="height: 20px;width: 20px;" src=".././assets/edit.png" alt="" />
            </button>
            </form>
          </div>
        </div>

          <div class="inputBio">
            <textarea v-if="bioInputVisible" class="bioTextarea" v-model="bio" required></textarea>
          </div>
    </div>

        <div class="tagsarea">

          <div style="display: flex;align-items: center" id="headBio">
            <p @click="abaTags" style="color: black;font-weight: bold;margin-left: 5px;margin-bottom: 20px;">Áreas de Interesse</p>
            <img @click="abaTags" id="alterarTags" style="height: 15px;width: 15px;" src=".././assets/mais 1.png" alt="" />
          </div>


            <div style="display: flex;flex-direction: row;flex-wrap: wrap;" class="Usertags">
            <div v-for="data in tags">
              <div class="tag">
                {{ data }}
              </div>
            </div>
          </div>

        </div>
        
        <div v-if="overlayVisible"  style="position: relative" class="tagsareaSuspensaGeral">

            <div class="tagsareaSuspensa">
              <div id="headBio">
                <p @click="abaTags" style="color: black;font-weight: bold;margin-left: 5px;margin-bottom: 20px;">Áreas de Interesse</p>
                <img @click="abaTags" id="alterarTagsSuspensa" style="height: 15px;width: 15px;" src=".././assets/check.png" alt="" />
              </div>

            <div style="display: flex;flex-wrap: wrap" class="list-tags">
                <div @click="addTag($event)" class="tag">
                  Design de Interação
                </div>
                <div @click="addTag($event)" class="tag">
                  Desenvolvimento Web
                </div>
                <div @click="addTag($event)" class="tag">
                  UX/UI Design
                </div>
                <div @click="addTag($event)" class="tag">
                  Segurança da Informação
                </div>
                <div @click="addTag($event)" class="tag">
                  Internet das Coisas (IoT)
                </div>
                <div @click="addTag($event)" class="tag">
                  Computação em Nuvem
                </div>
                <div @click="addTag($event)" class="tag">
                  Web Design
                </div>
                <div @click="addTag($event)" class="tag">
                  Data Science e Big Data
                </div>
              </div>
            </div>
        </div>

        <div class="atividade">

          <p style="color: black;font-weight: bold;margin-left: 5px;margin-bottom: 15px;">Atividade</p>
            <div class="posts-list">
            <div v-for="data in posts" :key="data.postId" style="margin-top: 30px; display: flex;">
                <img v-if="data.idUser.file" :src="`http://localhost:3000/uploads/${data.idUser.file}`" alt="User profile image" class="imgPerfilHome" />
                <img v-else src=".././assets/account_circle (1).png" alt="User profile image" class="imgPerfilHome" />
                  <div style="background-color: white" class="post">
                      {{ data.conteudo }}
                  </div>
            </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#headBio {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userBio {
  display: grid;
  place-items: center;
}
.imgPerfil {
  height: 100px;
  width: 100px;
  margin-bottom: 20px;
}
.userInfo {
  display: grid;
  place-items: center;
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
.main-content {
  position: relative;
  z-index: 1000;
}
#alterarBio {
  border-radius: 30px;
  border: 1px solid transparent;
  font-size: 0.8em;
  font-weight: 500;
  font-family: "Montserrat", sans-serif;
  background-color: #E3E7FF;
  cursor: pointer;
  transition: border-color 0.25s;
  display: flex;
  justify-content: left;
}
#alterarTags {
  border-radius: 30px;
  border: 1px solid transparent;
  font-size: 0.8em;
  font-weight: 500;
  font-family: "Montserrat", sans-serif;
  background-color: #E3E7FF;
  cursor: pointer;
  transition: border-color 0.25s;
  display: flex;
  justify-content: left;
}
#alterarTagsSuspensa {
  position: absolute;
  top: 8%;
  right: 5%;
  border-radius: 30px;
  border: 1px solid transparent;
  font-size: 0.8em;
  font-weight: 500;
  font-family: "Montserrat", sans-serif;
  background-color: #E3E7FF;
  cursor: pointer;
  transition: border-color 0.25s;
  display: flex;
  justify-content: left;
}
.posts-list {
  margin-top: 20px;
}
.post {
  width: 600px;
  padding: 40px;
  border-radius: 15px 80px 80px 40px;
  background-color: #E4E7FF;
  border: 1px solid black;
}
.footerPerfil {
  background: #2E2E81;
  display: flex;
  justify-content: space-between; 
  align-items: center;
  padding: 32px;
  width: 90.95em;
  margin-top: 50px;
  bottom: 0;
}
.perfilHeader {
    background-color: #E3E7FF;
    height: 280px;
    border-radius: 0px 0px 120px 120px;
    border: 1px solid black;
    width: 94.8em;
}
.bioTextarea {
    margin-top: 20px;
    background-color: white;
    color: black;
    width: 600px;
    height: 150px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid black;
    box-sizing: border-box;
    resize: none;
    border-radius: 20px;
}
.tag {
    display: grid;
    place-items: center;
    margin: 10px;
    text-align:center;
    justify-content: center;
    align-items: center;
    background-color: white;
    height: 20px;
    width: 250px;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid black;
}
.atividade {
    overflow-y: auto; /* Adiciona barra de rolagem se necessário */
    padding: 30px;
    background-color: #E3E7FF;
    height: 217px;
    width: 37.5em;
    border-radius: 40px 40px 40px 40px;
    border: 1px solid black;
    margin-top: 4%;
}
.bio {
    padding: 30px;
    background-color: #E3E7FF;
    height: auto;
    width: 37.5em;
    border-radius: 40px 40px 40px 40px;
    border: 1px solid black;
    margin-top: 7%;
}
.tagsarea {
  position: relative;
    height: auto;
    padding: 30px;
    background-color: #E3E7FF;
    width: 37.5em;
    border-radius: 40px 40px 40px 40px;
    border: 1px solid black;
    margin-top: 4%;
}
.tags-list {
  display: flex;
}
.tagsareaSuspensa {
    padding: 20px;
    position: absolute;
    margin-top: -42%;
    z-index: 1000;
    display: inline-flexbox;
    flex-direction: row;
    flex-wrap: wrap;
    width: auto;
    height: auto;
    padding: 30px;
    place-items: center;
    background-color: #E3E7FF;
    width: 37.5em;
    border-radius: 40px 40px 40px 40px;
    border: 1px solid black;
}
.tags-list {
    padding: 30px;
    place-items: center; 
    background-color: red;
    height: 180px;
    width: 37.5em;
    border-radius: 40px 40px 40px 40px;
    border: 1px solid black;
    margin-top: 4%;
}
select {
    padding: 0.6em;
    color: #757575;
    font-size: 1.1em;
    font-weight: light;
    background-color: #ffffff;
}
.campos {
    position: relative;
    margin-left: 32%;
    justify-content: center;
    align-items: center;
}
</style>
