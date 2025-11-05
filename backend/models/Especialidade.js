import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Especialidade = sequelize.define('Especialidade', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'especialidades',
    timestamps: false
})

Especialidade.associate = (models) => {
    Especialidade.hasMany(models.Profissional, {
        foreignKey: 'idEspecialidade',
        as: 'profissionais'
    })
}

export default Especialidade;