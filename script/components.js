import React from 'react';
import _comment from './comment.js';
import _commentForm from './comment-form.js';
import _commentHeader from './comment-header.js';
import _commentList from './comment-list.js';
import _comments from './comments.js';

export const comment = React.createFactory(_comment);
export const commentForm = React.createFactory(_commentForm);
export const commentHeader = React.createFactory(_commentHeader);
export const commentList = React.createFactory(_commentList);
export const comments = React.createFactory(_comments);
