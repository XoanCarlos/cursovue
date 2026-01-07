<template>
  <div class="xestion-usuarios">
    <h4>👥 Xestión de usuarios</h4>
    <form @submit.prevent="gardarUsuario">
      <div class="fila">
        <div class="campo campo-dni">
          <label>DNI/CIF:</label>
          <input
            v-model="novoUsuario.dni"
            type="text"
            required
            style="text-align: center"
          />
        </div>
        <div class="campo campo-nome">
          <label>Nome:</label>
          <input v-model="novoUsuario.nome" type="text" required />
        </div>
      </div>
      <div class="fila">
        <div class="campo campo-correo">
          <label>Correo:</label>
          <input v-model="novoUsuario.correo" type="email" required />
        </div>
        <div class="campo campo-provincia">
          <label>Provincia:</label>
          <select v-model="novoUsuario.provincia">
            <option value="">-- Escolle unha provincia --</option>
            <option>A Coruña</option>
            <option>Lugo</option>
            <option>Ourense</option>
            <option>Pontevedra</option>
          </select>
        </div>
      </div>
      <div class="fila fila-centrada">
        <div class="campo inline-activo">
          <label>Activo:</label>
          <div class="inline-control">
            <input v-model="novoUsuario.activo" type="checkbox" />
            <span>Activo</span>
          </div>
        </div>
        <div class="campo inline-cuenta">
          <label>Tipo de conta:</label>
          <div class="inline-control radios">
            <label>
              <input
                v-model="novoUsuario.tipoCuenta"
                type="radio"
                value="particular"
              />
              <span>Particular</span>
            </label>
            <label>
              <input
                v-model="novoUsuario.tipoCuenta"
                type="radio"
                value="empresa"
              />
              <span>Empresa</span>
            </label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="btn-guardar"
        :disabled="novoUsuario.dni === '' || novoUsuario.nome === ''"
      >
        Gardar
      </button>
    </form>

    <h4>📋 Listaxe de usuarios</h4>
    <table v-if="usuarios.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>DNI/CIF</th>
          <th>Nome</th>
          <th>Correo</th>
          <th>Provincia</th>
          <th>Activo</th>
          <th>Tipo de conta</th>
          <th>Accións</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(u, index) in usuarios" :key="index">
          <td>{{ index + 1 }}</td>
          <td style="text-align: center">{{ u.dni }}</td>
          <td>{{ u.nome }}</td>
          <td>{{ u.correo }}</td>
          <td>{{ u.provincia }}</td>
          <td style="text-align: center">{{ u.activo ? "✅" : "❌" }}</td>
          <td>{{ u.tipoCuenta }}</td>
          <td style="text-align: center">
            <button @click="editarUsuario(index)" title="Editar">✏️</button>
            <button @click="eliminarUsuario(index)" title="Eliminar">🗑️</button>
            <router-link
              :to="{ name: 'xestionTarefas', params: { id: u.id } }"
              class="btn"
            >
              📝 Tarefas
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Non hai usuarios cargados.</p>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { useUsuarioStore } from "../store/usuarioStore.js";

// Instanciamos a store de usuario
const usuarioStore = useUsuarioStore();

//URL dende .env
const API_URL = import.meta.env.VITE_API_URL;

const usuarios = ref([]); // Array que se conectará co json-server

const novoUsuario = reactive({
  dni: "",
  nome: "",
  correo: "",
  provincia: "",
  activo: false,
  tipoCuenta: "",
});

const usuarioSeleccionado = ref(null);
const tarefasUsuario = ref([]);

onMounted(() => {
  cargarUsuarios();
});

// Funcion GARGAR USUARIOS
async function cargarUsuarios() {
  try {
    const res = await axios.get(`${API_URL}/usuarios`);
    usuarios.value = res.data;
  } catch (error) {
    console.error("Erro ao cargar usuarios", error);
  }
}

// CREAR OU MODIFICAR USUARIO

async function gardarUsuario() {
  try {
    if (usuarioSeleccionado.value) {
      await axios.put(`${API_URL}/usuarios/${usuarioSeleccionado.value.id}`, {
        ...novoUsuario,
      });
    } else {
      await axios.post(`${API_URL}/usuarios`, novoUsuario);
    }

    // Actualizamos no Store o estado do usuario seleccionado store ou o novo usuario
    usuarioStore.seleccionarUsuario(usuarioSeleccionado.value || novoUsuario);

    await cargarUsuarios();
    limparFormulario();
  } catch (error) {
    console.error("Erro ao gardar usuario", error);
  }
}

function eliminarUsuario(index) {
  const usuario = usuarios.value[index];
  axios
    .delete(`${API_URL}/usuarios/${usuario.id}`)
    .then(() => {
      cargarUsuarios();
      // Se o usuario eliminado era o seleccionado, limpamos o formulario e o Store
      if (
        usuarioSeleccionado.value &&
        usuarioSeleccionado.value.id === usuario.id
      ) {
        limparFormulario();
        usuarioStore.limparUsuario();
      }
    })
    .catch((error) => {
      console.error("Erro ao eliminar usuario", error);
    });
}

function editarUsuario(index) {
  const usuario = usuarios.value[index];
  Object.assign(novoUsuario, usuario); // Copiamos os datos do usuario ao formulario
  usuarioSeleccionado.value = usuario; // Marcamos o usuario como seleccionado para editar
  usuarioStore.seleccionarUsuario(usuario); // Actualizamos o Store co usuario seleccionado

  tarefasUsuario.value = []; // Sen tarefas de exemplo
}

// Limpar formulario
function limparFormulario() {
  novoUsuario.dni = "";
  novoUsuario.nome = "";
  novoUsuario.correo = "";
  novoUsuario.provincia = "";
  novoUsuario.activo = false;
  novoUsuario.tipoCuenta = "";
  usuarioSeleccionado.value = null;
  tarefasUsuario.value = [];
}
</script>

<style scoped>
/* Mantemos todo o CSS existente */
.xestion-usuarios {
  width: 100; /* ancho del contenedor */
  margin: 5px auto 2rem auto; /* 60px desde arriba para separar del navbar, centrado horizontalmente */
  background: #fff;
  padding: 2rem;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}
.fila {
  display: flex;
  gap: 1rem;
  width: 100%;
}
.fila-centrada {
  justify-content: center;
}
.campo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.campo-dni {
  flex: 1;
}
.campo-nome {
  flex: 3;
}
.campo-correo {
  flex: 2;
}
.campo-provincia {
  flex: 1;
}
.campo label {
  min-width: 80px;
  font-weight: 500;
}
.campo input,
.campo select {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0px;
  box-sizing: border-box;
}
.btn-guardar {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.4rem 1.5rem;
  cursor: pointer;
  margin: 0 auto;
  display: block;
}
.btn-guardar:hover {
  background-color: #0056b3;
}
table {
  width: 100%;
  border-collapse: separate;
  margin-top: 1rem;
  font-size: 0.8rem;
  border: 1px solid #ddd;
}
th,
td {
  border: 1px solid #ddd;
  padding: 0.7rem;
  text-align: left;
}
th {
  text-align: center;
  background-color: #f8f9fa;
}
h4 {
  margin-bottom: 1rem;
  font-weight: 600;
  background-color: #73aff0;
  color: white;
}
@media (max-width: 768px) {
  .fila {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
