import { Users, Comments } from '../';

Comments.addLinks({
    'author': {
        type: 'one',
        collection: Users,
        field: 'userId',
    }
})