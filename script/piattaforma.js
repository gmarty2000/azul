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

/* Costanti - Nomi degli attributi */
const ATTRIBUTO_RIGA = 'data-row';
const ATTRIBUTO_COLONNA = 'data-col';

var righeLogica = new Array();
var pareteLogica = new Array();

/* Funzione - Ricerca gli elementi con la classe "piattaforma" e gli aggiunge il DOM e i relativi eventi */
function ricercaPiattaforme() {
	
	/* Variabile - Salvataggio dell'HTML document nella variabile doc */
	var doc = this.document;
	
	/* Array - Salvataggio degli elementi con la classe "piattaforma" (nel DOM della pagina HTML iniziale) */
	var piattaforme = document.body.getElementsByClassName(Classe.PIATTAFORMA.nome);
	
	/* For Each BLOCCANTE - Per ciascun elemento con la classe "piattaforma", le aggiungo il DOM e gli eventi */
	Array.from(piattaforme).forEach(function(piattaforma) {
		setPiattaforma(piattaforma);
		aggiungiEventiPiattaforma(piattaforma);
	});
}

/* Funzione - Creazione e posizionamento delle varie sezioni della piattaforma (punteggio, righe, parete e basamento) */
function setPiattaforma(piattaforma) {
	
	/* Variabili - Creazione, salvataggio ed aggiunta delle sezioni del tavolo */
	var punteggio = creazioneComponente(piattaforma, ELEMENTO_HTML, Classe.PIATTAFORMA.PUNTEGGIO.nome, null, setPunteggio);
	var righe = creazioneComponente(piattaforma, ELEMENTO_HTML, Classe.PIATTAFORMA.RIGHE.nome, null, setRighe);
	var parete = creazioneComponente(piattaforma, ELEMENTO_HTML, Classe.PIATTAFORMA.PARETE.nome, null, setParete);
	var basamento = creazioneComponente(piattaforma, ELEMENTO_HTML, Classe.PIATTAFORMA.BASAMENTO.nome, null, setBasamento);
	
	/* TODO: rifare questa sezione di codice D: */
	/* Funzioni - Creazione parte logica delle 2 sezioni ("righe" e "parete") */
	inizializzaPareteLogica();
	caricaPareteGrafica(parete);
	
	inizializzaRigheLogica();
}

/* Funzione - Creazione GUI per la sezione "punteggio" (parte superiore) */
function setPunteggio(punteggio) {

	/* Variabile - L'id della cella */
	var idCella = 0;
	
	/* Variabile - L'elemento riga della "tabella" della sezione "punteggio" */
	var elemRiga = creazioneComponente(punteggio, ELEMENTO_HTML, Classe.PIATTAFORMA.PUNTEGGIO.RIGA.nome, null, null);
	
	/* Proprietà JS - Alla prima riga le imposto la larghezza */
	elemRiga.style.width = '5%';

	/* Variabile - L'elemento cella della "tabella" della sezione "punteggio" */
	var elemCella = creazioneComponente(elemRiga, ELEMENTO_IMMAGINE, Classe.PIATTAFORMA.PUNTEGGIO.CELLA.nome, null, null);

	/* Proprietà JS - Imposto le proprietà dell'elemento */
	elemCella.id = "punteggio-" + idCella++;
	elemCella.src = IMMAGINE_SFONDO_PUNTEGGIO_ETICHETTA;
	elemCella.innerHTML = idCella;

	/* Attributi HTML - Aggiungo 2 attributi HTML alla cella (elemCella) */
	aggiungiAttributo(elemCella, ATTRIBUTO_RIGA, 0);
	aggiungiAttributo(elemCella, ATTRIBUTO_COLONNA, 0);
	
	/* Doppio ciclo - Creo una riga, la collego alla sezione "punteggio" e dentro questa riga le collego N_COLONNE_PUNTEGGIO celle */
	for (var nRiga = 0; nRiga < N_RIGHE; nRiga++) {
		var elemRiga = creazioneComponente(punteggio, ELEMENTO_HTML, Classe.PIATTAFORMA.PUNTEGGIO.RIGA.nome, null, null);
		
		for (var nCella = 0; nCella < N_COLONNE_PUNTEGGIO; nCella++) {
			var elemCella = creazioneComponente(elemRiga, ELEMENTO_IMMAGINE, Classe.PIATTAFORMA.PUNTEGGIO.CELLA.nome, 'punteggio-' + idCella++, null);
			
			/* Attributi HTML - Aggiungo 2 attributi HTML alla cella (elemCella) */
			aggiungiAttributo(elemCella, ATTRIBUTO_RIGA, nRiga + 1);
			aggiungiAttributo(elemCella, ATTRIBUTO_COLONNA, nCella);

			/* Condizione -	Verifico se l'id della cella è un multiplo di 5
			 * - ALLORA			-->	Modifico lo sfondo e stampo a video il numero
			 * - ALTRIMENTI		--> Imposto lo sfondo normale
			 */
			if ((idCella % 5) == 0) {
				elemCella.src = IMMAGINE_SFONDO_PUNTEGGIO_ETICHETTA;
				elemCella.innerHTML = idCella;
			} else
				elemCella.src = IMMAGINE_SFONDO_PUNTEGGIO;
		}
	}
}

/* Funzione - Creazione GUI per la sezione "righe" (parte centrale a sinistra) */
function setRighe(righe) {

	/* Variabile - L'id della cella */
	var idCella = 0;

	/* Doppio ciclo - Creo una riga, la collego alla sezione "righe" e dentro questa riga le collego nRiga + 1 celle */
	for (var nRiga = 0; nRiga < N_RIGHE; nRiga++) {
		var elemRiga = creazioneComponente(righe, ELEMENTO_HTML, Classe.PIATTAFORMA.RIGHE.RIGA.nome, null, null);
		
		for (var nCella = 0; nCella < nRiga + 1; nCella++) {
			var elemCella = creazioneComponente(elemRiga, ELEMENTO_IMMAGINE, Classe.PIATTAFORMA.RIGHE.CELLA.nome, 'righe-' + idCella++, null);
			elemCella.src = IMMAGINE_SFONDO_RIGHE;
			
			/* Attributi HTML - Aggiungo 2 attributi HTML alla cella (elemCella) */
			aggiungiAttributo(elemCella, ATTRIBUTO_RIGA, nRiga);
			aggiungiAttributo(elemCella, ATTRIBUTO_COLONNA, nCella);
		}
	}
}

/* Funzione - Creazione GUI per la sezione "parete" (parte centrale a destra) */
function setParete(parete) {

	/* Doppio ciclo - Creo una riga, la collego alla sezione "parete" e dentro questa riga le collego N_COLONNE_PARETE celle */
	for (var nRiga = 0; nRiga < N_RIGHE; nRiga++) {
		var elemRiga = creazioneComponente(parete, ELEMENTO_HTML, Classe.PIATTAFORMA.PARETE.RIGA.nome, null, null);
		var idCella = 0;
 
		for (var nCella = 0; nCella < N_COLONNE_PARETE; nCella++) {
			var elemCella = creazioneComponente(elemRiga, ELEMENTO_IMMAGINE, Classe.PIATTAFORMA.PARETE.CELLA.nome, 'parete-' + idCella++, null);
			elemCella.src = IMMAGINI_PIASTRELLE[(nCella + (nRiga * (N_COLONNE_PARETE - 1))) % N_COLONNE_PARETE];	/* TODO: semplificare */
			
			/* Attributi HTML - Aggiungo 2 attributi HTML alla cella (elemCella) */
			aggiungiAttributo(elemCella, ATTRIBUTO_RIGA, nRiga);
			aggiungiAttributo(elemCella, ATTRIBUTO_COLONNA, nCella);
		}
	}
}

/* Funzione - Creazione GUI per la sezione "basamento" (parte inferiore) */
function setBasamento(basamento) {

	/* Variabile - La sezione "riga" del basamento */
	var basamentoRiga = creazioneComponente(basamento, ELEMENTO_HTML, Classe.PIATTAFORMA.BASAMENTO.RIGA.nome, null, null);

	/* Variabile - La sezione "punteggio" del basamento */
	var basamentoPunteggio = creazioneComponente(basamento, ELEMENTO_HTML, Classe.PIATTAFORMA.BASAMENTO.PUNTEGGIO.nome, null, null);

	/* Doppio ciclo - Creo N_COLONNE_BASAMENTO sezioni (dentro la sezione "riga" del "basamento") e le inserisco un'immagine ed un'etichetta */
	for (var nCella = 0; nCella < N_COLONNE_BASAMENTO; nCella++) {

		/* Variabile - L'elemento HTML corrispondente alla singola sezione interna alla sezione "riga" dentro il "basamento" */
		var elemCella = creazioneComponente(basamentoRiga, ELEMENTO_HTML, Classe.PIATTAFORMA.BASAMENTO.CELLA.nome, 'basamento-' + nCella, null);
		
		/* Variabile - L'elemento HTML corrispondente alla singola immagine interna alla sezione (creata precedentemente) */
		var elemImmagine = creazioneComponente(elemCella, ELEMENTO_IMMAGINE, Classe.PIATTAFORMA.BASAMENTO.CELLA_IMMAGINE.nome, null, null);
		elemImmagine.src = IMMAGINE_SFONDO_BASAMENTO;
		
		/* Variabile - L'elemento HTML corrispondente alla singola etichetta interna alla sezione (creata precedentemente) */
		var elemEtichetta = creazioneComponente(elemCella, ELEMENTO_HTML, Classe.PIATTAFORMA.BASAMENTO.CELLA_ETICHETTA.nome, null, null);
		elemEtichetta.innerHTML = VALORI_BASAMENTO[nCella];
	}
}

/* TODO: collegare con il tavolo (per l'espositore) */
/* MERGE: collegamento con l'espositore */
/* Funzione - Creazione evento per la sezione "punteggio" */
function aggiungiEventiPiattaforma(piattaforma) {

	/* Variabile - Ottengo la sezione "righe" (dalla piattaforma) */
	var righe = piattaforma.getElementsByClassName(Classe.PIATTAFORMA.RIGHE.nome)[0];

	/* Variabile - Ottengo la sezione "parete" (dalla piattaforma) */
	var parete = piattaforma.getElementsByClassName(Classe.PIATTAFORMA.PARETE.nome)[0];

	/* Array - Ottengo le celle della sezione "righe" (interna alla piattaforma) */
	var celle = righe.getElementsByClassName(Classe.PIATTAFORMA.RIGHE.CELLA.nome);

	/* For Each BLOCCANTE - Per ciascuna cella dentro la sezione "righe", le aggiungo l'evento */
	Array.from(celle).forEach(function(cella) {

		/* Listener - Aggiungo l'evento "click" all'elemento cella */
		cella.addEventListener(EVENTO_CLICK, function() {

			/* Variabile - Salvo le informazioni utili della cella dentro ad un apposito oggetto */
			var infoCella = getInfoCella(cella);

			/* Evento - L'evento della cella dentro la sezione "righe" */
			eventoRighe(righe, parete, infoCella);
		});
	});
}

/* Funzione - Restituisce un oggetto in cui scrive il numero di riga e colonna della cella */
function getInfoCella(cella) {

	/* Oggetto - Salvo il numero della riga e della colonna */
	var ret = {		nRiga: 		parseInt(ottieniAttributo(cella, ATTRIBUTO_RIGA)),
					nColonna: 	parseInt(ottieniAttributo(cella, ATTRIBUTO_COLONNA))		};
	
	/* Return - Restituisco l'oggetto contenente il numero della riga e della colonna */
	return ret;
}

/* Evento - Quando clicco una piastrella, si attiva questa funzione */
function eventoRighe(righe, parete, infoCella) {
	var piastrella = prompt("Quale cella? (1-5)"); piastrella--;
	
	if (piastrella != null && piastrella >= 0 && piastrella <= 4) {

		/* Variabile - Salvo il valore del numero della riga */
		var nRiga = infoCella.nRiga;

		/* Variabile - Salvo il valore del numero della colonna */
		var nColonna = infoCella.nColonna;

		/* TODO: nella merge, modificare i metodi dentro la IF (adattandoli alla modifica della variabile piastrella)*/
		if (controlloPiastrella(infoCella, piastrella, righe, parete)) {

			/* Funzione - Aggiunge una piastrella nella sezione "righe" */
			aggiungiPiastrella(righe, nRiga, piastrella);

			/* Condizione - Verifica che la riga nella sezione "righe" sia piena
			 * - ALLORA			--> Svuoto la riga ed inserisco una piastrella nella sezione "parete"
			 */
			if (isRigaPiena(nRiga)) {
				/* Funzione - Svuota la riga selezionata nella sezione "righe" */
				svuotaRiga(righe, nRiga);

				/* Funzione - Inserisce una piastrella nella sezione "parete" */
				inserisciPiastrella(nRiga, piastrella, parete);
			}
		}
	}
}

/* Funzione - Calcola il numero triangolare (per sapere il numero della cella) */
function numero_triangolare(num) {
	return ((num * (num + 1)) / 2);
}

/* Funzione - Controlla se si può inserire la piastrella nella riga selezionata */
function controlloPiastrella(infoCella, piastrella, righe, parete) {
	var nRiga = infoCella.nRiga;
	var nColonna = infoCella.nColonna;
	var controlli = {controlloRiga: true, controlloRighe: true, controlloParete: true};
	
	var celleRighe = righe.getElementsByClassName(Classe.PIATTAFORMA.RIGHE.CELLA.nome);
	var celleParete = parete.getElementsByClassName(Classe.PIATTAFORMA.PARETE.CELLA.nome);
	
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
	vettore[nCella].classList.add(Classe.ERRORE.INSERIMENTO_PIASTRELLA.nome);
	
	/* Funzione: aspetta DURATA_ANIMAZIONE ms prima di eseguire la funzione al suo interno */
	setTimeout(function() {
		vettore[nCella].classList.remove(Classe.ERRORE.INSERIMENTO_PIASTRELLA.nome);
	}, DURATA_ANIMAZIONE);
}

/* Funzione - Aggiunge una piastrella in fondo alla riga selezionata (sezione "righe") */
function aggiungiPiastrella(righe, nRiga, piastrella) {
	var vettoreRighe = righe.getElementsByClassName(Classe.PIATTAFORMA.RIGHE.CELLA.nome);
	
	for (var nColonnaControllo = nRiga; nColonnaControllo >= 0; nColonnaControllo--)
		if (righeLogica[nRiga][nColonnaControllo] == null) {
			vettoreRighe[numero_triangolare(nRiga) + nColonnaControllo].style.opacity = 1;
			vettoreRighe[numero_triangolare(nRiga) + nColonnaControllo].src = IMMAGINI_PIASTRELLE[piastrella];
			righeLogica[nRiga][nColonnaControllo] = piastrella;
			
			break;
		}
}

/* Funzione - Verifica che la riga sia piena (sezione "righe") */
function isRigaPiena(nRiga) {
	var ret = true;
	
	for (var nColonna = 0; nColonna < (nRiga + 1); nColonna++) {
		if (righeLogica[nRiga][nColonna] == null)
			ret = false;
	}
	
	return ret;
}

/* Funzione - Toglie tutte le piastrelle dalla riga selezionata (sezione "righe") */
function svuotaRiga(righe, nRiga) {
	var vettoreRighe = righe.getElementsByClassName(Classe.PIATTAFORMA.RIGHE.CELLA.nome);
	
	for (var nColonna = 0; nColonna < (nRiga + 1); nColonna++) {
		vettoreRighe[numero_triangolare(nRiga) + nColonna].style.opacity = 0.5;
		vettoreRighe[numero_triangolare(nRiga) + nColonna].src = IMMAGINE_SFONDO_RIGHE;
		righeLogica[nRiga][nColonna] = null;
	}
}

/* Funzione - Inserisce una piastrella nella sezione "parete" */
function inserisciPiastrella(nRiga, piastrella, parete) {
	var vettoreParete = parete.getElementsByClassName(Classe.PIATTAFORMA.PARETE.CELLA.nome);
	
	pareteLogica[nRiga][(piastrella + nRiga) % N_RIGHE] = 1;
	vettoreParete[((nRiga) * N_RIGHE) + ((piastrella + nRiga) % N_RIGHE)].classList.add(Classe.PIATTAFORMA.PARETE.CELLA_SELEZIONATA.nome);
}

/* Funzione - Inizializzo le "righe" logica (settando tutte le celle con valore null) */
function inizializzaRigheLogica() {
	for (var nRiga = 0; nRiga < N_RIGHE; nRiga++) {
		righeLogica[nRiga] = new Array();
		
		for (var nColonna = 0; nColonna < (nRiga + 1); nColonna++)
			righeLogica[nRiga][nColonna] = null;
	}
}

/* Funzione - Inizializzo la "parete" logica (settando tutte le celle con valore null) */
function inizializzaPareteLogica() {
	for (var i = 0; i < N_RIGHE; i++) {
		pareteLogica[i] = new Array();
		
		for (var j = 0; j < N_RIGHE; j++)
			pareteLogica[i][j] = null;
	}
}

/* Funzione - Carica la parete logica nella grafica (serve per "ricaricare" la schermata del giocatore) */
function caricaPareteGrafica(parete) {
	var celle = parete.getElementsByClassName(Classe.PIATTAFORMA.PARETE.CELLA.nome);
	let index = 0;
	for (let riga = 0; riga < N_RIGHE; riga++)
		for (let col = 0; col < N_RIGHE; col++) {
			if (pareteLogica[riga][col] == 1) {
				celle[index].classList.add(Classe.PIATTAFORMA.PARETE.CELLA_SELEZIONATA.nome);
			}
			
			index++;
		}
}

/* Evento - Al caricamento della pagina, ricerco se esistono degli elementi con la classe "piattaforma" e gli inserisco all'interno il DOM personalizzato */
window.addEventListener(EVENTO_LOAD, ricercaPiattaforme);	/* INFO: Bisogna invocare il metodo "addEventListener()" perché altrimenti con il metodo "onload()" solo un file riesce ad invocarlo */