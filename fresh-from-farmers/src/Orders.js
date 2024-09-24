import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import axios from "axios"; // Ensure axios is imported
import "./Orders.css"; // Import your CSS file

const Orders = () => {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders", {
        params: { email: user.email },
      });
      console.log("Fetched Orders:", response.data); // Log the orders
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      {user ? (
        orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="order">
              <h3>Order ID: {order._id}</h3>
              <div className="order_items">
                {order.items.map((item, index) => (
                  <div key={index} className="order_item">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="order_item_image"
                      onError={(e) => {
                        e.target.onerror = null; // Prevent looping
                        e.target.src = "/path/to/default/image.png"; // Fallback image
                      }}
                    />
                    <p>
                      {item.title} - Quantity: {item.quantity} - Price: ₹
                      {item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
              <h3>Total: ₹{order.total}</h3>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )
      ) : (
        <p>Please log in to view your orders.</p>
      )}
    </div>
  );
};

export default Orders;
