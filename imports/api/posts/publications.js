import { Posts } from '/imports/db';
import { Meteor } from "meteor/meteor";

Meteor.publish('posts', function () {
    return Posts.find();
});