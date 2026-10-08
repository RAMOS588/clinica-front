import { apiFetch } from "../api/apiClient.js";

export function listarMedicos(especialidadId) {
    const query = especialidadId ? `?especialidadId=${especialidadId}` : "";
    return apiFetch(`/api/medicos${query}`);
}

export function obtenerMedico(id) {
    return apiFetch(`/api/medicos/${id}`);
}