import { mongoose } from 'mongoose'
import UserModel from './models/user-model.js'
process.loadEnvFile('.env')

const res =  await mongoose.connect(process.env.DB_LOCAL)
if(res.connection.readyState === 1) { // on est connecté ,  autres valeurs 0 disconnected, 2, 3
    console.log('connexion OK')
} else {
    console.error('connexion KO')
}

// CREATE
const newUser = new UserModel({
    firstname: 'Thierry',
    lastname: 'Henry',
    pseudo: 'HT'
})

newUser.save()
.then((data) => console.log('save', data))
.catch(error => console.error('erreur save', error))

// READ
UserModel
.find({ firstname: 'glodie'})
.then((data) => console.log('find', data))
.catch(error => console.error('erreur find', error))

const p1 = UserModel.find({ firstname: 'Thierry'})
const p2 = UserModel.find({ lastname : 'Henry'})
Promise.all([p1, p2])
.then(results => {
    console.log('results', results)
    const [r1, r2] = results
    console.log('R1', r1, 'R2', r2)
}).catch(error => console.error('Erreur Promise.all', error))
// UPDATE
// DELETE