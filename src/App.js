import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [food, setFood] = useState({});
  const [isLoading, setIsloading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get("https://deliveroob.herokuapp.com/");
    console.log(response.data);
    setFood(response.data);
    setIsloading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading === true ? (
        <p>En cours de chargement ...</p>
      ) : (
        <div className="montorgueil">
          <h2>{food.restaurant.name}</h2>
          <p>{food.restaurant.description}</p>
          <img src={food.restaurant.picture} alt={food.restaurant.title} />
          <h3>{food.categories.name}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
