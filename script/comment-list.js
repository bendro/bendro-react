import React from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import Comment from './comment';

@immutableRenderDecorator
export default class CommentList extends React.Component {
	render() {
		const comments = this.props.comments.map(c => (
			<Comment
				key={c.get('id')}
				comment={c}
				onSendComment={this.props.onSendComment}
			/>
		));

		return <div className="bendro-comment-list">{comments}</div>;
	}
}
