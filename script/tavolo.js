/* TODO: Aggiornare il numero delle righe */
/* TODO: Rimuovere tutti gli eventuali TODO nel programma */

/* tavolo.js
 * Questo file serve per creare il tavolo da gioco per il gioco da tavolo Azul.
 * Dopo aver importato questo file nel documento HTML, si può creare il tavolo con due modalità:
 * - creando un elemento con la classe "tavolo";
 * - chiamando la funzione "creaTavolo(<elemento HTML>).
 * 
 * Qui di seguito è descritta la struttura del file.
 *
 *	tavolo.js																			RIGA
 *      |
 *    	|
 *    	|------	Costanti													 			 ?
 *		|			|
 *		|			|--	MIN_GIOCATORI
 *		|			|--	MAX_GIOCATORI
 *		|			|--	TEMPO_RITARDO
 *		|			|--	CLASSE_CLICKED
 *		|			|--	CLASSE_UNCLICKED
 *		|			|--	CLASSE_BOTTONE_INDIETRO
 *		|			|--	ANGOLO_RETTO
 *		|			|--	ANGOLO_PIATTO
 *		|			|--	ANGOLO_GIRO
 *		|			|--	PERCENTUALE_CERCHIO
 *		|			|--	PERCENTUALE_ZOOM
 *		|			|--	PERCENTUALE
 *		|			|--	COLORE_OMBREGGIATURA
 *		|			|--	PERCORSO_BOTTONE_INDIETRO
 *    	|
 *    	|------	Funzioni
 *		|			|
 *		|			|--	ricercaTavoli()													 ?
 *		|			|--	ricercaNumeroGiocatori()										 ?
 *		|			|--	creaTavolo(element, int)										 ?
 *		|			|--	creaLayoutEspositore(element, int)								 ?
 *		|			|--	aggiungiEventiTavolo(element)									 ?
 *		|			|			|
 *		|			|			|--	Eventi
 *		|			|					|
 *		|			|					|--	elemento: componente	evento: 'click'		 ?
 *		|			|
 *		|			|--	eventoZoom(element, element, element[])							 ?
 *		|			|--	creaBottoneIndietro(element, element, element[])				 ?
 *		|			|			|
 *		|			|			|--	Eventi
 *		|			|					|
 *		|			|					|--	elemento: bottone		evento: 'click'		 ?
 *		|			|
 *		|			|--	eventoBottoneIndietro(element, element, element[])				 ?
 *		|
 *		|------	Eventi
 *					|
 *					|--	elemento: window	evento: 'load'								 ?
 */

/**
 * PREMESSA: Sei tu che conosci questo codice, quindi posso aver detto
 * delle cazzate nei TODO qui sotto, derivate dal fatto che mi sto studiando
 * il codice e potrei non averne capito delle parti
 * 
 * TODO [1]:
 * 
 * Cambiare il nome della funzione ricercaTavoli() in qualcosa tipo:
 * ricerca_componenti_tavolo(), perchè altrimenti si confonde ciò
 * che la funzione va a fare (se ho capito, salva in una variabile
 * tutti gli elementi con la formattazione di 'tavolo', e per ognuno procede
 * all'aggiunta dei singoli figli e successivamente degli eventi generali.
 * CAMBIARE anche il nome della funzione creaTavolo() in, ad esempio
 * crea_elemento_tavolo(), per lo stesso motivo di prima
 * 
 * TODO [2]:
 * Cambiare tutte le variabili e tutte le costanti in cui appare la
 * dicitura "bottone", per indicare il "button" inglese, in italiano
 * si utilizza "pulsante"
 * 
 */


/* Costanti - Il numero minimo e massimo di giocatori che possono giocare una partita */
const MIN_GIOCATORI = 2;
const MAX_GIOCATORI = 4;

/* Costante - Ritardo per il timer */
const TEMPO_RITARDO = 200;

/* Costante - Classe CSS */
const CLASSE_CLICKED = "clicked";
const CLASSE_UNCLICKED = "unclicked";
const CLASSE_BOTTONE_INDIETRO = "bottone-indietro";

/* Costanti - Angoli per posizionare gli espositori su una circonferenza */
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

/* Funzione - Ricerca gli elementi con la classe "tavolo" e gli aggiunge il DOM e i relativi eventi */

function ricercaTavoli() {
	
	/**
	 *  
	 * Variabili - Salvataggio del document, delle sezioni
	 * con classe "tavolo" inserite nell'HTML 
	 * e del numero di giocatori 
	 * 
	 * */

	var doc = this.document;
	
	//?ARRAY?
	
	/**
	 * 
	 * Questo passaggio serve per ricevere, nella variabile tavoli,
	 * tutti gli elementi con la rispettiva classe css, che verranno poi
	 * correttamente generati nelle funzioni successive
	 * 
	 */
	var tavoli = document.getElementsByClassName(CLASSE_TAVOLO);
	
	//Riceve il numero di giocatori, da progetto dal menu
	var nGiocatori = ricercaNumeroGiocatori();

	/*  per ogni elemento con
	 *	Condizioni: 
	 *	-Verifica che il numero di  per ogni elemento congiocatori sia corretto 	
	 *	- ALLORA gestisco tutti gli elementi con la classe "tavolo"
	 *	- ALTRIMENTI segnalo la presenza di un errore con il metodo "alert()"
	 *
	 */
	 
	if (nGiocatori >= MIN_GIOCATORI && nGiocatori <= MAX_GIOCATORI)
		
		/**
		 * 
		 *  For Each BLOCCANTE - Per ciascun elemento con
		 *  la classe "tavolo", le aggiungo il DOM
		 *  e gli eventi corrispondenti 
		 * 
		 * */

		Array.from(tavoli).forEach(function(tavolo) {

			creaTavolo(tavolo, nGiocatori);
			aggiungiEventiTavolo(tavolo);

		}); else
		/* Errore - Stampa a video */
		errore(ERRORE_1, -1);
}

/* Funzione - Restituisce il numero di giocatori (ottenuto dalla pagina Web precedente) */
function ricercaNumeroGiocatori() {
	/* TODO: codice */
	return 4;
}

/* Funzione - Creazione e posizionamento degli elementi sul tavolo (piattaforma ed espositori) */
function creaTavolo(tavolo, nGiocatori) {
	
	/**
	 * 
	 * Crea una variabile piattaforma, che sarà poi la "tabella" su cui il giocatore andrà a disporre 
	 * le tessere, passando alla generica funzione creaComponente():
	 * 
	 * - tavolo: Indica il padre a cui dovrà essere assegnato l'elemento in creazione ["tavolo"]
	 * - ELEMENTO_HTML: indica il tipo di elemento per cui verrà modificata la variabile piattaforma ["DIV"]
	 * - CLASSE_PIATTAFORMA: indica il nome della classe css della piattaforma ["piattaforma"]
	 * - creaPiattaforma: indica nome della funzione che lavorerà sull'oggetto piattaforma
	 * 
	 */

	var piattaforma = creazioneComponente(tavolo, ELEMENTO_HTML, CLASSE_PIATTAFORMA, creaPiattaforma);
	
	//determina il numero di espositori da generare in base al numero di giocatori
	var nEspositori = (nGiocatori * 2) + 1;

	/**
	 * 
	 * Cicla per il numero di espositori determinati dal calcolo precedente, per ognuno dei quali:
	 * 
	 * - var espositore, crea un espositore (passa il padre [tavolo],
	 * 										il tipo di elemento [ELEMENTO_HTML -> <DIV>],
	 * 										la classe css di un espositore [CLASSE_ESPOSITORE] -> "espositore")
	 * 										la funzione legata ad ogni espositore [setEspositore()]
	 * 
	 * - crea LayoutEspositore: crea, in base all'espositore in cui si trova il ciclo ed il numero di
	 * 							espositori totali, il layout in modo da disporre circolarmente gli espositori
	 * 							sul campo da gioco; naturalmente passiamo anche l'elemento stesso per settarne
	 * 							le posizioni rispetto al padre "tavolo"
	 * 
	 */

	for (var nEspositore = 0; nEspositore < nEspositori; nEspositore++) {
		var espositore = creazioneComponente(tavolo, ELEMENTO_HTML, CLASSE_ESPOSITORE, setEspositore(espositore, nEspositore));
		creaLayoutEspositore(espositore, nEspositore, nEspositori);
	}
}

/* Funzione - Imposta le posizioni di ciascun espositore (dispongo gli espositori per formare una circonferenza) */
function creaLayoutEspositore(espositore, nEspositore, nEspositori) {
	
	/* Variabili - 1. 		Calcola l'angolo della circonferenza corrispondente al singolo espositore
	 * 			   2. 		Converte l'angolo ottenuto da decimale a radianti
	 * 			   3 - 4.	Trova lo spostamento orizzontale e verticale da applicare al singolo espositore
	 */
	
	//sad calcoli matematici 

	var angoloNum = ((ANGOLO_GIRO * nEspositore) / nEspositori) - ANGOLO_RETTO;
	var angoloRad = (angoloNum * Math.PI) / ANGOLO_PIATTO;
	var spostamentoX = (1 + Math.cos(angoloRad)) / 2;
	var spostamentoY = (1 + Math.sin(angoloRad)) / 2;
	
	/* CSS - Imposta le coordinate (assolute) dove posizionare il singolo espositore */
	espositore.style.top = (spostamentoY * PERCENTUALE_CERCHIO) + PERCENTUALE;
	espositore.style.left = (spostamentoX * PERCENTUALE_CERCHIO) + PERCENTUALE;
}

/* Funzione - Imposta i vari eventi legati all'elemento con la classe "tavolo" */
function aggiungiEventiTavolo(tavolo) {
	
	/* Variabile - Ottiene gli elementi "figli" dell'elemento con la classe "tavolo" */
	var componenti = tavolo.children;

	/* For Each BLOCCANTE - Per ciascun elemento figlio dell'elemento
	 con la classe "tavolo", le aggiunge l'animazione dello zoom */

	Array.from(componenti).forEach(function(componente) {
		componente.addEventListener(EVENTO_CLICK, function() {			
			eventoZoom(tavolo, componente, componenti);
		});
	});
}

/* Funzione - Imposta l'effetto dello zoom sul singolo componente con il click del mouse */
function eventoZoom(tavolo, componente, componenti) {
	
	/* Condizione - Verifica che il componente non sia stato cliccato
	 *				- ALLORA gestisce l'elemento selezionato e disattiva tutti gli altri (con z-index = -1)
	 */
	 
	if (!componente.classList.contains(CLASSE_CLICKED)) {
		
		/* Variabili - 1. 		Calcola la percentuale da applicare per zoomare (in larghezza)
		 * 			   2. 		Calcola la percentuale da applicare per zoomare (in altezza)
		 * 			   3.		Verifica quale delle 2 percentuali sia la minore e la riduce del 10%
		 */
	 
		var zoomWidth = tavolo.clientWidth / componente.offsetWidth;	/* INFO: componente.offsetWidth		=	componente.clientWidth	+	margin	+	padding	+	border	*/
		var zoomHeight = tavolo.clientHeight / componente.offsetHeight;	/* INFO: componente.offsetHeight	=	componente.clientHeight	+	margin	+	padding	+	border	*/
		var zoom = Math.min(zoomWidth, zoomHeight);
		zoom *= PERCENTUALE_ZOOM;
		
		/* 
		
			For Each BLOCCANTE - Per ciascun elemento figlio dell'elemento
			con la classe "tavolo", mette in secondo piano (con z-index = -1) 
		
		*/
		
		 Array.from(componenti).forEach(function(comp) {
			comp.classList.add(CLASSE_UNCLICKED);
		});
		
		/* 
		
			CSS - Imposta l'effetto dello zoom, toglie la classe "unclicked"
			e aggiunge la classe "clicked" all'elemento 
			
		*/

		componente.style.transform = "translate(-50%, -50%) scale(" + zoom + "," + zoom + ")";
		componente.classList.remove(CLASSE_UNCLICKED);
		componente.classList.add(CLASSE_CLICKED);
		
		/* 
		
			CSS - Crea l'effetto dell'ombreggiatura nel secondo piano 
			(facendo risaltare l'elemento in primo piano) 
			
		*/

		tavolo.style.background = COLORE_OMBREGGIATURA;
		 
		/**
		 * 
		 * Arrivati a questo punto abbiamo settato a tutti gli elementi figli del 
		 * tavolo (ogni cosa praticamente) un evento che avvicini l'elemento all'utente
		 * ingrandendolo, per permetterne l'interazione.
		 * Mancha però la possibilità, una volta avvenuta l'interazione, di tornare 
		 * al tavolo, riducendo lo zoom: ecco, la funzione creaBottoneIndietro()
		 * garantisce ciò, aggiungendo una freccia [<-] in alto a destra, per ridurre 
		 * nuovamente l'oggetto
		 * 
		 */

		creaBottoneIndietro(tavolo, componente, componenti);

	}
}

/* Funzione - Crea un bottone per uscire dalla schermata dell'ingrandimento dell'elemento e le aggiunge l'evento */
function creaBottoneIndietro(tavolo, componente, componenti) {
	
	/**
	 * 
	 * Variabile - Creazione, salvataggio ed aggiunta del bottone 
	 * all'elemento con la classe "tavolo" per tornare alla schermata
	 * precedente (è un'immagine SVG) 
	 * 
	 */

	//crea il componente con la solita funzione 
	var bottone = creazioneComponente(tavolo, ELEMENTO_IMMAGINE, CLASSE_BOTTONE_INDIETRO, null);
	
	//aggiunge l'immagine di sfondo al pulsante appena creato
	bottone.src = PERCORSO_BOTTONE_INDIETRO;
	
	//aggiunge l'azione stessa di chiusura sul click al pulsante'id', 'espositore_' + i);
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

/**
 * 
 * Evento - Al caricamento della pagina, ricerco se esistono
 * degli elementi con la classe "tavolo" 
 * e gli inserisco all'interno il DOM personalizzato
 * 
 */

window.addEventListener(EVENTO_LOAD, ricercaTavoli);	

/**
 * 
 * INFO: Bisogna invocare il metodo "addEventListener()" 
 * perché altrimenti con il metodo "onload()" 
 * solo un file riesce ad invocarlo 
 * 
 * */  
