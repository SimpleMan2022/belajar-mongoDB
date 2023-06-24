const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/belajar-nodejs')
.then(() => console.log('Connected!'));



// const contact1 = new Contact({
//     nama : 'Adit Nugroho',
//     nohp : '087654142535',
//     email : 'aditn@gmail.com' 
// })

// contact1.save().then((res) => console.log(res)).catch((err) => console.log(err))