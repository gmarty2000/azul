function ricercaEspositori() {
	
	/* Variabili - Salvataggio del document e delle sezioni con classe "espositore" inserite nell'HTML */
	var doc = this.document;
	var espositori = document.body.getElementsByClassName(CLASSE_ESPOSITORE);
	
	/* For Each BLOCCANTE - Per ciascun elemento con la classe "espositore", le aggiungo il DOM e gli eventi */
	Array.from(espositori).forEach(function(espositore) {
		creaEspositore(espositore);
		aggiungiEventiEspositore(espositore);
	});
}

/* Funzione - Creazione e posizionamento degli elementi nell'espositore (base e piastrelle) */
function creaEspositore(espositore) {
	
}

/* Funzione - Imposta i vari eventi legati all'elemento con la classe "espositore" */
function aggiungiEventiEspositore(espositore) {
	
}

/* Evento - Al caricamento della pagina, ricerco se esistono degli elementi con la classe "espositore" e gli inserisco all'interno il DOM personalizzato */
window.addEventListener(EVENTO_LOAD, ricercaEspositori);