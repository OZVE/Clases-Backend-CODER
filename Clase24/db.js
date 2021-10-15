
var admin = require("firebase-admin");
var serviceAccount = require("./keys/dbkey.json");
const { normalize, denormalize, schema } = require("normalizr")

;

class Firebase {

    connectDB() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log('connected')
    }

    async createMessage(obj) {
        const db = admin.firestore()
        const query = db.collection("mensajes")

        try {
            const doc = query.doc()
            await doc.create(obj)
        } catch (err) {
            console.error(err)
        }
    }

    async readMessage() {
        const db = admin.firestore()
        const query = db.collection("mensajes")
        try {
            const querySnapshot = await query.get()
           
            // console.log("🚀 ~ file: db.js ~ line 34 ~ Firebase ~ readMessage ~ docs", docs[0]._fieldsProto.Author)
            const author = new schema.Entity("authors")
            const message = new schema.Entity("message", {
              author: author
            })
            const messages = new schema.Entity("messages", {
               messages: [message]
            })
            let docs = querySnapshot.docs;
            const denormalizedData = denormalize({ messages: [messages]}, message, docs)

            console.log(denormalizedData)
            const response = denormalizedData.map((doc) => (
            {
                Author: {
                    id: doc.data().Author.id,
                    name: doc.data().Author.name,
                    lastname: doc.data().Author.lastname,
                    Age: doc.data().Author.Age,
                    Alias: doc.data().Author.Alias,
                    Avatar: doc.data().Author.Avatar,

                },
                date: doc.data().date,
                text: doc.data().text
            }))
            return response
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = { Firebase };