import React from "react";

const Infos = ({ food }) => {
  return (
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
  );
};

export default Infos;
