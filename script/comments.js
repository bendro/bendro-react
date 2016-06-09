import React from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CommentForm from './comment-form';
import CommentList from './comment-list';

@immutableRenderDecorator
export default class Comments extends React.Component {
	render() {
		let error = null;
		if (this.props.error) {
			error = <div className="bendro-comments__error">{this.props.error}</div>;
		}

		return (
			<div className="bendro-comments">
				{error}
				<CommentForm
					onSendComment={this.props.onSendComment}
					error={this.props.formError}
				/>
				<CommentList
					comments={this.props.comments}
					onSendComment={this.props.onSendComment}
				/>
			</div>
		);
	}
}
