export function mostrarLoader(contenedor, mensaje = "Cargando información...") {
    contenedor.innerHTML = `
        <div class="loader">
            <div class="spinner"></div>
            <p>${mensaje}</p>
        </div>
    `;
}
