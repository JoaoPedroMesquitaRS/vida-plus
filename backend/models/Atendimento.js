import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Atendimento = sequelize.define('Atendimento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idPaciente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idProntuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idLocalAtendimento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idProfissional: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subjetivo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    objetivo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    avaliacao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    plano: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    tableName: 'atendimentos',
    timestamps: false
})

Atendimento.associate = (models) => {
    Atendimento.belongsTo(models.Paciente, {
        foreignKey: 'idPaciente',
        as: 'paciente'
    });
    Atendimento.belongsTo(models.Prontuario, {
        foreignKey: 'idProntuario',
        as: 'prontuario'
    });
    Atendimento.belongsTo(models.LocalAtendimento, {
        foreignKey: 'idLocalAtendimento',
        as: 'localAtendimento'
    });
    Atendimento.belongsTo(models.Profissional, {
        foreignKey: 'idProfissional',
        as: 'profissional'
    })
}

export default Atendimento;