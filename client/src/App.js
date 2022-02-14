import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import ItemList from './components/ItemList';

const apiURL = "https://inventory-tracker-5527a.web.app/api";

function App() {

  const [searchRes, setSearchRes] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getSearchInput = (val) => {
    setSearchInput(val.target.value);
  }

  
  const getSearchRes = async () =>{
    setIsLoading(true);

    const url = new URL(apiURL + "/search");
    const urlParams = url.searchParams;
    urlParams.append("product",searchInput);

    try{
      const response = await fetch(url);
      const parsedResponse = await response.json();
      const productsArray = parsedResponse.products;
      setSearchRes(productsArray);
    }catch(error){  //TO DO add errors for failing to fetch
      console.log(error);
      setSearchRes([]);
    }

    setIsLoading(false);
  }

  const handleSearchKeypress = (event) => {
    if(event.key === "Enter"){
      getSearchRes();
    }
  }


  useEffect(() => {
    document.title = `Inventory Tracker App`;
  }
  ,[]);

  return (
    <div className="container-fluid">
      <h1 className='display-2 text-center'>Bestbuy Online Inventory Tracker</h1>
      <div className='w-100 p-3 input-group'>
        <div className='w-75 form-outline'>
          <input type='search' id='searchProduct' 
          className='form-control col-lg-8' placeholder='Search a product...'
          onChange={getSearchInput} onKeyPress={handleSearchKeypress}/>
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
