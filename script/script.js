/* TODO: Aggiornare il numero delle righe */
/* TODO: Rimuovere tutti gli eventuali TODO nel programma */

/* script.js
 * Questo file serve per riunire le costanti / funzioni utilizzate maggiormente negli script.
 * Questo file si importa in automatico, senza speficare l'import nella sezione "head" del documento HTML.
 * 
 * Qui di seguito è descritta la struttura del file.
 *
 *	script.js																			RIGA
 *      |
 *    	|
 *    	|------	Costanti													 			 ?
 *		|			|
 *		|			|--	ELEMENTO_HTML = "div";
 *		|			|--	ELEMENTO_IMMAGINE
 *		|			|--	CLASSE_TAVOLO
 *		|			|--	CLASSE_PIATTAFORMA
 *		|			|--	CLASSE_ESPOSITORE
 *		|			|--	EVENTO_LOAD
 *		|			|--	EVENTO_CLICK
 *		|			|--	ERRORE_1
 *    	|
 *    	|------	Funzioni
 *					|
 *					|--	creazioneComponente(element, string, string, function)			 ?
 *					|--	errore(string, int)												 ?
 */

 /* Costanti - Tipologie di elementi HTML */
const ELEMENTO_HTML = "div";
const ELEMENTO_IMMAGINE = "img";

/* Costanti - Classi CSS */
const CLASSE_TAVOLO = "tavolo";
const CLASSE_PIATTAFORMA = "piattaforma";
const CLASSE_ESPOSITORE = "espositore";

/* Costanti - Eventi degli elementi HTML */
const EVENTO_LOAD = "load";
const EVENTO_CLICK = "click";

/* Costanti - Frasi di errore */
const ERRORE_1 = "Numero giocatori errato";
const ERRORE_2 = "Tessere esaurite";

/* Funzione - Crea un nuovo componente e le associa il tipo, la classe ed una funzione. In seguito, lo aggiunge all'elemento corpo (tramite il DOM) */
function creazioneComponente(corpo, tipoElemento, classe, funzione) {
	var componente = document.createElement(tipoElemento);
	componente.classList.add(classe);
	
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