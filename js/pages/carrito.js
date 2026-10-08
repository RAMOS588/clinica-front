import "../components/navbar.js";
import { registrarCita } from "../services/citaService.js";
import { listarProductos } from "../services/productoService.js";
import { listarMedicos } from "../services/medicoService.js";
import { listarSedes } from "../services/sedeService.js";
import { mostrarError } from "../components/alerta.js";
import { obtenerCarrito, eliminarItem, limpiarCarrito } from "../utils/storage.js";
import { formatearPrecio } from "../utils/formato.js";

const listaCarrito = document.getElementById("listaCarrito");
const formCita = document.getElementById("formCita");
const mensaje = document.getElementById("mensajeCita");
const selectProducto = document.getElementById("selectProducto");
const selectMedico = document.getElementById("selectMedico");
const selectSede = document.getElementById("selectSede");

function renderizarCarrito() {
    const carrito = obtenerCarrito();

    if (!carrito.length) {
        listaCarrito.innerHTML = `<p class="alerta alerta-vacio">Tu carrito está vacío.</p>`;
        return;
    }

    listaCarrito.innerHTML = carrito.map(item => `
        <div class="item-carrito">
            <div>
                <strong>${item.nombre}</strong>
                <p>${formatearPrecio(item.precioOferta > 0 ? item.precioOferta : item.precio)}</p>
            </div>
            <button data-id="${item.id}" class="btn-eliminar">Eliminar</button>
        </div>
    `).join("");

    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", () => {
            eliminarItem(Number(btn.dataset.id));
            renderizarCarrito();
        });
    });
}

async function cargarSelects() {
    try {
        const [productos, medicos, sedes] = await Promise.all([
            listarProductos(),
            listarMedicos(),
            listarSedes()
        ]);

        productos.forEach(p => {
            selectProducto.innerHTML += `<option value="${p.id}">${p.nombre}</option>`;
        });
        medicos.forEach(m => {
            selectMedico.innerHTML += `<option value="${m.id}">${m.nombres} ${m.apellidos}</option>`;
        });
        sedes.forEach(s => {
            selectSede.innerHTML += `<option value="${s.id}">${s.nombre}</option>`;
        });
    } catch (error) {
        mostrarError(mensaje, error.message);
    }
}

formCita.addEventListener("submit", async (event) => {
    event.preventDefault();

    mensaje.innerHTML = `<p class="info">Enviando solicitud...</p>`;

    const datos = {
        pacienteNombre: formCita.nombre.value.trim(),
        pacienteDocumento: formCita.documento.value.trim(),
        pacienteTelefono: formCita.telefono.value.trim(),
        productoId: Number(formCita.productoId.value),
        medicoId: Number(formCita.medicoId.value),
        sedeId: Number(formCita.sedeId.value),
        fecha: formCita.fecha.value,
        hora: formCita.hora.value
    };

    try {
        const respuesta = await registrarCita(datos);

        mensaje.innerHTML = `
            <div class="alerta alerta-exito">
                <strong>Cita registrada correctamente.</strong>
                <p>Estado: ${respuesta.estado}</p>
                <p>Fecha: ${respuesta.fecha} a las ${respuesta.hora}</p>
            </div>
        `;
        limpiarCarrito();
        renderizarCarrito();
    } catch (error) {
        mensaje.innerHTML = `
            <div class="alerta alerta-error">
                <strong>No se pudo registrar la cita.</strong>
                <p>${error.message}</p>
            </div>
        `;
    }
});

renderizarCarrito();
cargarSelects();