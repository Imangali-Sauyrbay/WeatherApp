const exp = require('express');
const bodyParser = require('body-parser');
const weatherRequest = require('./requests/weather.request')

const app = exp();
app.set('view engine','ejs');
app.use(exp.static('public'))
app.use(bodyParser.urlencoded({extended:true}));



app.get('/',(req,res)=>{
    res.render('index',{weather:null,error:null})
})

app.post('/', async (req,res)=>{
    const {city} = req.body
    
    const {weather, error} = await weatherRequest(city)
    res.render('index',{weather,error})
})

const port = process.env.PORT;

app.listen(port ? port : 3000,()=>{
    console.log('Server has start on port 3000');
})