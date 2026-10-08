import "../components/navbar.js";
import { listarMedicos } from "../services/medicoService.js";
import { listarEspecialidades } from "../services/especialidadService.js";
import { mostrarLoader } from "../components/loader.js";
import { mostrarError, mostrarVacio } from "../components/alerta.js";

const contenedor = document.getElementById("listaMedicos");
const filtro = document.getElementById("filtroEspecialidadMedicos");

async function cargarEspecialidadesFiltro() {
    try {
        const especialidades = await listarEspecialidades();
        especialidades.forEach(e => {
            filtro.innerHTML += `<option value="${e.id}">${e.nombre}</option>`;
        });
    } catch (error) {
        mostrarError(filtro, error.message);
    }
}

async function cargarMedicos(especialidadId = "") {
    mostrarLoader(contenedor);

    try {
        const medicos = await listarMedicos(especialidadId || undefined);

        if (!medicos.length) {
            mostrarVacio(contenedor, "No hay médicos registrados para esa especialidad.");
            return;
        }

        contenedor.innerHTML = medicos.map(m => `
            <div class="card-producto">
                <img src="${m.fotoUrl}" alt="${m.nombres}">
                <h3>${m.nombres} ${m.apellidos}</h3>
                <p><strong>Colegiatura:</strong> ${m.colegiatura}</p>
                <p><strong>Experiencia:</strong> ${m.experienciaAnios} años</p>
            </div>
        `).join("");
    } catch (error) {
        mostrarError(contenedor, error.message);
    }
}

filtro.addEventListener("change", () => cargarMedicos(filtro.value));

cargarEspecialidadesFiltro();
cargarMedicos();