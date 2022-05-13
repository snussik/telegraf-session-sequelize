import { Model, ModelStatic, Optional, Sequelize, DataTypes } from 'sequelize'

export interface ModelSettings {
    tableName: string
}

export interface SessionModelField {
    sessionID: string
    data: string
}

export interface SessionCreationAttributes extends Optional<SessionModelField, 'sessionID'> {
}

export interface SessionModel
    extends Model<SessionModelField, SessionCreationAttributes>,
        SessionModelField {
}

export function getSessionTable(
    sequelize: Sequelize,

    props: ModelSettings = { tableName: 'Sessions' }
): ModelStatic<SessionModel> {

    return sequelize.define<SessionModel>(
        'SessionModel',
        {
            sessionID: {
                type: DataTypes.TEXT,
                allowNull: false,
                unique: true,
                primaryKey: true
            },
            data: {
                type: DataTypes.TEXT
            }
        },
        {
            // Other model options go here
            tableName: props.tableName,
            timestamps: false
        }
    )
}