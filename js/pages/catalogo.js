import "../components/navbar.js";
import { listarProductos } from "../services/productoService.js";
import { listarEspecialidades } from "../services/especialidadService.js";
import { listarSedes } from "../services/sedeService.js";
import { crearCardProducto } from "../components/cardProducto.js";
import { mostrarLoader } from "../components/loader.js";
import { mostrarError, mostrarVacio } from "../components/alerta.js";
import { agregarItem } from "../utils/storage.js";

const contenedor = document.getElementById("listaProductos");
const filtroEspecialidad = document.getElementById("filtroEspecialidad");
const filtroSede = document.getElementById("filtroSede");
const filtroTipo = document.getElementById("filtroTipo");
const inputBusqueda = document.getElementById("busqueda");

let productosCargados = [];

async function cargarFiltros() {
    try {
        const [especialidades, sedes] = await Promise.all([
            listarEspecialidades(),
            listarSedes()
        ]);

        especialidades.forEach(e => {
            filtroEspecialidad.innerHTML += `<option value="${e.id}">${e.nombre}</option>`;
        });

        sedes.forEach(s => {
            filtroSede.innerHTML += `<option value="${s.id}">${s.nombre}</option>`;
        });
    } catch (error) {
        mostrarError(filtroEspecialidad, error.message);
    }
}

async function cargarProductos(filtros = {}) {
    mostrarLoader(contenedor);

    try {
        const productos = await listarProductos(filtros);

        if (!productos || productos.length === 0) {
            mostrarVacio(contenedor, "No hay servicios que coincidan con tu búsqueda.");
            return;
        }

        productosCargados = productos;

        contenedor.innerHTML = productos.map(crearCardProducto).join("");

        document.querySelectorAll(".btn-agregar").forEach(btn => {
            btn.addEventListener("click", () => agregarAlCarrito(Number(btn.dataset.id)));
        });
    } catch (error) {
        mostrarError(contenedor, error.message);
    }
}

function agregarAlCarrito(id) {
    const producto = productosCargados.find(p => p.id === id);
    if (!producto) return;

    agregarItem(producto);
    alert(`"${producto.nombre}" se agregó al carrito.`);
}

let temporizador;
inputBusqueda.addEventListener("input", () => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => {
        cargarProductos({
            q: inputBusqueda.value.trim(),
            especialidadId: filtroEspecialidad.value,
            tipo: filtroTipo.value
        });
    }, 400);
});

filtroEspecialidad.addEventListener("change", () => {
    cargarProductos({
        q: inputBusqueda.value.trim(),
        especialidadId: filtroEspecialidad.value,
        tipo: filtroTipo.value
    });
});

filtroTipo.addEventListener("change", () => {
    cargarProductos({
        q: inputBusqueda.value.trim(),
        especialidadId: filtroEspecialidad.value,
        tipo: filtroTipo.value
    });
});

filtroSede.addEventListener("change", () => {
    cargarProductos({
        q: inputBusqueda.value.trim(),
        especialidadId: filtroEspecialidad.value,
        tipo: filtroTipo.value
    });
});

cargarFiltros();
cargarProductos();