/*
Estudiante: Elmer Vargas Salazar
Curso: Desarrollo de Aplicaciones Web con Javascript
*/

//Constantes para los botones del reconocimiento y para el texto a mostrar
const btnStartRecord = document.getElementById('btnStartRecord');
const btnStopRecord = document.getElementById('btnStopRecord');
const btnPlayText = document.getElementById('playText');
const btnDeleteText = document.getElementById('deleteText');
const texto = document.getElementById('texto');

//Objeto para permitir utilizar el micrófono en el navegador Chrome
const recognition = new webkitSpeechRecognition();
recognition.lang = 'es-ES'; //Propiedad idioma de la voz en español, (España)
recognition.continuous = true; //Propiedad que detecta si se graba continuamente y se reconozca la voz
recognition.interimResults = false; //Propiedad que al permanecer la voz en silencio no despliega el texto


/*EVENTOS*/
recognition.onresult = (event) => {
    const results = event.results;
    const frase = results[results.length -1][0].transcript; 
    texto.value += frase; //Agregar en el recuadro texto cada frase que se está grabando
}

recognition.onend = (event) => {
    alert('¡El microfono ha dejado de escuchar!');
} //Evento cuando se ha dejado de escuchar en el micrófono

recognition.onerror = (event) => {
    console.log(event.error);
} //Evento cuando el reconocimiento de voz genera algún tipo de error


/*ACCIONES DE LOS BOTONES - MÉTODOS*/

//Comenzar reconocimiento de voz
btnStartRecord.addEventListener('click', () => {
    recognition.start();
});

//Detener reconocimiento de voz
btnStopRecord.addEventListener('click', () => {
    recognition.abort();
});

//Reproducir en voz alta el texto que se ha reconocido
btnPlayText.addEventListener('click', () => {
    leerTexto(texto.value);
});

//Borrar el texto escrito por reconocimiento
btnDeleteText.addEventListener('click', () => {
    texto.value="";
})


/*FUNCIÓN PARA QUE EL NAVEGADOR LEA EL TEXTO ALMACENADO*/
function leerTexto(texto){
    /*Objeto SpeechSynthesisUtterance() = contenido que se debe de leer 
    y como (volúmen, velocidad y tono)*/
    const speech = new SpeechSynthesisUtterance();
    
    speech.text = texto; //Propiedad texto por leer
    speech.volume = 1; //Propiedad volumen de voz
    speech.rate = 1; //Propiedad velocidad
    speech.pitch = 1; //Propiedad tono

    window.speechSynthesis.speak(speech); 
}