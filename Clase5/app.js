const fs = require('fs');

class Archivo{

    constructor(file){
        this.file = file;
    }
    async guardarAsync (producto){
        try{
        const data = await fs.promises.readFile(this.file);
        const json = JSON.parse(data.toString('utf-8'));
        json.push({...producto, id: json.length});
        try{
        await fs.promises.writeFile(this.file , JSON.stringify(json,null,"\t"))
        }catch(err){
            throw new Error(err);
        }
        
}catch(err){
    console.log([])    
        try {
            await fs.promises.writeFile(this.file, JSON.stringify([{ ...producto, id: 0}]))
        }catch(err){
            throw new Error(err);
        }
    }
    }

    async leerAsync (){
        try{
        const data = await fs.promises.readFile(this.file);
        const json = JSON.parse(data.toString('utf-8'));
        console.log(json);
    }catch(err){
        throw new Error(err);
    }
    }
    async borrarAsync(){
        try{
        let json = this.file;
        fs.unlink(json, (err => {
            if (err) console.log(err);
            else {
              console.log(`Deleted file ${json}`);
           
            }
          }));
    }  catch(err){
        throw new Error(err);
    }
}
}
   
 let myFile = new Archivo('./productos.text');

setTimeout(() => {
	myFile.guardarAsync({ title:'Escuadra', price:'123.45', thumbnail: 'https://media.istockphoto.com/photos/hires-wooden-ruler-with-clipping-path-on-white-background-picture-id118232303?k=6&m=118232303&s=612x612&w=0&h=NOitYanJtcdURGD1mx-THLowa_CiJAf_a4QQwXAk-io='});
	setTimeout(()=>{
		myFile.guardarAsync({ title:'Globo terraqueo', price:'345.67', thumbnail: 'https://casamayo.com.ar/wp-content/uploads/2019/05/30MERIDIANOMETAL.jpg' });
		setTimeout(()=> {
			myFile.guardarAsync({ title:'Calculadora', price:'234.56', thumbnail: 'https://www.casasilvia.com/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/f/x/fx-95ms.jpg'});
            setTimeout(() => {
                console.log(myFile.leerAsync());
                setTimeout(() =>{
                    myFile.borrarAsync();
                },1000)
            },1000)
		},1000)
	},1000)
},1000)
