import {makeObservable, action, observable, autorun} from 'mobx'
import {v4 as uuidv4} from 'uuid'

class CommentStore {
  comments = []

  constructor() {
    makeObservable(this, {
      comments: observable,
      addComment: action,
    })

    autorun(() => {
      if (this.comments.length > 0) {
        console.log('Comment Added', this.comments.length)
      }
    })
  }

  addComment(name, commentText) {
    const newComment = {
      id: uuidv4(),
      name,
      commentText,
    }
    this.comments.push(newComment)
  }
}

class ReplyCommentStore extends CommentStore {
  constructor() {
    super()
  }

  addReplyComment(name, commentText, parentId = null) {
    const newComment = {
      id: uuidv4(),
      name,
      commentText,
      replies: [],
    }

    if (parentId) {
      const parentComment = this.comments.find(
        comment => comment.id === parentId,
      )
      if (parentComment) {
        if (!parentComment.replies) {
          parentComment.replies = []
        }
        parentComment.replies.push(newComment)
      } else {
        console.error('Parent comment not found')
      }
    } else {
      this.comments.push(newComment)
    }
  }
}

const replyCommentStore = new ReplyCommentStore()
export default replyCommentStore
