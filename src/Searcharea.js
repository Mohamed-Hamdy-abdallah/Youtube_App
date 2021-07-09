import React from 'react'
import {useState ,useEffect } from 'react'
import Results from './Results'
import useDropdown from "./useDropdown";
import axios from 'axios'
function Searcharea() {
    const [Name, setName] = useState('')
    const [Videos ,setVideos] = useState([]);
  const [checked, setChecked] = useState(true);
  const [order, OrderDropdown] = useDropdown("Order By", "relevance", [
    "date",
    "relevance",
    "rating",
    "title",
    "viewCount"
  ]);
  const [safeSearch, SafesearchDropdown] = useDropdown("Safe Search", "none", [
    "moderate",
    "none",
    "strict",
  ]);
    const [advancedParams, setAdvancedParams] = useState(``);
    const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (checked) {
      setAdvancedParams(`&order=${order}&safeSearch=${safeSearch}`);
    } else {
      setAdvancedParams(``);
    }
  }, [checked, order, safeSearch]);


    const AxiosFun = async ()=>{
      setLoading(true);
      await  axios.get(`https://youtube.googleapis.com/youtube/v3/search?type=video&q=${Name}${advancedParams}&part=snippet&maxResults=25&key=${process.env.REACT_APP_API_KEY}`)
        .then((res)=>{
            const { items}=res.data ; 
            setVideos(items);
            setLoading(false);
            
            //return res.json();
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    const click=(event)=>
    {
        event.preventDefault();
        AxiosFun();
        
    }
    return (
        <div className="search-area">
            <form onSubmit={click}>
                <label>Write Your video name here
                <input 
                value={Name}
                onChange={(event)=>setName(event.target.value)} />
                </label>
                <label htmlFor="advance">
          Advanced Search
          <input
            type="checkbox"
            id="advance"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
        </label>
        {checked ? (
          <div>
            <OrderDropdown />
            <SafesearchDropdown />
          </div>
        ) : null}

                <button>Search</button>
            </form>
            <Results Videos={Videos} loading={loading}/>
        </div>
    )
}

export default Searcharea
