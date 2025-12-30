<template>
  <nav class="navbar">
    <div class="logo">XestiónApp</div>
    <ul class="menu">
      <li><RouterLink to="/">Inicio</RouterLink></li>
      <li><RouterLink to="/usuarios">Usuarios</RouterLink></li>
      <li><RouterLink to="/tarefas">Tarefas</RouterLink></li>
      <li><RouterLink to="/sobrenos">Sobre nós</RouterLink></li>
    </ul>
  </nav>
</template>

<script setup></script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.1rem 6rem;
  background: #1b4965;
  color: white;
}
.logo {
  font-weight: bold;
  font-size: 1rem;
}
.menu {
  display: flex;
  gap: 0.8rem  ;
  list-style: none;
}
.menu a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}
.menu a.router-link-active {
  border-bottom: 0.2rem solid #ffe66d;
}
</style>
