import * as model from './model.js'

class ProductsMongoDB {
    constructor() {}

    read(id){
        return id?
        model.products.find({_id:id}) :
        model.products.find({})
    }

    save(product){
        const productModel = new model.products(product)
        return productModel.save()
    }
    
    update(product, id){
        return model.products.updateOne({_id: id}, { $ser: {...product}})
    }

    delete(id){
        return model.products.deleteOne({_id: id})
    }
}

export default ProductsMongoDB