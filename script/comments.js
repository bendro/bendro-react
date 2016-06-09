import React from 'react';
import ReactIntl from 'react-intl';
import ImmutableRenderMixin from 'react-immutable-render-mixin';
import * as comps from './components.js';

const rd = React.DOM;

export default class Comments extends React.Component {
	mixins = [
		ReactIntl.IntlMixin,
		ImmutableRenderMixin,
	];

	render() {
		let error = null;
		if (this.props.error) {
			error = rd.div(
				{
					className: 'bendro-comments__error',
				},
				this.props.error
			);
		}

		return rd.div(
			{
				className: 'bendro-comments',
			},
			error,
			comps.commentForm({
				onSendComment: this.props.onSendComment,
				error: this.props.formError,
			}),
			comps.commentList({
				comments: this.props.comments,
				onSendComment: this.props.onSendComment,
			})
		);
	}
}
