<script>
import Header from './../components/Header.vue'
import Footer from './../components/Footer.vue'
import Container from './../components/Container.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Footer,
    Container
}
}
</script>

<template>
    <Header/>
    <Container/>
    <Footer/>
</template>

<style scoped>
</style>
