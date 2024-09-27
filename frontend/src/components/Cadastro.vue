<script>
import axios from 'axios'
import { api } from '../api';

export default {
data() {
    return {
        nome: '',
        sobrenome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        formacao: '',
        ano: '',
        matriculaCPF: '',
        papel: '',
    };
},
methods: {
    async submitForm() {
    try {
        const response = await api.post('/users', {
        data: JSON.stringify({
            nome: this.nome,
            sobrenome: this.sobrenome,
            email: this.email,
            senha: this.senha,
            confirmarSenha: this.confirmarSenha,
            formacao: this.formacao,
            ano: this.ano,
            matriculaCPF: this.matriculaCPF,
            papel: this.papel
    }),
});
        console.log('Usuário cadastrado:', response.data);

        this.nome = '';
        this.sobrenome = '';
        this.email = '';
        this.senha = '';
        this.confirmarSenha = '';
        this.formacao = '';
        this.ano = '';
        this.matriculaCPF = '';
        this.papel = ''

        } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
    }

    }
}
};
</script>

<template>
    <div class="retorno">
        <img class="retornoIcone" src=".././assets/001-back.png"/>
        <p class="cadastrar">Cadastrar</p>
    </div>

    <img class="alumniTag" src=".././assets/Group 34.png"/>

    <div class="conteiner">
    <div class="card">

    <form @submit.prevent="submitForm">
        <input v-model="nome" id="nome" placeholder="nome" required/>
        <input v-model="sobrenome" id="sobrenome" placeholder="sobrenome" required/>
        <input v-model="email" id="email" placeholder="e-mail" required/>
        <input v-model="senha" id="senha" placeholder="senha" required/>
        <input v-model="confirmarSenha" id="senha" placeholder="confirmar senha" required/>

        <select v-model="formacao" id="formacao">
            <option value="" disabled selected>formação</option>
            <option>design digital</option>
            <option>engenharia de software</option>
            <option>sistemas de informação</option>
            <option>ciência da computação</option>
            <option>redes de computadores</option>
            <option>sistemas de informação</option>
            <option>engenharia de computação</option>

        </select>

        <select v-model="ano" id="ano">
            <option value="" disabled selected>ano</option>
            <option>2007</option>
            <option>2008</option>
            <option>2009</option>
            <option>2010</option>
            <option>2011</option>
            <option>2012</option>
            <option>2013</option>
            <option>2014</option>
            <option>2015</option>
            <option>2016</option>
            <option>2017</option>
            <option>2018</option>
            <option>2019</option>
            <option>2020</option>
            <option>2021</option>
            <option>2022</option>
            <option>2023</option>
        </select>

        <input v-model="matriculaCPF" id="matriculaCPF" placeholder="matrícula ou cpf" required/>

        <div class="papel">

            <div class="aluno">
            <input type="radio" id="aluno" value="aluno" v-model="papel" />
            <label for="aluno">aluno</label>
            </div>

            <div class="egresso">
            <input type="radio" id="egresso" value="egresso" v-model="papel" />
            <label for="egresso">egresso</label>
            </div>

        </div>
        <button type="submit">Cadastrar</button>
    </form>
    </div>
    <img class="imgCadastroLogin" src=".././assets/girlscomposition.png">
    </div>

    <div class="login">
        <p>já tem conta? <a href="">faça login aqui</a></p>
    </div>
</template>

<style scoped>
select {
    padding: 0.6em;
    color: #757575;
    font-size: 1.1em;
    font-weight: light;
    background-color: #ffffff;
}
p {
    font-size: 1.2em;
}
.read-the-docs {
    color: #888;
}
</style>
