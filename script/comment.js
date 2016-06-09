import React from 'react';
import ReactIntl from 'react-intl';
import ImmutableRenderMixin from 'react-immutable-render-mixin';
import * as comps from './components.js';

const rd = React.DOM;

export default class Comment extends React.Component {
	mixins = [
		ReactIntl.IntlMixin,
		ImmutableRenderMixin,
	];

	onSendComment(comment) {
		// eslint-disable-next-line no-param-reassign
		comment.responseTo = this.props.comment.get('id');
		this.props.onSendComment(comment);
	}

	render() {
		const c = this.props.comment;

		return rd.article(
			{
				className: 'bendro-comment',
				itemScope: true,
				itemProp: c.has('responseTo') ? 'comment' : null,
				itemType: 'http://schema.org/Comment',
			},
			comps.commentHeader({comment: c}),
			rd.div(
				{
					className: 'bendro-comment__text',
					itemProp: 'text',
				},
				c.get('text')
			),
			comps.commentForm({
				onSendComment: this.onSendComment,
				defaultClosed: true,
				error: c.get('formError'),
			}),
			(
				c.has('responses')
					? comps.commentList({
						comments: c.get('responses'),
						onSendComment: this.props.onSendComment,
					})
					: null
			)
		);
	}
}
