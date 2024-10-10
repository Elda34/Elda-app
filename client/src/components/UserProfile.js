import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.user?.user);
  const [userData, setUserData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: {
      country: '',
      street: '',
      city: '',
      state: '',
      postalCode: ''
    }
  });

  // Update formData whenever the user object changes
  useEffect(() => {
    const fetchUserData = async () => {
      const token = getCookie('token'); // Assuming you have this function to get the token
      try {
        const response = await fetch(`http://localhost:8080/api/user/${user._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const result = await response.json();
        if (result.success) {
          setUserData(result.data); // Set user data state
          setFormData({
            name: result.data.name,
            email: result.data.email,
            mobile: result.data.mobile,
            address: {
              country: result.data.address?.country || '',
              street: result.data.address?.street || '',
              city: result.data.address?.city || '',
              state: result.data.address?.state || '',
              postalCode: result.data.address?.postalCode || ''
            }
          });
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prevData => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const handleSave = async () => {
    try {
      const token = getCookie('token');
  
      const response = await fetch(`http://localhost:8080/api/user/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      const result = await response.json();
  
      if (result.success) {
        console.log('User updated successfully');
        dispatch({ type: 'UPDATE_USER', payload: result.data }); // Update Redux store with the new user data
        // alert('Profile updated successfully!'); // Optional: Inform the user of success
      } else {
        console.error('Error updating user:', result.message);
        alert('Failed to update profile: ' + result.message); // Optional: Inform the user of failure
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the profile. Please try again.'); // Optional: Inform the user of an error
    } finally {
      setIsModalOpen(false); // Close the modal
    }
  };
  
  

  return (
    <div className='container mx-auto mt-4 text-lg my-3 bg-white shadow-lg rounded-lg'>
      <h1 className='text-center p-4 font-bold text-2xl'>Hello! {user?.name}</h1>
      <hr className='mb-8' />
      <div className='flex flex-col md:flex-row items-center p-4'>
        <div className='w-36 h-36 mb-4 md:mb-0'>
          <img 
            src="https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?w=826&t=st=1726488367~exp=1726488967~hmac=0547e371925e75bb868b4940ce869045ce2d7325d64231ca0b6159be68fde55f" 
            alt="user"
            className='animate-shake'
          />
        </div>

        <style jsx>{`
          @keyframes shake {
            0%, 100% {
              transform: translateY(0);
            }
            25% {
              transform: translateY(-5px);
            }
            75% {
              transform: translateY(5px);
            }
          }

          .animate-shake {
            animation: shake 2s ease-in-out infinite;
          }
        `}</style>

        <div className='ml-0 md:ml-8'>
          <h2 className='mb-2'><span className='font-bold'>Name: </span>{formData?.name}</h2>
          <h2 className='mb-2'><span className='font-bold'>Email: </span>{formData?.email}</h2>
          <h2 className='mb-2'><span className='font-bold'>Mobile: </span>{formData?.mobile || 'N/A'}</h2>
          <h2 className='mb-2'><span className='font-bold'>Address: </span>
            {formData?.address.country
              ? `${formData.address.street}, ${formData.address.city}, ${formData.address.state}, ${formData.address.postalCode}, ${formData.address.country}`
              : 'N/A'}
          </h2>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className='flex justify-center mb-8 pb-4'>
        <button
          className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700'
          onClick={() => setIsModalOpen(true)}
        >
          Edit Profile
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
  <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center'>
    <div className='bg-white p-6 rounded-lg w-full max-w-2xl mx-4 max-h-screen overflow-y-auto'>
      <h2 className='text-xl font-bold mb-4'>Edit Profile</h2>

      {/* Form Inputs */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <div>
          <label className='block mb-2'>Name</label>
          <input
            type='text'
            name='name'
            placeholder='Enter your name'
            value={formData.name}
            onChange={handleInputChange}
            className='w-full p-2 border border-gray-300 rounded-lg'
          />
        </div>
        <div>
          <label className='block mb-2'>Email</label>
          <input
            type='email'
            name='email'
            placeholder='Enter your email'
            value={formData.email}
            onChange={handleInputChange}
            className='w-full p-2 border border-gray-300 rounded-lg'
            disabled
          />
        </div>
      </div>

      {/* Mobile */}
      <div className='mb-4'>
        <label className='block mb-2'>Mobile</label>
        <input
          type='tel'
          name='mobile'
          placeholder='Enter your mobile'
          value={formData.mobile}
          onChange={handleInputChange}
          className='w-full p-2 border border-gray-300 rounded-lg'
        />
      </div>

      {/* Address Inputs */}
      <h2 className='font-bold text-lg mb-2'>Address:</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <div>
          <label className='block mb-2'>Country</label>
          <input
            type='text'
            name='address.country'
            placeholder='Enter your country'
            value={formData.address.country}
            onChange={handleInputChange}
            className='w-full p-2 border border-gray-300 rounded-lg'
          />
        </div>
        <div>
          <label className='block mb-2'>Street</label>
          <input
            type='text'
            name='address.street'
            placeholder='Enter your street'
            value={formData.address.street}
            onChange={handleInputChange}
            className='w-full p-2 border border-gray-300 rounded-lg'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <div>
          <label className='block mb-2'>City</label>
          <input
            type='text'
            name='address.city'
            placeholder='Enter your city'
            value={formData.address.city}
            onChange={handleInputChange}
            className='w-full p-2 border border-gray-300 rounded-lg'
          />
        </div>
        <div>
          <label className='block mb-2'>State</label>
          <input
            type='text'
            name='address.state'
            placeholder='Enter your state'
            value={formData.address.state}
            onChange={handleInputChange}
            className='w-full p-2 border border-gray-300 rounded-lg'
          />
        </div>
      </div>

      <div className='mb-4'>
        <label className='block mb-2'>Postal Code</label>
        <input
          type='text'
          name='address.postalCode'
          placeholder='Enter your postal code'
          value={formData.address.postalCode}
          onChange={handleInputChange}
          className='w-full p-2 border border-gray-300 rounded-lg'
        />
      </div>

      <div className='flex justify-end'>
        <button
          className='bg-gray-300 py-2 px-4 rounded-lg mr-2'
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>
        <button
          className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700'
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default UserProfile;

