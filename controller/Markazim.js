const Markaz = require('../models/Markazim');

exports.adding = (req, res) => {
    const markaz = new Markaz(req.body)

    markaz.save()
    .then(() => {
        res.status(200).json({ success: true, data: markaz })
    })
    .catch((err) => {
        res.status(400).json({ success: false, message: "Xatolik ketdi" })
    })
};