import "../components/navbar.js";
import { obtenerProducto } from "../services/productoService.js";
import { listarMedicos } from "../services/medicoService.js";
import { listarSedes } from "../services/sedeService.js";
import { mostrarLoader } from "../components/loader.js";
import { mostrarError } from "../components/alerta.js";
import { formatearPrecio } from "../utils/formato.js";

const contenedor = document.getElementById("detalleProducto");
const id = new URLSearchParams(location.search).get("id");

async function cargarDetalle() {
    if (!id) {
        mostrarError(contenedor, "No se especificó un servicio.");
        return;
    }

    mostrarLoader(contenedor, "Cargando detalle del servicio...");

    try {
        const [producto, medicos, sedes] = await Promise.all([
            obtenerProducto(id),
            listarMedicos(),
            listarSedes()
        ]);

        const medicosDelServicio = medicos.filter(m =>
            producto.medicoIds?.includes(m.id)
        );

        const sedesDelServicio = sedes.filter(s =>
            producto.sedeIds?.includes(s.id)
        );

        const precioHTML = producto.precioOferta > 0
            ? `<span class="tachado">${formatearPrecio(producto.precio)}</span>
               <strong>${formatearPrecio(producto.precioOferta)}</strong>`
            : `<strong>${formatearPrecio(producto.precio)}</strong>`;

        contenedor.innerHTML = `
            <h1>${producto.nombre}</h1>
            <img src="${producto.imagenUrl}" alt="${producto.nombre}">
            <p>${producto.descripcion}</p>
            <p class="precio">${precioHTML}</p>
            <p><strong>Duración:</strong> ${producto.duracionMinutos} minutos</p>
            <p><strong>Incluye:</strong> ${producto.incluye}</p>
            <p><strong>Preparación previa:</strong> ${producto.preparacionPrevia}</p>

            <h2>Médicos que lo brindan</h2>
            ${medicosDelServicio.length
                ? `<ul>${medicosDelServicio.map(m =>
                    `<li>${m.nombres} ${m.apellidos} — ${m.colegiatura}</li>`
                  ).join("")}</ul>`
                : `<p>No hay médicos asignados actualmente.</p>`}

            <h2>Sedes disponibles</h2>
            ${sedesDelServicio.length
                ? `<ul>${sedesDelServicio.map(s =>
                    `<li>${s.nombre} — ${s.distrito}</li>`
                  ).join("")}</ul>`
                : `<p>No hay sedes asignadas actualmente.</p>`}
        `;
    } catch (error) {
        mostrarError(contenedor, error.message);
    }
}

cargarDetalle();
