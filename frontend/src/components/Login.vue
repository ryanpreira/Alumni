<script>
import axios from 'axios'
import { api } from '../api';

export default {
data() {
    return {
        email: '',
        senha: '',
    };
},
methods: {
    async submitForm() {
    try {
        const response = await api.post('/login', {
        email: this.email,
        senha: this.senha,
    });
        console.log('Usuário logado:', response.data);

        this.email = '';
        this.senha = '';

        const token = response.data.data.jwt; // Extrair o token da resposta
        localStorage.setItem('token', token); // Armazenar o token no localStorage
        console.log('Token armazenado no localStorage:', token);

        } catch (error) {
        console.error('Usuário ou senha inválida.:', error);
    }

    },
  }
};
</script>

<template>
    <div class="retorno">
        <img class="retornoIcone" src=".././assets/001-back.png"/>
        <p class="cadastrar">Login</p>
    </div>

    <img class="alumniTag" src=".././assets/Group 34.png"/>

    <div class="conteiner">
    <div class="card">

    <form @submit.prevent="submitForm">

        <label for="email">E-mail</label>
        <input v-model="email" id="email" placeholder="digite seu e-mail" required/>
        <label for="email">Senha</label>
        <input v-model="senha" id="senha" placeholder="*********" type="password" required/>

        <div class="esqueceuSenha">
        <p>esqueceu a senha <a href="">clique aqui</a></p>
        </div>

        <button type="submit">Login</button>
    </form>

    </div>
    <img class="imgCadastroLogin" src=".././assets/sungirl.png">
    </div>

    <div class="login">
        <p>não tem conta? <a href="">cadastre-se</a></p>
    </div>
</template>

<style scoped>
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
