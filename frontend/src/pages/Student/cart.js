import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import Navigation from '../../components/student/Common/Navbar';
import Footer from '../../components/home/Footer';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState('telebirr');
  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => {
        const itemPrice = parseFloat(item.price) || 0;
        return total + itemPrice;
      }, 0)
      .toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/payment', { state: { paymentMethod, totalAmount: calculateTotalPrice() } });
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <Navigation />
        <div className="container mx-auto py-12">
          <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
          <p>Your cart is empty.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

        {/* Order Summary */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">Order Summary</h3>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                <p className="text-lg font-bold">{parseFloat(item.price).toFixed(2)} ETB</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="border-t pt-4 mt-4">
              <h3 className="text-xl font-bold">Total: {calculateTotalPrice()} ETB</h3>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Select Payment Method</h3>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            >
              <option value="telebirr">Telebirr</option>
              <option value="mpesa">M-PESA</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Continue to Payment
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
