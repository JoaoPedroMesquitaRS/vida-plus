import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Prontuario = sequelize.define('Prontuario', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idPaciente: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'prontuarios',
    timestamps: false
});

Prontuario.associate = (models) => {
    Prontuario.belongsTo(models.Paciente, {
        foreignKey: 'idPaciente',
        as: 'paciente'
    });
}

export default Prontuario;