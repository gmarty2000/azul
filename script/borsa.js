/* TODO: intestazione */
const N_TIPI_PIASTRELLE = 5;
const N_PIASTRELLE_PER_TIPO = 20;
const N_PIASTRELLE_PER_ESPOSITORE = 4;

var piastrelle = new Array();

/* TODO: descrizione */
function caricaBorsa() {
	for (var nTipiPiastrelle = 0; nTipiPiastrelle < N_TIPI_PIASTRELLE; nTipiPiastrelle++) {
		for (var nPiastrelle = 0; nPiastrelle < N_PIASTRELLE_PER_TIPO; nPiastrelle++) {
			piastrelle.push(nTipiPiastrelle);
		}
	}
}

/* TODO: descrizione */
function prendiPiastrelle() {
	var piastrellePrese = null;
	
	if (piastrelle.length != 0) {
		piastrellePrese = [];
		
		for (var nPiastrelle = 0; nPiastrelle < N_PIASTRELLE_PER_ESPOSITORE; nPiastrelle++) {
			var random = Math.random() * piastrelle.length;
			piastrellePrese.push(piastrelle.splice(random, 1));
		}
		
	} else
		errore(ERRORE_2, -2);
	
	return piastrellePrese;
}

window.addEventListener(EVENTO_LOAD, caricaBorsa);