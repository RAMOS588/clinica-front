import "../components/navbar.js";
import { listarProductos } from "../services/productoService.js";
import { listarEspecialidades } from "../services/especialidadService.js";
import { listarPromociones } from "../services/promocionService.js";
import { crearCardProducto } from "../components/cardProducto.js";
import { mostrarLoader } from "../components/loader.js";
import { mostrarError, mostrarVacio } from "../components/alerta.js";
import { formatearPrecio, formatearFecha } from "../utils/formato.js";

const contEspecialidades = document.getElementById("especialidadesDestacadas");
const contPromociones = document.getElementById("promocionesVigentes");
const contProductos = document.getElementById("productosDestacados");

async function cargarEspecialidades() {
    mostrarLoader(contEspecialidades);
    try {
        const especialidades = await listarEspecialidades();
        if (!especialidades.length) {
            mostrarVacio(contEspecialidades);
            return;
        }

        contEspecialidades.innerHTML = especialidades.map(e => `
            <div class="card-producto">
                <img src="${e.iconoUrl}" alt="${e.nombre}">
                <h3>${e.nombre}</h3>
                <p>${e.descripcion}</p>
            </div>
        `).join("");
    } catch (error) {
        mostrarError(contEspecialidades, error.message);
    }
}

async function cargarPromociones() {
    mostrarLoader(contPromociones);
    try {
        const promociones = await listarPromociones(true);
        if (!promociones.length) {
            mostrarVacio(contPromociones, "No hay promociones vigentes.");
            return;
        }

        contPromociones.innerHTML = promociones.map(p => `
            <div class="card-producto">
                <h3>${p.titulo}</h3>
                <p>${p.descripcion}</p>
                <p class="precio"><strong>${formatearPrecio(p.precioOferta)}</strong></p>
                <p><small>Válido hasta: ${formatearFecha(p.fechaFin)}</small></p>
            </div>
        `).join("");
    } catch (error) {
        mostrarError(contPromociones, error.message);
    }
}

async function cargarProductos() {
    mostrarLoader(contProductos);
    try {
        const productos = await listarProductos();
        if (!productos.length) {
            mostrarVacio(contProductos);
            return;
        }

        contProductos.innerHTML = productos
            .slice(0, 4)
            .map(crearCardProducto)
            .join("");
    } catch (error) {
        mostrarError(contProductos, error.message);
    }
}

cargarEspecialidades();
cargarPromociones();
cargarProductos();