import {useState} from 'react'
import {observer, inject} from 'mobx-react'
import {
  CommentsContainer,
  CommentsTitle,
  Form,
  NameInput,
  CommentTextInput,
  CommentButton,
  CommentsList,
} from './styledComponents'
import CommentItem from '../CommentItem'

const Comments = inject('commentStore')(
  observer(({commentStore}) => {
    const [name, setName] = useState('')
    const [commentText, setCommentText] = useState('')
    const [replierName, setReplierName] = useState('')
    const [replyText, setReplyText] = useState('')
    const [replyToCommentId, setReplyToCommentId] = useState(null)

    const onAddComment = e => {
      e.preventDefault()
      commentStore.addComment(name, commentText)
      setName('')
      setCommentText('')
    }

    const onAddReply = (e, parentId) => {
      e.preventDefault()
      commentStore.addThreadedComment(replierName, replyText, parentId)
      setReplierName('')
      setReplyText('')
      setReplyToCommentId(null)
    }

    const onChangeName = e => {
      setName(e.target.value)
    }

    const onChangeCommentText = e => {
      setCommentText(e.target.value)
    }

    const onChangeReplierName = e => {
      setReplierName(e.target.value)
    }

    const onChangeReplyText = e => {
      setReplyText(e.target.value)
    }

    const handleReplyClick = commentId => {
      setReplyToCommentId(commentId)
    }

    return (
      <CommentsContainer>
        <CommentsTitle>Comments</CommentsTitle>
        <Form onSubmit={onAddComment}>
          <NameInput
            type="text"
            placeholder="Your name"
            value={name}
            onChange={onChangeName}
          />
          <CommentTextInput
            placeholder="Your comment"
            rows="6"
            onChange={onChangeCommentText}
            value={commentText}
          />
          <CommentButton type="submit">Comment</CommentButton>
        </Form>
        <CommentsList>
          {commentStore.comments.map(each => (
            <div key={each.id}>
              <CommentItem commentDetails={each} />
              <button onClick={() => handleReplyClick(each.id)} type="submit">
                Reply
              </button>
              {replyToCommentId === each.id && (
                <Form onSubmit={e => onAddReply(e, each.id)}>
                  <NameInput
                    type="text"
                    placeholder="Your name"
                    value={replierName}
                    onChange={onChangeReplierName}
                  />
                  <CommentTextInput
                    placeholder="Your reply"
                    rows="3"
                    onChange={onChangeReplyText}
                    value={replyText}
                  />
                  <CommentButton type="submit">Reply</CommentButton>
                </Form>
              )}
              {each.replies &&
                each.replies.map(reply => (
                  <div key={reply.id} style={{marginLeft: '20px'}}>
                    <CommentItem commentDetails={reply} />
                  </div>
                ))}
            </div>
          ))}
        </CommentsList>
      </CommentsContainer>
    )
  }),
)

export default Comments
