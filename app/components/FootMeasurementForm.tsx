'use client';

import { useState } from 'react';
import HeelHeightResults from './HeelHeightResults';

export default function FootMeasurementForm() {
  const [footPicture, setFootPicture] = useState<File | null>(null);
  const [footLength, setFootLength] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [heelExperience, setHeelExperience] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleFootPictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFootPicture(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If foot picture is provided, send to Alibaba Cloud for analysis
    if (footPicture) {
      analyzeFootImage(footPicture);
    }
    
    // Show results based on provided data
    if (footLength || age || heelExperience || footPicture) {
      setShowResults(true);
    } else {
      alert('Please provide at least one input');
    }
  };

  const analyzeFootImage = async (file: File) => {
    // This is where you would integrate with Alibaba Cloud Image Analysis API
    // Example implementation (you'll need to replace with actual API details):
    
    /*
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const response = await fetch('https://dashscope-intl.aliyuncs.com/compatible-mode/v1', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer API_KEY',
        //   'Content-Type': 'multipart/form-data',
        },
        body: formData
      });
      
      const data = await response.json();
      
      // Extract foot length from response
      if (data.footLength) {
        setFootLength(data.footLength.toString());
      }
      
    } catch (error) {
      console.error('Error analyzing foot image:', error);
      alert('Failed to analyze foot image. Please try again.');
    }
    */
    
    // For now, we'll simulate the response
    console.log('Foot image would be sent to Alibaba Cloud for analysis');
  };

  if (showResults) {
    return (
      <HeelHeightResults 
        footLength={footLength}
        age={age}
        heelExperience={heelExperience}
        footPicture={footPicture}
      />
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Foot Measurement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Foot Picture Upload */}
        <div>
          <label htmlFor="footPicture" className="block text-sm font-medium text-gray-700 mb-1">
            Foot Picture
          </label>
          <input
            type="file"
            id="footPicture"
            accept="image/*"
            onChange={handleFootPictureChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p className="mt-1 text-sm text-gray-500">Upload a clear photo of your foot for automatic size detection</p>
        </div>

        {/* Foot Length Reference */}
        <div>
          <label htmlFor="footLength" className="block text-sm font-medium text-gray-700 mb-1">
            Foot Length (cm)
          </label>
          <input
            type="number"
            id="footLength"
            value={footLength}
            onChange={(e) => setFootLength(e.target.value)}
            placeholder="Enter foot length"
            step="0.1"
            min="20"
            max="35"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Age */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            min="13"
            max="100"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Previous Heel Experience */}
        <div>
          <label htmlFor="heelExperience" className="block text-sm font-medium text-gray-700 mb-1">
            Previous Heel Experience
          </label>
          <select
            id="heelExperience"
            value={heelExperience}
            onChange={(e) => setHeelExperience(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select your experience level</option>
            <option value="beginner">Beginner (0-6 months)</option>
            <option value="intermediate">Intermediate (6 months - 2 years)</option>
            <option value="experienced">Experienced (2+ years)</option>
            <option value="none">None</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Calculate Safe Heel Heights
        </button>
      </form>
    </div>
  );
}