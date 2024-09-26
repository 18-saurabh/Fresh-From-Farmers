import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider"; // Assuming you are using a context provider
import "./Orders.css"; // Import your CSS file

const Orders = () => {
  const [{ user, orders: contextOrders }] = useStateValue(); // Get orders from context
  const [orders, setOrders] = useState(contextOrders || []); // Initialize state with context orders
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // Replace with your API call to fetch orders if needed
        // const response = await fetch("/api/orders");
        // const data = await response.json();
        // setOrders(data);

        // Simulate fetching orders
        if (!contextOrders) {
          throw new Error("No orders found"); // Simulated error if no orders in context
        }
      } catch (err) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    if (contextOrders) {
      setOrders(contextOrders);
      setLoading(false); // No need to load if we have context orders
    } else {
      fetchOrders(); // Fetch orders if not available in context
    }
  }, [contextOrders]);

  if (loading) {
    return <div>Loading...</div>; // Loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Error message
  }

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      {user ? (
        orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="order">
              <h3>Order ID: {order._id}</h3>
              <p>Status: {order.status}</p> {/* Order status display */}
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
                      {(item.price * item.quantity).toFixed(2)}{" "}
                      {/* Fixed price */}
                    </p>
                  </div>
                ))}
              </div>
              <h3>Total: ₹{order.total.toFixed(2)}</h3> {/* Fixed total */}
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
