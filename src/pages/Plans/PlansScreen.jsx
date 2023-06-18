import React, { useContext, useState } from "react";
import "./PlansScreen.css";
import { useEffect } from "react";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { AuthContext } from "../../context/authContext";
import { loadStripe } from "@stripe/stripe-js";
const PlansScreen = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser.uid);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const handlePlans = async () => {
      const q = query(collection(db, "products"), where("active", "==", true));
      try {
        const products = {};
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const pricesQuerySnapshot = await getDocs(
            collection(productDoc.ref, "prices")
          );
          pricesQuerySnapshot.forEach((priceDoc) => {
            products[productDoc.id].prices = {
              priceId: priceDoc.id,
              priceData: priceDoc.data(),
            };
          });
          setProducts(products);
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    return () => {
      handlePlans();
    };
  }, []);
  console.log(products);

  const lastCheckout = async (priceId) => {
    try {
      const checkoutSessionRef = collection(
        db,
        "customers",
        currentUser.uid,
        "checkout_sessions"
      );

      const docRef = await addDoc(checkoutSessionRef, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

      onSnapshot(docRef, async (snap) => {
        const { error, sessionId } = snap.data();
        if (error) {
          alert(`An error occurred: ${error.message}`);
        }
        if (sessionId) {
          const stripe = await loadStripe(
            "pk_test_51NKJfJEZMPmOKCcjnD3PeGwuMe1Pmh8hyEevHPwBuVEJTM06nSMMj4ptyAuRhxiLXj9SBoNpZUd7w2tlm4I6IzLR00yaYBeRLA"
          );
          stripe.redirectToCheckout({ sessionId });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="plansScreen">
      {Object.entries(products).map(([productId, productData]) => {
        // check if sub is active
        return (
          <div className="plansScreen__plan">
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => lastCheckout(productData?.prices?.priceId)}>
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PlansScreen;
