import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Category = ({ elem, selectedProducts, setSelectedProducts }) => {
  return (
    <div className="MenuItems">
      <h2> {elem.name}</h2>
      <div className="MenuItems--items">
        {elem.meals.map((meal, index) => {
          return (
            <div
              key={index}
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
                <span className="MenuItem--price">{meal.price + " €"}</span>
                {meal.popular && (
                  <span className="MenuItem--popular">
                    <FontAwesomeIcon icon="star" className="star" />
                    populaire
                  </span>
                )}
              </div>
              <div className="MenuItem--picture">
                {meal.picture && <img src={meal.picture} alt={meal.title} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
