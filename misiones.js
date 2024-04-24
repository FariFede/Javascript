/* mi heroe debe saber hacer misiones */

class Mision {
    constructor(tipo, solicitante, detalle) { // hay 2 tipos de misiones, podrian ser mas a futuro. necesitamos el solicitante y un campo detalle para calcular la recompensa
        this.tipo = tipo;
        this.solicitante = solicitante;
        this.detalle = detalle;
    }

    quienSolicita() { // identifico al solicitante dentro de mi mision
        return this.solicitante;
    }

    esDificil() { // hay misiones normales y misiones dificiles, las cuales se dan en condiciones especificas de las subclases
        return false;
    }                               

    puntos() { // en los puntos no unifique los criterios, pero al igual que en el metodo esDificil, podria hacerlo con las 2 existentes
        return 0; 
    }
}


class MisionPrincesa extends Mision { // mision especifica de rescatar a una princesa

    constructor(tipo, solicitante, custodia) {
        super(tipo, solicitante, custodia);
        this.custodia = custodia;
    }

    esDificil() {
        return this.solicitante.charAt(0) === 'G'  &&
        (this.custodia === 4 || this.custodia === 5);
    }

    puntos() {
        return this.detalle * 2;
    }
}


class MisionObjeto extends Mision {

    constructor(tipo, solicitante, distancia) {
        super(tipo, solicitante, distancia);
        this.distancia = distancia;
    }

    esDificil() {
        return this.solicitante.charAt(0) === 'G'  &&
        (this.distancia > 100);
    }

    puntos() {
        return this.detalle <= 50 ? 10 : 5;
    }
}


/* defino a mi heroe, el que hace las misiones. ahora mi heroe tiene su propia lista, y sabe recurrir a la clase mision para filtrar si la mision que le asignaron es dificil o no */

class Heroe {
    constructor() {
        this.misiones = []; // lista de misiones del heroe en cuestion
    }

    hacerMision(mision) {
        this.misiones.agregarMision(mision);
    }

    misionDificil() {
        return this.misiones.filter(mision => mision.esDificil()); // misiones dificiles asignadas al heroe en cuestion
    }

    verSolicitante() {
        return this.misiones.map(mision => mision.quienSolicita()); // uso map para crear un nuevo array con los resultados de mision, afectados por el metodo quienSolicita
    }

    totalPuntos() { // suma de puntos de recompensa de la lista de misiones del heroe
        return this.misiones().reduce((total, mision) => total + mision.puntos(), 0);
    }
}



const Shrek = new Heroe();

Shrek.hacerMision(new MisionPrincesa('Princesa', 'Lord Farquaad', 5));
Shrek.hacerMision(new MisionObjeto('Objeto', 'Gandalf', 120));

/* misiones dificiles de Shrek */
console.log('Misiones difíciles asignadas a Shrek:', Shrek.misionDificil());

/* lista completa de solicitantes */
Shrek.verSolicitante().forEach(solicitante => {console.log(`Solicitante de la misión: ${solicitante}`);});