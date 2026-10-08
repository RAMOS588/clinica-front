export function mostrarError(contenedor, mensaje) {
    contenedor.innerHTML = `
        <div class="alerta alerta-error">
            <strong>Ocurrió un problema:</strong>
            <p>${mensaje}</p>
            <button onclick="location.reload()">Reintentar</button>
        </div>
    `;
}

export function mostrarVacio(contenedor, mensaje = "No se encontraron resultados.") {
    contenedor.innerHTML = `
        <div class="alerta alerta-vacio">
            <p>${mensaje}</p>
        </div>
    `;
}

export function mostrarExito(contenedor, mensaje) {
    contenedor.innerHTML = `
        <div class="alerta alerta-exito">
            <p>${mensaje}</p>
        </div>
    `;
}
