//DEPENDENCIES
import MessagesMongoDB from '../DB/messages.js';
import {normalize, schema, denormalize } from 'normalizr';
import util from 'util';

//---------------------------------------------------------//

//MESSAGES NORMALIZR
function print(obj){
    console.log(util.inspect(obj,false,12,true))
}

//author schema
const schemaAutor = new schema.Entity('author', {},{idAttribute:'email'})

//message schema
const schemaMessage = new schema.Entity('message',{
    author: schemaAutor
},{idAttribute:'_id'})

//messages schema
const schemaMessages = new schema.Entity('messages',{
    messages: [schemaMessage]
},{idAttribute: 'id'})
//----------------------------------------------------------------

//MESSAGES CLASS CONSTRUCTOR CALLING MONGODB CRUD
class Messages {
    constructor(){
        this.messagesMongoDB = new MessagesMongoDB();
    }
    async getAll(){
        try{
            let messages = await this.messagesMongoDB.read();
            let mwi = {
                id:'messages',
                messages : messages.map(message => ({...message._doc}))
            }
            let mwin = normalize(mwi, schemaMessages);
            return mwin;
        }catch{
            return [];
        };
    };
    async create(message){
        try{
            message.date = new Date().toLocaleString();
            await this.messagesMongoDB.create(message)
        }catch(err){
            console.log(`Error creating Message: ${err}`)

        };
    };
};
export default Messages;