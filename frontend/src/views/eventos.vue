<script>
import HeaderVar from '../components/HeaderVar.vue';
import Footer from './../components/Footer.vue'
import criarEvento from './../components/criarEvento.vue'

export default {
  name: 'Eventos',
  components: {
    HeaderVar,
    criarEvento,
    Footer,
    }
}
</script>

<template>
    <HeaderVar/>
    <criarEvento></criarEvento>
    <Footer></Footer>
</template>

<style scoped>
</style>
