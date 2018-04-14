import SimplSchema from 'simpl-schema';
import _ from 'lodash';
import TypesEnum from './enums/types';

export default new SimplSchema({
    title: String,
    description: String,
    userId: {
        type: String,
        optional: true,
    },
    commentIds: {
        type: Array,
        optional: true,
        defaultValue: [],
    },
    'commentIds.$': {
        type: String,
    },
    views: {
        type: Number,
        optional: true,
        defaultValue: 0,
    },
    type: {
        type: String,
        allowedValues: _.values(TypesEnum),
    },
    createdAt: {
        type: Date,
        optional: true,
        autoValue() {
            if (this.isInsert) {
                return new Date();
            }

            return this.unset();
        },
    },
});