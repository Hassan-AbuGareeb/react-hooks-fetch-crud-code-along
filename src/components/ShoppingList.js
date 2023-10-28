import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:4000/items")
      .then((resp) => resp.json())
      .then((data) => setItems([...data]));
  }, []);

  function handleAddItem(itemObj) {
    setItems([...items, itemObj]);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleUpdateItem(itemObj) {
    const updatedItems = items.map((item) => {
      if (item.id === itemObj.id) return itemObj;
      else return item;
    });
    setItems(updatedItems);
  }

  function handleDeleteItem(itemId) {
    const updatedItems = items.filter((item) => {
      if (item.id !== itemId) return true;
    });
    setItems(updatedItems);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onItemUpdate={handleUpdateItem}
            onItemDelete={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
