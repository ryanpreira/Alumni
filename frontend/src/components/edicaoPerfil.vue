<script>
import axios from 'axios'
import { api } from '../api';
import { useRouter } from 'vue-router';
    import { useAuthStore } from '../stores/authStore';

export default {
    setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const navigateToHome = () => {
      router.push('/home');
    }
},
data() {
    return {
        email: '',
        sobrenome: '',
        senha: '',
        confirmarSenha: '',
        imagePreview: '',
        file: '',
        idUser: '',
        fileUser: '',
        senhasDiferentesFalha: false,
        emailInvalido: false,
        emailIndisponivel: false
    };
},
methods: {
  mostrarSenhasDiferentesFalha() {
      this.senhasDiferentesFalha = true;
    },
  async atualizarUsuario() {
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('idUser');

    const formData = new FormData();
    formData.append('nome', this.nome);
    formData.append('sobrenome', this.sobrenome);
    formData.append('email', this.email);
    formData.append('senha', this.senha);
    formData.append('confirmarSenha', this.confirmarSenha);

    if (this.file) {
      formData.append('file', this.file);
    }

    // Logando o conteúdo do formData
    for (const [key, value] of formData.entries()) {
        console.log(key, value);
    }

    if (this.senha !== this.confirmarSenha) {
      this.mostrarSenhasDiferentesFalha();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.emailInvalido = true;
      console.log('E-mail inválido');
      return;
    } else {
      this.emailInvalido = false;
    }

    try {
    const response = await api.put(`/users/${idUser}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    console.log('Status da resposta:', response.status);
    console.log('Dados da resposta:', response.data);

    if (response.status === 400) {
        if (response.data.message === 'Email já está em uso.') {
            this.emailIndisponivel = true; 
            this.mensagemErro = response.data.message;
        } else {
            alert(response.data.message);
        }
        return false;
    }

    console.log('Usuário atualizado com sucesso:', response.data.data.file); 
    return true;
} catch (error) {
  console.error('Erro ao atualizar usuário:', error.response.data);
  this.emailIndisponivel = true;
    console.error('Configuração da requisição:', error.config);
    return false;
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

        this.idUser = response.data.id;
        this.nome = response.data.nome;
        this.sobrenome = response.data.sobrenome;
        this.email = response.data.email;
        this.fileUser = response.data.file;
        console.log(this.fileUser)
      } catch (error) {
        console.error('Erro ao buscar detalhes do usuário:', error);
      }
    },
    onFileSelected(event) {
    const file = event.target.files[0];
    console.log("File selected:", file);
    if (file) {
      this.fileUser = '';
      this.file = file;
      this.imagePreview = URL.createObjectURL(file);
    } else {
      this.imagePreview = '';
    }
  },
    triggerFileInput() {
    this.$refs.fileInput.click();
  }
  },
  mounted() {
    document.title = 'Editar Perfil';
    this.getUserDetails()
  }
};
</script>

<template>
    <div class="retorno">
        <img class="retornoIcone" src=".././assets/001-back.png"/>
        <p class="retornoHead">Editar Perfil</p>
    </div>

    <div style="display: flex" class="cardEdicao">
      
      <div class="cardImagem">
  <img v-if="fileUser" class="imgPerfilEdicao" :src="`http://localhost:3000/uploads/${fileUser}`" @click="triggerFileInput" style="cursor: pointer; clip-path: circle(50px at center);" 
  />

  <img v-else-if="!imagePreview" class="imgPerfilEdicao" src=".././assets/account.png" @click="triggerFileInput" style="cursor: pointer; clip-path: circle(50px at center);" 
  />
  
  <img v-else class="imgPerfilEdicao" :src="imagePreview" @click="triggerFileInput" style="cursor: pointer; clip-path: circle(50px at center);" 
  />

  <input type="file" @change="onFileSelected" accept="image/*" style="display: none;" ref="fileInput" 
  />
</div>
    
    <div class="card">

    <form @submit.prevent="atualizarUsuario">

        <div style="display: flex" class="cardTopo">
          <div class="cardTopoNome" style="margin-right: -20px;">
            <input v-model="nome" id="nome" placeholder="nome" required/>
        </div>
          <div class="cardTopoSobrenome" style="margin-right: 0px;">
            <input v-model="sobrenome" id="sobrenome" placeholder="sobrenome" required/>
          </div>
        </div>
        <input v-model="email" id="email" placeholder="e-mail" required/>
        <input v-model="senha" id="senha" placeholder="*********" type="password" required/>
        <input v-model="confirmarSenha" id="confirmarSenha" placeholder="*********" type="password" required/>
        <div class="botaoErros" style="display: flex; justify-content: space-between; align-items: flex-end;">
  <button style="background-color: black" id="login" type="submit">Salvar</button>
  <div v-if="senhasDiferentesFalha" class="senhasDiferentes">
    <p style="text-align: center; color: white; line-height: 1;">senhas não coincidem</p>
  </div>
  <div v-if="emailInvalido" class="emailInvalido">
    <p style="text-align: center; color: white; line-height: 1;">e-mail inválido</p>
  </div>
  <div v-if="emailIndisponivel" class="emailIndisponivel">
    <p style="text-align: center; color: white; line-height: 1;">e-mail indisponivel</p>
  </div>
</div>
    </form>
    </div>
</div>
</template>

<style scoped>
.senhasDiferentes, .emailInvalido, .emailIndisponivel {
  position: absolute;
  margin-left: 210px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  height: 3px;
  width: 200px;
  border-radius: 10px;
  background-color: #FF262A;
}
.card input {
  margin: 0.5em 0;
}
label {
  margin-bottom: 10px;
}
.imgPerfilEdicao {
  width: 100px;
  height: 100px;
}
#nome {
  width: 75%;
}
#sobrenome {
  width: 75.7%;
}
.cardEdicao {
    margin-top: 7%;
    margin-left: 20%;
    max-width: 650px;
}
.userInfo {
  position: fixed;
  top: 50%;
  left: 23%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 40px;
  width: 150px;
  border-radius: 20px;
  background-color: #FF262A;
}
p {
    font-size: 1.2em;
}
label {
    font-weight: bold;
    margin: 0em 0.6em 0.6em 0.3em;
}
.card input {
    margin: 0.2em 0.6em 0.6em 0.3em;
}
.esqueceuSenha {
    margin-left: 253px;
    font-size: 0.75em;
}
.esqueceuSenha a {
    color: #05055F;
    font-weight: bolder;
    text-decoration: underline;
    text-underline-offset: 5px;
}
.read-the-docs {
color: #888;
}
</style> 