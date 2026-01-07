import { defineStore } from "pinia";

// Definimos a store para xestionar o usuario seleccionado
export const useUsuarioStore = defineStore("usuario", {
// Estado inicial da store    
  state: () => ({
    id: null,
    nome: null,
  }),

 // Acciones para modificar o estado da store 
  actions: {
    seleccionarUsuario(usuario) {
      this.id = usuario.id;
      this.nome = usuario.nome;
    },

    limparUsuario() {
      this.id = null;
      this.nome = null;
    },
  },
});
