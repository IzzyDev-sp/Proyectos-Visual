/* =========================================
   1. SELECCIÓN DE ELEMENTOS DEL DOM
   Usamos 'document' para referenciar el HTML
   ========================================= */
const inputPeso = document.getElementById('peso');
const selectDestino = document.getElementById('destino');
const btnCalcular = document.getElementById('btn-calcular');
const btnLimpiar = document.getElementById('btn-limpiar');
const divMensaje = document.getElementById('mensaje-estado');
const txtResultado = document.getElementById('texto-resultado');
const listaHistorial = document.getElementById('lista-historial');

// Datos de tarifas (Simulación de base de datos usando Objetos y Arrays)
const tarifas = {
    peninsula: { costeKg: 5, dias: 3 },
    baleares: { costeKg: 10, dias: 5 },
    canarias: { costeKg: 15, dias: 7 },
    europa: { costeKg: 20, dias: 10 }
};

/* =========================================
   2. FUNCIONES DE UTILIDAD (Objetos Nativos)
   ========================================= */

// Función para calcular fecha de entrega (Objeto Date)
function calcularFechaEntrega(diasSumar) {
    const hoy = new Date(); // Fecha actual
    // Manipulación de fecha: sumamos los días de tránsito
    const fechaEntrega = new Date(hoy);
    fechaEntrega.setDate(hoy.getDate() + diasSumar);
    
    // Formateamos la fecha a string local (Objeto String/Date)
    return fechaEntrega.toLocaleDateString('es-ES', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });
}

// Función para mostrar mensajes en pantalla (Manipulación DOM)
function mostrarMensaje(mensaje, tipo) {
    divMensaje.textContent = mensaje;
    divMensaje.style.display = 'block';
    // Cambiamos clase dinámicamente
    divMensaje.className = tipo === 'error' ? 'error' : 'success';
    
    // Ocultar mensaje automáticamente tras 3 segundos (window)
    window.setTimeout(() => {
        divMensaje.style.display = 'none';
    }, 3000);
}

/* =========================================
   3. GESTIÓN DEL ALMACENAMIENTO (LocalStorage)
   ========================================= */

// Función para cargar historial al inicio
function cargarHistorial() {
    // Recuperamos string y lo convertimos a Array (JSON.parse)
    let historial = JSON.parse(localStorage.getItem('enviosHistorial')) || [];
    
    listaHistorial.innerHTML = ''; // Limpiar lista actual

    // Iterar sobre el array para crear elementos DOM (createElement, appendChild)
    historial.forEach(item => {
        const li = document.createElement('li');
        // Template String para formatear
        li.textContent = `Destino: ${item.destino.toUpperCase()} - Precio: ${item.precio}€`;
        listaHistorial.appendChild(li);
    });
    
    console.log("Historial cargado desde LocalStorage.");
}

// Función para guardar en historial
function guardarEnHistorial(destino, precio) {
    let historial = JSON.parse(localStorage.getItem('enviosHistorial')) || [];
    
    // Añadimos nuevo objeto al array (Array push)
    historial.push({ destino: destino, precio: precio, fecha: new Date() });
    
    // Guardamos en navegador (JSON.stringify)
    localStorage.setItem('enviosHistorial', JSON.stringify(historial));
    
    // Recargamos la vista
    cargarHistorial();
}

/* =========================================
   4. EVENTOS Y LÓGICA PRINCIPAL
   ========================================= */

// Evento Click para Calcular
btnCalcular.addEventListener('click', () => {
    console.log("Iniciando cálculo..."); // Depuración en consola

    // 1. Obtener valores
    const peso = parseFloat(inputPeso.value);
    const destino = selectDestino.value;

    // 2. Validación simple
    if (isNaN(peso) || peso <= 0 || destino === "") {
        // Interacción: Alert nativo para error grave o simple mensaje
        // window.alert("Por favor, rellena todos los campos correctamente."); 
        mostrarMensaje("⚠️ Debes indicar un peso válido y un destino.", "error");
        return;
    }

    // 3. Cálculos matemáticos (Objeto Math)
    const tarifa = tarifas[destino];
    let costeTotal = peso * tarifa.costeKg;
    
    // Aplicamos un "impuesto" ficticio y redondeamos (Math)
    costeTotal = Math.round(costeTotal * 1.21 * 100) / 100; // IVA incluido, 2 decimales

    // 4. Manejo de Strings y Fechas
    const fechaEstimada = calcularFechaEntrega(tarifa.dias);
    
    // 5. Modificar el DOM con el resultado (innerHTML)
    const resultadoHTML = `
        <strong>Coste Final (IVA inc.):</strong> ${costeTotal}€ <br>
        <strong>Llegada estimada:</strong> ${fechaEstimada}
    `;
    txtResultado.innerHTML = resultadoHTML;
    mostrarMensaje("Cálculo realizado con éxito", "success");

    // 6. Interacción: Confirmar si guardar (confirm)
    // Usamos setTimeout para que el DOM se pinte antes de que salte el alert/confirm
    setTimeout(() => {
        const deseaGuardar = window.confirm("¿Quieres guardar este cálculo en tu historial?");
        if (deseaGuardar) {
            // Ejemplo de prompt (Interacción extra)
            // const nota = prompt("Añade una nota opcional:"); 
            guardarEnHistorial(destino, costeTotal);
        }
    }, 100);
});

// Evento Click para Limpiar
btnLimpiar.addEventListener('click', () => {
    inputPeso.value = '';
    selectDestino.value = '';
    txtResultado.textContent = 'Introduce los datos para ver el coste.';
    console.clear(); // Limpiar consola
    console.log("Formulario limpiado.");
});

/* =========================================
   5. INICIALIZACIÓN
   ========================================= */

// Evento de carga del documento (window)
window.addEventListener('load', () => {
    // Info del navegador (Navigator object)
    console.log(`App iniciada en: ${navigator.userAgent}`);
    cargarHistorial();
});