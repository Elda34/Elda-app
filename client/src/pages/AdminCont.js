import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(SummaryApi.allcont.url, {
      method: SummaryApi.allcont.method,
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        // Ensure that data is an array before setting it to state
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching applications:', error);
      });
  }, []);

  return (
    <div className="p-5 max-w-6xl mx-auto bg-gray-900 text-gray-400">
      <h2 className="text-white text-3xl mb-5">Contact Messages</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-700">Name</th>
              <th className="px-4 py-2 border border-gray-700">Email</th>
              <th className="px-4 py-2 border border-gray-700">Message</th>
              <th className="px-4 py-2 border border-gray-700">Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.length > 0 ? (
              messages.map((message) => (
                <tr key={message._id}>
                  <td className="px-4 py-2 border border-gray-700">{message.name}</td>
                  <td className="px-4 py-2 border border-gray-700">{message.email}</td>
                  <td className="px-4 py-2 border border-gray-700">{message.message}</td>
                  <td className="px-4 py-2 border border-gray-700">{new Date(message.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center border border-gray-700">No messages found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMessagesPage;
