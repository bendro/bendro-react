import React from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CommentHeader from './comment-header';
import CommentForm from './comment-form';
import CommentList from './comment-list';


@immutableRenderDecorator
export default class Comment extends React.Component {
	onSendComment(comment) {
		// eslint-disable-next-line no-param-reassign
		comment.responseTo = this.props.comment.get('id');
		this.props.onSendComment(comment);
	}

	render() {
		const c = this.props.comment;

		let list = null;
		if (c.has('responses')) {
			list = (
				<CommentList
					comments={c.get('responses')}
					onSendComment={this.props.onSendComment}
				/>
			);
		}

		return (
			<article
				className="bendro-comment"
				itemScope
				itemProp={c.has('responseTo') ? 'comment' : null}
				itemType="http://schema.org/Comment"
			>
				<CommentHeader comment={c} />

				<div
					className="bendro-comment__text"
					itemProp="text"
				>{c.get('text')}</div>

				<CommentForm
					onSendComment={this::this.onSendComment}
					defaultClosed
					error={c.get('formError')}
				/>

				{list}

			</article>
		);
	}
}
