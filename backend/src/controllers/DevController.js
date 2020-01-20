const Dev = require('../models/Dev');
const axios = require('axios');
const parseStringToArray = require('../utils/parseStringToArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {    

    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req, res) {
        //return res.send('Hello World');
        //return res.json( { message: 'Hello World v3'});
        //console.log(req.body);
    
        // Desestruturação (ES6)
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
    
            // Desestruturação com valor padrão para name, caso não exista (ES6)
            const { name = login, avatar_url, bio } = response.data;
        
            const techsArray = parseStringToArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            // Filtrar as conexões que estão a no máximo 10km de distância
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        return res.json(dev);
    },

    async update() {
        //TODO
    },

    async destroy() {
        //TODO
    },
}