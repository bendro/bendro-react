import React from 'react';
import ReactIntl from 'react-intl';
import ImmutableRenderMixin from 'react-immutable-render-mixin';
import {comment} from './components.js';

const rd = React.DOM;

export default class CommentList extends React.Component {
	mixins = [
		ReactIntl.IntlMixin,
		ImmutableRenderMixin,
	];

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
