import { apiFetch } from "../api/apiClient.js";

export function listarEspecialidades() {
    return apiFetch("/api/especialidades");
}

export function obtenerEspecialidad(id) {
    return apiFetch(`/api/especialidades/${id}`);
}

export function productosPorEspecialidad(id) {
    return apiFetch(`/api/especialidades/${id}/productos`);
}
