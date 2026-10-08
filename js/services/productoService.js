import { apiFetch } from "../api/apiClient.js";

export function listarProductos(filtros = {}) {
    const params = new URLSearchParams();

    if (filtros.q)              params.append("q", filtros.q);
    if (filtros.especialidadId) params.append("especialidadId", filtros.especialidadId);
    if (filtros.tipo)           params.append("tipo", filtros.tipo);

    const query = params.toString();
    return apiFetch(`/api/productos${query ? "?" + query : ""}`);
}

export function obtenerProducto(id) {
    return apiFetch(`/api/productos/${id}`);
}

export function crearProducto(datos) {
    return apiFetch("/api/productos", {
        method: "POST",
        body: JSON.stringify(datos)
    });
}
