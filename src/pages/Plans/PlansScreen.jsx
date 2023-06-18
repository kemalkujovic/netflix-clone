import React, { useContext, useState } from "react";
import "./PlansScreen.css";
import { useEffect } from "react";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { AuthContext } from "../../context/authContext";
import { loadStripe } from "@stripe/stripe-js";
const PlansScreen = () => {
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        if (currentUser) {
          const subscriptionsRef = collection(
            db,
            "customers",
            currentUser.uid,
            "subscriptions"
          );
          const querySnapshot = await getDocs(subscriptionsRef);
          querySnapshot.forEach((doc) => {
            const subscriptionData = doc.data();
            setSubscription({
              role: subscriptionData?.role,
              current_period_end: subscriptionData?.current_period_end?.seconds,
              current_period_start:
                subscriptionData?.current_period_start?.seconds,
            });
          });
        }
      } catch (error) {
        // console.log(error.message);
      }
    };

    fetchSubscriptions();
  }, [currentUser.uid]);

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
            setProducts(products);
          });
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    handlePlans();
  }, [currentUser.uid]);

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
  console.log(products);
  return (
    <div className="plansScreen">
      <br />
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData], index) => {
        // check if sub is active
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          ?.includes(subscription?.role);
        return (
          <div
            key={index}
            className={`${
              isCurrentPackage && "plansScreen__plan__disabled"
            } plansScreen__plan`}
          >
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && lastCheckout(productData?.prices?.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PlansScreen;
