/* Struttura logica - Classi CSS */
const TAVOLO = {
    nome: 'tavolo',
    PIATTAFORMA: {
        nome: "piattaforma",
        PUNTEGGIO: {
            nome: 'punteggio', 
            RIGA: {nome: 'punteggio-riga'},
            CELLA: {nome: 'punteggio-cella'}
        },
        RIGHE: {
            nome: 'righe',
            RIGA: {nome: 'righe-riga'},
            CELLA: {nome: 'righe-cella'}
        },
        PARETE: {
            nome: 'parete',
            RIGA: {nome: 'parete-riga'},
            CELLA: {nome: 'parete-cella'},
            CELLA_SELEZIONATA: {nome: 'parete-cella-selezionata'}
        },
        BASAMENTO: {
            nome: 'basamento',
            RIGA: {nome: 'basamento-riga'},
            CELLA: {nome: 'basamento-cella'},
            CELLA_IMMAGINE: {nome: 'basamento-cella-immagine'},
            CELLA_ETICHETTA: {nome: 'basamento-cella-etichetta'},
            PUNTEGGIO: {nome: 'basamento-punteggio'}
        }
    },
    ESPOSITORE: {nome: 'espositore'},

    ERRORE: {nome: 'errore',
        INSERIMENTO_PIASTRELLA: {nome: 'errore-inserimento-piastrella'}
    }
};

class Classe {
    static get TAVOLO() {
        return TAVOLO;
    }

    static get PIATTAFORMA() {
        return TAVOLO.PIATTAFORMA;
    }

    static get ESPOSITORE() {
        return TAVOLO.ESPOSITORE;
    }
}