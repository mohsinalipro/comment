export default class commentList {
    constructor(){
        this.commentList = [];
    }

    addComment(id, username, text, child, parentId){
        const comment = {
            id,
            username,
            text,
            child: !!child,
            parent: !!parentId,
            parentId
        };
        this.commentList.push(comment);
        this._persistComments();
    }

    editComment(id, text){
        const updateComment = this.commentList.indexOf(id);

        // @todo: try to follow immutability over here
        this.commentList[updateComment].text = text;

        this._persistComments();
    }

    softDeleteComment(id, text){
        const updateComment = this.commentList.find(listItem => listItem.id == id);

        updateComment.text = text;
        updateComment.deleted = true;

        this._persistComments();
    }
    deleteComment(id){
        const updatedCommentList = this.commentList.filter(listItem => listItem.id == id);

        this.commentList = updatedCommentList;
        this._persistComments();
    }

    _persistComments(){
        localStorage.setItem('commentList', JSON.stringify(this.commentList));
    }

    readStorage(){
        
        const storage = JSON.parse(localStorage.getItem('commentList'));
        if (storage) this.commentList = storage;
    }

}