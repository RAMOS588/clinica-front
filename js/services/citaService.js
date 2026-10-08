import { apiFetch } from "../api/apiClient.js";

export function listarCitasPorDocumento(documento) {
    return apiFetch(`/api/citas?documento=${encodeURIComponent(documento)}`);
}

export function registrarCita(datos) {
    return apiFetch("/api/citas", {
        method: "POST",
        body: JSON.stringify(datos)
    });
}
