import {elements} from "./base";
import getAvatar from '../helper/getAvatar'
export const getInput = () => elements.commentTextbox.value;

export const clearInput = () => {
    elements.commentTextbox.value = '';
};

export const renderCommentMarkup = (id, username, commentText, child, renderControls) => {
    const markup = `
        <li class="comment" data-id="${id}">
            <div class="avatar">
                <img src="${getAvatar(username)}" />
            </div>
            <div class="content">
                <a href="#">${username}</a>
                <p>${commentText}</p>
                <div>
                   ${renderControls(id)}
                </div>
            </div>
        </li>
    `;

    !child && elements.commentList.insertAdjacentHTML('afterbegin', markup);

    return markup;
};

export const renderChildrenCommentMarkup = (id, username, commentText, parentCommentId, renderControls) => {
    const markup = `
        <ul class="comment__list">
            ${renderCommentMarkup(id, username, commentText, true, renderControls)}
        </ul>
    `;
    document.querySelector(`li[data-id="${parentCommentId}"]`).insertAdjacentHTML('afterend', markup);
};
