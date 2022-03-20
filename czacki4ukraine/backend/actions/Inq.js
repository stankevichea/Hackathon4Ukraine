const Inq = require('../database/models/inq');
const Organization = require('../database/models/organization');
const Declaration = require('../database/models/declaration');
const mailsender = require('../mail/mail')


class Actions {

  async getAllInq(req, res) {
    
    let city = req.params.city;
    let category = req.params.categories;
    if(city == "null")
    {
      city = null
    }
    if(category == 'null')
    {
      category = null
    }
    else
    {
      category = category.split(",");
    }
    if(category == null && city == null)
    {
      var inq = await Inq.find({}).sort({ "date": -1 }).exec();
    }
    else if(category == null)
    {
      var inq = await Inq.find({city: city})
      .exec();
    }

    else if(city != null){
      var inq = await Inq.find({city: city})
    .where('category').in(category)
    .select('title category date startquantity actquantity unit description city' )
    .sort({ "date": -1 }).exec();
    }

    else if(city == null)
    {
      var inq = await Inq.where('category').in(category)
    .select('title category date startquantity actquantity unit description city' )
    .sort({ "date": -1 }).exec();
    }
    res.status(200).json(inq);
    
  }

  async getOneInq(req, res) {
    const id = req.params.id;
    const inq = await Inq.findOne({ _id: id }).exec();

    const organization = await Organization.findOne({ _id: inq.organizationid }).exec();

    let answer = {
        inq: inq,
        organization: organization
    };
    res.status(200).json(answer);
  }

  async getInqWithDeclarations(req, res) {
    const inq_id = req.params.id;
    const declarations = await Declaration.find({inqid: inq_id});
    const inq = await Inq.findOne({_id: inq_id }).exec();
    const data = {
      name: inq.title,
      declarations: declarations
    }
    res.status(200).json(data);
  }

  async InqRemove(req, res) {
    //console.log(req.body.id)
    const inq_id = req.body.id;
    await Declaration.deleteMany({inqid: inq_id});
    await Inq.deleteOne( {_id: inq_id });
    
    res.status(200);
  }

}
module.exports = new Actions();