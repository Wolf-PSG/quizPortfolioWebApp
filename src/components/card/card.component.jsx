import React from 'react';
import { Link } from 'react-router-dom';

import './card.component.scss';

const Card = (props) => {
  const { titles, id } = props;
  const urlString = `/updateQuiz/${id}`;
  return (
    <div className="quiz-collections" key={id}>
      <Link
        key={id}
        className="image"
        style={{ backgroundImage: 'url(https://www.elegantthemes.com/blog/wp-content/uploads/2019/04/buzzfeed-quiz.jpg)' }}
        to={{ pathname: urlString }}
      />
      <div className="collection-footer">
        <span className="name">{titles}</span>
      </div>
    </div>
  );
};

export default Card;
