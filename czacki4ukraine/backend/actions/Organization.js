const Inq = require('../database/models/inq');
const Organization = require('../database/models/organization');
const Declaration = require('../database/models/declaration');
class Actions {

  async saveInq(req, res) {
    const data = req.body;
    let inq;
    try {
      inq = new Inq(data);
      await inq.save();
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }


    res.status(201).send("inq added");
  }

  async saveOrganization(req, res) {
    const data = req.body;
    let organization;
    try {
      organization = new Organization({
        name: data.name,
        description: data.description,
        kontakt: data.kontakt,
        mail: data.mail,
        password: data.password,
      });
      await organization.save();
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }
    res.status(201).send("organization added");
  }
  async InksForOrganization(req, res) {
    const organization_id = req.params.id;
    const organization = await Organization.findOne({_id: organization_id }).exec();
    const inqs = await Inq.find({organizationid: organization_id }).exec();
    const data = {
      name: organization.name,
      inqs: inqs
    }
    res.status(201).send(data);
  }

}


module.exports = new Actions();