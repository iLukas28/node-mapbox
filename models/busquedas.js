const fs = require('fs');
const axios = require('axios');
require('dotenv').config()
class Busquedas {
    historial = [];
    dbPath = './db/database.json';

    constructor() {
        let historial = this.leerDB();
        historial.map(lugar => {
            this.historial.push(lugar);
        })
    }

    get paramsMapbox() {
        return {
            access_token: process.env.MAPBOX_KEY,
            language: 'es',
            limit: 5
        }
    }
    get paramsMapboxWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async ciudad(lugar = '') {
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5`,
            params: this.paramsMapbox
        });
        const resp = await instance.get(`/mapbox.places/${lugar}.json?`);
        return resp.data.features.map(lugar => ({
            id: lugar.id,
            nombre: lugar.place_name_es,
            lng: lugar.center[0],
            lat: lugar.center[1],
        }))
    }
    async clima(lat = '', lng = '') {
        const instance = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}`,
            params: this.paramsMapboxWeather
        });
        const resp = await instance.get();
        return {
            temp: resp.data.main.temp,
            max: resp.data.main.temp_max,
            min: resp.data.main.temp_min,
            description: resp.data.weather[0].description
        }
    }
    agregarHistorial(lugar = '') {
        if (!this.historial.includes(lugar)) {
            this.historial = this.historial.splice(0, 4);
            this.historial.unshift(lugar);
            this.guardarDB()
        }
    }

    guardarDB() {
        const payload = {
            historial: this.historial,
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }
    leerDB() {
        if (!fs.existsSync(this.dbPath)) return null;
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);
        return data.historial;
    }
}

module.exports = Busquedas;