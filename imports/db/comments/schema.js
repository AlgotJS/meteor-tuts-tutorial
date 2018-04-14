import SimplSchema from 'simpl-schema';

export default new SimplSchema({
    text: String,
    userId: {
        type: String,
        optional: true
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