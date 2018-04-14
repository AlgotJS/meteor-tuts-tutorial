import Posts from '../collection';

export default Posts.createQuery('getPost', {
    $filter({filters, params}) {
        filters._id = params.postId;
    },
    title: 1,
    createdAt: 1,
    views: 1,
    description: 1,
    type: 1,
    author: {
        emails: {
            address: 1,
        }
    },
    comments: {
        text: 1,
        createdAt: 1,
        author: {
            emails: {
                address: 1,
            }
        },
    },
});