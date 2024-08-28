// // src/components/PaymentApproval.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const PaymentApproval = () => {
//   const { transactionId } = useParams();
//   const [payment, setPayment] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('/pay.json')
//       .then(response => {
//         const paymentDetail = response.data.paymentDetails[transactionId];
//         if (paymentDetail) {
//           setPayment(paymentDetail);
//         } else {
//           setError('Payment not found');
//         }
//         setLoading(false);
//       })
//       .catch(err => {
//         setError('Failed to fetch payment details');
//         setLoading(false);
//       });
//   }, [transactionId]);

//   const handleApprove = () => {
//     alert('Payment approved successfully');
//     navigate('/admin/payments');
//   };

//   const handleReject = () => {
//     alert('Payment rejected successfully');
//     navigate('/admin/payments');
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;
//   if (!payment) return <div className="text-red-500">No payment details available</div>;

//   return (
//     <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
//       <button
//         className="bg-gray-500 text-white px-4 py-2 rounded-md mb-4"
//         onClick={() => navigate('/admin/payments')}
//       >
//         Back to Payment List
//       </button>
//       <h1 className="text-2xl font-bold mb-4">Payment Details</h1>
//       <div className="mb-4">
//         <h2 className="text-xl font-semibold">Transaction ID:</h2>
//         <p className="text-lg">{payment.transactionId}</p>
//       </div>
//       <div className="mb-4">
//         <h2 className="text-xl font-semibold">Amount:</h2>
//         <p className="text-lg">${payment.amount.toFixed(2)}</p>
//       </div>
//       <div className="mb-4">
//         <h2 className="text-xl font-semibold">Date:</h2>
//         <p className="text-lg">{new Date(payment.date).toLocaleDateString()}</p>
//       </div>
//       <div className="mb-4">
//         <h2 className="text-xl font-semibold">Curriculum:</h2>
//         <p className="text-lg">{payment.curriculum}</p>
//       </div>
//       <div className="mb-4">
//         <h2 className="text-xl font-semibold">Uploaded Image:</h2>
//         {payment.image ? (
//           <img src={payment.image} alt="Uploaded Document" className="w-full max-w-md rounded border border-gray-300" />
//         ) : (
//           <p>No image uploaded</p>
//         )}
//       </div>
//       <div className="flex gap-4">
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded-md"
//           onClick={handleApprove}
//         >
//           Approve
//         </button>
//         <button
//           className="bg-red-500 text-white px-4 py-2 rounded-md"
//           onClick={handleReject}
//         >
//           Reject
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentApproval;
// src/components/PaymentApproval.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PaymentApproval = () => {
  const { transactionId } = useParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/pay.json')
      .then(response => {
        const paymentDetail = response.data.paymentDetails[transactionId];
        if (paymentDetail) {
          setPayment(paymentDetail);
        } else {
          setError('Payment not found');
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch payment details');
        setLoading(false);
      });
  }, [transactionId]);

  const handleApprove = () => {
    alert('Payment approved successfully');
    navigate('/admin/payments');
  };

  const handleReject = () => {
    alert('Payment rejected successfully');
    navigate('/admin/payments');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!payment) return <div className="text-red-500">No payment details available</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded-md mb-4"
        onClick={() => navigate('/admin/payments')}
      >
        Back to Payment List
      </button>
      <h1 className="text-2xl font-bold mb-4">Payment Details</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Transaction ID:</h2>
        <p className="text-lg">{payment.transactionId}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Amount:</h2>
        <p className="text-lg">${payment.amount.toFixed(2)}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Date:</h2>
        <p className="text-lg">{new Date(payment.date).toLocaleDateString()}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Curriculum:</h2>
        <p className="text-lg">{payment.curriculum}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Uploaded Image:</h2>
        {payment.image ? (
          <img src={payment.image} alt="Uploaded Document" className="w-full max-w-md rounded border border-gray-300" />
        ) : (
          <p>No image uploaded</p>
        )}
      </div>
      <div className="flex gap-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={handleApprove}
        >
          Approve
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={handleReject}
          >
            Reject
          </button>
        </div>
      </div>
    );
  };
  
  export default PaymentApproval;
  
