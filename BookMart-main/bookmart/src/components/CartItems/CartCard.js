import React, { useState, useEffect } from "react";
import "./CartCardStyle.css";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { db } from "../../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const CartCard = (props) => {
  const [productQuantity, setProductQuantity] = useState(
    props.itemdata.quantity
  );



  let price = props.itemdata.product.priceOffered;
  let totalAmount = price * productQuantity;

  const deleteCartItem = async () => {
    await deleteDoc(doc(db, `cart-${props.userId}`, `${props.itemdata.id}`)).then(()=>{
  toast.success(`Product removed from Cart`, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
    });
  };

  return (
    <>
      <div className="cart-prod-container">
        <div className="cart-prod-imgtitle">
          <div className="prod-image">
            <img src={props.itemdata.product.imgURLs[0]} />
          </div>
          <div className="prod-title">{props.itemdata.product.name}</div>
        </div>

        <div className="prodprice"> Rs.{totalAmount}</div>

        <button className="deletebtn" onClick={deleteCartItem}>
          <DeleteOutlineIcon />
        </button>
      </div>
    </>
  );
};

export default CartCard;
