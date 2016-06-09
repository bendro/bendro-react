import React from 'react';
import {FormattedRelative, FormattedMessage, injectIntl} from 'react-intl';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';

@injectIntl
@immutableRenderDecorator
export default class CommentHeader extends React.Component {
	renderAuthor(c) {
		let a = <span itemProp="name">{c.get('author') || <FormattedMessage id="anonymous" />}</span>;

		const website = c.get('website');
		if (website) {
			a = (
				<a
					href={website}
					rel="author,external"
					itemProp="url"
					className="bendro-comment-header__website"
					target="bendro-author"
				>{a}</a>
			);
		}

		return (
			<span
				itemScope
				itemType="http://schema.org/Person"
				itemProp="author"
				className="bendro-comment-header__author"
			>{a}</span>
		);
	}

	renderDate(time, type, typeCss) {
		return (
			<time
				title={this.props.intl.formatDate(time, 'datetime')}
				dateTime={time}
				itemProp={type}
				className={`bendro-comment-header__ ${typeCss}`}
			>
				<FormattedRelative value={time} style="numeric" />
			</time>
		);
	}

	render() {
		const c = this.props.comment;
		const ctime = c.get('ctime');
		const mtime = c.get('mtime');

		return (
			<header className="bendro-comment-header">
				<FormattedMessage
					id={ctime === mtime ? 'commentHeader' : 'commentHeaderEdited'}
					values={{
						author: this.renderAuthor(c),
						ctime: this.renderDate(ctime, 'dateCreated', 'ctime'),
						mtime: this.renderDate(mtime, 'dateModified', 'mtime'),
					}}
				/>
			</header>
		);
	}
}
