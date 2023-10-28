import React from "react";

function Item({ item, onItemUpdate, onItemDelete }) {
  function handleAddToCartClick() {
    fetch(`http://127.0.0.1:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...item, isInCart: !item.isInCart }),
    })
      .then((resp) => resp.json())
      .then((data) => onItemUpdate(data));
  }

  function handleDeleteClick() {
    fetch(`http://127.0.0.1:4000/items/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(() => onItemDelete(item.id));
  }
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;
