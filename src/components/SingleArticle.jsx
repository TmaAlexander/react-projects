import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {ArticleContext} from '../context/ArticleContext';

const SingleArticle = () => {
    // Bring in the selected article
    const {selectedArticle} = useContext(ArticleContext)

    // Create a variable for the useNavigate
    const navigate = useNavigate()

  return (
    <div id='selected-article-card'>
      <button id='back-to-home-button' onClick={() => navigate('/')}>←</button>
      <h1><i>{selectedArticle.title}</i></h1>
      <h3>{selectedArticle.author}</h3>
      <p>{selectedArticle.sourceName}</p>
      <img src={selectedArticle.urlToImage} alt={selectedArticle.title} />
      <p>{selectedArticle.content}</p><br/>
      <p>{selectedArticle.publishedAt}</p>
    </div>
  )
}

export default SingleArticle
