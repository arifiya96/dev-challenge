import React, { useState, useEffect, useRef } from 'react';
import debounce from 'debounce';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

import Article from 'components/Article';
import regions from '../components/Region';
//import Dropdown from '../components/Dropdown'; <-- not sure how I feel about having state within a child component...

//Material UI components used for dropdown
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const stage = process.env.NODE_ENV;
const baseURL = `${process.env.APP_SERVICE_URL}${stage}`;

function loadSearchInput(setSearchText) {
  return function(e) {
    e.persist();

    debounce(() => {
      const { value } = e.target;

      setSearchText(value);
    }, 500)();
  }
}

async function loadArticles(type, params, setArticles) {
  setArticles({
    isLoading: true,
    data: [],
    sources: [], //<-- Added sources
    onError: false
  });

  try {
    const response = await fetch(`${baseURL}/articles?type=${type}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    if (response.status >= 200 && response.status <= 299) {
      const { articles } = await response.json();

      //Once response received, traverse through articles and store the sources into temp variable
      const sources_array = ['All sources']; //<-- Temp variable
      articles.map(article => {
        const sources_name = article.source.name;
        if (sources_array.includes(sources_name) == false){
          sources_array.push(sources_name)
        }
      })

      setArticles({
        isLoading: false,
        data: articles || [],
        sources: sources_array || [], //Set sources from temp variable
        onError: false
      });
    }
    else {
      setArticles({
        isLoading: false,
        data: [],
        sources: [],
        onError: true
      });
    }
  } catch (error) {
    setArticles({
      isLoading: false,
      data: [],
      sources: [],
      onError: true
    });
  }
}

function Home() {
  const searchContentTitle = 'search results for:';
  const inputLabel = 'Filter news by keyword. Advanced: use quotes (\'\') for exact matches, and the + / - symbols for needed / excluded words.';
  const sources_input_label = 'Select by source';
  const region_input_label = 'Select by region';

  const searchInputRef = useRef();

  const [contentTitle, setContentTitle] = useState(defaultContentTitle);
  const [searchText, setSearchText] = useState('');
  const [articles, setArticles] = useState({
    isLoading: true,
    data: [],
    sources: [],
    onError: false
  });

  //State source for filtering. This will be used to track which source the user has clicked.
  const [source, setSource] = useState('All sources');

  //State for region selector
  const [region_selector, setRegion_selector] = useState({country: 'UK 🇬🇧', code: 'gb'});

  const defaultContentTitle = `top ${region_selector.country} headlines`;

  //If users has not chosen a source filter, all articles will render
  const ShowAllArticles = () => {
    return (
      articles.data?.map((article, index) => (
        <Article key={index} article={article}></Article>
      ))
    )
  }

  //If user has chosen a source filter, only articles from specific source will render
  const FilterCategory = () => {
    const filtered_articles = []; //<-- temp variable for filtered articles
    articles.data?.map(article => {
      if (article.source.name == source){
        filtered_articles.push(article);
      }
    })
    return (
      filtered_articles.map((article, index) => (
        <Article key={index} article={article} />
      ))
    )
  }

  useEffect(() => {
    if(searchText.length > 0) {

      setContentTitle(`${searchContentTitle} ${searchText}`);

      loadArticles('search', { q: searchText }, setArticles);
    }
    else {
      searchInputRef.current.value = '';

      setContentTitle(defaultContentTitle);

      let bodyParam = { country: region_selector.code }; //<-- monitor region selector state

      loadArticles('headlines', bodyParam, setArticles);
    }
  }, [searchText, region_selector]);

  return (
    <HomePage>
      <PageTitle>
        <h2>Showing you the {contentTitle}</h2>
      </PageTitle>

      <InputGroup>
        <SearchInput
          ref={searchInputRef}
          name='search-input'
          type='text'
          placeholder={inputLabel}
          defaultValue={searchText}
          onChange={loadSearchInput(setSearchText)} />

        <SearchIcon />
      </InputGroup>

      {articles.data?.length > 0 &&
        <ArticleList>
          {/*Region and source filters. If user has searched for something, region filter will disappear*/}
          {searchText.length == 0 ? 
            <FilterArea>
              <FormControl style={{width: 300}}>
                <InputLabel style={{color: 'white'}}>{region_input_label}</InputLabel>
                <Select value={region_selector} onChange={(event) => setRegion_selector(event.target.value)} style={{color: 'white'}}>
                  {regions?.map((item_name, index) => (
                    <MenuItem value={item_name} key={index}>{item_name.country}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FilterArea> : null}
          <FilterArea>
            <FormControl style={{width: 300}}>
              <InputLabel style={{color: 'white'}}>{sources_input_label}</InputLabel>
              <Select value={source} onChange={(event) => setSource(event.target.value)} style={{color: 'white'}}>
                {articles.sources?.map((item_name, index) => (
                  <MenuItem value={item_name} key={index}>{item_name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </FilterArea>
          {/*Render based on if the filter is selected or not*/}
          {source == 'All sources' ? ShowAllArticles() : FilterCategory()}
        </ArticleList>}
    </HomePage>
  );
}

const HomePage = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  padding: 0 20px 20px;

  @media (max-width: 486px) {
    padding: 10px;
  }
`;

const PageTitle = styled.h2`
  font-weight: 400;
  font-size: 34px;
  line-height: 40px;
  margin: auto;
  margin-bottom: 2.5vh;
  text-overflow: wrap
  width: 100%;
  color: #fafafa;
`;

const InputGroup = styled.div`
  position: relative;
  display: inline-grid;
  flex: 1 1 auto;
  width: 100%;

  svg {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    fill: rgba(0, 0, 0, .44);
  }
`;

const SearchInput = styled.input`
  color: rgba(0, 0, 0, .87);
  line-height: 20px;
  padding: 8px 12px 8px 45px;
  margin: 0;
  min-width: 0;
  max-width: 100%;
  height: 32px;
  background-color: #dcdcdc;
  border-style: none;
  border-radius: 2px;
  font-size: 16px;

  &[placeholder] {
    color: rgba(0, 0, 0, .74);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:focus {
    color: #fff;
    background-color: #424242;
    caret-color: #ee44aa;
    outline: 0;

    ::placeholder {
      color: #fff;
    }

    & + svg {
      fill: #ee44aa;
    }
  }
`;

//Customised div for filter selections
const FilterArea = styled.section`
  margin: 5px;
`;

const ArticleList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
`;

export default Home;
