import React, { useEffect, useState } from "react";
import "./reset.css";
import "./App.css";

//importation des composants
import Header from "./components/Header";
import Infos from "./components/Infos";
import Category from "./components/Category";
import Cart from "./components/Cart";

import axios from "axios";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faStar,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelope, faStar, faMinus, faPlus);

function App() {
  // état qui permets de recupérer les données du back
  const [food, setFood] = useState();

  // état qui permets de recuperer les données pour le panier
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://deliveroob.herokuapp.com/");
      console.log(response.data);
      setFood(response.data);

      setIsloading(false);
    };

    fetchData();
  }, []);
  //calcul du panier
  let total = 2.5;
  for (let i = 0; i < selectedProducts.length; i++) {
    total += selectedProducts[i].quantity * selectedProducts[i].price;
    // total = total + selectedProducts[i].quantity * selectedProducts[i].price;
  }

  return (
    <div>
      {isLoading === true ? (
        <p>En cours de chargement ...</p>
      ) : (
        <>
          <Header />

          <Infos food={food} />

          <div className="Content">
            <div className="Content--center">
              <div className="Menu">
                {food.categories.map((elem, id) => {
                  // condition qui permets juste d'afficher les categories remplies
                  if (elem.meals.length === 0) {
                    return null;
                  }
                  return (
                    <Category
                      elem={elem}
                      selectedProducts={selectedProducts}
                      setSelectedProducts={setSelectedProducts}
                    />
                  );
                })}
              </div>
              <div className="Cart">
                <div className="Cart--card">
                  <p className="Cart--validate">Mon panier</p>
                  {selectedProducts.map((product, index) => {
                    return (
                      //transmettre les props d'une page à l'autre
                      <Cart
                        index={index}
                        selectedProducts={selectedProducts}
                        setSelectedProducts={setSelectedProducts}
                        product={product}
                      />
                    );
                  })}
                  <p>frais de livraison : 2.50€</p>
                  {/* toFixed:permets de fixer 2 chiffres uniquement après la virgule */}
                  <p>Total: {total.toFixed(2)}€</p>
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
