import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const LocalAtendimento = sequelize.define('LocalAtendimento', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: true
    },
    info: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.JSON,
        allowNull: false
    }
},{
    tableName: 'locais_atendimento',
    timestamps: false
}
);

LocalAtendimento.associate = (models) => {
    LocalAtendimento.hasMany(models.Profissional, {
        foreignKey: 'idLocalAtendimento',
        as: 'profissionais'
    });
}


export default LocalAtendimento;