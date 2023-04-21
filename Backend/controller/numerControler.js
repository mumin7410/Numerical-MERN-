const {Numer, Numer_Root} = require('../model/numerModel');

//Method GET
const GetNumer = async (req,res) => {
    const nuMer = await Numer.find()
    res.send(nuMer)
}

const Root = async (req,res) => {
    const root = await Numer_Root.find()
    res.send(root)
}

module.exports = { GetNumer, Root};