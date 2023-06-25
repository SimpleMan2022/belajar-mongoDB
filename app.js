const express = require('express')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const { body, validationResult, check } = require('express-validator');
const methodOverride = require('method-override')
const app = express()
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

require('./utils/db')
const Contact = require('./model/contact')

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended : false}))
app.use(cookieParser('secret'))
app.use(session({
    cookie : {maxAge : 6000},
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}))
app.use(flash())
app.use(methodOverride('_method'))


const port = 3000


app.get('/', (req, res) => {
    res.render('index', {
        layout : 'layouts/main',
        title : 'Halaman Index | nodejs'
    })
})

app.get('/contact', async (req, res) => {
    // contacts.find().then((contact) => {
    //     res.send(contact)
    // })

    const contacts = await Contact.find()
    res.render('contact', {
        layout : 'layouts/main',
        title : 'Halaman contact | nodejs',
        contacts,
        msg : req.flash('msg')
    })
})

app.get('/contact/add', (req, res) => {
    res.render('addContact', {
        layout : 'layouts/main',
        title : 'Halaman tambah data contact | nodejs',
        // contacts
    })
})

app.post('/contact', 
    [
        body('nama').custom (async (value) => {
            const duplicate = await Contact.findOne({nama : value})
            if(duplicate){
                throw new Error('Nama sudah terdaftar!')
            }
            return true
        }),
        check('email', 'Email tidak Valid!').isEmail(),
        check('nohp', 'no hp tidak valid!').isMobilePhone('id-ID')

    ]
, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       
        res.render('addContact', {
            layout : 'layouts/main',
            title : 'Halaman tambah data contact | nodejs',
            errors : errors.array()
        })
    }else{
        Contact.insertMany(req.body)    
        req.flash('msg', 'Data contact berhasil ditambahkan!')
        res.redirect('/contact')
    }
    
})

// app.get('/contact/delete/:nama', async (req, res) => {
//     const contact = await Contact.findOne({nama : req.params.nama})
//     if(!contact){
//         res.status(404)
//         res.send('<h1>404</h1>')
//     }else{
//     Contact.deleteOne({_id : contact._id}).then((result) => {
//         req.flash('msg', 'data berhasil dihapus!')
//         res.redirect('/contact')
//     })
    
// }
// })

app.delete('/contact', (req, res) => {
         Contact.deleteOne({nama : req.body.nama}).then((result) => {
            req.flash('msg', 'data berhasil dihapus!')
            res.redirect('/contact')
     })
})


app.get('/contact/edit/:nama', async (req, res) => {
    const contact = await Contact.findOne({nama : req.params.nama})

    res.render('editContact', {
        layout : 'layouts/main',
        title : 'Halaman Edit data contact | nodejs',
        contact
    })
})

app.put('/contact', 
    [
        body('nama').custom(async (value, {req}) => {
            const duplicate = await Contact.findOne({nama : value})
            if(value !== req.body.oldName && duplicate){
                throw new Error('Nama sudah terdaftar!')
            }
            return true
        }),
        check('email', 'Email tidak Valid!').isEmail(),
        check('nohp', 'no hp tidak valid!').isMobilePhone('id-ID')

    ]
, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       
        res.render('editContact', {
            layout : 'layouts/main',
            title : 'Halaman tambah data contact | nodejs',
            errors : errors.array(),
            contact : req.body
        })
    }else{
        Contact.updateOne(
            {_id : req.body._id},
            {
                $set : {
                    nama : req.body.nama,
                    email : req.body.email,
                    nohp : req.body.nohp
                }
            }).then((result)=> {
                req.flash('msg', 'data berhasil diupdate')
                res.redirect('/contact')
            })
    }
    
})

app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({nama : req.params.nama})
    res.render('detailContact', {
        layout : 'layouts/main',
        title : 'Halaman detail contact | nodejs',
        contact
    })
})

app.use('/', (req, res) => {
    res.status(404)
    res.send('Page Not Found!')
})

app.listen(port, ()=> {
    console.log(`server menyala di port ${port}`);
})