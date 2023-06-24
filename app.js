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

    console.log('koneksi berhasil')
})