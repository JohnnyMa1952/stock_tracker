import React, { useState, useContext } from 'react';
import Item from './Item';

const ItemList = ({items}) => {

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