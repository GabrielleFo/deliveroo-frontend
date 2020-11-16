import React, { useEffect, useState } from "react";
import "./reset.css";
import "./App.css";
import Logo from "./assets/deliveroo.png";
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
          <div className="HEADER">
            <div className="wrapper">
              <img src={Logo} alt="deliveroo" className="logo" />
            </div>
          </div>
          <div className="header">
            <div className="montorgueil ">
              <h2>{food.restaurant.name}</h2>
              <p>{food.restaurant.description}</p>
            </div>
            <div className="image-header">
              <img src={food.restaurant.picture} alt={food.restaurant.title} />
            </div>
          </div>

          <div className="categories">
            <div className="wrapper">
              <div className="restaurant-details">
                {food.categories.map((elem, index) => {
                  return (
                    <div className="meals">
                      <h4> {elem.name}</h4>
                      <div className="meals-container">
                        {elem.meals.map((meal, index) => {
                          return (
                            <div className="meal-container">
                              <div
                                onClick={() => {
                                  console.log(meal);
                                }}
                              >
                                <div className="description-card">
                                  <h5>{meal.title} </h5>

                                  <p>{meal.description}</p>
                                  <p> {meal.price}</p>
                                </div>
                              </div>
                              <div>
                                {meal.picture && (
                                  <img
                                    className="images"
                                    src={meal.picture}
                                    alt={meal.title}
                                  />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                <div className="panier">
                  <h2>Panier</h2>
                  <div className="list-panier"></div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
