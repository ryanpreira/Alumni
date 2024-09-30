<template>
    <main>
      <div class="voltar">
        <router-link to="/inicio"><img src="../assets/arrow_back.svg" alt="voltar" /></router-link>
        <h1>Voltar</h1>
      </div>

      <section class="Sobre">
        <div class="esquerda">
          <h1 class="title-a">doação</h1>
          <section>
            <p class="subtitle-a">
              A Universidade Federal do Ceará reconhece os desafios enfrentados
              pelos estudantes para manter a vida acadêmica. Dito isso, o
              Projeto Alumni surge como uma iniciativa para
              <span class="texto-laranja">impactar positivamente</span> o
              cotidiano do universitário. A ideia é oferecer suporte aos alunos,
              permitindo que eles dêem início à construção de suas carreiras.<br /><br />
              Inspirado em programas bem-sucedidos em instituições de renome,
              como Harvard e Unicamp, o Projeto Alumni busca estabelecer uma
              <span class="texto-laranja">rede sólida de apoio</span>,
              conectando graduados e graduandos em uma relação de cooperação
              mútua.<br /><br />
              Nossa missão é criar um ciclo virtuoso de apoio, onde
              <span class="texto-laranja"
                >os beneficiados de hoje possam se tornar os apoiadores de
                amanhã</span
              >, fortalecendo cada vez mais a comunidade acadêmica de Quixadá.
            </p>
          </section>
        </div>
        <div class="direita">
          <img
            src="../assets/qr-azul.png"
            alt="Pessoa formada feliz"
          />
        </div>
      </section>
      <div class="colagem-doao-1"></div>
    </main>
</template>

<style>
  .voltar {
    padding: 30px;
    display: flex;
    align-items: center;
  }
  
  .voltar img {
    width: 20px;
    height: auto;
  }
  
  .voltar h1 {
    color: #757575;
    font-size: 1.4rem;
    font-weight: 200;
    margin-left: 0.8rem;
  }
</style>