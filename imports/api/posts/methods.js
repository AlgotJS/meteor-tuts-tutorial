import { Meteor } from 'meteor/meteor'
import { Posts, Comments } from '/imports/db';
import { getPost, getPosts } from '/imports/db/queries';

Meteor.methods({
    'post.create'(post) {
        Posts.insert(post);
    },
    'post.view'(postId) {
        return Posts.update(postId,
            {
                $inc: { views: 1 }
            });
    },

    'post.list'() {
        return getPosts.clone({}).fetch();
    },

    'post.edit'(_id, { title, description, type }) {
        Posts.update(_id, {
            $set: {
                title,
                description,
                type,
            }
        });
    },

    'post.remove'(_id) {
        const post = Posts.findOne(_id);

        Comments.remove({
            _id: { $in: [...post.commentIds] },
        });

        return Posts.remove(_id);
    },

    'post.get'(postId) {
        return getPost.clone({
            postId,
        }).fetchOne();
    }
});