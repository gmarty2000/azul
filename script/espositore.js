
const LAYOUT_PIASTRELLA_NERA = "url('../image/Nero.png";
const PIASTRELLA_NERA = 1;
const LAYOUT_PIASTRELLA_BIANCA = "url('../image/Bianco.png";
const PIASTRELLA_BIANCA = 2;
const LAYOUT_PIASTRELLA_GIALLA = "url('../image/Giallo.png";
const PIASTRELLA_GIALLA = 3;
const LAYOUT_PIASTRELLA_BLU = "url('../image/Blu.png";
const PIASTRELLA_BLU = 4;
const LAYOUT_PIASTRELLA_ROSSA = "url('../image/ROsso.png";
const PIASTRELLA_ROSSA = 5;

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


/** !ALERT!
 * preferisco chiamare queste funzioni set[elemento] 
 * al posto di crea[elemento] perchè appunto già
 * esistendo la funzione creaElemento() che fa tutto il lavoro
 * di impostazione proprietà, collegamento a classi css e posizionamento
 * evito di farmi tradire dall'assonanza, sempre perchè le funzioni create
 * in questi file saranno poi chiamate dalla medesima funzione creaComponente()
 * per settare il comportamento dell'elemento
*/

function setEspositore() {
	
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

	for (var i = 0; i < piastrelle.length; i++){
		
		//!ALERT! come impostare il .piastrella, classe css figlia di espositore

		var piastrella = creazioneComponente(espositore, ELEMENTO_HTML, CLASSE_ESPOSITORE, setPiastrella);

	}
	
	//Prima crea la piastrella, con la funzione corretta, successivamente la 
	//aggiungo all'epsositore e ne setto il comportamento

	


}

function setPiastrella(){

	//Setto l'id alla tessera
	var tipo_piastrella = 1;
	piastrella.id = "piastrella_" + tipo_piastrella;

	/**
	 * In base al numero pescato, che può andare da 1 a 5
	 * confronto con la costante di tipo, e successivamente 
	 * assegno tramite le costanti riportate all'inizio del
	 * codice i percorsi in cui si trovano le immagini che 
	 * formeranno lo sfondo della tessera
	 */

	switch(tipo_piastrella) {
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


/* Funzione - Imposta i vari eventi legati all'elemento con la classe "espositore" */
function aggiungiEventiEspositore(espositore) {
	
	//Per ora non mi vengono in mente eventi utilizzati dall espositore

}

function aggiungiEventiPiastrella(piastrella){

	//Aggiunta evento di prova
	piastrella.addEventListener(EVENTO_CLICK, function(){
		alert("Hai cliccato su un piastrella, id: " + piastrella.id);
	})

}

/* Evento - Al caricamento della pagina, ricerco se esistono degli elementi con la classe "espositore" e gli inserisco all'interno il DOM personalizzato */
window.addEventListener(EVENTO_LOAD, ricercaEspositori);
