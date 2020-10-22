import React from 'react';
// import './preview-component.style.scss';
import Card from '../card/card.component';

const PreviewCollection = ({ title, items }) => (
	<div className="preview-collection">
		<h1 className="title">{title.toUpperCase()}</h1>
		<div className="preview">
			{items
				.filter((item, index) => index < 4)
				.map(item => <Card key={item.id} item={item} />)}
		</div>
	</div>
);

export default PreviewCollection;
