// Comment List Model
import CommentList from './model/CommentList';

// Comment List View
import * as commentListView from './view/commentListView';

// Helpers
import { elements } from './view/base';
import generateUniqueId from './helper/generateUniqueId';
import randomUsername from './helper/randomName';

/**
 * Store for comments
 */
const state = {};
const defaultShowLimit = 4;

/**
 * Comment List Controller
 */
const controlCommentList = (commentTextbox, id) => {
  const comment = commentTextbox.value;
  let username = randomUsername();
  let randomId = generateUniqueId();
  if (!state.commentList) state.commentList = new CommentList();

  if (comment) {
    const isChild = !!id;
    state.commentList.addComment(randomId, username, comment, isChild, id);

    commentListView.clearInput();

    // @todo: think something else here, it's bad
    id
      ? commentListView.renderChildrenCommentMarkup(
          randomId,
          username,
          comment,
          id,
          renderControls
        )
      : commentListView.renderCommentMarkup(randomId, username, comment, undefined, renderControls);
  }
};

elements.commentTextbox.addEventListener('keyup', e => {
  if (e.keyCode === 13) {
    controlCommentList(elements.commentTextbox, e.target.dataset.id);
    elements.commentTextbox.removeAttribute('data-id');
  }
});

elements.mainCommentTextbox.addEventListener('keyup', e => {
  if (e.keyCode === 13) {
    debugger
    controlCommentList(elements.mainCommentTextbox, e.target.dataset.id);
    elements.mainCommentTextbox.removeAttribute('data-id');
  }
});

elements.commentList.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.tagName !== 'BUTTON') return;

  const btn = e.target;
  const id = btn.dataset.id;
  const li = document.querySelector(`li[data-id="${id}"]`);
  if (btn.classList.contains('comment__reply-btn')) {
    document.querySelector('.main_comment__text-section').style.display = 'block';
    li.insertAdjacentElement('afterend', elements.commentTextbox);
    elements.commentTextbox.focus();
    elements.commentTextbox.setAttribute('data-id', id);
  }

  if (btn.classList.contains('comment__delete-btn')) {
    if (!confirm('Are you sure to delete this item?')) return;
    const deletedText = 'This comment has been deleted';
    state.commentList.softDeleteComment(id, deletedText);
    li.querySelector('.content p').innerHTML = deletedText;
    e.target.remove();
  }
});


window.addEventListener('load', e => {
  state.commentList = new CommentList();

  state.commentList.readStorage();
  initComments(state, defaultShowLimit);

  elements.viewPreviousButton.addEventListener('click', function(e) {
    initComments(state);
    elements.viewPreviousButton.remove();
  })
  if(!state.commentList || (state.commentList && state.commentList.commentList.length <= defaultShowLimit)) {
    elements.viewPreviousButton.remove();
  }
});


/**
 * Initialize Comments
 */
const initComments = (state, limit) => {
    
  //@todo: render n number of comment here based on config.js
    for (let i in state.commentList.commentList) {
      const comment = state.commentList.commentList[i];
      if(i == limit) return;
      const { id, username, text: commentText, parentId } = comment;
      if (parentId) {
        commentListView.renderChildrenCommentMarkup(
          id,
          username,
          commentText,
          parentId,
          renderControls
        );
      } else {
        commentListView.renderCommentMarkup(id, username, commentText, undefined, renderControls);
      }
    }
  }
/**
 * Controls
 */

 const renderControls = (id) => {
     const comment = state.commentList.commentList.find(c => c.id == id);

     let output = `<button class="comment__reply-btn" data-id="${id}">Reply</button>`;
     if (comment && !comment.deleted) {
       output += `<button class="comment__delete-btn" data-id="${id}">Delete</button>`;
     }
     return output;
}