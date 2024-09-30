<script>
import axios from 'axios';
import { api } from '../api';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    return {
      router,
    };
  }
};
</script>

<template>
    <div class="corpoNaoEncontrado">
    <div class="texto">
        <p style="font-size: 1.5em;">Erro 404</p>
        <h1 style="font-size: 4em;">ops... não há nada aqui!</h1>
    </div>
    <div style="display: flex; margin-top: 10px;" class="colagem">
        <div class="botao">
            <router-link to='/inicio'><button id="voltar" type="button">Voltar para início</button></router-link>
        </div>
        <div class="img">
            <img style="margin-top: -50px;" id="img" src="../assets/Group 46.png">
        </div>
    </div>
</div>
</template>

<style>
.corpoNaoEncontrado {
    margin-top: 75px;
    margin-left: 85px;
}
#img {
    height: 510px;
}
#voltar {
  border-radius: 30px;
  border: 1px solid transparent;
  padding: 0.8em 1.8em;
  font-size: 0.8em;
  font-weight: 500;
  font-family: "Montserrat", sans-serif;
  background-color: #2E2E81;
  cursor: pointer;
  transition: border-color 0.25s;
  margin-top: 1.6em;
  display: flex;
  justify-content: left;
}
</style>