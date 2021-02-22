import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cart = ({ index, selectedProducts, setSelectedProducts, product }) => {
  return (
    <div className="Cart--items">
      <div className="Cart--line">
        <div className="Cart--counter">
          <span
            onClick={() => {
              //objectif : modifier l'état selectedProduct
              //copier le state
              const newProducts = [...selectedProducts];
              //modifier le state
              if (newProducts[index].quantity === 1) {
                //La méthode .splice permets de retirer un élément du tableau quand on n'arrive à 0
                //le 1 er argument : position de départ de l'élément que l'on veux retirer
                //2 eme argument : la quantité d'élément que l'on veux retirer
                newProducts.splice(index, 1);
              } else {
                newProducts[index].quantity--;
              }

              setSelectedProducts(newProducts);
            }}
          >
            <FontAwesomeIcon icon="minus" className="icons" />
          </span>
          <span>{product.quantity}</span>
          <span
            onClick={() => {
              //création d'un tableau pour modifier le state
              const newProducts = [...selectedProducts];
              //incrémenter le tableau
              newProducts[index].quantity++;
              //mise a jour du state
              setSelectedProducts(newProducts);
            }}
          >
            <FontAwesomeIcon icon="plus" className="icons" />
          </span>
        </div>
        <span>{product.title}</span>

        {/* <span>{product.price}€</span> */}
      </div>
    </div>
  );
};

export default Cart;
