<template>
  <div class="xestion-tarefas">
   <!-- <h3 v-if="usuarioStore.id"> -->
    <h3 v-if="usuario">
    <!--  📝  Código Usuario: {{ usuarioStore.id }} === Tarefas de {{ usuarioStore.nome }} -->  
      📝  Código Usuario: {{ usuario.id }} === Tarefas de {{ usuario.nome }} 
    </h3>

    <p v-else>Non hai usuario seleccionado</p>

    <!-- FORMULARIO NOVA TAREFA -->
    <form @submit.prevent="engadirTarefa" class="form-tarefa">
      <input v-model="novaTarefa.dataLimite" type="date" required />

      <textarea
        v-model="novaTarefa.titulo"
        placeholder="Título ou descrición da tarefa"
        maxlength="256"
        rows="3"
        required
      ></textarea>

      <button type="submit">Grabar tarefa</button>
    </form>

    <!-- LISTAXE DE TAREFAS -->
    <p v-if="tarefas.length === 0">Este usuario non ten tarefas asignadas.</p>

    <table v-else>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tarefa</th>
          <th>Data límite</th>
          <th>Estado</th>
          <th>Accións</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(t, index) in tarefas" :key="index">
          <td style="text-align: center">{{ index + 1 }}</td>
          <td>{{ t.titulo }}</td>
          <td style="text-align: center">{{ t.dataLimite }}</td>
          <td style="text-align: center">
            {{ t.completada ? "✅" : "❌" }}
          </td>
          <td style="text-align: center">
            <button @click="completarTarefa(index)" :disabled="t.completada">
              ✔️
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { useUsuarioStore } from "../store/usuarioStore.js";
import { useRoute } from "vue-router";
import { watch } from "vue";

const route = useRoute();

const API_URL = import.meta.env.VITE_API_URL;
// Estes datos virán do store ou das peticións HTTP na UD4

const usuario = ref(null); // Ex: { id: 3, nome: 'María' }
const tarefas = ref([]);

// Instanciamos a store de usuario
const usuarioStore = useUsuarioStore();

// Nova tarefa
const novaTarefa = ref({
  titulo: "",
  dataLimite: "",
});

// Watch para cargar datos do usuario ao cambiar a ruta
watch(() => route.params.id,
  async (idUsuario) => {
    if (!idUsuario) return;

    try {
      // Cargar o usuario
      const resUsuario = await axios.get(
        `${API_URL}/usuarios/${idUsuario}`
      );

      usuario.value = {
        id: resUsuario.data.id,
        nome: resUsuario.data.nome,
      };

      // Cargar tarefas do usuario
      const resTarefas = await axios.get(
        `${API_URL}/tarefas?usuarioId=${idUsuario}`
      );
      tarefas.value = resTarefas.data;

    } catch (error) {
      console.error("Erro ao cargar datos", error);
    }
  },
  // Opcional: cargar inmediatamente ao montar o compoñente
  { immediate: true }
);
/*
// Cargar Tarefas do usuario seleccionado
onMounted(async () => {
  // Aquí faríamos unha petición HTTP para obter as tarefas do usuario
  if (!usuarioStore.id) return;
  
  // esto podría facerse ou directamente desde a store ou ben con computed
  usuario.value = {
    id: usuarioStore.id,
    nome: usuarioStore.nome,
  };

  // Petición HTTP para obter as tarefas do usuario seleccionado
  try{
    const res = await axios.get(
      `${API_URL}/tarefas?usuarioId=${usuario.value.id}`
    );
    tarefas.value = res.data;
  } catch (error) {
    console.error("Erro ao cargar as tarefas:", error
    )
  }
});

// Limpar datos ao desmontar o compoñente
  onUnmounted(() => {
    usuarioStore.limparUsuario();
    tarefas.value = [];
  });

*/
// Crear tarefa (POST máis adiante con axios)
async function engadirTarefa() {
  try {
    // Construír obxecto nova tarefa
    const nova = {
      titulo: novaTarefa.value.titulo,
      dataLimite: novaTarefa.value.dataLimite,
      completada: false,
      usuarioId: usuarioStore.id,
      usuarioNome: usuarioStore.nome,
    };
    // Petición POST para gardar a nova tarefa
    const res = await axios.post(`${API_URL}/tarefas`, nova);
    // Engadir a tarefa á lista local e cargue a taboa
    tarefas.value.push(res.data);

    novaTarefa.value.titulo = "";
    novaTarefa.value.dataLimite = "";
  } catch (error) {
    console.error("Erro ao gardar tarefa", error);
  }
}

// Marcar tarefa como completada (PUT máis adiante)
async function completarTarefa(index) {
  const tarefa = tarefas.value[index];

  try {
    const res = await axios.patch(
      `${API_URL}/tarefas/${tarefa.id}`,
      { completada: true }
    );

    tarefas.value[index] = res.data;
  } catch (error) {
    console.error("Erro ao actualizar tarefa", error);
  }
}

</script>

<style scoped>
.xestion-tarefas {
  width: 80vw;
  max-width: 1000px;
  background: white;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-tarefa {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 60%;
  margin: 0 auto;   /* centra o formulario */
}


.form-tarefa textarea {
  resize: vertical;
  padding: 0.5rem;
  border: 1px solid #ddd;
}

.form-tarefa input {
  padding: 0.4rem;
  text-align: center;
  border: 1px solid #ddd;
  width: 200px;

}
.form-tarefa textarea {
  width: 100%;
}

.form-tarefa button {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  cursor: pointer;
  align-self: center;   /* centra o botón */
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th,
td {
  border: 1px solid #ddd;
  padding: 0.7rem;
}

th {
  background-color: #f8f9fa;
  text-align: center;
}

h4 {
  margin-bottom: 1rem;
  background-color: #73aff0;
  color: white;
  padding: 0.5rem;
}
</style>
