var db = require("../../models");
module.exports = {
    //post
    create: (req, res) => {
        db.Dept.create({
            name: req.body.name
        }).then((response) => {
            res.json(response)
        }).catch((err) => {
            console.error(err)
            res.status(500).json({message: "Internal server error!", error: err})
        })
    },
    //get
    read: (req, res) => {
        const whereOptions = {
            where: {}
        }
        if (req.params.id) {
            whereOptions.where.id = req.params.id
        }
        db.Dept.findAll({
            whereOptions,
            attributes: ["id", "name"],
            include: [{
                model: db.Item,
                attributes: { exclude: ["createdAt", "updatedAt"] }
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
            db.Dept.update(
                {
                    name: req.body.name
                },
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
            db.Dept.destroy({
                where: {
                    id: req.params.id
                }
            }).then((response) => {
                res.json(response);
            }).catch((err) => {
                console.error(err)
                res.status(500).json({message: "Internal server error!", error: err})
            })
        }
    }
}