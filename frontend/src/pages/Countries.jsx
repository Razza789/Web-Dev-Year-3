import React, { useState, useEffect } from 'react';
/**
 * Countries Page
 * 
 * This is the code for the countries page, it gets all of the countries from the endpoint
 * and displays it in a list and you can use the search box to find a country
 * 
 * @author Ryan Field
 * @author John Rooksby - Used some of the example code
 * @author CHATGPT - Helped with the tailwind styling and search box
 */
function Countries() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch countries from the country endpoint
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://w20017978.nuwebspace.co.uk/coursework/App/country');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Ensure the data is in the expected format, an array of strings and display an error if it has failed
        setCountries(data.map(countryObj => countryObj.country)); 
      } catch (error) {
        console.error("Fetching countries failed:", error);
      }
    };

    fetchCountries();
  }, []);

  // allows you to use the search box with a case insensitive search
  const filteredCountries = searchTerm
    ? countries.filter(countryName => countryName.toLowerCase().includes(searchTerm.toLowerCase())) 
    : countries;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //tailwind style for the search box and display the country names in bullet points
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">List of Countries For You To Search!</h1>
      <div className="mb-4">
        <input
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300 focus:border-blue-300"
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <ul className="list-disc pl-5">
        {filteredCountries.map((countryName, index) => (
          <li key={index} className="mb-2">
            {countryName}
          </li>
        ))}
      </ul>
      <footer className="text-center mt-10">
        <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Ryan Field, W20017978 - Coursework assignment for KF6012 Web Application Integration, Northumbria University</p>
      </footer>
    </div>
  );
}

export default Countries;
