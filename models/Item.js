module.exports = function (sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        //user will have to upload a picture when creating items
        //will store link to picture in this column
        //maybe blob storage? from what ive read however its not very efficient.
        picLink: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
  
    Item.associate = function (models) {
        // We're saying that a Item should belong to an Dept
        // A Item can't be created without an Dept due to the foreign key constraint
        Item.belongsTo(models.Dept, {
            foreignKey: {
                allowNull: false
            }
        });
    };
  
    return Item;
  };