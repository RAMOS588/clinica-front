import "../components/navbar.js";
import { listarEspecialidades } from "../services/especialidadService.js";
import { mostrarLoader } from "../components/loader.js";
import { mostrarError, mostrarVacio } from "../components/alerta.js";

const contenedor = document.getElementById("listaEspecialidades");

async function cargarEspecialidades() {
    mostrarLoader(contenedor);

    try {
        const especialidades = await listarEspecialidades();

        if (!especialidades.length) {
            mostrarVacio(contenedor, "No hay especialidades registradas.");
            return;
        }

        contenedor.innerHTML = especialidades.map(e => `
            <div class="card-producto">
                <img src="${e.iconoUrl}" alt="${e.nombre}">
                <h3>${e.nombre}</h3>
                <p>${e.descripcion}</p>
                <a href="catalogo.html?especialidadId=${e.id}">Ver servicios</a>
            </div>
        `).join("");
    } catch (error) {
        mostrarError(contenedor, error.message);
    }
}

cargarEspecialidades();
