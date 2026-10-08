import { apiFetch } from "../api/apiClient.js";

export function listarPromociones(vigente = false) {
    const query = vigente ? "?vigente=true" : "";
    return apiFetch(`/api/promociones${query}`);
}

export function obtenerPromocion(id) {
    return apiFetch(`/api/promociones/${id}`);
}
