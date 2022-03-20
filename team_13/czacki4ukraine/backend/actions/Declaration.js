const Inq = require('../database/models/inq');
const Organization = require('../database/models/organization');
const Declaration = require('../database/models/declaration');
const mailsender = require('../mail/mail')


class Actions {
  async saveDeclaration(req, res) {
    const inqid = req.body.inqid;
    const quantity = req.body.quantity;
    const kontakt = req.body.kontakt;
    const mail = req.body.mail;
    const name = req.body.name;
    const surname = req.body.surname;
    const date = req.body.date;
    let declaration;
    try {
      declaration = new Declaration({
        inqid: inqid,
        quantity: quantity,
        kontakt: kontakt,
        mail: mail,
        name: name,
        surname: surname,
        date: date
      });
      await declaration.save();
      mailsender(declaration.mail, declaration._id);
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }
    const filter = { inqid };
    let newData = await Inq.findOne(filter);

    let x = Number(quantity);
    let y = Number(newData.actquantity);

    x += y

    const update = { actquantity: x };

    let doc = await Inq.findOneAndUpdate(filter, update);

    res.status(201).send(declaration);
  }

  async getDeclarations(req, res) {
    const mail = req.params.mail;
    let declarations = await Declaration.find({
      mail: mail,
    }).sort({ "date": -1 }).exec();

    res.status(200).json(declarations);
  }

  async removeDeclarationID(req, res) {
    const id = req.params.id;
    let qunatity = 0;
    await Declaration.findOne({ _id: id }).exec(async (err, result) => {
      if (err) {
        console.log(err)
        return;
        console.log(result.quantity)
      }
      const inqid = result.inqid;

      const filter = { inqid };
      let newData = await Inq.findOne(filter);

      let x = Number(result.quantity);
      let y = Number(newData.actquantity);

      y = y - x;

      const update = { actquantity: y };

      let doc = await Inq.findOneAndUpdate(filter, update);
    });
    await Declaration.deleteOne({ _id: id });
    res.status(200).send("You have just retreated from one of your declarations");
  }

}


module.exports = new Actions();