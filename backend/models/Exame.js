import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Exame = sequelize.define('Exame', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idPaciente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idAtendimento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    resultado: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dataResultado: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }
},{
    tableName: 'exames',
    timestamps: true
})

Exame.associate = (models) => {
    Exame.belongsTo(models.Paciente, {
        foreignKey: 'idPaciente',
        as: 'paciente'
    });
}

export default Exame;