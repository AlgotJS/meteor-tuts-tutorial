import { Posts, Users, Comments } from '../';

Posts.addLinks({
    'author': {
        type: 'one',
        collection: Users,
        field: 'userId',
    },
    'comments': {
        type: 'many',
        collection: Comments,
        field: 'commentIds',
    }
})