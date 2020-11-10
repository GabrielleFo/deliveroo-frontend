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
        <>
          <div className="montorgueil">
            <h2>{food.restaurant.name}</h2>
            <div>
              <p>{food.restaurant.description}</p>
              <img src={food.restaurant.picture} alt={food.restaurant.title} />
            </div>
          </div>
          <div className="categories">
            <div>
              {food.categories.map((elem, index) => {
                return (
                  <div className="meals">
                    <h4> {elem.name}</h4>
                    {elem.meals.map((meal, index) => {
                      return (
                        <div className="Meal">
                          <h5>{meal.title} </h5>
                          <div className="meal">
                            <p>{meal.description}</p>
                            <p> {meal.price}</p>
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
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
