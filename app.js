const express = require('express')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
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