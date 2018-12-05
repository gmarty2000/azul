 /* Costanti - Tipologie di elementi HTML */
const ELEMENTO_HTML = "div";
const ELEMENTO_IMMAGINE = "img";

/* Costanti - Eventi degli elementi HTML */
const EVENTO_LOAD = "load";
const EVENTO_CLICK = "click";

/* Funzione - Crea un nuovo componente e le associa il tipo, la classe ed una funzione. In seguito, lo aggiunge all'elemento corpo (tramite il DOM) */
function creazioneComponente(corpo, tipoElemento, classe, id, funzione = null) {

	/* Variabile - Creo un nuovo elemento HTML e lo salvo nella variabile */
	var componente = document.createElement(tipoElemento);

	/* CSS - Aggiungo la classe all'elemento HTML  */
	componente.classList.add(classe);

	/*  Condizione - Verifico che l'id non sia un valore null 	
	 *	- ALLORA		--> Lo aggiungo all'elemento HTML
	 */
	if (id != null)
		componente.id = id;
	
	/*  Condizione - Verifico che la funzione non sia null 	
	 *	- ALLORA		--> Eseguo quella funzione inserendo come parametro l'elemento HTML
	 */
	if (funzione != null)
		funzione(componente);
	
	/* DOM - Aggiungo l'elemento HTML al corpo (altro elemento HTML ricevuto come parametro) */
	corpo.appendChild(componente);
	
	/* Return - Restituisco l'elemento HTML appena creato */
	return componente;
}

/* Funzione - Crea un nuovo attributo HTML, le setta un valore e lo inserisce nell'elemento HTML */
function aggiungiAttributo(elemento, nomeAttributo, valore) {

	/* Variabile - Creo un nuovo attributo HTML e lo salvo nella variabile */
	var attributo = document.createAttribute(nomeAttributo);

	/* Proprietà JS - Aggiungo il valore all'attributo HTML  */
	attributo.value = valore;
	
	/* DOM - Aggiungo l'attributo HTML all'elemento HTML */
	elemento.setAttributeNode(attributo);
}

/* Funzione - Ottiene l'attributo HTML e restituisce il suo valore */
function ottieniAttributo(elemento, nomeAttributo) {

	/* Variabile - Salvo il valore dell'attributo HTML ottenuto dall'elemento HTML */
	var ret = elemento.getAttribute(nomeAttributo);
	
	/* Return - Restituisco il valore dell'attributo HTML desiderato */
	return ret;
}

/* Funzione - Avvisa l'utente che si trova in presenza di un errore */
function errore(strErr, numErr) {
	
	/* Output - Stampo l'errore ed il numero associato all'errore */
	strErr += "\nErrore: " + numErr;
	alert(strErr);
}