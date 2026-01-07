// ----------------------------------
// Servidor para simular unha API REST con json-server que Inclúe Express para control do servidor 
// e CORS para permitir peticións desde o frontend (Vite/localhost)
// ----------------------------------

import express from 'express';              // Importamos Express
import cors from 'cors';                    // Importamos CORS
import jsonServer from 'json-server';       // Importamos json-server
import { dirname, join } from 'path';       // Importamos utilidades de path
import { fileURLToPath } from 'url';        // Importamos fileURLToPath para obter __dirname

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()                        // Creamos a aplicación Express
const PORT = 3000                            // Porto no que correrá o servidor

// ---------------------------------------------------
// Middlewares
// ---------------------------------------------------
app.use(cors())                              // Permite peticións de calquera orixe (CORS) evitando problemas co frontend

// Creamos un router de json-server apuntando ao ficheiro db.json
const router = jsonServer.router(join(__dirname, '..', 'db', 'db.json'))

// Podemos engadir middlewares de json-server se queremos (logs, retrasos, etc.)
app.use(jsonServer.defaults())               // Middlewares por defecto (logger, static files...)

app.use('/api', router)           // Todas as rutas da API estarán baixo /api  // /api é só o “nome da ruta pública”. 
                                  // Non ten que coincidir coa estrutura de carpetas do backend, 
                                  // é máis unha convención para organizar as URLs do teu API.
                             

// GET    http://localhost:3000/api/usuarios
// POST   http://localhost:3000/api/usuarios
// PUT    http://localhost:3000/api/usuarios/1
// DELETE http://localhost:3000/api/usuarios/1

// ---------------------------------------------------
// Arranque do servidor
// ---------------------------------------------------
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`)
})