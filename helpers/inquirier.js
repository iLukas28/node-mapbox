const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: "Qué deseas hacer?",
        choices: [{
            value: 1,
            name: `${'1'.green}. Buscar ciudad`
        },
        {
            value: 2,
            name: `${"2".green}. Historial`
        },
        {
            value: 0,
            name: `${"0".green}. Salir`
        }
        ]
    }
];



const inquireMenu = async () => {
    console.clear();
    console.log('==================================='.green);
    console.log('     SELECCIONA UNA OPCION         ');
    console.log('===================================\n'.green);
    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async () => {
    const input = [
        {
            type: 'input',
            name: 'pausa',
            message: `\nPresione ${'ENTER'.green} para continuar\n`,
        }
    ];
    await inquirer.prompt(input);
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length == 0) {
                    return 'Por favor ingresa un valor válido';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listarLugares = async (lugares = []) => {
    const choices = lugares.map((lugar, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });
    choices.unshift({
        value: 0,
        name: '0.'.green + ' Cancelar'
    });
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Selecciona el lugar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
}



module.exports = { inquireMenu, pausa, leerInput, listarLugares }