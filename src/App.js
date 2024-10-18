import {Provider} from 'mobx-react'
import commentStore from './components/CommentStore'
import Header from './components/Header'
import VideoPlayer from './components/VideoPlayer'
import Comments from './components/Comments'

import {GlobalStyle, MainContainer} from './styledComponents'

const App = () => (
  <Provider commentStore={commentStore}>
    <GlobalStyle />
    <MainContainer>
      <Header />
      <VideoPlayer />
      <Comments />
    </MainContainer>
  </Provider>
)

export default App
