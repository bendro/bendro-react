import React from 'react';
import ReactIntl from 'react-intl';
import ImmutableRenderMixin from 'react-immutable-render-mixin';

const formattedRelative = React.createFactory(ReactIntl.FormattedRelative);
const formattedMessage = React.createFactory(ReactIntl.FormattedMessage);
const rd = React.DOM;

export default class CommentHeader extends React.Component {
	mixins = [
		ReactIntl.IntlMixin,
		ImmutableRenderMixin,
	];

	renderAuthor(c) {
		let a = rd.span(
			{
				itemProp: 'name',
			},
			c.get('author') || this.getIntlMessage('anonymous')
		);

		const website = c.get('website');
		if (website) {
			a = rd.a(
				{
					href: website,
					rel: 'author,external',
					itemProp: 'url',
					className: 'bendro-comment-header__website',
					target: 'bendro-author',
				},
				a
			);
		}

		return rd.span(
			{
				itemScope: true,
				itemType: 'http://schema.org/Person',
				itemProp: 'author',
				className: 'bendro-comment-header__author',
			},
			a
		);
	}

	renderDate(time, type, typeCss) {
		return rd.time(
			{
				title: this.formatDate(time, 'datetime'),
				dateTime: time,
				itemProp: type,
				className: `bendro-comment-header__ ${typeCss}`,
			},
			formattedRelative({value: time, style: 'numeric'})
		);
	}

	render() {
		const c = this.props.comment;
		const ctime = c.get('ctime');
		const mtime = c.get('mtime');

		return rd.header(
			{
				className: 'bendro-comment-header',
			},
			formattedMessage({
				message: ctime === mtime
					? this.getIntlMessage('commentHeader')
					: this.getIntlMessage('commentHeaderEdited'),
				author: this.renderAuthor(c),
				ctime: this.renderDate(ctime, 'dateCreated', 'ctime'),
				mtime: this.renderDate(mtime, 'dateModified', 'mtime'),
			})
		);
	}
}
