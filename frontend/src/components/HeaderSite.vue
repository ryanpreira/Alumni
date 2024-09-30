
<script>
import { useRouter } from 'vue-router';
</script>

<template>

<header class="nav-bar">
      <div class="logo">
        <router-link to="/inicio"><img src=".././assets/logo icon.svg" alt="logo azul" /></router-link>
      </div>
      <nav>
        <ul>
        <router-link to="/sobre"><li><a href="#">Sobre</a></li></router-link>
        <router-link to="/doacao"><li><a href="#">Doação</a></li></router-link>
          <li><a href="#">Notícias</a></li>
          <li><a href="#">Contato</a></li>
          <router-link to="/login"><li><a style="font-weight: 400" class="login2" href="#">Login</a></li></router-link>
          <router-link to="/cadastro"><li><a class="cadastro" href="#">Cadastrar</a></li></router-link>
        </ul>
      </nav>
    </header>
</template>

<style>
body {
  background-color: #F2F3FF;
  font-family: Inter;
  line-height: 0.8;
  font-weight: 400;
}
nav {
    position: absolute;
    right: 2.8em;
}
  ul {
    display: flex;
    list-style: none;
    gap: 1rem;
  }
  
  ul li a {
    text-decoration: none;
    color: #1e1e1e;
    cursor: pointer;
  }
  
  ul li :hover {
    color: #5bacdf;
  }
  .nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
  }
  .logo {
    height: 64.5px;
    object-fit: cover;
  }
  .cadastro {
    color: #fff;
    background-color: #2e2e81;
    padding: 0.5rem 0.9rem;
    border-radius: 0.5rem;
    cursor: pointer;
  }
  
  .cadastro:hover {
    color: #fff;
    background-color: #011927;
  }
  
  .login2 {
    color: #1e1e1e;
    background-color: #b8b8b8;
    padding: 0.5rem 0.9rem;
    border-radius: 0.5rem;
  }
  
  .login2:hover {
    color: #1e1e1e;
    background-color: #999999;
  }
</style>