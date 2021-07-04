const { inquireMenu, pausa, leerInput, listarLugares } = require('./helpers/inquirier');
const Busquedas = require('./models/busquedas');

require('colors');


const main = async () => {
    let opt;
    const busqueda = new Busquedas();
    do {
        opt = await inquireMenu();
        switch (opt) {
            case 1:
                const termino = await leerInput('Ciudad: ');
                const lugares = await busqueda.ciudad(termino);
                const id = await listarLugares(lugares);
                if (id === 0) continue;
                const lugarSel = await lugares.find(l => l.id === id);
                busqueda.agregarHistorial(lugarSel.nombre);
                const clima = await busqueda.clima(lugarSel.lat, lugarSel.lng);
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Latitud:', lugarSel.lat);
                console.log('Longitud:', lugarSel.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Mínima:', clima.max);
                console.log('Máxima:', clima.min);
                console.log('Cómo está el clima:', clima.description);
                console.log();
                break;
            case 2:
                console.log();
                busqueda.historial.forEach((lugar, i) => {
                    const idx = `${i + 1}`.green;
                    console.log(`${idx}. ${lugar}`);
                })
                console.log();
                break;
        }
        if (opt !== 0) await pausa();
    } while (opt !== 0);
}

main();


