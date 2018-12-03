 /* Costanti - Tipologie di elementi HTML */
const ELEMENTO_HTML = "div";
const ELEMENTO_IMMAGINE = "img";

/* Costanti - Eventi degli elementi HTML */
const EVENTO_LOAD = "load";
const EVENTO_CLICK = "click";

/* Funzione - Crea un nuovo componente e le associa il tipo, la classe ed una funzione. In seguito, lo aggiunge all'elemento corpo (tramite il DOM) */
function creazioneComponente(corpo, tipoElemento, classe, id, funzione = null) {
	var componente = document.createElement(tipoElemento);
	componente.classList.add(classe);

	if (id != null)
		componente.id = id;
	
	if (funzione != null)
		funzione(componente);
	
	corpo.appendChild(componente);
	
	return componente;
}

/* Funzione - Avvisa l'utente che si trova in presenza di un errore */
function errore(strErr, numErr) {
	strErr += "\nErrore: " + numErr;
	alert(strErr);
}