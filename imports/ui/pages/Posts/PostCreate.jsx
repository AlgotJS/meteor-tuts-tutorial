import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { AutoForm, AutoField, LongTextField } from 'uniforms-semantic';
import PostSchema from '/imports/db/posts/schema';

export default class PostCreate extends React.Component {
    constructor() {
        super();
    }

    submit = (post) => {
        Meteor.call('post.create', { ...post, userId: Meteor.userId() }, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post added!')
        });
    };

    onBtnClick = () => {
        const { history } = this.props;
        history.push('/posts');
    }

    render() {
        return (
            <div className="post">
                <div className="ui four column doubling stackable grid container">
                    <div className="column">
                        <AutoForm onSubmit={this.submit} schema={PostSchema}>
                            <AutoField name="title" />
                            <LongTextField name="description" />
                            <AutoField name="type" />

                            <button className="ui small green button" type='submit'>Add post</button>
                            <button className="ui small green button" onClick={this.onBtnClick}>Back to posts</button>
                        </AutoForm>
                    </div>
                </div>
            </div>
        )
    }
}


PostCreate.propTypes = {
    history: PropTypes.object,
};
