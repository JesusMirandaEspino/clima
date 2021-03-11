const axios = require('axios');

class Busquedas {

    historia = [ 'Jalisco', 'Mexico', 'Puerto Vallarta', 'Japon', 'Okinawa' ];

    constructor(){
        // Leer BD si existe
    }

    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'                 
        }
    }


    async ciudad( lugar = '' ){
        //Peticion http

        console.log(`Ciudad: ${lugar}`);

        try{

            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapBox
            });

            const resp = await intance.get();

      //  const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/Ja.json?access_token=pk.eyJ1IjoiamVzdXNtaXJhbmRhIiwiYSI6ImNrbTRheTVpbzAycmEycXVzaHdlYjdvNm4ifQ.t-QJVwR48aCvtzdcp34JfA&limit=5&language=es');
        console.log( resp.data );

        return[];

        }catch(error){
        
            console.log(error);
            return [];
        }



         //retornar las ciudades o lugares que coinciden con la busqueda
    } 

}


module.exports = Busquedas;