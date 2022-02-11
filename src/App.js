import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import ItemList from './components/ItemList';

//mock data before backend is setup
let mockData = require('./data/searchResData.json');


function App() {

  const [searchRes, setSearchRes] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getSearchInput = (val) => {
    setSearchInput(val.target.value);
  }

  
  //TODO: function using mock data, should fetch from server
  const getSearchRes = () =>{
    setIsLoading(true);
    setSearchRes(mockData.products);
    setIsLoading(false);
  }


  useEffect(() => {
    document.title = `Inventory Tracker App`;
  }
  ,[]);

  return (
    <div className="container-fluid">
      <h1 className='display-2 text-center'>Bestbuy Inventory Tracker</h1>
      <div className='w-100 p-3 input-group'>
        <div className='w-75 form-outline'>
          <input type='search' id='searchProduct' 
          className='form-control col-lg-8' placeholder='Search a product...'
          onChange={getSearchInput}/>
        </div>
        <button type='button' className='btn btn-primary w-25' onClick={getSearchRes}>
          Search
        </button>
      </div>
      <div className='w-100 p-3 container-fluid border'>
        {isLoading ? 
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
            </div>
          </div>
        : 
          <ItemList items={searchRes}></ItemList>
        }
      </div>
    </div>
  );
}

export default App;
