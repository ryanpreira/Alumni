<script>
import { api } from '../api';

export default {
  data() {
    return {
      events: [],
      descricao: '',
      nomeEvento: '',
      dataEvento: '',
      hora: '',
      modalidade: '',
      imagem: '',
      overlayVisible: false,
      overlay: false,
      idUser: null,
      papel: '',
      editingEventId: null,
      msgSucesso: false,
      msgFalha: false

    };
  },
  methods: {
    fecharOverlay(event) {
      if (!this.$refs.areaEventos.contains(event.target)) {
        this.overlayVisible = false;
        this.overlay = false;
      }
    },
    mostrarOpcoesEventos() {
      this.opcoesEventosVisible = !this.opcoesEventosVisible;
      this.opcoesMentoriasVisible = false;
      this.opcoesOportunidadesVisible = false;
      this.opcoesDoadorVisible = false;
    },
    alternarOverlay() {
      this.isVissible = !this.isVissible;
    },
    async abaDivulgarEventos() {
      this.overlayVisible = !this.overlayVisible;
      this.overlay = !this.overlay;
      console.log(this.overlayVisible);
    },
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
      if (this.editingEventId) {
        const response = await api.put(`/events/${this.editingEventId}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('Evento atualizado:', response.data);
      } else {
        const response = await api.post('/events', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('Evento cadastrado:', response.data);
      }

      this.atualizarEventos();
      this.limparFormulario();
      this.envioSucesso();
      
      setTimeout(() => {
      this.ocultarEnvioSucesso();
    }, 3000);

    } catch (error) {
      console.error('Erro ao enviar evento:', error);
      this.envioFalha();

      setTimeout(() => {
      this.ocultarEnvioFalha();
    }, 3000);
    }
  },
    async atualizarEventos() {
      try {
        const token = localStorage.getItem('token');

        const response = await api.get('/events', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        this.events = response.data.data.reverse();
        console.log(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    },
    async apagarEvento(eventId) {
      // Recebe o id do evento a ser excluído
      try {
        const token = localStorage.getItem('token');

        await api.delete(`/events/${eventId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        this.atualizarEventos();
        console.log(`Evento com id ${eventId} excluído com sucesso.`);
      } catch (error) {
        console.error('Erro ao excluir o evento:', error);
      }
    },



    async editarEvento(eventId) {
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    try {
      const response = await api.get(`/events/${eventId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      this.nomeEvento = response.data.nomeEvento;
      this.descricao = response.data.descricao;
      this.dataEvento = response.data.dataEvento;
      this.hora = response.data.hora;
      this.modalidade = response.data.modalidade;

      this.editingEventId = eventId;

      this.abaDivulgarEventos();
    } catch (error) {
      console.error('Erro ao buscar evento para edição:', error);
    }
  },

  limparFormulario() {
    this.nomeEvento = '';
    this.descricao = '';
    this.dataEvento = '';
    this.hora = '';
    this.modalidade = '';
    this.imagem = '';
    this.editingEventId = null; // Resetar o ID do evento editado
    document.getElementById('imgUpload').value = ''; // Resetar o campo de imagem
  }
,



    
    async getUserDetails() {
      try {
        const token = localStorage.getItem('token');
        const idUser = localStorage.getItem('idUser');
        this.idUser = idUser; // Armazena o ID no estado do componente
        console.log(this.idUser);
        const response = await api.get(`/users/${idUser}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        this.papel = response.data.papel;
        console.log(this.events[1].idUser.id);
        console.log(this.idUser);
      } catch (error) {
        console.error('Erro ao buscar detalhes do usuário:', error);
      }
    },

    async envioSucesso() {
      this.msgSucesso = true;
    },
    async ocultarEnvioSucesso() {
      this.msgSucesso = false;
    },
    async envioFalha() {
      this.msgFalha = true;
    },
    async ocultarEnvioFalha() {
      this.msgFalha = false;
    },
  },
  created() {
    this.atualizarEventos();
    this.getUserDetails();
  },
};
</script>

<template>
  <div @click="fecharOverlay" v-if="overlayVisible" class="dark-overlay"></div>

  <div style=" background-color: white; width: 88.5vw;" class="optEventos">
    <h2 style="color: #373737" @click="abaDivulgarEventos" id="anunciar">Anunciar</h2>
    <h2 style="color: #373737" id="meusEventos">Meus Eventos</h2>
  </div>

  <div class="eventsList">
    <p style="margin-top: 50px;font-size: 1.5em">Lista de Eventos</p>
    <div class="events">
      <div v-for="data in events" :key="data.eventId" style="margin-top: 40px; display: flex;">
        <div class="propInfo">
        <img
          v-if="data.idUser.file"
          :src="`http://localhost:3000/uploads/${data.idUser.file}`"
          class="imgPerfilHome"
        />
        <img v-else src=".././assets/account_circle (1).png" class="imgPerfilHome" />
      </div>
        <div style="display: flex; justify-content: space-between" class="event">
          <div class="eventInfo">
            <div style="display: flex;justify-content: space-between;align-items: center" class="eventDescTop">
              <h2 class="nomeEvento" style="margin-bottom: 5px;">{{ data.nomeEvento }}</h2>
              <p>{{ data.dataEvento }}</p>
            </div>
            <div style="display: flex;justify-content: space-between" class="eventDescBot">
              <p>{{ data.modalidade }}</p>
              <p>{{ data.hora }}</p>
            </div>
            <div style="margin-top: 20px;" class="eventDesc">
              {{ data.descricao }}

              <div
                v-if="Number(idUser) === data.idUser.id || papel === 'administrador'"
                style="display: flex;justify-content: space-between;margin-top: 35px"
                class="eventBotoes"
              >
                <button @click="editarEvento(data.eventId)" id="editar" type="button">Editar</button>
                <button @click="apagarEvento(data.eventId)" id="excluir" style="background-color: #FB314F;" type="button">
                  Excluir
                </button>
              </div>
            </div>
          </div>
          <div class="eventImg">
            <img style="float: right" id="eventImg" v-if="data.imagem" :src="`http://localhost:3000/uploads/${data.imagem}`" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="overlayVisible" class="areaEventosGeral">
    <div ref="areaEventos" class="areaEventos">
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

        <button id="publicar" type="submit">{{ editingEventId ? 'Atualizar' : 'Publicar' }}</button>
      </form>
    </div>
  </div>

  <div v-if="msgSucesso" class="msgSucesso">
    <p style="text-align: center;color: white">Ação realizada 
    com sucesso!</p>
  </div>

  <div v-if="msgFalha" class="msgFalha">
    <p style="text-align: center;color: white">Erro ao realizar 
      a ação</p>
  </div>
</template>

<style>
.nomeEvento {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.eventDesc {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; 
}
.msgSucesso {
  position: fixed;
  top: 78.5%;
  left: 15%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 60px;
  width: 200px;
  border-radius: 20px;
  background-color: #00CC60;
}
.msgFalha {
  position: fixed;
  top: 78.5%;
  right: 15%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 60px;
  width: 200px;
  border-radius: 20px;
  background-color: #FF262A;
}
.msgSucesso, .msgFalha p {
  font-size: 1.5em;
  font-weight: 600;
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
#online,
#presencial {
  margin: 0.6em 0.4em 0.6em 0.3em;
}
.areaEventos {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  display: inline-flexbox;
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
  padding: 70px;
  place-items: center;
  background-color: #e3e7ff;
  border-radius: 40px;
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
#anunciar,
#meusEventos {
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 20px;
}
#online,
#presencial {
  margin: 0.6em 0.4em 0.6em 0.3em;
}
.eventInfo {
  width: 250px;
  margin-top: 40px;
  margin-left: 50px;
}
.optEventos {
  padding: 80px;
  margin-left: 0px;
}
.eventsList {
  margin-left: 75px;
}
.event {
  background-color: #e4e7ff;
  border-radius: 15px 15px 15px 15px;
  width: 600px;
  min-height: 250px;
}
#eventImg {
  padding: 0;
  width: 250px;
  height: 250px;
  margin-top: 0;
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
</style>
