let operacion = (a:number, b:number, op: string) => {
    return new Promise((resolve, reject) =>{
        let calculo = async () =>{
      if( op == "suma" || "resta"){
           switch (op) {
                  case 'suma':     
                      let { Suma } = await import("./Suma");       
                      let sumar = new Suma(a,b);
                      resolve(sumar.ver());
                  case 'resta':
                      let { Resta } = await import("./Resta");  
                      let restar = new Resta(a,b);
                      resolve(restar.ver());
                      default:
                          break;  
                  }
    }else{ reject(new Error('Error!'));}
        
        }
        calculo();
       

    })
}
   
let operaciones = async () => {
    try {
        let oper = await operacion(2,8,"resta");
        console.log(oper);
    }
    catch(err) {
        console.log(err.message);
    }
}

operaciones();
