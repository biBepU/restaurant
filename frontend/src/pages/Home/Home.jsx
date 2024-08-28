// src/pages/Home/HomePage.js
import React, { useEffect, useReducer } from 'react';
import { getAll, getAllByTag, getAllTags, search } from '../../services/services';
import ThumbNails from '../../components/ThumbNails/ThumbNails';
import Tags from '../../components/Tags/Tags';
import NotFound from '../../components/NotFound/NotFound';
import { useParams } from 'react-router-dom';

const initialState = { foods: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'FOODS_LOADED':
      return { ...state, foods: action.payload };
    case 'TAGS_LOADED':
      return { ...state, tags: action.payload };
    default:
      return state;
  }
}

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags } = state;
   const {searchTerm,tag} = useParams();

  useEffect(() => {
    getAllTags().then(tags => dispatch({ type: 'TAGS_LOADED', payload: tags }));

    const loadedFoods =
      tag ? getAllByTag(tag) :
      searchTerm ? search(searchTerm) : getAll();

    loadedFoods.then(foods => dispatch({ type: 'FOODS_LOADED', payload: foods }));

  }, [searchTerm, tag]);

  return (
    <div>
      <Tags tags={tags} />
      {foods.length === 0 && <NotFound linkText="Research the food" />}
      <ThumbNails foods={foods} />
    </div>
  );
}
