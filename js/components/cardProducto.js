import { formatearPrecio } from "../utils/formato.js";

export function crearCardProducto(producto) {
    const precioHTML = producto.precioOferta > 0
        ? `<span class="tachado">${formatearPrecio(producto.precio)}</span>
           <strong>${formatearPrecio(producto.precioOferta)}</strong>`
        : `<strong>${formatearPrecio(producto.precio)}</strong>`;

    return `
        <article class="card-producto">
            <img src="${producto.imagenUrl}" alt="${producto.nombre}" loading="lazy">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p class="precio">${precioHTML}</p>
            <a href="detalle.html?id=${producto.id}">Ver detalle</a>
            <button data-id="${producto.id}" class="btn-agregar">Agregar al carrito</button>
        </article>
    `;
}