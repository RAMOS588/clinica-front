const CLAVE_CARRITO = "carrito";

export function obtenerCarrito() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
    } catch {
        return [];
    }
}

export function guardarCarrito(items) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
}

export function agregarItem(item) {
    const carrito = obtenerCarrito();
    carrito.push(item);
    guardarCarrito(carrito);
}

export function eliminarItem(id) {
    const carrito = obtenerCarrito().filter(i => i.id !== id);
    guardarCarrito(carrito);
}

export function limpiarCarrito() {
    localStorage.removeItem(CLAVE_CARRITO);
}