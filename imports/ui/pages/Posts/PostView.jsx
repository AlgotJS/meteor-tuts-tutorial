import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import CommentSchema from '/imports/db/comments/schema';
import { AutoForm, AutoField } from 'uniforms-semantic';

export default class PostView extends Component {
    constructor() {
        super();
        this.state = {
            post: null,
        };
    }

    componentDidMount() {
        Meteor.call('post.view', this.props.match.params._id, (err) => {
            if (err) {
                return alert(err.reason);
            }

            this.getPostMethod();
        });
    }

    getPostMethod() {
        Meteor.call('post.get', this.props.match.params._id, (err, post) => {
            if (err) {
                return alert(err.reason);
            }

            this.setState({ post });
        });
    }

    onBackBtnClick = () => {
        const { history } = this.props;
        history.push('/posts');
    }

    onDeleteCommentBtnClick = (commentId) => () => {
        Meteor.call('comment.remove', commentId, (err) => {
            if (err) {
                return alert(err.reason);
            }

            this.getPostMethod();
        });
    }

    onAddCommentFormSubmit = (comment) => {
        const { post } = this.state;

        Meteor.call('comment.create', { ...comment, userId: Meteor.userId() }, post._id, (err) => {
            if (err) {
                return alert(err.reason);
            }

            this.getPostMethod();
        });
    }

    renderComments() {
        const { post } = this.state;
        const { comments } = post;
        const currentUserId = Meteor.userId();

        return (<div className="ui comments">
            <h3 className="ui dividing header">Comments</h3>
            {
                comments.map(({ _id, author, text, createdAt }) =>
                    (<div key={_id} className="comment">
                        <div className="content">
                            <a className="author">{author.emails[0].address}</a>
                            <div className="metadata">
                                <span className="date">{createdAt.toDateString()}</span>
                            </div>
                            <div className="text">
                                {text}
                            </div>
                            {author._id === currentUserId || currentUserId === post.author._id ?
                                <button onClick={this.onDeleteCommentBtnClick(_id)}>Delete Comment</button> : null}
                        </div>
                    </div>))
            }
            <AutoForm onSubmit={this.onAddCommentFormSubmit} schema={CommentSchema}>
                <AutoField name="text" />
                <button type='submit' className="ui small blue button">Add Comment</button>
            </AutoForm>
        </div>);
    }

    renderPost() {
        const { post } = this.state;
        const { _id, title, description, views, comments } = post;

        return (<table className="ui fixed single line celled table">
            <thead>
                <tr><th>Post id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Views</th>
                    <th>Comments</th>
                </tr></thead>
            <tbody>
                <tr key={_id}>
                    <td>{_id}</td>
                    <td>{title}</td>
                    <td>{description}</td>
                    <td>{views}</td>
                    <td>{comments.length}</td>
                </tr>
            </tbody>
        </table>);
    }

    render() {
        const { post } = this.state;

        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div className="post-view">
                {this.renderPost()}
                {this.renderComments()}
                <button className="ui small green button" onClick={this.onBackBtnClick}>Back to posts</button>
            </div>
        )
    }
}

PostView.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
};