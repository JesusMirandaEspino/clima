const axios = require('axios');

class Busquedas {

    historia = [ 'Jalisco', 'Mexico', 'Puerto Vallarta', 'Japon', 'Okinawa' ];

    constructor(){
        // Leer BD si existe
    }


    async ciudad( lugar = '' ){
        //Peticion http

        console.log(`Ciudad: ${lugar}`);


        try{

        const resp = await axios.get('https://reqres.in/api/users/2');
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