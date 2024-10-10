/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';

const AdminProReg = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch(SummaryApi.GetRegistrations.url, {
          method: SummaryApi.GetRegistrations.method,
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setRegistrations(data);
        } else {
          console.error('Failed to fetch registrations');
        }
      } catch (error) {
        console.error('Error fetching registrations:', error);
      }
    };

    fetchRegistrations();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-900 text-gray-400">
      <h1 className="text-white">Product Registrations</h1>
      <hr className="my-4" />
      <table className="w-full bg-gray-800 border border-gray-700">
        <thead>
          <tr>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Phone</th>
            <th className="p-2 border-b">Email</th>
            <th className="p-2 border-b">Order Number</th>
            <th className="p-2 border-b">Serial Number</th>
            <th className="p-2 border-b">Installation Date</th>
            <th className="p-2 border-b">File Upload</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((registration) => (
            <tr key={registration._id}>
              <td className="p-2 border-b">{registration.name}</td>
              <td className="p-2 border-b">{registration.phone}</td>
              <td className="p-2 border-b">{registration.email}</td>
              <td className="p-2 border-b">{registration.orderNumber}</td>
              <td className="p-2 border-b">{registration.serialNumber}</td>
              <td className="p-2 border-b">{registration.installationDate}</td>
              <a href={`http://localhost:8080/api/getreg/file/${registration._id}`} target="_blank" rel="noopener noreferrer">
                      View File
                    </a>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProReg;
