<template>
      <section class="Noticias">
        <div class="esquerda">
          <h1 class="title-a">notícias</h1>
          <section>
            <div class="subtitle-a">
              Mantenha-se atualizado com as notícias mais recentes sobre
              campanhas em andamento e novas oportunidades de estágio,
              conectando-se ainda mais à comunidade Alumni.
            </div>
          </section>
        </div>
        <div class="card_container">
          <div class="cardNoticias">
            <h4 style="line-height: normal">Novo Programa de Mentoria Lançado</h4>
            <p style="line-height: normal">
              A UFC acaba de lançar um programa de mentoria que conecta
              ex-alunos com atuais estudantes, visando impulsionar suas
              carreiras.
            </p>
            <a class="cadastro">Ler mais</a>
          </div>
        </div>
      </section>
</template>

<style>
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
  .Noticias {
    width: 90vw;

    display: flex;
    margin-top: 5rem;
    justify-content: space-around;
    align-items: center;
    padding: 2rem 4rem;
  }
  .cardNoticias {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    width: 440px;
    background-color: #fff;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: 1px solid #d9d9d9;
  }
  .cardNoticias h4 {
    font-size: 2rem;
    color: black;
  }
  
  .cardNoticias p {
    color: #757575;
  }
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
  width: 90.5vw;
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
    width: 90.54vw;

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