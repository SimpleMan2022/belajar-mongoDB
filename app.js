const {MongoClient} = require("mongodb")

const uri = "mongodb://127.0.0.1:27017"
const dbName = "belajar-nodejs"

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


client.connect((err, res) => {
    if(err) {
       return console.log('koneksi gagal!')
    }

    //pilih db dulu
    const db = client.db(dbName)
    
    //menambahkan 1 data
    // db.collection('mahasiswa').insertOne({
    //     nama : 'agus',
    //     email : 'agus@gmail.com'
    // }, 
    // (err, res) => {
    //     if(err){
    //         return console.log('gagal menambahkan!')
    //     }
    //     console.log(res)
    // })

    console.log(db.collection('mahasiswa').find({nama : 'agus'}).toArray((err, res) => {
        console.log(res)
    }))
})
