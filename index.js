const { leerInput, inquirerMenu, pausa } = require('./helpers/inquirer.js');
const Busquedas = require('./models/busquedas.js');

const main = async() => {

    const busquedas = Busquedas;
    let opt = '';

    do{

        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                // Crear opcion 1 mostra mensaje, 
                const lugar = await leerInput( 'Ciudad' );
                console.log( lugar );
                // Buscar ciudad, 
                // Mostrar los lugares, 
                // Seleccionarl el lugar
                // Clima
                // Mostrar resultados
            break;

            case '2':
                // crear opcion 2
            break;
            
        
        }


        if( opt !== '0' ){ await pausa(); }  


    }while(  opt !== '0'  );

}


main();