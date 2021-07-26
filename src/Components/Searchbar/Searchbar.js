import React,{useState,useEffect} from "react";
import axios from "axios";
import './searchbar.css'
import Popup from './Popup'



const Searchbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [recipes,setRecipe] =useState([]);
    const [search,setSearch]=useState("");
    const [query,setQuery] =useState("chicken");
    const APP_ID='caf40cdd';
    const APP_KEY='26753c58cb57eef9b589fa78704b22c0';
    
    const datafetched =async()=>{
        const result=await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    setRecipe(result.data.hits);
  
    }

    useEffect(()=>{
        datafetched();
    },[query]);

    const updateSearch=(e)=>{
        let values=e.target.value;
        e.preventDefault();
        setSearch(values);
    }
    const updateQuery=(e)=>{
        e.preventDefault()
        setQuery(search);
    }


 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    return (
        <div className="searchbar">
            <div className="recipe">
                <div className="recipeWrapper">
                      <h1>Food Recipe</h1>
                      <div className="searchbox">
                      <input className="inputbox" placeholder="Search Recipe..." onChange={updateSearch}/>
                      <button className="search" onClick={updateQuery}>
                       Search...
                      </button>
                      </div>
                     
                </div>
            </div>
            
            <div className="menu">
                <div className="menuWrapper">
            {recipes.map((recipe,index)=>{
                return(
                        <div  key={index}className="reciperwrapper">
                            <div className="recipetitle">
                               <h4>{recipe.recipe.label}</h4>
                        <span className="calories">Calories:{recipe.recipe.calories}</span>
                               
                              </div>
                        <div key={index} className="imagebox">
                        <img src={recipe.recipe.image} alt="/images"/>
                        <input type="button" value="View Recipe" onClick={togglePopup}/>
                        {isOpen && <Popup content={
                            <div className="ingredients">
                                <h1>Ingredients</h1>
                                {recipe.recipe.ingredients.map((ingredient,index)=>
                                    <li key={index}>{ingredient.text}</li>
                                )}
                            </div>}
                        handleClose={togglePopup}/>}
                        </div>
                 </div>
                 
                );
            })}
            </div>
            </div>
        </div>
    )
}

export default Searchbar
