import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navigation from '../../components/student/Common/Navbar';
import Footer from '../../components/home/Footer';

const PaymentPage = () => {
  const location = useLocation();
  const { paymentMethod, totalAmount } = location.state;
  const [paymentDetails, setPaymentDetails] = useState('');
  const [paymentImage, setPaymentImage] = useState(null);
  const navigate = useNavigate();

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission, usually this would involve API calls
    alert(`Payment submitted successfully using ${paymentMethod}!`);
    navigate('/dash');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentImage(file);
    }
  };

  const renderPaymentInstructions = () => {
    switch (paymentMethod) {
      case 'telebirr':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Telebirr Payment Instructions</h3>
            <p>To complete your payment using Telebirr, please follow these steps:</p>
            <ul className="list-disc pl-5">
              <li>Enter the following Merchant ID: <strong>123456789</strong>.</li>
              <li>The total amount: <strong>{totalAmount} ETB</strong>.</li>
              <li>Confirm the payment.</li>
              <li>Enter the transaction reference number below.</li>
            </ul>
          </div>
        );
      case 'mpesa':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">M-PESA Payment Instructions</h3>
            <p>To complete your payment using M-PESA, please follow these steps:</p>
            <ul className="list-disc pl-5">
              <li>Enter the following PayBill number: <strong>987654</strong>.</li>
              <li>The total amount: <strong>{totalAmount} ETB</strong>.</li>
              <li>Confirm the payment.</li>
              <li>Enter the transaction reference number below.</li>
            </ul>
          </div>
        );
      case 'bank_transfer':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Bank Transfer Payment Instructions</h3>
            <p>To complete your payment using Bank Transfer, please follow these steps:</p>
            <ul className="list-disc pl-5">
              <li>Initiate a transfer to the following account:</li>
              <ul className="list-disc pl-10">
                <li>Bank Name: <strong>CBE</strong></li>
                <li>Account Name: <strong>eLearning Platform</strong></li>
                <li>Account Number: <strong>10001234567890</strong></li>
              </ul>
              <ul className="list-disc pl-10">
                <li>Bank Name: <strong>Awash</strong></li>
                <li>Account Name: <strong>eLearning Platform</strong></li>
                <li>Account Number: <strong>1234567789000000</strong></li>
              </ul>
              <li>The total amount: <strong>{totalAmount} ETB</strong>.</li>
              <li>Confirm the transfer.</li>
              <li>Enter the transaction reference number below.</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Navigation />
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-6">Complete Your Payment</h2>

        {/* Payment Instructions */}
        {renderPaymentInstructions()}

        {/* Payment Details Form */}
        <form onSubmit={handlePaymentSubmit} className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Transaction Reference Number</label>
            <input
              type="text"
              value={paymentDetails}
              onChange={(e) => setPaymentDetails(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Upload Payment Screenshot</label>
            <input
              type="file"
              value={paymentImage}
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Submit Payment
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
