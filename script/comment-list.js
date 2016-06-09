import React from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import {comment} from './components.js';

const rd = React.DOM;

@immutableRenderDecorator
export default class CommentList extends React.Component {
	render() {
		const comments = this.props.comments.map(c => comment({
			key: c.get('id'),
			comment: c,
			onSendComment: this.props.onSendComment,
		}));

		return rd.div(
			{
				className: 'bendro-comment-list',
			},
			comments
		);
	}
}
