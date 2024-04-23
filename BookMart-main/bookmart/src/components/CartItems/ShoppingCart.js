import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  writeBatch
} from "firebase/firestore";
import CartCard from "./CartCard";
import "./ShoppingCartStyle.css";
import Checkout, { payment } from "./Checkout";

const ShoppingCart = () => {
  const [cartData, setCartData] = useState([]);
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  const GetCurrentUser = () => {
    const [user, setUser] = useState("");
    const usersCollectionRef = collection(db, "users");

    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userlogged.uid)
            );
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUsers();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  };
  const loggeduser = GetCurrentUser();

  const calculateTotal = () => {
    const total = cartData.reduce((accumulator, item) => {
      const itemTotal = item.product.priceOffered * item.quantity;
      return accumulator + itemTotal;
    }, 0);
    return total;
  };

  const checkoutToPayment = async () => {
    const success = await payment(checkoutTotal);
    if (success) {
      try {
        const path = `cart-${loggeduser[0].uid}`;
        const cartCollectionRef = collection(db, path);
  
        const querySnapshot = await getDocs(cartCollectionRef);
        const batch = writeBatch(db); 
  
        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
  
        await batch.commit();
        setCartData([]); 
        
      } catch (error) {
        console.error("Error clearing cart: ", error);
      }
    }
  };
  
  useEffect(() => {
    if (loggeduser) {
      const getCartData = async () => {
        const path = `cart-${loggeduser[0].uid}`;
        const cartArray = [];
        getDocs(collection(db, path))
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              cartArray.push({ ...doc.data(), id: doc.id });
            });
            setCartData(cartArray);
          })
          .catch((error) => {
            console.error("Error getting cart data: ", error);
          });
      };
      getCartData();
    }
  }, [loggeduser,cartData]);

  useEffect(() => {
    if (cartData.length > 0) {
      const total = calculateTotal();
      setCheckoutTotal(total);
    } else {
      setCheckoutTotal(0);
    }
  }, [cartData]);

  return (
    <div>
      {cartData.length !== 0 ? (
        <div>
          <div className="cart-head">Your Cart Items</div>
          <div className="allcartitems">
            {cartData.map((item) => (
              <CartCard
                key={item.id}
                itemdata={item}
                userId={loggeduser[0].uid}
                cartLength={cartData.length}
              />
            ))}
          </div>

          <div className="card-total">
            <h3>
              Cart Total: <span>Rs. {checkoutTotal}</span>
            </h3>
            <button onClick={checkoutToPayment}>Checkout</button>
          </div>
        </div>
      ) : (
        <p><img src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png" className="emptycartImage"/></p>
      )}
    </div>
  );
};

export default ShoppingCart;
