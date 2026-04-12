import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './CarCard.module.css';

import React from "react";

export default function CarCard({ name, year, fuel, seats, price, image }) {
  return (
    <div className="col">
    <div className="car-card bg-white rounded-3 border h-100 d-flex flex-column overflow-hidden">
        <div className="p-3 pb-0">
        <div className="car-name mb-2">{name}</div>
        <div className="car-img-wrap rounded-2 mb-2">
            <img src={image} alt={name} />
        </div>
        <div className="d-flex justify-content-between mb-1" style={{ fontSize: "0.8rem", color: "#aaa" }}>
            <span>{year}</span>
            <span>${price.toLocaleString()}</span>
        </div>
        <div className="d-flex justify-content-between mb-3" style={{ fontSize: "0.8rem", color: "#666" }}>
            <span>⛽ {fuel}</span>
            <span>👤 {seats} seats</span>
        </div>
        </div>
        <div className="mt-auto">
        <button className="configure-btn btn btn-dark w-100 rounded-0 rounded-bottom-3 py-2">
            Configure
        </button>
        </div>
    </div>
    </div>
  );
}