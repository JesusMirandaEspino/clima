const fs = require('fs');

const axios = require('axios');

class Busquedas {

    historial = [];
    dbPath = './db/database.json';

    constructor(){
        this.leerDB()
    }

    //TODO Historial
    get historialCapitalizado(){   

        return this.historial.map(  lugar => {

            let palabras = lugar.split( ' ' );

            palabras =  palabras.map( p => p[0].toUpperCase()  + p.substring( 1 ));

            return palabras.join( ' ' );

        });

    }

    //TODO lugar
    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'                 
        }
    }


    //TODO clima

        get paramsWheater(){
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'                
        }
    }





    //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}


    // TODO **************************Lugar*********************************
    async ciudad( lugar = '' ){
        //Peticion http

        console.log(`Ciudad: ${lugar}`);

        try{

            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapBox
            });

            const resp = await intance.get();


//api.openweathermap.org/data/2.5/weather?lat=36.3864928218528&lon=138.592229549504&appid=a7dfb9bfedeaae2fe9b0f50b43ee4ba5

        return resp.data.features.map(  lugar => ({
            id: lugar.id,
            nombre: lugar.place_name,
            lng: lugar.center[0],
            lat: lugar.center[1]
            
        }) );

        }catch(error){
        
            console.log(error);
            return [];
        }



         //retornar las ciudades o lugares que coinciden con la busqueda
    } 
// TODO **************************Lugar*********************************





    async climaLugar( lat, lon ){


        try{
//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
        const intance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWheater, lat, lon  }
            });

        const resp = await intance.get();
        const { weather, main } = resp.data;

            return {
                desc:    weather[0].description,
                min:     main.temp_min,
                max:     main.temp_max,
                temp:    main.temp

            }


        }catch(error){
            console.log( error );
        }
    }

    agregarHistorial( lugar = '' ){

        //TODO  Prevenir Duplicados

        if( this.historial.includes( lugar.toLocaleLowerCase() ) ){
            return;
        }

        this.historial.unshift( lugar.toLocaleLowerCase() );

        this.guardarDB();
    }


    guardarDB(){

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync( this.dbPath, JSON.stringify( payload ) );
    }


    leerDB(){

        if( !fs.existsSync( this.dbPath ) ){
            return;
        }

        const info = fs.readFileSync( this.dbPath, { encoding: 'utf-8' } );
        const data = JSON.parse( info );

        this.historial = data.historial;


    }

}


module.exports = Busquedas;