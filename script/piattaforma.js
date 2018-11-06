/* TODO: rifattorizzare codice */
/* TODO: cambiare nomi (metterne di più corti nelle funzioni, cambiarli per alcune variabili) */
/* TODO: migliorare leggibilità codice (fare un refactoring del codice) */
/* TODO: aggiungere le animazioni di transizione delle piastrelle */

/* TODO: Aggiornare il numero delle righe */
/* TODO: Rimuovere tutti gli eventuali TODO nel programma */

/* piattaforma.js
 * Questo file serve per creare la piattaforma per il gioco da tavolo Azul.
 * Dopo aver importato questo file nel documento HTML, si può creare la piattaforma con due modalità:
 * - creando un elemento con la classe "piattaforma";
 * - chiamando la funzione "creaPiattaforma(<elemento HTML>).
 * 
 * Qui di seguito è descritta la struttura del file.
 *
 *	piattaforma.js																		RIGA
 *      |
 *    	|
 *    	|------	Costanti													 			 ?
 *		|			|
 *		|			|--	N_RIGHE
 *		|			|--	PRIMA_CELLA_PUNTEGGIO
 *		|			|--	ULTIMA_CELLA_PUNTEGGIO
 *		|			|--	ULTIMA_CELLA_PARETE
 *		|			|--	NUMERO_CELLE_BASAMENTO
 *		|			|--	IMMAGINE_SFONDO_RIGHE
 *		|			|--	IMMAGINI_PIASTRELLE
 *		|			|--	IMMAGINE_SFONDO_BASAMENTO
 *		|			|--	DURATA_ANIMAZIONE
 *		|			|--	VALORI_BASAMENTO
 *    	|
 *    	|------	Funzioni
 *		|			|
 *		|			|--	ricercaPiattaforme()											 ?
 *		|			|--	creaPiattaforma(element)										 ?
 *		|			|--	creaRighe(element)												 ?
 *		|			|--	creaParete(element)												 ?
 *		|			|--	creaBasamento(element)											 ?
 *		|			|--	TODO: da finire
 *		|
 *		|------	Eventi
 *					|
 *					|--	elemento: window	evento: 'load'								 ?
 */

/*
TODO: migliorare leggibilità codice
TODO: finire
*/

/* Costanti - Classi CSS */
const CLASSE_PUNTEGGIO = "punteggio";
const CLASSE_PUNTEGGIO_RIGA = "punteggio-riga";
const CLASSE_PUNTEGGIO_CELLA = "punteggio-cella";

const CLASSE_RIGHE = "righe";
const CLASSE_RIGHE_RIGA = "righe-riga";
const CLASSE_RIGHE_CELLA = "righe-cella";

const CLASSE_PARETE = "parete";
const CLASSE_PARETE_RIGA = "parete-riga";
const CLASSE_PARETE_CELLA = "parete-cella";
const CLASSE_PARETE_CELLA_SELEZIONATA = "parete-cella-selezionata";

const CLASSE_BASAMENTO = "basamento";
const CLASSE_BASAMENTO_RIGA = "basamento-riga";
const CLASSE_BASAMENTO_CELLA = "basamento-cella";
const CLASSE_BASAMENTO_CELLA_IMMAGINE = "basamento-cella-immagine";
const CLASSE_BASAMENTO_CELLA_ETICHETTA = "basamento-cella-etichetta";
const CLASSE_BASAMENTO_PUNTEGGIO = "basamento-punteggio";

const CLASSE_ERRORE_INSERIMENTO_PIASTRELLA = "errore-inserimento-piastrella";

/* Costanti - Numeri */
const N_RIGHE = 5;
const N_COLONNE_PUNTEGGIO = 20;
const N_COLONNE_PARETE = 5;
const N_COLONNE_BASAMENTO = 7;

/* Costanti - Nomi delle immagini */
const IMMAGINE_SFONDO_PUNTEGGIO = "image/sfondo_punteggio.svg";
const IMMAGINE_SFONDO_PUNTEGGIO_ETICHETTA = "image/sfondo_punteggio_etichetta.svg";
const IMMAGINE_SFONDO_RIGHE = "image/sfondo_righe.svg";
const IMMAGINI_PIASTRELLE =	[	"image/piastrella1.svg",
								"image/piastrella2.svg",
								"image/piastrella3.svg",
								"image/piastrella4.svg",
								"image/piastrella5.svg",
								"image/piastrella6.svg"	];
const IMMAGINE_SFONDO_BASAMENTO = "image/sfondo_basamento.svg";
								
/* Costante - Durata animazione */
const DURATA_ANIMAZIONE = 500;

/* Costante - Vettore valori basamento */
const VALORI_BASAMENTO =	[	-1,
								-1,
								-2,
								-2,
								-2,
								-3,
								-3	];

var righeLogica = new Array();
var pareteLogica = new Array();

/* Funzione - Ricerca gli elementi con la classe "piattaforma" e gli aggiunge il DOM e i relativi eventi */
function ricercaPiattaforme() {
		
	/* Variabili - Salvataggio del document e delle sezioni con classe "piattaforma" inserite nell'HTML */
	var doc = this.document;
	var piattaforme = document.body.getElementsByClassName(CLASSE_PIATTAFORMA);
	
	/* For Each BLOCCANTE - Per ciascun elemento con la classe "piattaforma", le aggiungo il DOM e gli eventi */
	Array.from(piattaforme).forEach(function(piattaforma) {
		creaPiattaforma(piattaforma);
		aggiungiEventiPiattaforma(piattaforma);
	});
}

/* Funzione - Creazione e posizionamento delle varie sezioni della piattaforma (punteggio, righe, parete e basamento) */
function creaPiattaforma(piattaforma) {
	
	/* Variabili - Creazione, salvataggio ed aggiunta delle sezioni del tavolo */
	var punteggio = creazioneComponente(piattaforma, ELEMENTO_HTML, CLASSE_PUNTEGGIO, creaPunteggio);
	var righe = creazioneComponente(piattaforma, ELEMENTO_HTML, CLASSE_RIGHE, creaRighe);
	var parete = creazioneComponente(piattaforma, ELEMENTO_HTML, CLASSE_PARETE, creaParete);
	var basamento = creazioneComponente(piattaforma, ELEMENTO_HTML, CLASSE_BASAMENTO, creaBasamento);
	
	/* TODO: rifare questa sezione di codice D: */
	/* Funzioni - Creazione parte logica delle 2 sezioni ("righe" e "parete") */
	inizializzaPareteLogica();
	caricaPareteGrafica(parete);
	
	inizializzaRigheLogica();
}

/* Funzione - Creazione GUI per la sezione "punteggio" (parte superiore) */
function creaPunteggio(punteggio) {
	var idCella = 0;
	
	var elemRiga = null;
	var elemCella = null;
	
	elemRiga = creazioneComponente(punteggio, ELEMENTO_HTML, CLASSE_PUNTEGGIO_RIGA, null);
	elemCella = creazioneComponente(elemRiga, ELEMENTO_IMMAGINE, CLASSE_PUNTEGGIO_CELLA, null);
	elemCella.id = "punteggio-" + idCella++;
	elemCella.src = IMMAGINE_SFONDO_PUNTEGGIO_ETICHETTA;
	elemCella.innerHTML = idCella;
	
	for (var nRiga = 0; nRiga < N_RIGHE; nRiga++) {
		var elemRiga = creazioneComponente(punteggio, ELEMENTO_HTML, CLASSE_PUNTEGGIO_RIGA, null);
		
		for (var nCella = 0; nCella < N_COLONNE_PUNTEGGIO; nCella++) {
			var elemCella = creazioneComponente(elemRiga, ELEMENTO_IMMAGINE, CLASSE_PUNTEGGIO_CELLA, null);
			elemCella.id = "punteggio-" + idCella++;
			
			if ((idCella % 5) == 0) {
				elemCella.src = IMMAGINE_SFONDO_PUNTEGGIO_ETICHETTA;
				elemCella.innerHTML = idCella;
			} else {
				elemCella.src = IMMAGINE_SFONDO_PUNTEGGIO;
			}
		}
	}
}

/* Funzione - Creazione GUI per la sezione "righe" (parte centrale a sinistra) */
function creaRighe(righe) {	
	var idCella = 0;
	
	for (var nRiga = 0; nRiga < N_RIGHE; nRiga++) {
		var elemRiga = creazioneComponente(righe, ELEMENTO_HTML, CLASSE_RIGHE_RIGA, null);
		
		for (var nCella = 0; nCella < nRiga+1; nCella++) {
			var elemCella = creazioneComponente(elemRiga, ELEMENTO_IMMAGINE, CLASSE_RIGHE_CELLA, null);
			elemCella.id = "righe-" + idCella++;
			elemCella.src = IMMAGINE_SFONDO_RIGHE;
		}
	}
}

/* Funzione - Creazione GUI per la sezione "parete" (parte centrale a destra) */
function creaParete(parete) {
	for (var nRiga = 0; nRiga < N_RIGHE; nRiga++) {
		var elemRiga = creazioneComponente(parete, ELEMENTO_HTML, CLASSE_PARETE_RIGA, null);
		var idCella = 0;
 
		for (var nCella = 0; nCella < N_COLONNE_PARETE; nCella++){
			var elemCella = creazioneComponente(elemRiga, ELEMENTO_IMMAGINE, CLASSE_PARETE_CELLA, null);
			elemCella.id = "parete-" + idCella++;
			elemCella.src = IMMAGINI_PIASTRELLE[(nCella + (nRiga * (N_COLONNE_PARETE - 1))) % N_COLONNE_PARETE];	/* TODO: semplificare */
		}
	}
}

/* Funzione - Creazione GUI per la sezione "basamento" (parte inferiore) */
function creaBasamento(basamento) {
	var basamentoRiga = creazioneComponente(basamento, ELEMENTO_HTML, CLASSE_BASAMENTO_RIGA, null);
	var basamentoPunteggio = creazioneComponente(basamento, ELEMENTO_HTML, CLASSE_BASAMENTO_PUNTEGGIO, null);

	for (var nCella = 0; nCella < N_COLONNE_BASAMENTO; nCella++) {
		var elemCella = creazioneComponente(basamentoRiga, ELEMENTO_HTML, CLASSE_BASAMENTO_CELLA, null);
		elemCella.id = "basamento-" + nCella;
		
		var elemImmagine = creazioneComponente(elemCella, ELEMENTO_IMMAGINE, CLASSE_BASAMENTO_CELLA_IMMAGINE, null);
		elemImmagine.src = IMMAGINE_SFONDO_BASAMENTO;
		
		var elemEtichetta = creazioneComponente(elemCella, ELEMENTO_HTML, CLASSE_BASAMENTO_CELLA_ETICHETTA, null);
		elemEtichetta.innerHTML = VALORI_BASAMENTO[nCella];
	}
}

/* TODO: collegare con il tavolo (per l'espositore) */
/* MERGE: collegamento con l'espositore */
/* Funzione - Creazione evento per la sezione "punteggio" */
function aggiungiEventiPiattaforma(piattaforma) {
	var righe = piattaforma.getElementsByClassName(CLASSE_RIGHE)[0];
	var parete = piattaforma.getElementsByClassName(CLASSE_PARETE)[0];
	var celle = righe.getElementsByClassName(CLASSE_RIGHE_CELLA);
	
	Array.from(celle).forEach(function(cella) {
		cella.addEventListener(EVENTO_CLICK, function() {
			var infoCella = getInfoCella(cella, CLASSE_RIGHE_CELLA);
			eventoRighe(righe, parete, infoCella);
		});
	});
}

/* Funzione - Restituisce un oggetto in base alla classe inserita (secondo parametro) */
function getInfoCella(cella, classe) {
	var ret = null;
	
	switch (classe) {
		case CLASSE_RIGHE_CELLA: 	ret = getInfoCellaRighe(cella);
									break;
		case CLASSE_PARETE_CELLA: 	ret = getInfoCellaParete(cella);
									break;
	}
	
	return ret;
}

/* Funzione - Restituisce un oggetto in cui scrive il numero di riga e colonna della cella (nella sezione "righe") */
function getInfoCellaRighe(cella) {
	var infoCella = {nRiga: 0, nColonna: 0}
	var posizione = cella.id.split('-')[1];
	var nRiga = 1;	/* ATTENZIONE: Il numero triangolare parte da 1 e il vettore parte da 0 */
	var nColonna = 0;

	/* TODO: semplificare (orrible) */
	while (posizione >= numero_triangolare(nRiga))
		nRiga++;
	
	infoCella.nRiga = nRiga - 1;
	infoCella.nColonna = posizione - numero_triangolare(nRiga - 1);
	
	return infoCella;
}

/* Funzione - Restituisce un oggetto in cui scrive il numero di riga e colonna della cella (nella sezione "parete") */
function getInfoCellaParete(cella) {
	var infoCella = {nRiga: 0, nColonna: 0}
	var posizione = cella.id.split('-')[1];
	
	infoCella.nRiga = posizione / N_COLONNE_PARETE;
	infoCella.nColonna = posizione % N_COLONNE_PARETE;
	
	return infoCella;
}

/* TODO: descrizione */
/* TODO: semplificare */
function eventoRighe(righe, parete, infoCella) {
	var piastrella = prompt("Quale cella? (1-5)"); piastrella--;
	
	if (piastrella != null && piastrella >= 0 && piastrella <= 4) {
		var nRiga = infoCella.nRiga;
		var nColonna = infoCella.nColonna;
				
		/* TODO: nella merge, modificare i metodi dentro la IF (adattandoli alla modifica della variabile piastrella)*/
		if (controlloPiastrella(infoCella, piastrella, righe, parete)) {
			aggiungiPiastrella(righe, nRiga, piastrella);
					
			if (isRigaPiena(nRiga)) {
				svuotaRiga(righe, nRiga);
				inserisciPiastrella(nRiga, piastrella, parete);
			}
		}
	}
}

/* Funzione - Calcolo del numero triangolare (per sapere il numero della cella) */
function numero_triangolare(num) {
	return ((num * (num + 1)) / 2);
}

/* TODO: migliorare leggibilità codice */
/* Funzione - Controlla se si può inserire la piastrella nella riga selezionata */
function controlloPiastrella(infoCella, piastrella, righe, parete) {
	var nRiga = infoCella.nRiga;
	var nColonna = infoCella.nColonna;
	var controlli = {controlloRiga: true, controlloRighe: true, controlloParete: true};
	
	var celleRighe = righe.getElementsByClassName(CLASSE_RIGHE_CELLA);
	var celleParete = parete.getElementsByClassName(CLASSE_PARETE_CELLA);
	
	/* CICLO: verifica che si possa inserire inserire la piastrella guardando le altre colonne della riga (sezione "righe") */
	for (var colonnaLogica = 0; colonnaLogica < (nRiga + 1); colonnaLogica++) {
		var cellaRighe = righeLogica[nRiga][colonnaLogica];
		
		if (cellaRighe != null && cellaRighe != piastrella) {
			controlli.controlloRiga = false;
			animazioneErrore(celleRighe, (numero_triangolare(nRiga) + colonnaLogica));
			
			break;
		}
	}

	/* CICLO: verifica che si possa inserire inserire la piastrella guardando le altre righe (sezione "righe") */
	for (var nRigaControllo = 0; nRigaControllo < N_RIGHE; nRigaControllo++) {
		var cellaRighe = righeLogica[nRigaControllo][nRigaControllo];
		
		if (nRiga != nRigaControllo && cellaRighe != null && cellaRighe == piastrella) {
			controlli.controlloRighe = false;
			animazioneErrore(celleRighe, (numero_triangolare(nRigaControllo) + nRigaControllo));
			
			break;
		}
	}
		
	/* CICLO: verifica che si possa inserire inserire la piastrella guardando la sezione "parete" */
	for (var nColonnaControllo = 0; nColonnaControllo < N_COLONNE_PARETE; nColonnaControllo++) {
		var cellaRighe = pareteLogica[nRiga][nColonnaControllo];
		
		if (cellaRighe != null && ((cellaRighe == 1) && (((nColonnaControllo + (nRiga * (N_RIGHE - 1))) % N_RIGHE) == piastrella))) {
			controlli.controlloParete = false;
			animazioneErrore(celleParete, ((nRiga * N_RIGHE) + nColonnaControllo));
			
			break;
		}
	}

	return (controlli.controlloRiga && controlli.controlloRighe && controlli.controlloParete);
}

/* TODO: modificare CSS collegato */
/* Funzione - Animazione per azioni non permesse */
function animazioneErrore(vettore, nCella) {
	vettore[nCella].classList.add(CLASSE_ERRORE_INSERIMENTO_PIASTRELLA);
	
	/* Funzione: aspetta DURATA_ANIMAZIONE ms prima di eseguire la funzione al suo interno */
	setTimeout(function() {
		vettore[nCella].classList.remove(CLASSE_ERRORE_INSERIMENTO_PIASTRELLA);
	}, DURATA_ANIMAZIONE);
}

/* TODO: migliorare leggibilità codice */
/* Funzione - Aggiunge una piastrella in fondo alla riga selezionata (sezione "righe") */
function aggiungiPiastrella(righe, nRiga, piastrella) {
	var vettoreRighe = righe.getElementsByClassName(CLASSE_RIGHE_CELLA);
	
	for (var nColonnaControllo = nRiga; nColonnaControllo >= 0; nColonnaControllo--)
		if (righeLogica[nRiga][nColonnaControllo] == null) {
			vettoreRighe[numero_triangolare(nRiga) + nColonnaControllo].style.opacity = 1;
			vettoreRighe[numero_triangolare(nRiga) + nColonnaControllo].src = IMMAGINI_PIASTRELLE[piastrella];
			righeLogica[nRiga][nColonnaControllo] = piastrella;
			
			break;
		}
}

/* TODO: migliorare leggibilità codice */
/* Funzione - Verifica che la riga sia piena (sezione "righe") */
function isRigaPiena(nRiga) {
	var ret = true;
	
	for (var nColonna = 0; nColonna < (nRiga + 1); nColonna++) {
		if (righeLogica[nRiga][nColonna] == null)
			ret = false;
	}
	
	return ret;
}

/* TODO: migliorare leggibilità codice */
/* Funzione - Toglie tutte le piastrelle dalla riga selezionata (sezione "righe") */
function svuotaRiga(righe, nRiga) {
	var vettoreRighe = righe.getElementsByClassName(CLASSE_RIGHE_CELLA);
	
	for (var nColonna = 0; nColonna < (nRiga + 1); nColonna++) {
		vettoreRighe[numero_triangolare(nRiga) + nColonna].style.opacity = 0.5;
		vettoreRighe[numero_triangolare(nRiga) + nColonna].src = IMMAGINE_SFONDO_RIGHE;
		righeLogica[nRiga][nColonna] = null;
	}
}

/* TODO: migliorare leggibilità codice */
/* Funzione - Inserisce una piastrella nella sezione "parete" */
function inserisciPiastrella(nRiga, piastrella, parete) {
	var vettoreParete = parete.getElementsByClassName(CLASSE_PARETE_CELLA);
	
	pareteLogica[nRiga][(piastrella + nRiga) % N_RIGHE] = 1;
	vettoreParete[((nRiga) * N_RIGHE) + ((piastrella + nRiga) % N_RIGHE)].classList.add(CLASSE_PARETE_CELLA_SELEZIONATA);
}

/* TODO: migliorare leggibilità codice */
/* TODO: inserire una descrizione */
function inizializzaRigheLogica(){
	for (var nRiga = 0; nRiga < N_RIGHE; nRiga++) {
		righeLogica[nRiga] = new Array();
		
		for (var nColonna = 0; nColonna < (nRiga + 1); nColonna++)
			righeLogica[nRiga][nColonna] = null;
	}
}

/* TODO: migliorare leggibilità codice */
/* TODO: inserire una descrizione */
function inizializzaPareteLogica(){
	for (var i = 0; i < N_RIGHE; i++) {
		pareteLogica[i] = new Array();
		
		for (var j = 0; j < N_RIGHE; j++)
			pareteLogica[i][j] = null;
	}
}

/* TODO: migliorare leggibilità codice */
/* TODO: inserire una descrizione */
function caricaPareteGrafica(parete){
	var celle = parete.getElementsByClassName(CLASSE_PARETE_CELLA);
	let index = 0;
	for (let riga = 0; riga < N_RIGHE; riga++)
		for (let col = 0; col < N_RIGHE; col++) {
			if (pareteLogica[riga][col] == 1){
				celle[index].classList.add(CLASSE_PARETE_CELLA_SELEZIONATA);
			}
			
			index++;
		}
}

/* Evento - Al caricamento della pagina, ricerco se esistono degli elementi con la classe "piattaforma" e gli inserisco all'interno il DOM personalizzato */
window.addEventListener(EVENTO_LOAD, ricercaPiattaforme);	/* INFO: Bisogna invocare il metodo "addEventListener()" perché altrimenti con il metodo "onload()" solo un file riesce ad invocarlo */