import React, { useEffect, useState } from "react";
import "./reset.css";
import "./App.css";

import Logo from "./assets/deliveroo.svg";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faStar } from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelope, faStar);

function App() {
  // état qui permets de recupérer les données du back
  const [food, setFood] = useState({});

  // état qui permets de recuperer les données pour le panier
  const [selectedProducts, setSelectedProducts] = useState([]);

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
                  // condition qui permets juste d'afficher les categories remplies
                  if (elem.meals.length === 0) {
                    return null;
                  }
                  return (
                    <div className="MenuItems">
                      <h2> {elem.name}</h2>
                      <div className="MenuItems--items">
                        {elem.meals.map((meal, index) => {
                          return (
                            <div
                              className="MenuItem"
                              onClick={() => {
                                //crétion d'une copie du tableau
                                const copy = [...selectedProducts];
                                //recherche du produit dans le panier
                                let isProductFound = false;
                                for (let i = 0; i < copy.length; i++) {
                                  if (copy[i].title === meal.title) {
                                    copy[i].quantity++;
                                    isProductFound = true;
                                  }
                                }
                                //si le produit n'y est pas
                                if (isProductFound === false) {
                                  copy.push({
                                    title: meal.title,
                                    quantity: 1,
                                    price: meal.price,
                                  });
                                }

                                setSelectedProducts(copy);
                              }}
                            >
                              <div className="MenuItem--card">
                                <h3>{meal.title} </h3>

                                <p>{meal.description.slice(0, 70)}</p>
                                <span className="MenuItem--price">
                                  {meal.price + " €"}
                                </span>
                                {meal.popular && (
                                  <span className="MenuItem--popular">
                                    <FontAwesomeIcon
                                      icon="star"
                                      className="icons"
                                    />
                                    populaire
                                  </span>
                                )}
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
                <div className="Cart--Card">
                  <button class="Cart--validate">Valider mon panier</button>
                  {selectedProducts.map((selectedProduct) => {
                    return (
                      <div>
                        <p>{selectedProduct.title}</p>
                        <p>{selectedProduct.quantity}</p>
                        <p>{selectedProduct.price}</p>
                      </div>
                    );
                  })}
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
