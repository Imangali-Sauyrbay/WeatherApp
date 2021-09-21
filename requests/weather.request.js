const { json } = require('body-parser');
const rp = require('request-promise');
const translate = require('@iamtraction/google-translate');


module.exports = async function (city = '', lang = 'en'){
    if(!city) return {
        weather:null, 
        error:'Empty Request!'
    };

    const KEY = 'ccc1c61b76e5cc0d938a8bc7d1d9e7a0'
    const uri = 'http://api.openweathermap.org/data/2.5/weather'

    const options = {
        uri,
        qs:{
            appid: KEY,
            q: city,
            units:'imperial'
        },
        json:true
    }

    try{
        const data = await rp(options)
        const celsius = Math.round((data.main.temp - 32 ) * 5/9);

        const res = await translate([data.name,data.weather[0].main, data.sys.country, 'Weather', 'Country'].join(','), {from:'en',to:lang})
        const [name,weather,country,wName,cName] = res.text.split(', ');

        return{
            weather:`${name}: ${celsius}℃ , ${wName}: ${weather}, ${cName}: ${country}.`, 
            error:null
        }
    }catch(error){
        return {
            weather: null,
            error: error.error.message
        }
    }
   
}