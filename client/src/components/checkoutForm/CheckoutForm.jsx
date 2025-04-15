import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import Header from "../header/Header";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// firebase
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
//redux
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/slice/cartSlice";
import Loader from "../loader/Loader";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, userId } = useSelector((store) => store.auth);
  const { cartItems, totalAmount } = useSelector((store) => store.cart);
  const { shippingAddress } = useSelector((store) => store.checkout);

  const saveOrder = () => {
    const date = new Date().toDateString();
    const time = new Date().toLocaleTimeString();
    const orderDetails = {
      userId,
      email,
      orderDate: date,
      orderTime: time,
      orderAmount: totalAmount,
      orderStatus: "Order Placed",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "orders"), orderDetails);
      dispatch(clearCart());
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    // Step 1: Create payment method using CardElement
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setMessage("Card element not found.");
      setIsLoading(false);
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setMessage(error.message);
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    // Step 2: Confirm the payment
    const { clientSecret } = await fetch(
      "https://Erode Marketing.onrender.com/create-payment-intent", // Your backend URL
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          userEmail: email,
          shippingAddress,
          description: `Payment for ${totalAmount}`,
        }),
      }
    ).then((res) => res.json());

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: paymentMethod.id,
      }
    );

    if (confirmError) {
      setMessage(confirmError.message);
      toast.error(confirmError.message);
      setIsLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      toast.success("Payment Successful");
      saveOrder();
      navigate("/checkout-success", { replace: true });
    }

    setIsLoading(false);
  };

  return (
    <>
      <Header text="Stripe Payment Gateway" />
      <section className="w-full mx-auto p-4 md:p-10 md:w-9/12 md:px-6 flex flex-col h-full">
        <div className="flex flex-col-reverse md:flex-row gap-4 justify-evenly">
          <div className="w-full md:w-2/5 h-max p-4 bg-base-100 rounded-md shadow-xl">
            <CheckoutSummary />
          </div>
          <div className="rounded-md shadow-xl pt-4 pb-8 px-10">
            <h1 className="text-3xl font-light mb-2">Stripe Checkout</h1>
            <form className="md:w-[30rem]" onSubmit={handleSubmit}>
              <CardElement id="card-element" />
              <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="btn bg-blue-600"
              >
                <span id="button-text">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
              {message && <div id="payment-message">{message}</div>}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutForm;
