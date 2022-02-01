import React, { useState } from "react";

export const ProductsContext = React.createContext({
  products: [],
  toggleFav: (id) => {},
});

const ProductsProvider = (props) => {
  const [products, setProducts] = useState([
    {
      id: "p1",
      title: "Red Scarf",
      description: "A pretty red scarf.",
      isFavorite: false,
    },
    {
      id: "p2",
      title: "Blue T-Shirt",
      description: "A pretty blue t-shirt.",
      isFavorite: false,
    },
    {
      id: "p3",
      title: "Green Trousers",
      description: "A pair of lightly green trousers.",
      isFavorite: false,
    },
    {
      id: "p4",
      title: "Orange Hat",
      description: "Street style! An orange hat.",
      isFavorite: false,
    },
  ]);

  const toggleFav = (id) => {
    setProducts((oldProducts) => {
      const newProducts = oldProducts.slice();
      const product = newProducts.find((el) => el.id === id);
      product.isFavorite = !product.isFavorite;
      return newProducts;
    });
  };

  return (
    <ProductsContext.Provider value={{ products, toggleFav }}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
