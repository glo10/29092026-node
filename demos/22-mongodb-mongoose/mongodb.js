import { MongoClient } from 'mongodb'
import { callbackify, promisify } from 'node:util'
process.loadEnvFile('.env')
const client = new MongoClient(process.env.DB_LOCAL)
await client.connect() // connexion à la BDD
// Utiliser une base de données
/**
 * Vocabulaire 
 *  Collection ie table en SQL
 *  Document ie tuple, entrée, enregistrement en SQL
 *  Document a la tête d'un JSON (1 document est au format objet littéral JS)
 *  colonnes en SQL ie propriétés ou attributs du document
 *  Toutes les opérations en BDD sont asynchrones avec des promesses
 *  Possibilité avec callbackify de node:util de transformer les promesses en cb
 */
const usersDb = client.db('demo-users')
const userCollection = usersDb.collection('users') // création de la collection nommée users
try {
    // CREATE
    await userCollection.insertOne({ firstname: 'John', lastname: 'Doe' })
    await userCollection.insertMany([{ name: 'Alice', age: 45 }, { firstname: 'Bob' }, { firstname: 'John' } ])
} catch(err) {
    console.error('Erreur ajout', err)
}
// READ
userCollection.find().toArray()
.then(users => console.log('users', users))
.catch(error => console.log('error find', error))

userCollection.find({ firstname: 'John'}).toArray()
.then(johns => console.log('johns', johns))
.catch(error => console.log('err johns', error))

// UPDATE
userCollection.updateOne({ firstname: 'Alice'}, { $set: { firstname: "Alice", lastname: "Bob" }})
// DELETE
userCollection.deleteOne({ age: 45})
.then(() => console.log('delete document { age: 45}'))
.catch(error => console.log('err deleteOne', error))

const deleteCB = callbackify(userCollection.deleteOne({ firstname: 'John'}))
deleteCB((error) => {
    if(error) console.error('Erreur suppression')
    else console.log('suppression OK')
})