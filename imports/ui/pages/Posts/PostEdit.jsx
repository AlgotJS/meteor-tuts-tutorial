import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { AutoForm, AutoField, LongTextField } from 'uniforms-semantic';
import PostSchema from '/imports/db/posts/schema';

export default class PostEdit extends React.Component {
    constructor() {
        super();
        this.state = { post: null };
    }

    componentDidMount() {
        Meteor.call('post.get', this.props.match.params._id, (err, post) => {
            this.setState({ post });
        });
    }

    submit = (post) => {
        Meteor.call('post.edit', this.props.match.params._id, post, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post modified!')
        });
    };

    onBtnClick = () => {
        const { history } = this.props;
        history.push('/posts');
    }

    render() {
        const { post } = this.state;

        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                <div className="ui four column doubling stackable grid container">
                    <div className="column">
                        <AutoForm onSubmit={this.submit} schema={PostSchema} model={post}>
                            <AutoField name="title" />
                            <LongTextField name="description" />
                            <AutoField name="type" />

                            <button className="ui small green button" type='submit'>Edit post</button>
                            <button className="ui small green button" onClick={this.onBtnClick}>Back to posts</button>
                        </AutoForm>
                    </div>
                </div>
            </div>
        )
    }
}

PostEdit.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
};