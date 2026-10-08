export function formatearPrecio(valor) {
    if (valor == null) return "S/ 0.00";
    return `S/ ${Number(valor).toFixed(2)}`;
}

export function formatearFecha(fechaISO) {
    if (!fechaISO) return "";
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}
