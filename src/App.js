import React, { useEffect, useState } from "react";
import "./reset.css";
import "./App.css";

import Logo from "./assets/deliveroo.svg";
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
        <>
          <header className="Header">
            <div className="topBar">
              <div className="topBar--center">
                <img src={Logo} alt="deliveroo" className="logo" />
              </div>
            </div>

            <div className="restaurantInfos">
              <div className="restaurantInfos--center ">
                <div className="restaurantInfos--text">
                  <h1>{food.restaurant.name}</h1>
                  <p>{food.restaurant.description}</p>
                </div>
                <img
                  className="restaurantInfos--cover"
                  src={food.restaurant.picture}
                  alt={food.restaurant.title}
                />
              </div>
            </div>
          </header>

          <div className="Content">
            <div className="Content--center">
              <div className="Menu">
                {food.categories.map((elem, index) => {
                  return (
                    <div className="MenuItems">
                      <h2> {elem.name}</h2>
                      <div className="MenuItems--items">
                        {elem.meals.map((meal, index) => {
                          return (
                            <div className="MenuItem">
                              <div className="MenuItem--card">
                                <h3>{meal.title} </h3>

                                <p>{meal.description}</p>
                                <p> {meal.price}</p>
                              </div>

                              <div className="MenuItem--picture">
                                {meal.picture && (
                                  <img src={meal.picture} alt={meal.title} />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="Cart">
                <h2>Panier</h2>
                <div className="list-panier"></div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
