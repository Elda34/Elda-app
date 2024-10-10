import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment';
import displayINRCurrency from '../helpers/displayCurrency';

const OrderPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // State to hold error messages

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(SummaryApi.getOrder.url, {
        method: SummaryApi.getOrder.method,
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust as necessary
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData.data);
      console.log('Order list', responseData);

      if (!responseData.success) {
        setError(responseData.message); // Handle error from response
      }

    } catch (err) {
      console.error('Error fetching order details:', err);
      setError(err.message); // Set error message in state
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);
  return (
    <div>
      {error && <p className="text-red-500">{error}</p>} {/* Display error messages */}

      {!data[0] && !error && (
        <p>No Order available</p>
      )}

      <div className='p-4 w-full'>
        {data.map((item, index) => (
          <div key={item.userId + index}>
            <p className='font-medium text-lg'>{moment(item.createdAt).format('LL')}</p>
            <div className='border rounded'>
              <div className='flex flex-col lg:flex-row justify-between'>
                <div className='grid gap-1'>
                  {item?.productDetails.map((product, index) => (
                    <div key={product.productId + index} className='flex gap-3 bg-slate-100'>
                      <img
                        alt='product'
                        src={product.productImage}
                        className='w-28 h-28 bg-slate-200 object-scale-down p-2'
                      />
                      <div>
                        <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.productName}</div>
                        <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.category}</div>
                        <div className='flex items-center gap-5 mt-1'>
                          <div className='text-lg text-red-500'>{displayINRCurrency(product.price)}</div>
                          <p>Quantity: {product.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='flex flex-col gap-4 p-2 min-w-[300px]'>
                  <div>
                    <div className='text-lg font-medium'>Payment Details:</div>
                    <p className='ml-1'>Payment method: {item.paymentDetails.payment_method_type[0]}</p>
                    <p className='ml-1'>Payment Status: {item.paymentDetails.paymentId}</p>                    
                    <p className='ml-1'>Payment Status: {item.paymentDetails.payment_status}</p>
                  </div>
                  <div>
                    <div className='text-lg font-medium'>Customer Details:</div>
                    <p className='ml-1'>Name: {item.billing_name}</p>
                    <p className='ml-1'>Email: {item.billing_email}</p>
                    <p className='ml-1'>Mobile: {item.billing_tel}</p>
                  </div>
                  <div>
                    <div className='text-lg font-medium'>Billing Details:</div>
                    <p className='ml-1'>Billing Address: {item.billing_address}</p>
                  </div>
                  <div>
                    <div className='text-lg font-medium'>Shipping Details:</div>
                    <p className='ml-1'>Shipping Address: {item.shipping_address}</p>
                  </div>

                  <div>
                    <div className='text-lg font-medium'>Order Status:</div>
                    <p className='ml-1'>OrderId{item.orderId}</p>
                    <p className='ml-1'>Order_Status{item.order_status}</p> {/* Order status */}
                  </div>
                </div>
              </div>

              <div className='font-semibold ml-auto w-fit lg:text-lg'>
                Total Amount: {displayINRCurrency(item.totalAmount)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderPage;