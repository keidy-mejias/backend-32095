const { promises: fs, writeFile } = require('fs');
const { title } = require('process');

class Contenedor {

    constructor(ruta){
        this.ruta = ruta;
    }

    async save(nuevoObjeto) {

        //Buscar datos existentes
        const objetos = await this.getAll()

        //Nuevo id
        let newId
        if ( objetos.length == 0 ){
            newId = 1
        } else {
            const ultimoId = parseInt (objetos [objetos.length - 1].id)
            newId = ultimoId + 1;
        }

        //Agregar el nuevo objeto al array
        objetos.push({...nuevoObjeto, id: newId})

        try {
            await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }

    }

    async getById(id) {

        try {

            //Buscar datos existentes
            const objetos = await this.getAll();

            //Filtrar busqueda
            const item = objetos.filter(item => item.id === id);

            if (item.length === 0) {
                return null;
            }
            //Mostrar la busqueda no se si por console.log este bien
            console.log(item)
            return item[id];

        } catch (err) {
            return [];
        }

    }


    async getAll() {

        try {
            const objetos = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(objetos)    
        } catch (error) {
            return []
        }
    }

    async deleteById(id) {

        //Buscar datos existentes
        const objetos = await this.getAll()

        //Filtrar para poder eliminar
        const nuevoObjeto = objetos.filter (elemento => elemento.id !== id)

        if (nuevoObjeto.length === objetos.length){
            throw new Error (`Error al borrar: no se encontró el id ${id}`)
        }

        try {
            await fs.writeFile(this.ruta, JSON.stringify(nuevoObjeto, null, 2))
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }

    }

    async deleteAll() {

        try {
            const objetos = [];
            await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 2));
        } catch (err) {
            throw new Error(`Error al borrar: ${error}`)
        }

    }



}

const listaProductos = new Contenedor('./productos.txt')

//listaProductos.save({title: 'Leche', price: 180, thumbnail: 'https://www.casa-segal.com/producto/azucar-ledesma-1-kilo/'});

//listaProductos.deleteById(1);

//listaProductos.getById(3);



listaProductos.deleteAll();