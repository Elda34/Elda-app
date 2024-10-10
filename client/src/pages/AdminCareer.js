import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';

const AdminDealer = () => {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    fetch(SummaryApi.allCareer.url, {
      method: SummaryApi.allCareer.method,
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        // Ensure that data is an array before setting it to state
        if (Array.isArray(data)) {
          setCareers(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching careers:', error);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800">
      <h1 className="text-center text-2xl font-semibold mb-4">All careers</h1>
      <hr className="border-gray-300 mb-4" />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Educational Qualification</th>
              <th className="py-2 px-4 border-b">lookingFor</th>
              <th className="py-2 px-4 border-b">Experiencer</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Summary</th>
              <th className="py-2 px-4 border-b">File</th>
            </tr>
          </thead>
          <tbody>
            {careers.length > 0 ? (
              careers.map(career => (
                <tr key={career._id}>
                  <td className="py-2 px-4 border-b">{career.name}</td>
                  <td className="py-2 px-4 border-b">{career.email}</td>
                  <td className="py-2 px-4 border-b">{career.educationalQualification}</td>
                  <td className="py-2 px-4 border-b">{career.lookingFor}</td>
                  <td className="py-2 px-4 border-b">{career.experience}</td>
                  <td className="py-2 px-4 border-b">{career.phone}</td>
                  <td className="py-2 px-4 border-b">{career.summary}</td>
                  <td className="py-2 px-4 border-b">
                  <a href={`http://localhost:8080/api/career/file/${career._id}`} target="_blank" rel="noopener noreferrer">
                      View File
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 px-4 border-b" colSpan="8">No careers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDealer;
