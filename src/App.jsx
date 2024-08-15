import axios from "axios";
import { useState } from "react";

function App() {
  const onPayment = async (price, name) => {
    try {
      const options = {
        price: price,
        name: name,
      };

      const res = await axios.post("http://localhost:5000/api/createOrder", options);
      const data = res.data;

      console.log("Entered");
      const paymentObject = new window.Razorpay({
        key: "rzp_test_79jaA8hIikB18u",
        order_id: data.message.id, 
        amount: data.message.amount, 
        currency: data.message.currency, 
        name: name,
        description: "Test Transaction",
        handler: function (response) {
          // console.log(response);
          const option2 = {
            order_id: data.message.id, 
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          };
          axios
            .post("http://localhost:5000/api/verifyPayment", option2)
            .then((res) => {
              if (res.data.success) {
                alert("PAYMENT DONE");
              } else {
                alert("PAYMENT FAILED");
              }
            })
            .catch((error) => {
              console.error("Verification failed", error);
            });
        },
        theme: {
          color: "black",
        },
      });

      paymentObject.open(); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full bg-zinc-950 text-white p-5">
      <div className="text-center mb-8">
        <h1 className="font-bold text-7xl">BUY FROM HERE</h1>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <button className="rounded-xl overflow-hidden" onClick={() => onPayment(1200, "Laptop")}>
          <img
            src="https://images.unsplash.com/photo-1593642634367-d91a135587b5"
            alt="Laptop"
            className="hover:scale-125 transition-all h-56 w-full object-cover"
          />
          <h1 className="bg-zinc-900 text-xl text-center py-2">$1200</h1>
        </button>
        <button className="rounded-xl overflow-hidden" onClick={() => onPayment(800, "Smartphone")}>
          <img
            src="https://images.unsplash.com/photo-1574180045827-681f8a1a9622"
            alt="Smartphone"
            className="hover:scale-125 transition-all h-56 w-full object-cover"
          />
          <h1 className="bg-zinc-900 text-xl text-center py-2">$800</h1>
        </button>
        <button className="rounded-xl overflow-hidden" onClick={() => onPayment(200, "Headphones")}>
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Headphones"
            className="hover:scale-125 transition-all h-56 w-full object-cover"
          />
          <h1 className="bg-zinc-900 text-xl text-center py-2">$200</h1>
        </button>
        <button className="rounded-xl overflow-hidden" onClick={() => onPayment(350, "Smartwatch")}>
          <img
            src="https://images.unsplash.com/photo-1461141346587-763ab02bced9?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Smartwatch"
            className="hover:scale-125 transition-all h-56 w-full object-cover"
          />
          <h1 className="bg-zinc-900 text-xl text-center py-2">$350</h1>
        </button>
        <button className="rounded-xl overflow-hidden" onClick={() => onPayment(1500, "Camera")}>
          <img
            src="https://plus.unsplash.com/premium_photo-1663134149019-284682ece04c?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Camera"
            className="hover:scale-125 transition-all h-56 w-full object-cover"
          />
          <h1 className="bg-zinc-900 text-xl text-center py-2">$1500</h1>
        </button>
        <button className="rounded-xl overflow-hidden" onClick={() => onPayment(1800, "Laptop")}>
          <img
            src="https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Laptop"
            className="hover:scale-125 transition-all h-56 w-full object-cover"
          />
          <h1 className="bg-zinc-900 text-xl text-center py-2">$1800</h1>
        </button>
      </div>
    </div>
  );
}

export default App;
