<template>
      <section class="Doacao">
        <div class="esquerda">
          <h1 class="title-b">doação</h1>
          <section>
            <div class="subtitle-b">
              A doação de ex-alunos para os atuais estudantes é de fundamental
              importância, pois representa não apenas um gesto de gratidão, mas
              também um investimento no futuro da comunidade acadêmica.
            </div>
          </section>
          <button class="btn-branco">Ler mais</button>
        </div>
        <div class="direita-qr">
          <img src="../assets/qr sem seta.svg" alt="QR Code" />
        </div>
      </section>
</template>

<style>
  .title-b {
    position: relative;
    font-size: 72px;
    letter-spacing: -0.03em;
    line-height: 120%;
    display: inline-block;
    font-family: Inter;
    color: #fff;
    text-align: center;
  }
  
  .subtitle-b {
    width: 753px;
    position: relative;
    font-size: 32px;
    line-height: 120%;
    font-family: Inter;
    color: #fff;
    text-align: left;
    display: flex;
    align-items: center;
  }
  .Doacao {
    display: flex;
    margin-top: 5rem;
    justify-content: space-around;
    align-items: center;
    background-color: #2e2e81;
    padding: 2rem 4rem;
  }
.direita img {
width: 100%;
}
.Sobre {
display: flex;
margin-top: 5rem;
padding: 0 4rem;
justify-content: space-around;
align-items: center;
}
.esquerda {
width: 50%;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: start;
gap: 1rem;
}
.title-a {
position: relative;
font-size: 72px;
letter-spacing: -0.03em;
line-height: 120%;
display: inline-block;
font-family: Inter;
color: #373737;
text-align: center;
}
.btn-branco {
    color: #011927;
    background-color: #fff;
    padding: 0.5rem 0.9rem;
    border-radius: 1.5rem;
    cursor: pointer;
  }
  
  .btn-branco:hover {
    color: #011927;
    background-color: #fff;
  }
.direita-qr {
width: 30%;
display: flex;
align-items: center;
justify-content: center;
}

.direita-qr img {
width: 75%;
}

.direita {
width: 30%;
}

.direita img {
width: 100%;
}

.direita-qr {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .direita-qr img {
    width: 75%;
  }
</style>