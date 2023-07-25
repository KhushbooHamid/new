const path=require('path')
const express = require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')



const app=express()
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath=path.join(__dirname, '../views/partials')

app.set('view engine', 'hbs')

app.use(express.static(publicDirectoryPath))  
hbs.registerPartials(partialsPath)

app.get('/index', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'khush'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
    return res.send({
            error: 'provide an address'
        })
    }
geocode(req.query.address, (error, {latitude, longitude, location }) => {
    if(error) {
        return res.send({ error })
    }
    forecast(latitude, longitude, (
 error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({ 
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
})
   
})

app.get('/products',(req, res) => {
    if(!req.query.search)
    {
        res.send({
            error: 'you must provide a search item'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
          by: 'khushboo',
          name: 'khush',

          to: 'myself'
    })
})


app.get('/help', (req,res) => {
    res.render('help', {
          by: 'khushboo hamid',
          name: 'khush',

          to: 'please help me '
         
    })
})


// app.get('', (req, res) => {
//     res.send('hello express')

// })

// app.get('/help', (req, res) => {
//     res.send('<h1>help</h1>')

// })

// app.get('/about', (req, res) => {
//     res.send('title')

// })


// app.get('*', ((req,res) => {
//     res.render('i404', {
//         error: 'not found'
//     })
// }))

app.listen(3000, () => {
    console.log('server is up')
})
