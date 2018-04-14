import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

export default class PostList extends React.Component {
    constructor() {
        super();
        this.state = { posts: null };
    }

    componentDidMount() {
        this.getPostsMethod();
    }

    getPostsMethod() {
        Meteor.call('post.list', (err, posts) => {
            this.setState({ posts });
        });
    }

    onEditBtnClick = (postId) => () => {
        const { history } = this.props;

        history.push("/posts/edit/" + postId);
    }

    onViewBtnClick = (postId) => () => {
        const { history } = this.props;

        history.push("/posts/view/" + postId);
    }

    onCreateBtnClick = () => {
        const { history } = this.props;

        history.push('/posts/create');
    }

    onRemoveBtnClick = (postId) => () => {
        Meteor.call('post.remove', postId, () => {
            this.getPostsMethod();
        });
    }

    renderPosts() {
        const { posts } = this.state;

        return (
            <table className="ui fixed single line celled table">
                <thead>
                    <tr><th>Post id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Views</th>
                        <th>Comments</th>
                        <th>Commands</th>
                    </tr></thead>
                <tbody>
                    {
                        posts.map(({ _id, title, description, views, comments }) => {
                            return (<tr key={_id}>
                                <td>{_id}</td>
                                <td>{title}</td>
                                <td>{description}</td>
                                <td>{views}</td>
                                <td>{comments.length}</td>
                                <td>
                                    <button onClick={this.onEditBtnClick(_id)}>Edit post</button>
                                    <button onClick={this.onViewBtnClick(_id)}>View post</button>
                                    <button onClick={this.onRemoveBtnClick(_id)}>Remove post</button>
                                </td>
                            </tr>)
                        })}
                </tbody>
            </table>
        );
    }

    render() {
        const { posts } = this.state;

        if (!posts) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                {this.renderPosts()}
                <button className="ui small green button" onClick={this.onCreateBtnClick}>Create a new post</button>
            </div>
        )
    }
}

PostList.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
};