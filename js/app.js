// Comment List Model
import CommentList from "./model/CommentList";

// Comment List View
import * as commentListView from "./view/commentListView";

// Helpers
import {elements} from "./view/base";
import generateUniqueId from "./helper/generateUniqueId";
import randomUsername from "./helper/randomName";


/**
 * Store for comments
 */
const state = {};

/**
 * Comment List Controller
 */
const controlCommentList = (id) => {
    const comment = elements.commentTextbox.value;
    let username = randomUsername();
    let randomId = generateUniqueId();

    if(!state.commentList)
        state.commentList = new CommentList();

    if(comment){
        state.commentList.addComment(randomId, comment);

        commentListView.clearInput();

        // @todo: think something else here, it's bad
        id ?  commentListView.renderChildrenCommentMarkup(id, username, comment)
            : commentListView.renderCommentMarkup(randomId, username, comment);
    }
};

elements.commentTextbox.addEventListener('keyup', e => {
    if(e.keyCode === 13){
        controlCommentList(e.target.dataset.id);
        elements.commentTextbox.removeAttribute("data-id");
    }
});

elements.commentList.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        elements.commentTextbox.focus();
        elements.commentTextbox.setAttribute("data-id", e.target.dataset.id);
    }
});

window.addEventListener('load', e => {
    state.commentList = new CommentList();

    state.commentList.readStorage();

    //@todo: render n number of comment here based on config.js
});