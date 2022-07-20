const fs = require('fs');

class Contenedor{
    constructor(ruta){
        this._ruta = ruta;
    }

    async save(obj){
        try{
            let data = await fs.promises.readFile(this._ruta, 'utf-8');
            let dataParse = JSON.parse(data); 
           
            //Save the obj
            dataParse.length ?
            await fs.promises.writeFile(this._ruta, JSON.stringify([...dataParse, {...obj, id:dataParse.length}], null, 2)):
            await fs.promises.writeFile(this._ruta, JSON.stringify([{...obj, id:dataParse.length}], null, 2));

            console.log(`Articulo guardado correctamente. id:${dataParse.length}`);
            
        } catch (e){
            console.log(e);
        }
    }


    async getById(id){
        try{
            let data = await fs.promises.readFile(this._ruta, 'utf-8');
            let dataParse = JSON.parse(data);
            let articulo = dataParse.find(articulo => articulo.id === id);
            
            articulo ? console.log(articulo) : console.log("No existe el articulo con ese id");
            return articulo;
        } catch(e){
            console.log(e);
        }
    }

    async getAll(){
        try{
            let data = await fs.promises.readFile(this._ruta, 'utf-8');
            let dataParse = JSON.parse(data);
            
            dataParse ? console.log(dataParse) : console.log("Archivo Vacio");
        } catch(e){
            console.log(e);
        }
    }

    async deleteById(id){
        try{
            let data = await fs.promises.readFile(this._ruta, 'utf-8');
            let dataParse = JSON.parse(data);
            let articulo = dataParse.find(articulo => articulo.id === id);
            
            if(articulo){
                console.log("Articulo removido!");
                let newArray = dataParse.filter(articulo => articulo.id != id);
                await fs.promises.writeFile(this._ruta, JSON.stringify(newArray, null, 2));
                
            } else {
                console.log("No se pudo encontrar el articulo");
            }
        } catch(e){
            console.log(e);
        }
    }

    async deleteAll(){
        let data = await fs.promises.readFile(this._ruta, 'utf-8');
        let dataParse = JSON.parse(data);
        await fs.promises.writeFile(this._ruta, JSON.stringify([], null, 2));
    }
}


module.exports = Contenedor;