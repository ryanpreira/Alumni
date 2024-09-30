<script>
import { api } from '../api';

export default {
  data() {
    return {
      posts: [],
      conteudo: '',
      file: '',
      perfilOpcoes: false,
      papel: '',
      idUser: null,
      postEditandoId: null,
      conteudoEditado: '',
      popDelete: false,
      popDeleteId: null
    };
  },
  methods: {
    editarPost(postId, conteudo) {
      this.postEditandoId = postId;
      this.conteudoEditado = conteudo; 
    },

    async salvarEdicao(postId) {
      const token = localStorage.getItem('token');

      try {
        const response = await api.put(`/posts/${postId}`, {
          conteudo: this.conteudoEditado
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Atualiza o post editado localmente
        const postIndex = this.posts.findIndex(post => post.postId === postId);
        if (postIndex !== -1) {
          this.posts[postIndex].conteudo = this.conteudoEditado;
        }

        this.postEditandoId = null;
        this.conteudoEditado = '';
      } catch (error) {
        console.error('Erro ao editar o post:', error);
      }
    },

    cancelarEdicao() {
      this.postEditandoId = null;
      this.conteudoEditado = '';
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

        this.idUser = idUser;
        this.nome = response.data.nome;
        this.formacao = response.data.formacao;
        this.bio = response.data.bio;
        this.file = response.data.file;
        this.tags = response.data.tags;
        this.papel = response.data.papel;
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

        const response = await api.get('/posts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        this.posts = response.data.data.reverse();
        console.log(response.data.data);
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

    async apagarPost(postId) {
      try {
        const token = localStorage.getItem('token');

        await api.delete(`/posts/${postId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        this.posts = this.posts.filter(post => post.postId !== postId);

        this.ocultarPopDelete();

        console.log(`Post com id ${postId} excluído com sucesso.`);
      } catch (error) {
        console.error('Erro ao excluir o post:', error);
      }
    },

    mostrarPerfilOpcoes() {
      this.perfilOpcoes = !this.perfilOpcoes;
    },

    mostrarPopDelete(postId) {
      this.popDelete = true;
      this.popDeleteId = postId;
      console.log(postId);
    },
    ocultarPopDelete() {
    this.popDeleteId = null;
    this.popDelete = false;
    },
    handleClickOutside(event) {
  const popUpElement = document.getElementById('apagarPopUp');

  if (popUpElement) {
    if (!popUpElement.contains(event.target)) {
      this.ocultarPopDelete();
    }
  }
},
  },
  created() {
    this.atualizarPosts();
    this.getUserDetails();
  },
  mounted() {
    document.title = 'Home';
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
  document.removeEventListener('click', this.handleClickOutside);
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
          <button style="background-color: #F0F2FF;" type="submit">
            <img id="botaoEnviarPost" src=".././assets/send.png" alt="" />
          </button>
        </form>
      </div>

      <div class="listaPosts">
  <div v-for="data in posts" :key="data.postId" style="margin-top: 40px; display: flex;">
    <img v-if="data.idUser.file" :src="`http://localhost:3000/uploads/${data.idUser.file}`" class="imgPerfilHome" />
    <img v-else src=".././assets/account_circle (1).png" class="imgPerfilHome" />

    <div class="post" style="flex: 1; position: relative;">
      <div style="position: absolute;top: -0.5%" class="textareaEdit" v-if="postEditandoId === data.postId">
        <textarea style="width: 100%; height: 100%;" v-model="conteudoEditado" rows="8"></textarea>
      <div style="margin-left: 30px;margin-top: -90px;display: flex;" class="eventBotoes">
        <p @click="salvarEdicao(data.postId)" style="margin-left: 10px;" id="editarPost">salvar</p>
        <p @click="cancelarEdicao" style="margin-left: 10px;" id="excluirPost">cancelar</p>
      </div>
      </div>
      
      <div class="position: relative" v-else>
        {{ data.conteudo }}
        <div v-if="Number(idUser) === data.idUser.id || papel === 'administrador'" style="display: flex;margin-top: 20px" class="eventBotoes">
          <p @click="editarPost(data.postId, data.conteudo)" id="editarPost" type="button">editar</p>
          <p @click="mostrarPopDelete(data.postId)" style="margin-left: 10px;" id="excluirPost" type="button">excluir</p>
        </div>
        <div v-show="popDeleteId === data.postId" ref="RefapagarPopUp" style="position: absolute;margin-left: 100px;margin-top: -80px;" class="apagarPopUp">
          <div style="margin-bottom: 8px;color: #000000" class="pergunta">Excluir postagem?</div>
          <div style="display: flex;justify-content: space-between" class="opcoesPopUp">
          <p style="margin-right: 5px;color: #2E2E81" @click="apagarPost(data.postId)">sim</p>
          <p @click="ocultarPopDelete" style="margin-left: 5px;color: #2E2E81">não</p>
        </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
</template>

<style scoped>
body {
  font-family: Inter;
}
.apagarPopUp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: 40px;
  width: 180px;
  border: 1px solid black;
  background-color: #FFFFFF;
  border-radius: 80px 80px 80px 15px;
}
p {
  margin: 0;
}
.textareaEdit {
margin-left: -41px;
height: 161px;
width: 540px;
}
textarea {
  font-family: Inter;
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
  border: 1px solid black;
}
button {
  background-color: #F2F3FF;
  margin-top: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  padding: 0.6em 0.6em;
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
  height: 80px;
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
button {
  font-family: Inter;
  font-size: 0.8em;
  color: #2E2E81;
  font-weight: 600;
  background-color: white;;
}
</style>
