import React, { useState, useEffect } from 'react';
import SummaryApi from '../common';

function CheckoutPage() {
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    country: '',
    street: '',
    city: '',
    postalCode: '',
    state: '',
  });

  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [billingAddress, setBillingAddress] = useState({
    firstName: '',
    lastName: '',
    country: '',
    street: '',
    city: '',
    postalCode: '',
    state: '',
  });

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(SummaryApi.addToCartProductView.url, {
          method: SummaryApi.addToCartProductView.method,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const responseData = await response.json();

        if (responseData.success) {
          setCartItems(responseData.data);
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const isFormComplete = () => {
    const { email, phone, firstName, lastName, country, street, city, postalCode, state } = customerInfo;
    const addressComplete = billingSameAsShipping || Object.values(billingAddress).every(field => field.trim() !== '');
    return [email, phone, firstName, lastName, country, street, city, postalCode, state].every(field => field.trim() !== '') && addressComplete;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(SummaryApi.payment.url, {
            method: SummaryApi.payment.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cartItems,
                customerInfo,
                billingAddress: billingSameAsShipping ? customerInfo : billingAddress,
                returnUrl: 'http://localhost:3000/payment-success', // Your success URL
            }),
        });

        const responseText = await response.text();

        if (response.ok) {
            const params = new URLSearchParams(responseText);
            const encRequest = params.get('encRequest');
            const accessCode = params.get('access_code');
            const orderId = params.get('order_id'); // Retrieve order_id if needed

            if (encRequest && accessCode) {
                handlePaymentRedirect(encRequest, accessCode); // Proceed to the payment gateway
            } else {
                throw new Error('Missing encRequest or access_code');
            }
        } else {
            throw new Error(`Payment initiation failed: ${responseText}`);
        }
    } catch (error) {
        console.error('Error during payment process:', error);
        alert(`An error occurred: ${error.message || 'Please try again later.'}`);
    }
};


  const handlePaymentRedirect = (encRequest, accessCode) => {
    if (!encRequest || !accessCode) {
      console.error('Invalid encRequest or accessCode');
      alert('Error: Invalid payment parameters.');
      return;
    }

    // Perform any verification or condition checks
    const isVerified = verifyPayment(encRequest, accessCode);

    if (isVerified) {
      console.log('Payment parameters verified. Redirecting...');
      const newForm = document.createElement('form');
      newForm.setAttribute('method', 'POST');
      newForm.setAttribute('action', 'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction');

      newForm.innerHTML = `
        <input type="hidden" name="encRequest" value="${encRequest}">
        <input type="hidden" name="access_code" value="${accessCode}">
      `;

      document.body.appendChild(newForm);
      newForm.submit(); // Redirects to the payment gateway
    } else {
      console.error('Payment verification failed.');
      alert('Payment verification failed. Please try again.');
    }
  };

  const verifyPayment = (encRequest, accessCode) => {
    // Add custom logic to verify payment, you can add any validation or checks
    // Example: Checking if the encRequest is valid (a simple check here)
    return encRequest && accessCode;
  };


  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item?.productId?.sellingPrice, 0);

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Form Fields */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
              value={customerInfo.email}
              name="email"
              className="border p-2 rounded-md"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              onChange={handleChange}
              value={customerInfo.phone}
              name="phone"
              className="border p-2 rounded-md"
              required
            />
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={customerInfo.firstName}
                onChange={handleChange}
                className="border p-2"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={customerInfo.lastName}
                onChange={handleChange}
                className="border p-2"
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={customerInfo.country}
                onChange={handleChange}
                className="border p-2"
                required
              />
              <input
                type="text"
                name="street"
                placeholder="Street Address"
                value={customerInfo.street}
                onChange={handleChange}
                className="border p-2"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={customerInfo.city}
                onChange={handleChange}
                className="border p-2"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={customerInfo.state}
                onChange={handleChange}
                className="border p-2"
                required
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal/Zip Code"
                value={customerInfo.postalCode}
                onChange={handleChange}
                className="border p-2"
                required
              />
            </div>

            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={billingSameAsShipping}
                  onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                  className="mr-2"
                />
                <span>Billing address same as shipping</span>
              </label>
            </div>
            {!billingSameAsShipping && (
              <>
                <h2 className="text-2xl font-bold mt-6 mb-4">Billing Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={billingAddress.firstName}
                    onChange={handleBillingChange}
                    className="border p-2"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={billingAddress.lastName}
                    onChange={handleBillingChange}
                    className="border p-2"
                    required
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={billingAddress.country}
                    onChange={handleBillingChange}
                    className="border p-2"
                    required
                  />
                  <input
                    type="text"
                    name="street"
                    placeholder="Street Address"
                    value={billingAddress.street}
                    onChange={handleBillingChange}
                    className="border p-2"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={billingAddress.city}
                    onChange={handleBillingChange}
                    className="border p-2"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={billingAddress.state}
                    onChange={handleBillingChange}
                    className="border p-2"
                    required
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal/Zip Code"
                    value={billingAddress.postalCode}
                    onChange={handleBillingChange}
                    className="border p-2"
                    required
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column - Order Details & Checkout Button */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="bg-white border rounded-md p-4 shadow-md">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {/* Order Details */}
                <div className="bg-white p-4 rounded-md shadow-lg mb-4">
                  <h2 className="font-bold text-lg mb-4">Your Order</h2>
                    
                  {cartItems.map((item) => (
                    
                    <div key={item.id} className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-bold mb-0">{item.productId.productName}</h3>
                        <div className='w-32 h-32'>
                          <img src={item.productId.productImage[0]} className='mt-0 w-full h-full object-scale-down mix-blend-multiply' alt={item.productId.productImage} />
                        </div>
                          
                          {/* <p className="text-gray-700">SKU: {item.sku}</p> */}
                        </div>
                      <p className="font-bold">₹{item.productId.sellingPrice}</p>
                    </div>
                  ))}
                  <div className="mt-2">
                    <a href="/cart" className="text-blue-500">Edit Cart</a>
                  </div>
                  <hr className="my-4"/>
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>₹{totalPrice}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>Shipping</p>
                    <p>Free</p>
                  </div>
                  <hr className="my-4"/>
                  <div className="flex justify-between font-bold">
                    <p>Order Total</p>
                    <p>₹{totalPrice}</p>
                  </div>
                </div>
                {/* Checkout Button */}
                <button
                  onClick={handleSubmit}
                  className="mt-6 bg-blue-500 text-white p-2 rounded-md w-full"
                  disabled={!isFormComplete()}
                >
                  Checkout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;