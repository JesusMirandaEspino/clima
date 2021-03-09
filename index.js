const { leerInput, inquirerMenu, pausa } = require('./helpers/inquirer.js');

const main = async() => {

    let opt = '';

    do{

        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                // crear opcion 1
            break;

            case '2':
                // crear opcion 2
            break;
            
        
        }


        if( opt !== '0' ){ await pausa(); }  


    }while(  opt !== '0'  );

}


main();