import React, { useEffect, useState } from "react";
import "./style.css";
import { db, auth } from "../../firebase";
import { useParams, useLocation ,useNavigate} from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  getDoc,
  deleteDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Constants from "../Utilities/Constants";
const Index = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loggedInUser, setLoggedInUser] = useState();
  const location = useLocation();
  const state = location.state;
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const userLoggedIn = useSelector((state) => state.loggedUser.loggedUserData);

  useEffect(() => {
    setLoggedInUser(userLoggedIn);
  }, []);
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

  const fetchData = async () => {
    try {
      const docRef = doc(db, "booksmanually", id);
      const docSnap = await getDoc(docRef);
      setProduct(docSnap.data());
    } catch (error) {
      setErrorMsg("Error fetching data");
    }
  };
  const fetchDataforWishlist = async () => {
    try {
      const docRef = doc(db, `wishlist-${loggeduser[0]?.uid}`, id);
      const docSnap = await getDoc(docRef);

      const productData = docSnap.data();
      await setProduct(docSnap.data().product);
    } catch (e) {
      setErrorMsg("Error fetching data");
    }
  };

  useEffect(() => {
    if (state.message == "/wishlist") {
      fetchDataforWishlist();
    } else {
      fetchData();
    }
  }, [loggeduser,id]);



  const addToCart = () => {
    if (loggeduser) {
      addDoc(collection(db, `cart-${loggeduser[0].uid}`), {
        product,
        quantity: 1,
      })
        .then(() => {
          toast.success(`Product added to cart`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((error) => {
          setErrorMsg(error.message);
        });
    } else {
       toast.error(`You need to login to buy the Book.`, {
         position: "top-center",
         autoClose: 3000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: false,
         draggable: true,
         progress: undefined,
         theme: "light",
       });
    }
  };

  const addToWishlist = () => {
    if (loggeduser) {
      addDoc(collection(db, `wishlist-${loggeduser[0].uid}`), {
        product,
        quantity: 1,
      })
        .then(() => {
          toast.success(`added to Wishlist`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((error) => {
          setErrorMsg(error.message);
        });
    } else {
      toast.error(`You need to login to see your wishlist`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const deleteWishlist = async () => {
    await deleteDoc(doc(db, `wishlist-${loggeduser[0].uid}`, id)).then(() =>
      toast.success(`Removed From Wishlist`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    );
    navigate("/wishlist");
  };

 const goBack = () => {
  navigate(-1);
 };

  return (
    <>
      {product && (
        <div className="contain">
          <div className="box">
            <div className="images">
              <div className="img-holder active">
                <div
                  id="carouselExampleRide"
                  className="carousel slide carousel-css "
                  data-bs-ride="true"
                >
                  <div className="carousel-inner image-slider">
                    <div className="carousel-item active ">
                      <img
                        src={product?.imgURLs}
                        className="d-block w-100 carousel-img"
                        alt=""
                      />
                    </div>
                    {product.imgURLs?.slice(1).map((item, index) => (
                      <div className="carousel-item ">
                        <img src={item} alt={Index}></img>
                      </div>
                    ))}

                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleRide"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleRide"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon color"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="basic-info">
              <h1>{product.name}</h1>

              <span>Rs. {product.priceOffered}</span>
              <div>Rs. {product.originalPrice}</div>

              <p className="green">{Constants.inclusive}</p>

              <div className="options">
                <button type="button" className="btn" onClick={addToCart}>
                  <i className="fas fa-shopping-cart"></i>&nbsp;{" "}
                  {Constants.cart}
                </button>

                {state.message === "/wishlist" &&  (
                   <button
                    type="button"
                    className="btn deletewishlistbutton"
                    onClick={deleteWishlist}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                   )
              }
                {!loggeduser &&
                  state.message !==
                    "/wishlist" && (
                      <button type="button" class="btn" onClick={addToWishlist}>
                        <i class="fa fa-heart"></i>&nbsp; {Constants.wishlist}
                      </button>
                    )}
                {loggeduser &&
                  state.message !==
                    "/wishlist" && (
                      <button type="button" class="btn" onClick={addToWishlist}>
                        <i class="fa fa-heart"></i>&nbsp; {Constants.wishlist}
                      </button>
                    )}

                {successMsg && (
                  <>
                    <div className="success-msg">{successMsg}</div>
                  </>
                )}
              </div>
            </div>
            <div className="description">
              <h4>{Constants.aboutthisItem} </h4>
              <p>{product.description}</p>
              <hr />
              <ul className="features">
                <li>
                  {Constants.ownersName} <span>{product.ownerInfo?.name}</span>
                </li>
                <li>
                  {Constants.ownersContact}
                  {isAuth ? (
                    <span>{product?.ownerInfo?.contact}</span>
                  ) : (
                    <span
                      className="hiddenData"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Login to See
                    </span>
                  )}
                </li>
                <li>
                  {Constants.ownersEmail}
                  {isAuth ? (
                    <span>{product?.ownerInfo?.email}</span>
                  ) : (
                    <span
                      className="hiddenData"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Login to See
                    </span>
                  )}
                </li>
              </ul>
            </div>
            <div className="back-button" onClick={goBack}>
              <ArrowBackIosNewIcon />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
