// src/components/AllFoodPage/AllFoodPage.js
import React from 'react';


import Tags from '../../components/Tags/Tags';
import NotFound from '../../components/NotFound/NotFound';
import ThumbNails from '../../components/ThumbNails/ThumbNails';

const AllFoodPage = ({ tags, foods }) => {
    return (
        <div>
            <Tags tags={tags} />
            {foods && foods.length === 0 ? (
                <NotFound linkText="Research the food" />
            ) : (
                <ThumbNails foods={foods} />
            )}
        </div>
    );
};

export default AllFoodPage;
