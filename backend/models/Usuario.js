import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Usuario = sequelize.define('Usuario', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idProfissional: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'medico', 'enfermeiro', 'tecnico', 'recepcionista'),
        defaultValue: 'recepcionista'
    }
},{
    tableName: 'usuarios',
    timestamps: false
})

Usuario.associate = (models) => {
    Usuario.belongsTo(models.Profissional, {
        foreignKey: 'idProfissional'
    });
};

export default Usuario;