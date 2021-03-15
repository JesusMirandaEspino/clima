require('dotenv').config();
const { leerInput, inquirerMenu, pausa,  listarLugares } = require('./helpers/inquirer.js');
const Busquedas = require('./models/busquedas.js');

const main = async() => {

    const busquedas = new Busquedas();
    let opt = '';

    do{

        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                // Crear opcion 1 mostra mensaje, 
                const termino = await leerInput( 'Ciudad: ' );

                // Buscar ciudad, 
                const lugares = await busquedas.ciudad( termino );

                // Mostrar los lugares, 
                const id = await  listarLugares(lugares);
                if( id === '0' ){continue;}

                // Seleccionarl el lugar
                const lugarSel = lugares.find( l => l.id === id );

                //Guardar en DB
                busquedas.agregarHistorial( lugarSel.nombre );

                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng  );

                // Mostrar resultados
                console.clear();
                console.log( 'Informacion de la ciudad'.green );
                console.log( ' ' );
                console.log( `Ciudad: ${lugarSel.nombre}`   );
                console.log( `Lat: ${lugarSel.lat}`   );
                console.log( `Log: ${lugarSel.lng}`   );
                console.log( `Temperatura: ${clima.temp}`   );
                console.log( `Minima: ${clima.min}`   );
                console.log( `Maxima: ${clima.max}`   );
                console.log( `Descripcion: ${clima.desc}`   );
                
            break;

            case '2':
                // crear opcion 2
                busquedas.agregarHistorial.foreach( ( lugar, i ) => {
                    const idx = `${ i + 1 }.`.green;
                    console.log( ` ${ idx }  ${ lugar } ` );
                } );


            break;
            
        
        }


        if( opt !== '0' ){ await pausa(); }  


    }while(  opt !== '0'  );

}


main();