import { Meteor } from 'meteor/meteor'
import { Comments, Posts } from '/imports/db';

Meteor.methods({
    'comment.create'(comment, postId) {
        const commentId = Comments.insert(comment);

        return Posts.update(
            { _id: postId },
            { $push: { commentIds: commentId } }
        );
    },

    'comment.remove'(_id) {
        Comments.remove(_id);
    },
});