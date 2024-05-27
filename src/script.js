document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('adquisicion-form')) {
        document.getElementById('adquisicion-form').addEventListener('submit', guardarAdquisicion);
    }

    if (document.getElementById('lista')) {
        mostrarAdquisiciones();
    }
});

let adquisicionEnEdicion = null;

function obtenerAdquisiciones() {
    let adquisiciones = JSON.parse(localStorage.getItem('adquisiciones')) || [];
    return adquisiciones;
}

function guardarAdquisicion(event) {
    event.preventDefault();
    
    const presupuesto = document.getElementById('presupuesto').value;
    const unidad = document.getElementById('unidad').value;
    const tipo = document.getElementById('tipo').value;
    const descripcion = document.getElementById('descripcion').value;
    const cantidad = document.getElementById('cantidad').value;
    const valorUnitario = document.getElementById('valorUnitario').value;
    const fecha = document.getElementById('fecha').value;
    const proveedor = document.getElementById('proveedor').value;
    const documentacion = document.getElementById('documentacion').value;
    
    const adquisicion = {
        id: Date.now(),
        presupuesto,
        unidad,
        tipo,
        descripcion,
        cantidad,
        valorUnitario,
        valorTotal: cantidad * valorUnitario,
        fecha,
        proveedor,
        documentacion,
        historial: []
    };

    let adquisiciones = obtenerAdquisiciones();
    adquisiciones.push(adquisicion);
    localStorage.setItem('adquisiciones', JSON.stringify(adquisiciones));
    
    mostrarAdquisiciones();
    mostrarMensajeExito('Adquisición guardada con éxito');
    limpiarFormulario();
}

function limpiarFormulario() {
    document.getElementById('presupuesto').value = '';
    document.getElementById('unidad').value = '';
    document.getElementById('tipo').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('valorUnitario').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('proveedor').value = '';
    document.getElementById('documentacion').value = '';
}


function mostrarMensajeExito(mensaje) {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = 'mensaje-exito';
    mensajeDiv.innerText = mensaje;
    document.body.appendChild(mensajeDiv);

    setTimeout(() => {
        mensajeDiv.remove();
    }, 3000);
}

function mostrarAdquisiciones() {
    const adquisiciones = obtenerAdquisiciones();
    const lista = document.getElementById('lista');
    lista.innerHTML = '';
    
    adquisiciones.forEach(adquisicion => {
        const div = document.createElement('div');
        div.className = 'adquisicion';
        div.innerHTML = `
            <p><strong>Presupuesto:</strong> ${adquisicion.presupuesto}</p>
            <p><strong>Unidad:</strong> ${adquisicion.unidad}</p>
            <p><strong>Tipo:</strong> ${adquisicion.tipo}</p>
            <p><strong>Descripción:</strong> ${adquisicion.descripcion}</p>
            <p><strong>Cantidad:</strong> ${adquisicion.cantidad}</p>
            <p><strong>Valor Unitario:</strong> ${adquisicion.valorUnitario}</p>
            <p><strong>Valor Total:</strong> ${adquisicion.valorTotal}</p>
            <p><strong>Fecha:</strong> ${adquisicion.fecha}</p>
            <p><strong>Proveedor:</strong> ${adquisicion.proveedor}</p>
            <p><strong>Documentación:</strong> ${adquisicion.documentacion}</p>
            <button onclick="editarAdquisicion(${adquisicion.id})">Editar</button>
            <button onclick="eliminarAdquisicion(${adquisicion.id})">Eliminar</button>
            <div class="historial">
                <strong>Historial de Cambios:</strong>
                ${adquisicion.historial.map(cambio => `<p>${cambio}</p>`).join('')}
            </div>
        `;
        lista.appendChild(div);
    });
}

function eliminarAdquisicion(id) {
    let adquisiciones = obtenerAdquisiciones();
    adquisiciones = adquisiciones.filter(adquisicion => adquisicion.id !== id);
    localStorage.setItem('adquisiciones', JSON.stringify(adquisiciones));
    mostrarAdquisiciones();
}

function editarAdquisicion(id) {
    const adquisiciones = obtenerAdquisiciones();
    const adquisicion = adquisiciones.find(adq => adq.id === id);

    adquisicionEnEdicion = id;
    
    document.getElementById('editar-presupuesto').value = adquisicion.presupuesto;
    document.getElementById('editar-unidad').value = adquisicion.unidad;
    document.getElementById('editar-tipo').value = adquisicion.tipo;
    document.getElementById('editar-descripcion').value = adquisicion.descripcion;
    document.getElementById('editar-cantidad').value = adquisicion.cantidad;
    document.getElementById('editar-valorUnitario').value = adquisicion.valorUnitario;
    document.getElementById('editar-fecha').value = adquisicion.fecha;
    document.getElementById('editar-proveedor').value = adquisicion.proveedor;
    document.getElementById('editar-documentacion').value = adquisicion.documentacion;

    document.getElementById('editar-adquisicion').classList.remove('oculto');
}

function guardarCambios() {
    const presupuesto = document.getElementById('editar-presupuesto').value;
    const unidad = document.getElementById('editar-unidad').value;
    const tipo = document.getElementById('editar-tipo').value;
    const descripcion = document.getElementById('editar-descripcion').value;
    const cantidad = document.getElementById('editar-cantidad').value;
    const valorUnitario = document.getElementById('editar-valorUnitario').value;
    const fecha = document.getElementById('editar-fecha').value;
    const proveedor = document.getElementById('editar-proveedor').value;
    const documentacion = document.getElementById('editar-documentacion').value;

    let adquisiciones = obtenerAdquisiciones();
    let adquisicion = adquisiciones.find(adq => adq.id === adquisicionEnEdicion);

    adquisicion.historial.push(`Modificado el ${new Date().toLocaleString()}`);
    adquisicion.presupuesto = presupuesto;
    adquisicion.unidad = unidad;
    adquisicion.tipo = tipo;
    adquisicion.descripcion = descripcion;
    adquisicion.cantidad = cantidad;
    adquisicion.valorUnitario = valorUnitario;
    adquisicion.valorTotal = cantidad * valorUnitario;
    adquisicion.fecha = fecha;
    adquisicion.proveedor = proveedor;
    adquisicion.documentacion = documentacion;

    localStorage.setItem('adquisiciones', JSON.stringify(adquisiciones));
    adquisicionEnEdicion = null;

    document.getElementById('editar-adquisicion').classList.add('oculto');
    mostrarAdquisiciones();
}

function cancelarEdicion() {
    adquisicionEnEdicion = null;
    document.getElementById('editar-adquisicion').classList.add('oculto');
}

function aplicarFiltros() {
    const filtroTipo = document.getElementById('filtroTipo').value.toLowerCase();
    const adquisiciones = obtenerAdquisiciones();
    const lista = document.getElementById('lista');
    lista.innerHTML = '';

    const filtradas = adquisiciones.filter(adq => adq.tipo.toLowerCase().includes(filtroTipo));

    filtradas.forEach(adquisicion => {
        const div = document.createElement('div');
        div.className = 'adquisicion';
        div.innerHTML = `
            <p><strong>Presupuesto:</strong> ${adquisicion.presupuesto}</p>
            <p><strong>Unidad:</strong> ${adquisicion.unidad}</p>
            <p><strong>Tipo:</strong> ${adquisicion.tipo}</p>
            <p><strong>Descripción:</strong> ${adquisicion.descripcion}</p>
            <p><strong>Cantidad:</strong> ${adquisicion.cantidad}</p>
            <p><strong>Valor Unitario:</strong> ${adquisicion.valorUnitario}</p>
            <p><strong>Valor Total:</strong> ${adquisicion.valorTotal}</p>
            <p><strong>Fecha:</strong> ${adquisicion.fecha}</p>
            <p><strong>Proveedor:</strong> ${adquisicion.proveedor}</p>
            <p><strong>Documentación:</strong> ${adquisicion.documentacion}</p>
            <button onclick="editarAdquisicion(${adquisicion.id})">Editar</button>
            <button onclick="eliminarAdquisicion(${adquisicion.id})">Eliminar</button>
            <div class="historial">
                <strong>Historial de Cambios:</strong>
                ${adquisicion.historial.map(cambio => `<p>${cambio}</p>`).join('')}
            </div>
        `;
        lista.appendChild(div);
    });
}
