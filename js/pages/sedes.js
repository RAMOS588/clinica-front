import "../components/navbar.js";
import { listarSedes } from "../services/sedeService.js";
import { mostrarLoader } from "../components/loader.js";
import { mostrarError, mostrarVacio } from "../components/alerta.js";

const contenedor = document.getElementById("listaSedes");

async function cargarSedes() {
    mostrarLoader(contenedor);

    try {
        const sedes = await listarSedes();

        if (!sedes.length) {
            mostrarVacio(contenedor, "No hay sedes registradas.");
            return;
        }

        contenedor.innerHTML = sedes.map(s => `
            <div class="card-producto">
                <h3>${s.nombre}</h3>
                <p><strong>Dirección:</strong> ${s.direccion}</p>
                <p><strong>Distrito:</strong> ${s.distrito}</p>
                <p><strong>Teléfono:</strong> ${s.telefono}</p>
                <p><strong>Horario:</strong> ${s.horarioAtencion}</p>
            </div>
        `).join("");
    } catch (error) {
        mostrarError(contenedor, error.message);
    }
}

cargarSedes();