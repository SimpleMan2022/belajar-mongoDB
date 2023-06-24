const { MongoClient, ObjectID } = require('mongodb')

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

    //menampilkan data
    // console.log(db.collection('mahasiswa').find({nama : 'agus'}).toArray((err, res) => {
    //     console.log(res)
    // }))

    //mengubah data 
    db.collection('mahasiswa').updateOne(
        {
            _id : ObjectID("649551dff94763fd88199cc7")
        },
        {
            $set : {
                nama : 'adit nugroho'
            }
        }
    ).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })


    //menghapus data
    // db.collection('mahasiswa').deleteOne(
    //     {
    //         nama : 'agus'
    //     }
    // ).then((res) => {
    //     console.log(res)
    // }).catch((err) => {
    //     console.log(err)
    // })
})
