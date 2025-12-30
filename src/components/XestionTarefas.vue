<template>
  <div class="xestion-tarefas">
    <h4>📝 Tarefas de {{ usuario?.nome || '---' }}</h4>

    <!-- Mensaxes segundo estado -->
    <p v-if="!usuario">Selecciona un usuario para ver as súas tarefas.</p>
    <p v-else-if="!tarefas || tarefas.length === 0">Este usuario non ten tarefas asignadas.</p>

    <!-- Táboa de tarefas -->
    <table v-else>
      <thead>
        <tr>
          <th>#</th>
          <th>Tarefa</th>
          <th>Data límite</th>
          <th>Estado</th>
          <th>Accións</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(t, index) in tarefas" :key="index">
          <td style="text-align: center;">{{ index + 1 }}</td>
          <td style="text-align: center;">{{ t.titulo }}</td>
          <td style="text-align: center;">{{ t.dataLimite }}</td>
          <td style="text-align: center">{{ t.completada ? '✅' : '❌' }}</td>
          <!-- Botón para completar tarefa -->
          <td style="text-align: center;">
            <button 
              @click="completarTarefa(index)" 
              :disabled="t.completada"
            >
              ✔️
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Datos que se rellenarán desde json-server vía store o peticiones HTTP
const usuario = ref(null)
const tarefas = ref([])

// Función para marcar una tarefa como completada
function completarTarefa(index) {
  if (tarefas.value[index]) {
    tarefas.value[index].completada = true
    // Aquí después se podría hacer PUT con axios para actualizar json-server
  }
}
</script>

<style scoped>
.xestion-tarefas {
  width: 80vw;
  max-width: 1200px;
  background: white;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  border: 1px solid #ddd;
  padding: 0.7rem;
  text-align: left;
}

th {
  background-color: #f8f9fa;
  text-align: center;
}

h4 {
  margin-bottom: 1rem;
  font-weight: 600;
  background-color: #73aff0;
  color: white;
  padding: 0.5rem;
}
</style>
