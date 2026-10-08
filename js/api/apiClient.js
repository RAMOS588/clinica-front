const BASE_URL = "https://clinica-5c0f.onrender.com";

/**
 * Realiza una petición HTTP a la API.
 * @param {string} endpoint - Ruta relativa, ej: "/api/productos"
 * @param {object} options - Opciones de fetch (method, body, headers)
 * @returns {Promise<any>} - Datos JSON de la respuesta
 */
export async function apiFetch(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;

    const config = {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        ...options
    };

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);
        config.signal = controller.signal;

        const response = await fetch(url, config);
        clearTimeout(timeoutId);

        if (!response.ok) {
            let mensaje = `Error ${response.status}`;

            try {
                const errorJson = await response.json();
                mensaje = errorJson.mensaje || errorJson.error || mensaje;
            } catch {
                // La respuesta no era JSON
            }

            if (response.status === 404) {
                throw new Error(`Recurso no encontrado: ${mensaje}`);
            }
            if (response.status === 400) {
                throw new Error(`Solicitud inválida: ${mensaje}`);
            }
            if (response.status >= 500) {
                throw new Error("El servidor presentó un problema. Intenta más tarde.");
            }

            throw new Error(mensaje);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        if (error.name === "AbortError") {
            throw new Error("La solicitud tardó demasiado. Verifica tu conexión.");
        }
        if (error.message === "Failed to fetch") {
            throw new Error("No se pudo conectar con el servidor. Revisa tu conexión a internet.");
        }
        throw error;
    }
}