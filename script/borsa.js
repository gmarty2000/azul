/* Costanti - 	1. 	Il numero dei tipi di piastrelle
 * 		  	  2. 	Il numero di piastrelle per tipo
 * 		  	  3. 	Il numero di piastrelle per espositore
 */
const N_TIPI_PIASTRELLE = 5;
const N_PIASTRELLE_PER_TIPO = 20;
const N_PIASTRELLE_PER_ESPOSITORE = 4;

/* Array - Il contenitore per le piastrelle */
var piastrelle = new Array();

/* Funzione (Evento) - Carica la borsa con 100 piastrelle (20 per tipologia) */
function eventoCaricaBorsa() {
	for (var nTipiPiastrelle = 0; nTipiPiastrelle < N_TIPI_PIASTRELLE; nTipiPiastrelle++)
		for (var nPiastrelle = 0; nPiastrelle < N_PIASTRELLE_PER_TIPO; nPiastrelle++)
			piastrelle.push(nTipiPiastrelle);
}

/* Funzione - Estrae casualmente dalla borsa 4 piastrelle */
function prendiPiastrelle() {
	var piastrellePrese = null;
	
	if (piastrelle.length != 0) {
		piastrellePrese = [];
		
		for (var nPiastrelle = 0; nPiastrelle < N_PIASTRELLE_PER_ESPOSITORE; nPiastrelle++) {
			var random = Math.random() * piastrelle.length;
			piastrellePrese.push(piastrelle.splice(random, 1));
		}
		
	} else
		errore('Tessere esaurite', -2);
	
	return piastrellePrese;
}

/* Listener - Quando la finestra (window) viene caricata (EVENTO_LOAD), viene invocata la funzione 'eventoCaricaBorsa()' */
window.addEventListener(EVENTO_LOAD, eventoCaricaBorsa);
