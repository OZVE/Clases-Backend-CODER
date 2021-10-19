import * as model from './model.js'

class MessagesMongoDB {
    constructor(){}

    read(){
        return model.messages.find({})
    }
    save(message){
        const messagemodel = new model.messages(message);
        return messagemodel.save();
    }
}
export default MessagesMongoDB;