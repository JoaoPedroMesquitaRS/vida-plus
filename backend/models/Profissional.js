import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Profissional = sequelize.define('Profissional', {

    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idLocalAtendimento:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    especialidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    registro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    tableName: 'profissionais',
    timestamps: false
}
);

Profissional.associate = (models) => {
    Profissional.belongsTo(models.LocalAtendimento, {
        foreignKey: 'idLocalAtendimento',
        as: 'localAtendimento'
    });
}

export default Profissional;