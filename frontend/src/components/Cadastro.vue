<script>
import { api } from '../api';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const navigateToHome = () => {
      router.push('/login');
    };
    return {
      navigateToHome,
    };
  },
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
      campoObrigatorioFalha: false,
      userSenhaFalha: false,
      senhasDiferentesFalha: false,
      papelFalha: false,
      EmailInvalido: false
    };
  },
  methods: {
    validarEmail() {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(this.email)) {
        this.emailError = 'Email inválido!';
        return false;
      }
      this.emailError = '';
      return true;
    },
    async submitForm() {
      let erros = [];

      if (this.nome.trim() === '') {
        erros.push('mostrarCampoObrigatorioFalha');
      }

      if (this.sobrenome.trim() === '') {
        erros.push('mostrarCampoObrigatorioFalha');
      }

      if (this.email.trim() === '') {
        erros.push('mostrarCampoObrigatorioFalha');
      }

      if (!this.validarEmail()) {
        erros.push('mostrarEmailInvalido');
      }

      if (this.senha.trim() === '') {
        erros.push('mostrarCampoObrigatorioFalha');
      }

      if (this.formacao.trim() === '') {
        erros.push('mostrarCampoObrigatorioFalha');
      }

      if (this.ano.trim() === '') {
        erros.push('mostrarCampoObrigatorioFalha');
      }

      if (this.papel.trim() === '') {
        erros.push('mostrarEscolhaPapelFalha');
      }

      if (this.senha !== this.confirmarSenha) {
        erros.push('mostrarSenhasDiferentesFalha');
      }

      if (erros.length > 0) {
        erros.forEach((erro) => {
          this[erro](); // Chama cada função de erro dinamicamente
        });

        setTimeout(() => {
          erros.forEach((erro) => {
            const hideFunction = erro.replace('mostrar', 'ocultar');
            this[hideFunction](); // Chama a função de ocultar o erro dinamicamente
          });
        }, 3000);

        return;
      }

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
            papel: this.papel,
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
        this.papel = '';
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
      }

      this.$router.push('/login');
    },
    mostrarCampoObrigatorioFalha() {
      this.campoObrigatorioFalha = true;
    },
    ocultarCampoObrigatorioFalha() {
      this.campoObrigatorioFalha = false;
    },
    mostrarUserSenhaFalha() {
      this.userSenhaFalha = true;
    },
    ocultarUserSenhaFalha() {
      this.userSenhaFalha = false;
    },
    mostrarSenhasDiferentesFalha() {
      this.senhasDiferentesFalha = true;
    },
    ocultarSenhasDiferentesFalha() {
      this.senhasDiferentesFalha = false;
    },
    mostrarEscolhaPapelFalha() {
      this.papelFalha = true;
    },
    ocultarEscolhaPapelFalha() {
      this.papelFalha = false;
    },
    mostrarEmailInvalido() {
      this.EmailInvalido = true;
    },
    ocultarEmailInvalido() {
      this.EmailInvalido = false;
    },
  },
  mounted() {
    document.title = 'Cadastre-se';
  },
};
</script>


<template>

    <div class="retorno">
        <img class="retornoIcone" src=".././assets/001-back.png"/>
        <p class="retornoHead">Cadastrar</p>
    </div>

    <div style="display: flex; align-items: center;justify-content: space-between;align-items: center;width: 42.5% " class="headerCadastro">
    <div class="alumniTagCadastro">
        <img id="alumniTagCadastro" src=".././assets/Group 34.png"/>
    </div>

    <div style="align-items: center;" class="userInfo">
        <div v-if="EmailInvalido" class="emailInvalido" style="text-align: center;line-height: 1;margin-top: 5px;">
            <p style="text-align: center;color: white;line-height: 1">e-mail inválidol</p>
        </div>
        <div v-if="campoObrigatorioFalha" class="campobrigatorio" style="text-align: center;line-height: 1;margin-top: 5px;padding-top: 20px;padding-bottom: 20px;">
            <p style="text-align: center;color: white;line-height: 1">todos os campos são obrigatórios</p>
        </div>
        <div v-if="userSenhaFalha" class="userSenha" style="text-align: center;line-height: 1;margin-top: 5px;">
            <p style="text-align: center;color: white;line-height: 1">usuário ou senha inválidos</p>
        </div>
        <div v-if="senhasDiferentesFalha" class="senhasDiferentes" style="text-align: center;line-height: 1;margin-top: 5px;">
            <p style="text-align: center;color: white;line-height: 1">senhas não coincidem</p>
        </div>
        <div v-if="papelFalha" class="papelFalha" style="text-align: center;line-height: 1;margin-top: 5px;">
            <p style="text-align: center;color: white;line-height: 1">escolha um papel</p>
        </div>
        
    </div>

    </div>
    
        <div class="conteiner">
    <div class="card">

    <form @submit.prevent="submitForm">
        <input v-model="nome" id="nome" placeholder="nome"/>
        <input v-model="sobrenome" id="sobrenome" placeholder="sobrenome"/>
        <input v-model="email" id="email" placeholder="e-mail"/>
        <input v-model="senha" id="senha" type="password" placeholder="senha" required/>
        <input v-model="confirmarSenha" id="senha" type="password" placeholder="confirmar senha" required/>

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

        <input v-model="matriculaCPF" id="matriculaCPF" placeholder="matrícula ou cpf"/>

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
        
        <button id="cadastrar" type="submit">Cadastrar</button>
    </form>
    </div>
    <img class="imgCadastroLogin" src=".././assets/girlscomposition.png">
    </div>

    <div class="login">
        <p>já tem conta? <router-link to='/login'><a style="font-weight: 700">faça login aqui</a></router-link></p>
    </div>
    
</template>

<style scoped>
.userInfo {
    position: relative;
    font-size: 0.8em
}
.userSenha, .senhasDiferentes, .campobrigatorio, .papelFalha, .emailInvalido {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  height: 3px;
  width: 200px;
  border-radius: 10px;
  background-color: #FF262A;
}
#alumniTagCadastro {
    margin: 30px 62px;;
     height: 65.912px;
     width: 192px; 
  }
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
