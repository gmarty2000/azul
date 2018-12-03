
const LAYOUT_PIASTRELLA_NERA = "url('../image/Nero.png";
const PIASTRELLA_NERA = 1;
const LAYOUT_PIASTRELLA_BIANCA = "url('../image/Bianco.png";
const PIASTRELLA_BIANCA = 2;
const LAYOUT_PIASTRELLA_GIALLA = "url('../image/Giallo.png";
const PIASTRELLA_GIALLA = 3;
const LAYOUT_PIASTRELLA_BLU = "url('../image/Blu.png";
const PIASTRELLA_BLU = 4;
const LAYOUT_PIASTRELLA_ROSSA = "url('../image/Rosso.png";
const PIASTRELLA_ROSSA = 5;

/**
 * Effettua la ricerca degli espositori nel DOM
 */
function eventoRicercaComponentiEspositori() {
	
	/* Variabili - Salvataggio del document e delle sezioni con classe "espositore" inserite nell'HTML */
	var doc = this.document;
	var espositori = document.body.getElementsByClassName(Classe.TAVOLO.ESPOSITORE.nome);
	
	/* For Each BLOCCANTE - Per ciascun elemento con la classe "espositore", le aggiungo il DOM e gli eventi */
	Array.from(espositori).forEach(function(espositore) {
		setEspositore(espositore);
		aggiungiEventiEspositore(espositore);
	});
}

/* TODO: ID */
/**
 * Modifica il DOM HTML e/o CSS interno all'espositore
 * @param { object } espositore - L'elemento HTML con la classe 'espositore'
 */
function setEspositore(espositore) {
	
	/**\
	 * Setto un id all'espositore, nel caso che più avanti nel codice
	 * servisse per qualche ragione recuperarcelo.
	 * Dato che quando si creano gli espositori ci troviamo in un ciclo
	 * sarà sufficiente passare a questa funzione il contatore dello stesso
	 */
	
	// var id_espositore = "1"
	//espositore.id = "espositore_" + id_espositore;

	
	//simuliamo un prendiPiastrelle() dal file borsa.js
	var piastrelle = [1,2,3,4,5];

	for (var nPiastrella = 0; nPiastrella < piastrelle.length; nPiastrella++){
		
		//!ALERT! come impostare il .piastrella, classe css figlia di espositore

		var piastrella = creazioneComponente(espositore, ELEMENTO_HTML, Classe.TAVOLO.ESPOSITORE.nome, 'piastrella-' + nPiastrella, setPiastrella);

	}
	
	//Prima crea la piastrella, con la funzione corretta, successivamente la 
	//aggiungo all'epsositore e ne setto il comportamento
}

/**
 * Modifica il DOM HTML e/o CSS interno alla piastrella
 * @param { object } piastrella - L'elemento HTML con la classe 'piastrella'
 */
function setPiastrella(piastrella) {
	var idPiastrella = piastrella.id;
	var nPiastrella = idPiastrella.substring(11, idPiastrella.length);
	nPiastrella++;

	/**
	 * In base al numero pescato, che può andare da 1 a 5
	 * confronto con la costante di tipo, e successivamente 
	 * assegno tramite le costanti riportate all'inizio del
	 * codice i percorsi in cui si trovano le immagini che 
	 * formeranno lo sfondo della tessera
	 */

	switch(nPiastrella) {
		case PIASTRELLA_NERA:
		    piastrella.style.backgroundImage = LAYOUT_PIASTRELLA_NERA;		
			break;
		case PIASTRELLA_BIANCA:
			piastrella.style.backgroundImage = LAYOUT_PIASTRELLA_BIANCA;
			break;
		case PIASTRELLA_GIALLA:
			piastrella.style.backgroundImage = LAYOUT_PIASTRELLA_GIALLA;
			break;
		case PIASTRELLA_BLU:
			piastrella.style.backgroundImage = LAYOUT_PIASTRELLA_BLU;
			break;
		case PIASTRELLA_ROSSA:
			piastrella.style.backgroundImage = LAYOUT_PIASTRELLA_ROSSA;
			break;
	}

	//aggiungo alla piastrella gli eventi che ne determineranno il comportamento
	aggiungiEventiPiastrella(piastrella);
}


/**
 * Aggiunge i vari listener all'espositore
 * @param { object } espositore - L'elemento HTML con la classe 'espositore'
 */
function aggiungiEventiEspositore(espositore) {
	// TODO: to add events
}

/**
 * Aggiunge i vari listener alla piastrella
 * @param { object } piastrella - L'elemento HTML con la classe 'piastrella'
 */
function aggiungiEventiPiastrella(piastrella) {
	
	/*	Listener - Quando la piastrella viene cliccata (EVENTO_CLICK),
	viene invocata la funzione personalizzata								*/

	piastrella.addEventListener(EVENTO_CLICK, function(){
		alert("Hai cliccato su un piastrella, id: " + piastrella.id);
	})

}

/*	Listener - Quando la finestra (window) viene caricata (EVENTO_LOAD),
	viene invocata la funzione 'eventoRicercaComponentiEspositori()'		*/

window.addEventListener(EVENTO_LOAD, eventoRicercaComponentiEspositori);