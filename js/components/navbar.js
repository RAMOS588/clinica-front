export function renderizarNavbar() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    navbar.innerHTML = `
        <div class="logo">
            <a href="index.html"><strong>Vitalis Web</strong></a>
        </div>
        <nav>
            <a href="index.html">Inicio</a>
            <a href="catalogo.html">Catálogo</a>
            <a href="especialidades.html">Especialidades</a>
            <a href="medicos.html">Médicos</a>
            <a href="sedes.html">Sedes</a>
            <a href="promociones.html">Promociones</a>
            <a href="carrito.html">Carrito</a>
        </nav>
    `;
}

// Se ejecuta automáticamente al importar el módulo
renderizarNavbar();
