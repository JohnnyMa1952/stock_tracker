import React, { useState, useContext } from 'react';
import Item from './Item';

const ItemList = ({items}) => {

    if(items.length === 0)
        return (<h1 className='display-2'>No Results</h1>);

    return(
        <section className='d-flex'>
            {items.map((item) =>{
                return(
                    <Item key={item.sku} item={item}></Item>
                );
            })}
        </section>
    );
};

export default ItemList;