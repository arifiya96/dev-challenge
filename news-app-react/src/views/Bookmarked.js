import React, {useState, useEffect} from 'react';
import Article from '../components/Article';
import firebase from 'firebase/app';
import styled from 'styled-components';
import Clear from '@material-ui/icons/Clear';
import 'firebase/firestore';

const Bookmarked = () => {
  const [bookmarked_list, setBookmarked_list] = useState([]);

  //Page automatically reloads after delete
  const HandleDelete = (title) => {
    firebase.firestore().collection('bookmarked').doc(title).delete().then(() => {
      alert('Article removed from bookmarks'); 
    })
  }

  useEffect(() => {
    const BookmarkList = firebase.firestore().collection('bookmarked').onSnapshot(querySnapshot => {
      const bookmark_array = [];
      querySnapshot.forEach(documentSnapshot => {
        bookmark_array.push({
          ...documentSnapshot.data(),
        });
      });
      setBookmarked_list(bookmark_array);
    });
    return () => BookmarkList();
  }, []);

  return (
    <div aria-label={`Showing you your bookmarked articles. You have ${bookmarked_list.length} articles bookmarked`}>{/*<-- parent div for aria-label*/}
      <PageTitle>Bookmarked Articles</PageTitle>
      {bookmarked_list.map((article, index) => (
        <BookmarkedArticles key={index}>
          <Article article={article}></Article>
          <DeleteBtn onClick={() => HandleDelete(article.title)} aria-label={`Click to remove article from bookmarks. The title of this article is ${article.title}`}>
            <Clear style={{color:'white'}}></Clear>
          </DeleteBtn>
        </BookmarkedArticles>
      ))}
    </div>
  )
}

const PageTitle = styled.h1`
  color: white;
  margin: auto;
`;

const BookmarkedArticles = styled.section`
  display: flex;
`;

const DeleteBtn = styled.button`
  background: none;
  height: 30;
  margin: auto;
`

export default Bookmarked;