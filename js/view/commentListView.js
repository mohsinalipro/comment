import {elements} from "./base";

export const getInput = () => elements.commentTextbox.value;

export const clearInput = () => {
    elements.commentTextbox.value = '';
};

export const renderCommentMarkup = (id, username, commentText, child) => {
    const markup = `
        <li data-id="${id}">
            <span>${username}</span>
            <span>${commentText}</span>
            <button class="comment__reply-btn" data-id="${id}">Reply</button>
        </li>
    `;

    !child && elements.commentList.insertAdjacentHTML('afterbegin', markup);

    return markup;
};

export const renderChildrenCommentMarkup = (id, username, commentText) => {
    const markup = `
        <ul class="comment__list">
            ${renderCommentMarkup(id, username, commentText, true)}
        </ul>
    `;

    document.querySelector(`li[data-id="${id}"]`).insertAdjacentHTML('afterend', markup);
};
