const Inq = require('../database/models/inq');
const Organization = require('../database/models/organization');
const Declaration = require('../database/models/declaration');
class Actions {
    async GetAllCities(req, res) {
        const cities = await Inq.find().distinct("city");
        //console.log(cities)
        res.status(200).json(cities)
    }
    async GetAllCategories(req, res) {
        const categories = await Inq.find().distinct("category");
        //console.log(cities)
        res.status(200).json(categories);

    }
}


module.exports = new Actions();