<template>
          <section class="Sobre">
        <div class="esquerda">
          <h1 class="title-a">sobre</h1>
          <section>
            <p class="subtitle-a">
              O projeto Alumni surge com o objetivo de permitir uma maior
              <span class="texto-laranja">conexão entre alunos</span>
              e <span class="texto-laranja">ex-alunos</span>, possibilitando uma
              relação benéfica para ambos. Se você é um aluno em busca de
              oportunidades, está no lugar certo, e se você é um ex-aluno
              disposto a ajudar, aqui também é pra você!
            </p>
          </section>
          <button class="btn-azul">Ler mais</button>
        </div>
        <div class="direita">
          <img
            src="../assets/egressa feliz.svg"
            alt="Pessoa formada feliz"
          />
        </div>
      </section>
</template>

<style>
  .direita img {
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
  .btn-azul {
    color: #fff;
    background-color: #2e2e81;
    padding: 0.5rem 0.9rem;
    border-radius: 1.5rem;
    cursor: pointer;
  }
  
  .btn-azul:hover {
    color: #fff;
    background-color: #011927;
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
  </style>