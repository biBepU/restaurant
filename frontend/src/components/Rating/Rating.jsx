import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RateFood = () => {

    const [rating, setRating] = useState(0);
    const {id} = useParams();
   
    console.log(id)
    const submitRating = async () => {
        try {
            await axios.post(`/api/rate/${id}`, { rating }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Rating submitted successfully');
        } catch (error) {
            console.error('Error submitting rating:', error);
            alert('Failed to submit rating');
        }
    };

    return (
        <div>
            <h3>Rate this food:</h3>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
            </select>
            <button onClick={submitRating}>Submit</button>
        </div>
    );
};

export default RateFood;
