<script>
    import { useRoute } from 'vue-router';
    import { api } from '../api';

export default {
  setup() {
  const route = useRoute();
  const eventId = route.params.id;
  console.log(route.params.id);

  return {
      eventId,
    };
  },
  data() {
    return {
      events: [],
      descricao: '',
      nomeEvento: '',
      dataEvento: '',
      hora: '',
      modalidade: '',
      imagem: '',
      idUser: null,
      propNome: '',
      propSobrenome: '',
      propImg: ''

    };
  },
  methods: {
    async abaDivulgarEventos() {
      this.overlayVisible = !this.overlayVisible;
      this.overlay = !this.overlay;
      console.log(this.overlayVisible);
    },
    onImageSelected(event) {
      this.imagem = event.target.files[0];
      console.log(this.imagem);
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
    async getUserDetails() {
      try {
        const token = localStorage.getItem('token');
        const idUser = localStorage.getItem('idUser');
        this.idUser = idUser;
        console.log(this.idUser);
        const response = await api.get(`/users/${idUser}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log(this.idUser);
      } catch (error) {
        console.error('Erro ao buscar detalhes do usuário:', error);
      }
    },
    async getEventDetails() {
      try {
        const token = localStorage.getItem('token');
        console.log(this.idUser);
        const response = await api.get(`/events/${this.eventId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        this.nomeEvento = response.data.data.nomeEvento;
        this.dataEvento = response.data.data.dataEvento;
        this.hora = response.data.data.hora;
        this.descricao = response.data.data.descricao;
        this.modalidade = response.data.data.modalidade;
        this.imagem = response.data.data.imagem;
        this.propNome = response.data.data.idUser.nome;
        this.propSobrenome = response.data.data.idUser.sobrenome;
        this.propImg = response.data.data.idUser.file;

        console.log(response.data.data.descricao);
        console.log(this.idUser);
      } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('Evento não encontrado.');
        this.$router.push('/404');
      } else {
        console.error('Erro ao buscar detalhes do evento:', error);
      }
    }
  }
},
  created() {
    this.getUserDetails();
    this.getEventDetails();

  },
};
</script>


<template>
  <div class="bodyEvento">
        <div style="object-fit: cover" class="imgHeader">
          <img v-if="!imagem" id="imgEvent" src="../assets/Group 41.png" />
          <img v-else id="imgEvent" :src="`http://localhost:3000/uploads/${imagem}`" />
        </div>

        <div class="background">
        </div>

  <div class="cardEvento">
    <div class="cardEventoInfo">
      <div class="cardEventoTop">
        <div class="nomeEvento">{{ nomeEvento }}</div>
        <div style="align-self: flex-end;" class="data">{{ dataEvento }}</div>
      </div>
      <div class="cardEventoBot">
        <div style="margin-top: 15px" class="modalidade">{{ modalidade }}</div>
        <div style="margin-top: 0px" class="hora">{{ hora }}</div>
      </div>
    </div>

    <div class="cardEventoDescricao">
      {{ descricao }}
    </div>

    <div class="cardParticipar">
      <div class="propInfo">
        <img class="imgPerfilHome" :src="`http://localhost:3000/uploads/${propImg}`" />
        {{ propNome }} {{ propSobrenome }}
      </div>
      <div class="botaoParticipar">
        <button @click="participarEvento" id="editar" type="button">Participar</button>
      </div>
    </div>
  </div>
  </div>
</template>

<style>
.cardEventoDescricao {
  max-width: 100%;
  word-wrap: break-word; 
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  margin-top: 10px;
}
.bodyEvento {
  position: relative;
}
.background {
  height: 320px;
  width: 98.9vw;
}
.imgHeader img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cardEvento {
  position: absolute;
  left: 29%;
  top: 20%;
  border-radius: 50px;
  background-color: #E4E7FF;
  width: 800px;
  height: 450px;
  padding: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

.cardEventoTop,
.cardEventoBot,
.cardParticipar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.propInfo {
  display: flex;
  align-items: center;
}

.imgPerfilHome {
  margin-right: 10px;
}

.botaoParticipar button {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #2E2E81;
  color: white;
  border: none;
  cursor: pointer;
}
.text {
  display: flex;
  flex-direction: column;
}
.imgPerfilHome {
  clip-path: circle(20px at center);
  margin-right: 10px;
  height: 50px;
  width: 50px;
}

.text {
  display: flex;
  flex-direction: column;
}
.imgPerfilHome {
  clip-path: circle(20px at center);
  margin-right: 10px;
  height: 50px;
  width: 50px;
}
.imgHeader {
  background-color: black;
  height: 400px;
  width: 98.9vw;
}
.bodyEvento {
  position: relative;
}
.nomeEvento {
  font-size: 2em;
  font-weight: 700;
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
#eventImg {
  padding: 0;
  width: 250px;
  height: 250px;
  margin-top: 0;
}
</style>