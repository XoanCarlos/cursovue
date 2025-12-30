<template>
  <div id="app">
    <NavBar />
      <!-- Cargamos o xestor de rutas-->
     <main  >
        <router-view />
     </main>  
    <FooTer />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import FooTer from './components/FooTer.vue'
</script>

<style>
body {
  margin: 0;
  background: #f6f6f6;
}

#app { width: 80%;  margin: 0 auto;}

.navbar,
.footer {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  z-index: 1000;
}

.navbar {top: 0; }

.footer {bottom: 0; }

main { margin-top: 30px; margin-bottom: 30px; }
</style>