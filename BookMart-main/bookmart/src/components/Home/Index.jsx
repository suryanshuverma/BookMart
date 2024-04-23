import React, { useState, useEffect } from "react";
import "./style.css";
import Filter from "../Filter";
import Carousel from "../Carousel";
import { auth, db } from "../../firebase";
import {
  onSnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import Heading from "../HeadingUI";
import { useDispatch } from "react-redux";
import { authActions, loggedUserActions } from "../../store";

const Home = () => {
  const [user, setUser] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "booksmanually"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setBooks(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );

    GetCurrentUser();

    return () => {
      unsub();
    };
  }, []);

 

  const GetCurrentUser = () => {
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
  };
  useEffect(()=>{
    checkUserData(user)
  },[user])
  function checkUserData(user){
  if (user) {
    dispatch(loggedUserActions.setUser(user));
    dispatch(authActions.login());
  } else {
    dispatch(loggedUserActions.clearUser());
    dispatch(authActions.logout());
  }}
  return (
    <>
      <Carousel />
      <Heading text={"Filters"} />
      <section className="filter">
        <Filter books={books} loading={loading} />
      </section>
    </>
  );
};

export default Home;
