
// src/components/PaymentList.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Common/Sidebar';
import Header from '../../components/admin/Common/Navbar';
import axios from 'axios';

const PaymentList = ({ onViewDetails }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);

  const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    axios.get('/pay.json')
      .then(response => {
        setPayments(response.data.payments);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch payments');
        setLoading(false);
      });
  }, []);

  const pendingPayments = payments.filter(payment => payment.status === 'Pending');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (pendingPayments.length === 0) return <div>No pending payments</div>;

    return (
       <div className="flex">
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <div className={`flex-1 transition-all duration-300 ease-in-out ${openSidebarToggle ? 'ml-64' : 'ml-20'}`}>
                <Header OpenSidebar={OpenSidebar} />
                <main className="p-6">
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Pending Payments</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border-b px-4 py-2">Transaction ID</th>
              <th className="border-b px-4 py-2">Amount</th>
              <th className="border-b px-4 py-2">Status</th>
              <th className="border-b px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingPayments.map(payment => (
              <tr key={payment.transactionId} className="hover:bg-gray-100">
                <td className="border-b px-4 py-2">{payment.transactionId}</td>
                <td className="border-b px-4 py-2">${payment.amount.toFixed(2)}</td>
                <td className="border-b px-4 py-2">{payment.status}</td>
                <td className="border-b px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => onViewDetails(payment.transactionId)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </main>
        </div>
    </div>
  );
};

export default PaymentList;
