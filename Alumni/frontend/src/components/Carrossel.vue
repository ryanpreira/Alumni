<template>
    <div class="hero">
    <img
      class="hero_logo"
      src="../assets/logo grande.svg"
      alt="Logo grande"
    />
    <img
      class="hero_social"
      src="../assets/redes sociais.svg"
      alt="Redes sociais"
    />
</div>
</template>

<style>
.hero {
    background-image: url(../assets/hero_background.png);
    background-size: cover;
    height: 700px;
    width: 90.56vw;

    display: flex;
    flex-direction: column;
  
    align-items: baseline;
  
    justify-content: space-between;
  
    padding: 2rem 4rem;
  }
  
  .hero_logo {
    padding-top: 12rem;
    width: 30%;
  }
  
  .hero_social {
    height: 2rem;
  }
  .texto-laranja {
    color: #ff8a00;
  }
  .subtitle-txt {
    width: 100%;
  }
  .subtitle-a {
    width: 753px;
    position: relative;
    font-size: 32px;
    line-height: 120%;
    font-family: Inter;
    text-align: left;
    align-items: center;
    color: #1e1e1e;
  }
</style>