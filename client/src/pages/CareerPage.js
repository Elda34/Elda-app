import React, { useState } from 'react';
import bannerImage from '../assest/banner/career-img.jpg';
import teamCollaboration from '../assest/banner/cr=t_5.35,w_89.webp'
import SummaryApi from '../common';

const CareerPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [educationalQualification, setEducationalQualification] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [experience, setExperience] = useState('');
  const [phone, setPhone] = useState('');
  const [summary, setSummary] = useState('');
  const [resume, setResume] = useState(null); // Handle file input

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('educationalQualification', educationalQualification);
    formData.append('lookingFor', lookingFor);
    formData.append('experience', experience);
    formData.append('phone', phone);
    formData.append('summary', summary);
    formData.append('resume', resume); // Attach the resume file

    // If you want to stringify non-file data and send it separately
   

    try {
      const response = await fetch(SummaryApi.career.url, {
        method: SummaryApi.career.method,
        body: formData,
      });
      
      const data = await response.json();
      if (data.message) {
        alert('Application submitted successfully');
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
};


  return (
    <div>
      {/* Banner Section */}
      <div className="relative">
        <img 
          src={bannerImage} 
          alt="Explore a Career" 
          className="w-full h-[300px] md:h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold transition-transform transform hover:scale-105">
            EXPLORE A CAREER AT ELDA
          </h1>
        </div>
      </div>

      {/* Who We Are Section */}
      <section className="text-center py-6 md:py-10">
        <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4">Who we are</h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-sm md:text-base">
          Our mission is People <span className="font-bold">Work Together</span> to get a new technology.
          We take inspiration from what people want to accomplish in their lives and work to create products that empower in new ways.
          This is what drives our innovation forward.
        </p>
        <div className="mt-6 md:mt-8">
          <img src={teamCollaboration} alt="Team collaboration" className="mx-auto max-w-full h-auto" />
        </div>
      </section>

      {/* Job Application Form Section */}
      <section className="bg-gray-900 text-white py-6 md:py-8">
        <div className="max-w-lg mx-auto px-4 md:px-0">
          <h2 className="text-center text-xl md:text-2xl font-bold mb-4 md:mb-6">JOIN THE TEAM !!</h2>
          <p className="text-center mb-4 md:mb-6">Explore exciting opportunities and apply now to join us.</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3 md:gap-4">
              <input 
                type="text" 
                placeholder="Name*" 
                className="p-2 rounded bg-gray-800 border border-gray-700" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input 
                type="email" 
                placeholder="Email*" 
                className="p-2 rounded bg-gray-800 border border-gray-700" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="Educational Qualification*" 
                className="p-2 rounded bg-gray-800 border border-gray-700" 
                value={educationalQualification}
                onChange={(e) => setEducationalQualification(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="Looking For*" 
                className="p-2 rounded bg-gray-800 border border-gray-700" 
                value={lookingFor}
                onChange={(e) => setLookingFor(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="Experience*" 
                className="p-2 rounded bg-gray-800 border border-gray-700" 
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="Phone*" 
                className="p-2 rounded bg-gray-800 border border-gray-700" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <textarea 
              placeholder="Write a summary about yourself..." 
              className="p-2 rounded bg-gray-800 border border-gray-700 w-full" 
              rows="4" 
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <label className="text-sm mb-2 md:mb-0">Attach Resume</label>
              <input 
                type="file" 
                className="text-sm text-gray-500 file:bg-gray-700 file:border-0 file:mr-0 md:file:mr-4 file:py-2 file:px-4 file:text-white hover:file:bg-gray-600" 
                onChange={(e) => setResume(e.target.files[0])}
              />
            </div>
            <button 
              onClick={handleSubmit}
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold"
            >
              Submit Application
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default CareerPage;
