class Usuario {
    
    constructor ( nombre, apellido ) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascota(){
        return `La cantidad de mascotas es igual a = ${this.mascotas.length}`;
    }

    addBook( nombre, autor ){
        this.libros.push( {nombre, autor} );
    }

    getBookNames(){
        return this.libros.map(el=>el.nombre)
    }

}

let usuario = new Usuario ("Eloisa", "Pirela");

console.log(usuario.getFullName());

usuario.addMascota("Canario");
usuario.addMascota("Mono");
usuario.addMascota("Perro");

console.log(usuario.countMascota());

usuario.addBook("Cien años de soledad", "Gabriel Garcia Marquez");
usuario.addBook("Bajo la misma estrella", "John Green");

console.log(usuario.getBookNames()); 
