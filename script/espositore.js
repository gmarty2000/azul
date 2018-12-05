
const LAYOUT_PIASTRELLA_NERA = "image/Nero.png";
const PIASTRELLA_NERA = '1';
const LAYOUT_PIASTRELLA_BIANCA = "image/Bianco.png";
const PIASTRELLA_BIANCA = '2';
const LAYOUT_PIASTRELLA_GIALLA = "image/Giallo.png";
const PIASTRELLA_GIALLA = '3';
const LAYOUT_PIASTRELLA_BLU = "image/Blu.png";
const PIASTRELLA_BLU = '4';
const LAYOUT_PIASTRELLA_ROSSA = "image/Rosso.png";
const PIASTRELLA_ROSSA = '5';

const NUMERO_PIASTRELLE = 4;
const ATTRIBUTO_VALORE = "data-value";

/* Funzione - Ricerca gli elementi con la classe "espositore" e gli aggiunge il DOM e i relativi eventi */
function eventoRicercaComponentiEspositori() {
	
	/* Variabile - Salvataggio dell'HTML document nella variabile doc */
	var doc = this.document;
	
	/* Array - Salvataggio degli elementi con la classe "espositore" (nel DOM della pagina HTML iniziale) */
	var espositori = document.body.getElementsByClassName(Classe.ESPOSITORE.nome);
	
	/* For Each BLOCCANTE - Per ciascun elemento con la classe "espositore", le aggiungo il DOM e gli eventi */
	Array.from(espositori).forEach(function(espositore) {
		setEspositore(espositore);
		aggiungiEventiEspositore(espositore);
	});
}

/* Funzione - Creazione e posizionamento delle varie sezioni dell'espositore */
function setEspositore(espositore) {
	var piastrelle = prendiPiastrelle();

	for (var nPiastrella = 0; nPiastrella < NUMERO_PIASTRELLE; nPiastrella++) {
		var piastrella = creazioneComponente(espositore, ELEMENTO_IMMAGINE, Classe.ESPOSITORE.PIASTRELLA.nome, 'piastrella-' + nPiastrella, setPiastrella);
		aggiungiAttributo(piastrella, ATTRIBUTO_VALORE, parseInt(piastrelle[nPiastrella]) + 1);
	}
}

/* Funzione - Creazione GUI per l'elemento HTML con la classe "piastrella" */
function setPiastrella(piastrella) {

	var valore = null;

	/* TODO: fixare questo bug */
	setTimeout(function() {
		valore = ottieniAttributo(piastrella, ATTRIBUTO_VALORE);

		switch (valore) {
			case PIASTRELLA_NERA:	piastrella.src = LAYOUT_PIASTRELLA_NERA;
									break;
			case PIASTRELLA_BIANCA:	piastrella.src = LAYOUT_PIASTRELLA_BIANCA;
									break;
			case PIASTRELLA_GIALLA:	piastrella.src = LAYOUT_PIASTRELLA_GIALLA;
									break;
			case PIASTRELLA_BLU:	piastrella.src = LAYOUT_PIASTRELLA_BIANCA;
									break;
			case PIASTRELLA_ROSSA:	piastrella.src = LAYOUT_PIASTRELLA_ROSSA;
									break;
		}
	}, 1);

	/* Funzione - Aggiunta degli eventi della piastrella */
	aggiungiEventiPiastrella(piastrella);
}


/* Funzione - Aggiunta dei vari listener sull'elemento HTML con classe "espositore" */
function aggiungiEventiEspositore(espositore) {
	// TODO: to add events
}

/* Funzione - Aggiunta dei vari listener sull'elemento HTML con classe "piastrella" */
function aggiungiEventiPiastrella(piastrella) {
	
	/* Listener - Quando la piastrella viene cliccata (EVENTO_CLICK), viene invocata la funzione personalizzata */
	piastrella.addEventListener(EVENTO_CLICK, function(){
		alert("Hai cliccato su un piastrella con valore: " + ottieniAttributo(piastrella, ATTRIBUTO_VALORE));
	})

}

/* Listener - Quando la finestra (window) viene caricata (EVENTO_LOAD), viene invocata la funzione 'eventoRicercaComponentiEspositori()' */
window.addEventListener(EVENTO_LOAD, eventoRicercaComponentiEspositori);