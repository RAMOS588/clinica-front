import { apiFetch } from "../api/apiClient.js";

export function listarSedes() {
    return apiFetch("/api/sedes");
}

export function obtenerSede(id) {
    return apiFetch(`/api/sedes/${id}`);
}
