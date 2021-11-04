import React, { useEffect, useState } from "react";
import "../styles.css";
//import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
//import PaymentB from "./PaymentB";

import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h4>This section is to load products</h4>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            addtoCart={false}
            removeFromCart={true}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h4>for checkout</h4>
      </div>
    );
  };

  return (
    <Base title={<h4>Cart Page</h4>} description="ready to checkout">
      <div className="row text-center">
        <div className="col-6">
          {products?.length > 0 ? (  //changed here products?.length > 0 to now
           <>
            {
            loadAllProducts(products)
            }
          </>
          ) : (
            <h2>No Products in cart</h2>
          )}
        </div>
        <div className="col-6">
            <StripeCheckout products={products} setReload={setReload}/>
        </div>
      </div>
    </Base>
  );
};

export default Cart;