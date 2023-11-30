import React from "react";
import "./InfoPopup.css";

function InfoPopup({ message, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    /*<div className={`info-popup ${message && "info-popup__opened"}`}>*/
    <div className="info-popup_opened">
      <form className="info-popup__container" onSubmit={handleSubmit}>
        <h2 className="info-popup__title">{message}</h2>
        <button type="submit" className="info-popup__button">ОК</button>
      </form>
    </div>
  );
}

export { InfoPopup };