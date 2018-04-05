const db = require("../../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = {
    //post
    create: (req, res) => {
        //double check all required information is present
        if (
            !(req.body.name) ||
            !(req.body.price) ||
            !(req.body.quantity) ||
            !(req.body.DeptId)
        ) {
            res.status(400).json({ message: "Missing information!" })
        }
        else {
            let newItem = {
                name: req.body.name,
                price: req.body.price,
                quantity: req.body.quantity,
                DeptId: req.body.DeptId
            }
            if (req.body.description) {
                newItem.description = req.body.description
            }
            if (req.body.picLink) {
                newItem.picLink = req.body.picLink
            }
            db.Item
                .create(newItem)
                .then((response) => {
                    res.json(response)
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json({message: "Internal server error!", error: err})
                })
        }
    },
    //get
    read: (req, res) => {
        let whereOptions = {
            where: {}
        }
        if (req.params.name) {
            whereOptions.where.name = {
                [Op.like]: "%" + req.params.name + "%"
            }
        }
        if (req.params.id) {
            whereOptions.where.id = req.parms.id
        }
        db.Item.findAll({
            whereOptions,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [{
                model: db.Dept,
                attributes: ["id", "name"]
            }]
        }).then((response) => {
            res.json(response)
        }).catch((err) => {
            console.error(err)
            res.status(500).json({message: "Internal server error!", error: err})
        })
    },
    //put
    update: (req, res) => {
        if (!(req.body.id)) {
            res.status(400).json({ message: "Missing information!" })
        } else {
            let newItem = {}
            if (req.body.name) {
                newItem.name = req.body.name
            }
            if (req.body.price) {
                newItem.price = req.body.price
            }
            if (req.body.quantity) {
                newItem.quantity = req.body.quantity
            }
            if (req.body.picLink) {
                newItem.picLink = req.body.picLink
            }
            db.Item.update(
                newItem,
                {
                    where: {
                        id: req.body.id
                    }
                }
            ).then((response) => {
                res.json(response)
            }).catch((err) => {
                console.error(err)
                res.status(500).json({message: "Internal server error!", error: err})
            })
        }
    },
    //delete
    delete: (req, res) => {
        if (!(req.params.id)) {
            res.status(400).json({ message: "Missing information!" })
        } else {
            db.Item.destroy({
                where: {
                    id: req.params.id
                }
            }).then((response) => {
                res.json(response)
            }).catch((err) => {
                console.error(err)
                res.status(500).json({message: "Internal server error!", error: err})
            })
        }
    }
}