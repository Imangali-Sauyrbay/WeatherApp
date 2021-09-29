const exp = require('express');
const bodyParser = require('body-parser');
const weatherRequest = require('./requests/weather.request')

const app = exp();
app.use(exp.static('public'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());



app.get('/',(req,res)=>{
    res.sendFile('index.html')
})

app.post('/', async (req,res)=>{
    const {city, lang} = req.body;
    const result = await weatherRequest(city,lang);
    res.json(result);
})

const port = process.env.PORT;

app.listen(port ? port : 3000,()=>{
    console.log('Server has start on port 3000');
})