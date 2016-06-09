import React from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';

@immutableRenderDecorator
export default class CommentForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			author: '',
			email: '',
			website: '',
			activated: !props.defaultClosed,
		};
	}

	onTextChange(e) {
		this.setState({text: e.target.value});
	}

	onAuthorChange(e) {
		this.setState({author: e.target.value});
	}

	onEmailChange(e) {
		this.setState({email: e.target.value});
	}

	onWebsiteChange(e) {
		this.switchetState({website: e.target.value});
	}

	onSendClick() {
		const comment = {
			text: this.state.text,
			author: this.state.author,
			email: this.state.email,
			website: this.state.website,
		};
		this.props.onSendComment(comment);

		this.setState({
			text: '',
			author: '',
			email: '',
			website: '',
			activated: !this.props.defaultClosed,
		});
	}

	onActivateClick(e) {
		e.preventDefault();
		this.setState({activated: true});
	}

	onDeactivateClick(e) {
		e.preventDefault();
		this.setState({activated: false});
	}

	render() {
		let content;

		if (this.state.activated) {
			content = (
				<div>
					{
						this.props.defaultClosed ? (
							<a
								onClick={this::this.onDeactivateClick}
								href="#"
								className="bendro-comment-form__deactivate"
							>schließen</a>
						) : null
					}
					<textarea
						onChange={this::this.onTextChange}
						value={this.state.text}
						placeholder="Kommentartext hier eintippen"
						className="bendro-comment-form__text"
					/>
					<input
						onChange={this::this.onAuthorChange}
						value={this.state.author}
						placeholder="Name (optional)"
						type="text"
						className="bendro-comment-form__author"
					/>
					<input
						onChange={this::this.onEmailChange}
						value={this.state.email}
						placeholder="Email (optional)"
						type="email"
						className="bendro-comment-form__email"
					/>
					<input
						onChange={this::this.onWebsiteChange}
						value={this.state.website}
						placeholder="Webseite (optional)"
						type="url"
						className="bendro-comment-form__website"
					/>
					<button
						onClick={this::this.onSendClick}
						className="bendro-comment-form__send"
					>senden</button>
				</div>
			);
		} else {
			content = (
				<a
					onClick={this::this.onActivateClick}
					href="#"
					className="bendro-comment-form__activate"
				>antworten</a>
			);
		}

		let error = null;
		if (this.props.error) {
			error = <div className="bendro-comment-form__error">{this.props.error}</div>;
		}

		return <div className="bendro-comment-form">{error} {content}</div>;
	}
}
