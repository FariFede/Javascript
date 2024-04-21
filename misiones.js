/* mi heroe debe saber hacer misiones */

class mision {
    constructor(tipo, solicitante, detalle) { // hay 2 tipos de misiones, podrian ser mas a futuro. necesitamos el solicitante y un campo detalle para calcular la recompensa
        this.tipo = tipo;
        this.solicitante = solicitante;
        this.detalle = detalle;
    }
 
    esDificil() { // hay misiones normales y misiones dificiles, unificamos criterios
        return this.solicitante.charAt(0) === 'G'  &&
        (this.detalle === 4 || this.detalle === 5 || this.detalle > 100);
    }                               
 
    puntos() { // en los puntos no unifique los criterios, pero al igual que en el metodo esDificil, podria hacerlo con las 2 existentes
        return 0; 
    }
}
 
 

class misionPrincesa extends mision { // mision especifica de rescatar a una princesa

    constructor(tipo, solicitante, detalle) { // el constructor podria no ir, pero lei que es conveniente por si en un futuro se complejiza con distintos metodos para el heroe
        super(tipo, solicitante, detalle);
    }

    puntos() {
        return this.detalle * 2;
    }
}
 
 

class misionObjeto extends mision {

    constructor(tipo, solicitante, detalle) { // el constructor podria no ir, pero lei que es conveniente por si en un futuro se complejiza con distintos metodos para el heroe
        super(tipo, solicitante, detalle);
    }

    puntos() {
        return this.detalle <= 50 ? 10 : 5;
    }
}
 
/* esas misiones que mi heroe sabe hacer se van agregando a su lista */

class listaMisiones { // lista de misiones
    constructor() {
        this.misiones = [];
    }
 
    agregarMision(mision) { // metodo con el que agrego misiones a la lista de mi heroe
        this.listaMisiones.push(mision);
    }
 
    misionDificil() { // puedo filtrar por dentro de la lista para conocer las misiones dificiles, devuelve un array
        return this.listaMisiones.filter(mision => mision.esDificil());
    }

}
 

/* defino a mi heroe, el que hace las misiones */
 
class heroe {
    constructor() {
        this.misiones = new listaMisiones(); // lista de misiones del heroe en cuestion
    }
 
    hacerMision(mision) {
        this.misiones.agregarMision(mision);
    }
 
    misionDificil() {
        return this.misiones.misionDificil(); // misiones dificiles asignadas al heroe en cuestion
    }
 
    totalPuntos() { // suma de puntos de recompensa de la lista de misiones del heroe
        return this.misiones().reduce((total, mision) => total + mision.puntos(), 0);
    }
}
 
 
const Shrek = new heroe();

Shrek.hacerMision(new misionPrincesa('Princesa', 'Lord Farquaad', 5));
Shrek.hacerMision(new misionObjeto('Objeto', 'Gandalf', 120));