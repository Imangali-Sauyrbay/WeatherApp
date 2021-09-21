const { json } = require('body-parser');
const rp = require('request-promise');

module.exports = async function (city = ''){
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
        return{
            weather:`${data.name}: ${celsius}C , ${data.weather[0].main}, ${data.sys.country}.`, 
            error:null
        }
    }catch(error){
        return {
            weather: null,
            error: error.error.message
        }
    }
   
}