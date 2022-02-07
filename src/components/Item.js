import React, { useState, useContext } from 'react';

const Item = ({item}) =>{

    const itemURL = `https://www.bestbuy.ca` + item.productUrl;

    return(
        <article className='m-3'>
            <a href={itemURL} target='_blank'>
                <h4>{item.name}</h4>
                <img src={item.thumbnailImage} alt={item.name} />
            </a>
        </article>
    );
}

export default Item;