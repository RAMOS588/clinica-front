import "../components/navbar.js";
import { listarPromociones } from "../services/promocionService.js";
import { mostrarLoader } from "../components/loader.js";
import { mostrarError, mostrarVacio } from "../components/alerta.js";
import { formatearPrecio, formatearFecha } from "../utils/formato.js";

const contenedor = document.getElementById("listaPromociones");

async function cargarPromociones() {
    mostrarLoader(contenedor);

    try {
        const promociones = await listarPromociones(true);

        if (!promociones.length) {
            mostrarVacio(contenedor, "No hay promociones vigentes.");
            return;
        }

        contenedor.innerHTML = promociones.map(p => `
            <div class="card-producto">
                <h3>${p.titulo}</h3>
                <p>${p.descripcion}</p>
                <p class="precio"><strong>${formatearPrecio(p.precioOferta)}</strong></p>
                <p><small>Desde: ${formatearFecha(p.fechaInicio)}</small></p>
                <p><small>Hasta: ${formatearFecha(p.fechaFin)}</small></p>
            </div>
        `).join("");
    } catch (error) {
        mostrarError(contenedor, error.message);
    }
}

cargarPromociones();