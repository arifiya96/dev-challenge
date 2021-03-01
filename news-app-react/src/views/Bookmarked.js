import React from 'react';
import Article from '../components/Article';
import test_data from '/Users/ifkar/suvera-dev-challenge/dev-challenge/news-service/test-data';

const Bookmarked = () => {
  return (
    test_data.articles.map((article, index) => (
        <Article key={index} article={article}></Article>
    ))
  )
}

export default Bookmarked;