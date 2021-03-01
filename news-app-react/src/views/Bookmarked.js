import React, {useState, useEffect} from 'react';
import Article from '../components/Article';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Bookmarked = () => {
  const [bookmarked_list, setBookmarked_list] = useState([]);

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
    bookmarked_list.map((article, index) => (
      <Article key={index} article={article}></Article>
    ))
  )
}

export default Bookmarked;