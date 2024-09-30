<script>
import Footer from './../components/Footer.vue'
import Doacao from './../components/Doacao.vue';
import HeaderSite from './../components/HeaderSite.vue';

export default {
  name: 'Home',
  components: {
    HeaderSite,
    Doacao,
    Footer,
}
}
</script>

<template>
    <HeaderSite/>
    <Doacao/>
    <Footer/>
</template>

<style scoped>
</style>
