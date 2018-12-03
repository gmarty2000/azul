/**
 * TODO [2]:
 * Cambiare tutte le variabili e tutte le costanti in cui appare la
 * dicitura "bottone", per indicare il "button" inglese, in italiano
 * si utilizza "pulsante"
 */

/* Costanti - 1. 	Il numero minimo di giocatori consentiti
 * 		  	  2. 	Il numero massimo di giocatori consentiti
 */
const MIN_GIOCATORI = 2;
const MAX_GIOCATORI = 4;

/* Costante - Ritardo per il timer */
const TEMPO_RITARDO = 200;

/* Costanti - 1. 	Classe da assegnare quando si clicca un elemento del tavolo
 * 		  	  2. 	Classe da assegnare a tutti gli elementi che non sono stati cliccati (del tavolo)
 * 		  	  3. 	Classe da assegnare al pulsante indietro (appare con l'evento dello zoom)
 */
const CLASSE_CLICKED = "clicked";
const CLASSE_UNCLICKED = "unclicked";
const CLASSE_BOTTONE_INDIETRO = "bottone-indietro";

/* Costanti - 1. 	Angolo retto (1/4 angolo giro)
 * 		  	  2. 	Angolo piatto (1/2 angolo giro)
 * 		  	  3. 	Angolo giro
 */
const ANGOLO_RETTO = 90;
const ANGOLO_PIATTO = 180;
const ANGOLO_GIRO = 360;

/* Costanti - 1. 	Il raggio (espresso in %) della circonferenza (per posizionare gli espositori)
 * 		  	  2. 	Esprime la percentuale dello zoom (divisa per 100)
 * 		  	  3. 	Il simbolo della percentuale
 */
 
const PERCENTUALE_CERCHIO = 80;
const PERCENTUALE_ZOOM = 0.9;
const PERCENTUALE = "%";

/* Costante - Il colore per il secondo piano (per creare l'effetto dell'ombreggiatura) */
const COLORE_OMBREGGIATURA = "#000000aa";

/* Costante - Il percorso dell'immagine del bottone per tornare alla schermata precedente */
const PERCORSO_BOTTONE_INDIETRO = "image/bottone_indietro.svg";

/* Funzione (Evento) - Ricerca gli elementi con la classe "tavolo" e gli aggiunge il DOM e i relativi eventi */
function eventoRicercaElementiTavolo() {

	/* Variabile - Salvataggio dell'HTML document nella variabile doc */
	var doc = this.document;
	
	/* Array - Salvataggio degli elementi con la classe "tavolo" (nel DOM della pagina HTML iniziale) */
	var tavoli = document.getElementsByClassName(Classe.TAVOLO.nome);
	
	/* Variabile - Salvataggio del numero dei giocatori (passato dalla pagina precedente) */
	var nGiocatori = ricercaNumeroGiocatori();

	/*  Condizione - Verifico che il numero di giocatori sia corretto 	
	 *	- ALLORA		--> Gestisco tutti gli elementi con la classe "tavolo"
	 *	- ALTRIMENTI	--> Segnalo la presenza di un errore con la funzione "errore()"
	 */
	if (nGiocatori >= MIN_GIOCATORI && nGiocatori <= MAX_GIOCATORI)
		
		/* For Each BLOCCANTE - Per ciascun elemento con la classe "tavolo", le aggiungo il DOM e gli eventi corrispondenti */
		Array.from(tavoli).forEach(function(tavolo) {
			creaElementoTavolo(tavolo, nGiocatori);
			aggiungiEventiTavolo(tavolo);

		});

	else
		/* Errore - Stampa a video l'errore selezionato */
		errore('Numero giocatori errato', -1);
}

/* Funzione - Restituisce il numero di giocatori (ottenuto dalla pagina Web precedente) */
function ricercaNumeroGiocatori() {
	/* TODO: codice */
	return 4;
}

/* Funzione - Creazione e posizionamento degli elementi sul tavolo (piattaforma ed espositori) */
function creaElementoTavolo(tavolo, nGiocatori) {
	
	/* Variabile - Creazione dell'elemento con classe "piattaforma":
	 *			   --> è il figlio dell'elemento con la classe "tavolo"
	 *			   --> è un <div> (ELEMENTO_HTML)
	 *			   --> le assegno la classe "piattaforma" (CLASSE_PIATTAFORMA)
	 *			   --> modifico l'elemento appena creato dalla funzione con la funzione "setPiattaforma"
	 */
	var piattaforma = creazioneComponente(tavolo, ELEMENTO_HTML, Classe.TAVOLO.PIATTAFORMA.nome, null, setPiattaforma);
	
	/* Variabile - Salvataggio del numero degli espositori da creare nel tavolo (dipende dal numero dei giocatori) */
	var nEspositori = (nGiocatori * 2) + 1;

	/* Ciclo - Creazione dell'elemento e del layout per gli N espositori */
	/* !TODO */
	for (var nEspositore = 0; nEspositore < nEspositori; nEspositore++) {
		var espositore = creazioneComponente(tavolo, ELEMENTO_HTML, Classe.TAVOLO.ESPOSITORE.nome, 'espositore-' + nEspositore, setEspositore);
		setLayoutEspositore(espositore, nEspositore, nEspositori);
	}
}

/* Funzione - Imposta le posizioni di ciascun espositore (dispongo gli espositori per formare una circonferenza) */
function setLayoutEspositore(espositore, nEspositore, nEspositori) {
	
	/* Variabili - 1. 		Calcolare l'angolo della circonferenza corrispondente al singolo espositore
	 * 			   2. 		Convertire l'angolo ottenuto da decimale a radianti
	 * 			   3 - 4.	Trovare lo spostamento orizzontale e verticale da applicare al singolo espositore
	 */

	var angoloNum = ((ANGOLO_GIRO * nEspositore) / nEspositori) - ANGOLO_RETTO;
	var angoloRad = (angoloNum * Math.PI) / ANGOLO_PIATTO;
	var spostamentoX = (1 + Math.cos(angoloRad)) / 2;
	var spostamentoY = (1 + Math.sin(angoloRad)) / 2;
	
	/* Regole CSS - Imposta le coordinate (assolute) dove posizionare il singolo espositore */
	espositore.style.top = (spostamentoY * PERCENTUALE_CERCHIO) + PERCENTUALE;
	espositore.style.left = (spostamentoX * PERCENTUALE_CERCHIO) + PERCENTUALE;
}

/* Funzione - Imposta i vari eventi legati all'elemento con la classe "tavolo" */
function aggiungiEventiTavolo(tavolo) {
	
	/* Variabile - Richiede i figli dell'elemento con la classe "tavolo" */
	var componenti = tavolo.children;

	/* For Each BLOCCANTE - Per ciascun figlio dell'elemento con la classe "tavolo", aggiungere l'animazione dello zoom */
	Array.from(componenti).forEach(function(componente) {
		componente.addEventListener(EVENTO_CLICK, function() {			
			eventoZoom(tavolo, componente, componenti);
		});
	});
}

/* Evento - Imposta l'effetto dello zoom sul singolo componente con il click del mouse */
function eventoZoom(tavolo, componente, componenti) {
	
	/* Condizione - Verifico che il componente non sia stato cliccato
	 * - ALLORA			--> Gestione dell'elemento selezionato e disattivazione di tutti gli altri (con l'assegnazione della classe "unclicked")
	 */
	 
	if (!componente.classList.contains(CLASSE_CLICKED)) {
		
		/* Variabili - 1. 		Calcolo la percentuale da applicare per zoomare (in larghezza)
		 * 			   2. 		Calcolo la percentuale da applicare per zoomare (in altezza)
		 * 			   3.		Verifico quale delle 2 percentuali sia la minore e la riduce del 10%
		 */
	 
		var zoomWidth = tavolo.clientWidth / componente.offsetWidth;	/* INFO: componente.offsetWidth		=	componente.clientWidth	+	margin	+	padding	+	border	*/
		var zoomHeight = tavolo.clientHeight / componente.offsetHeight;	/* INFO: componente.offsetHeight	=	componente.clientHeight	+	margin	+	padding	+	border	*/
		var zoom = Math.min(zoomWidth, zoomHeight);
		zoom *= PERCENTUALE_ZOOM;
		
		/* For Each BLOCCANTE - Per ciascun figlio dell'elemento con la classe "tavolo", metterlo in secondo piano (con l'assegnazione della classe "unclicked") */
		Array.from(componenti).forEach(function(comp) {
			comp.classList.add(CLASSE_UNCLICKED);
		});
		
		/* Regole CSS - Imposto l'effetto zoom, rimuovo la classe "unclicked" e aggiungo la classe "clicked" (su componente) */
		componente.style.transform = "translate(-50%, -50%) scale(" + zoom + "," + zoom + ")";
		componente.classList.remove(CLASSE_UNCLICKED);
		componente.classList.add(CLASSE_CLICKED);
		
		/* Regole CSS - Creazione dell'effetto ombreggiatura nel secondo piano (facendo risaltare l'elemento in primo piano) */
		tavolo.style.background = COLORE_OMBREGGIATURA;
		 
		/* Funzione - Creazione del bottone per uscire dalla schermata dell'ingrandimento dell'elemento */
		creaBottoneIndietro(tavolo, componente, componenti);

	}
}

/* Funzione - Creazione del bottone per uscire dalla schermata dell'ingrandimento dell'elemento */
function creaBottoneIndietro(tavolo, componente, componenti) {
	
	/* Variabile - Creazione dell'elemento con classe "bottone":
	 *			   --> è il figlio dell'elemento con la classe "tavolo"
	 *			   --> è un <img> (ELEMENTO_IMMAGINE)
	 *			   --> le assegno la classe "bottone-indietro" (CLASSE_BOTTONE_INDIETRO)
	 *			   --> non modifico l'elemento appena creato con un'altra funzione (null)
	 */
	var bottone = creazioneComponente(tavolo, ELEMENTO_IMMAGINE, CLASSE_BOTTONE_INDIETRO, null, null);
	
	/* Attributo HTML - Imposto l'attributo src con il percorso dell'immagine SVG associata al bottone */
	bottone.src = PERCORSO_BOTTONE_INDIETRO;
	
	/* Listener - Aggiungo l'animazione di uscita dalla schermata di visualizzazione del componente */
	bottone.addEventListener(EVENTO_CLICK, function() {
		eventoBottoneIndietro(tavolo, componente, componenti);
	});
}

/* Funzione - Torna alla schermata del tavolo da gioco iniziale cliccando il bottone con il mouse */
function eventoBottoneIndietro(tavolo, componente, componenti) {
	
	/* DOM - Rimuove il bottone indietro dal DOM del tavolo */
	tavolo.removeChild(tavolo.childNodes[tavolo.childNodes.length - 1]);
	
	/* CSS - Rimuove la classe "clicked" e "l'effetto zoom" dal componente selezionato precedentemente */
	componente.classList.remove(CLASSE_CLICKED);
	componente.style.transform = "";
	
	/* CSS - Rimuove l'effetto dell'ombreggiatura nel secondo piano */
	tavolo.style.background = "";

	/* Timer - Dopo 200ms, rimuove la classe "unclicked" da tutti i componenti del tavolo */
	setTimeout(function() {
		Array.from(componenti).forEach(function(comp) {
			comp.classList.remove(CLASSE_UNCLICKED);
		});
	}, TEMPO_RITARDO);
		
	/* TODO: attivare eventi componenti qui */
}

/* Listener - Quando viene caricata la finestra (window), viene chiamata la funzione eventoRicercaElementiTavolo() */
window.addEventListener(EVENTO_LOAD, eventoRicercaElementiTavolo);	