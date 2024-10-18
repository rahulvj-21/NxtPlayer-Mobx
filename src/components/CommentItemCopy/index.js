import {
  ListItem,
  Avatar,
  NameAndCommentContainer,
  NameText,
  CommentText,
  HorizontalLine,
} from './styledComponents'
import commentStore from '../CommentStore'

const CommentItemCopy = props => {
  const {commentDetails} = props
  const {name, commentText} = commentDetails

  console.log(commentStore.comments[0])

  return (
    <>
      <ListItem>
        {name && <Avatar>{name[0].toUpperCase()}</Avatar>}
        <NameAndCommentContainer>
          <NameText>{name}</NameText>
          <CommentText>{commentText}</CommentText>
        </NameAndCommentContainer>
      </ListItem>
      <HorizontalLine />
    </>
  )
}

export default CommentItemCopy
