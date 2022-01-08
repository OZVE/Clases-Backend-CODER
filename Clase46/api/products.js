import ProductsMongoDB from '../DB/products.js';

class Products {
    constructor(){
        this.productsMongoDB = new ProductsMongoDB();
    }
    async get(){
        let products = await this.productsMongoDB.read();
        return products.length? products : [];
    }
    async list(id){
        let prod = await this.productsMongoDB.read(id);
        console.log(prod);
        return prod || {err : 'Not found'};
    }
    async listAll(){
        let products = await this.productsMongoDB.read();
        return products.length? products : {error : 'Empty'};
    }
    async create(prod){
        return await this.productsMongoDB.create(prod);
    }
    async update(prod, id){
        return await this.productsMongoDB.update(prod, id);
    }
    async delete(id){
        return await this.productsMongoDB.delete(id);
    }
}
export default Products


