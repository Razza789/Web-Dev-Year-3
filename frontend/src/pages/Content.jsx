import React, { useState, useEffect } from 'react';
import Note from '../components/Note';
/**
 * Content page
 * 
 * This is the content page, it shows all of the content and it allows the user to filter
 * the content based on the content type and will show if the content has an award
 * 
 * @author Ryan Field
 * @author John Rooksby - Used some of the example code
 * @author CHATGPT - Helped with the tailwind styling
 */

// Component to display individual content item with expand/collapse functionality
function ContentItem({ item, signedIn }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // A function to format the award information
  const formatAwardInfo = (hasAward) => {
    return hasAward === 'Yes' ? 'Awarded' : 'Not Awarded';
  };

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className="border p-4 rounded-lg mb-4 shadow cursor-pointer"
    >
      <h3 className="text-lg font-semibold">{item.title}</h3>
      {isExpanded && (
        <>
          <p>Abstract: {item.abstract}</p>
          <p>Authors: {item.authors_names}</p>
          <p>Affiliations: {item.authors_countries}</p>
          <p>Type: {item.content_type}</p>
          <p>Award: {formatAwardInfo(item.has_award)}</p>
          {signedIn && <Note content_id={item.id} onEditClick={(e) => e.stopPropagation()} />}
        </>
      )}
    </div>
  );
}

// Main content component for displaying a list of content
function Content({ signedIn }) {
  const [contentItems, setContentItems] = useState([]);
  const [typeFilter, setTypeFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  // Fetch content items from the backend on component mount and when filters or page changes
  useEffect(() => {
    const fetchContentItems = async () => {
      const typeQueryParam = typeFilter !== 'All' ? `&type=${encodeURIComponent(typeFilter)}` : '';
      const response = await fetch(`https://w20017978.nuwebspace.co.uk/coursework/App/content?page=${page}${typeQueryParam}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setContentItems(data);
    };
  
    fetchContentItems();
  }, [typeFilter, page]);
  

  // Handle changing the type filter
  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
    setPage(1); // Reset to the first page when the filter changes
  };

  // Filter content based on search term
  const filteredContentItems = contentItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.abstract.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Map over the filtered content to create a list of content items
  const contentList = filteredContentItems.map((item) => (
  <ContentItem key={item.id} item={item} signedIn={signedIn} />
));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Content to choose from!</h1>
      {/* Search and filter section */}
      <div className="mb-4 flex gap-4">
        <input 
          type="text"
          placeholder="Search content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded flex-grow"
        />
        <select 
          className="border p-2 rounded" 
          value={typeFilter} 
          onChange={handleTypeChange}
        >
        <option value="All">All Content</option>
        <option value="Course">Course</option>
        <option value="Demo">Demo</option>
        <option value="Doctoral Consortium">Doctoral Consortium</option>
        <option value="Event">Event</option>
        <option value="Late-Breaking Work">Late-Breaking Work</option>
        <option value="Paper">Paper</option>
        <option value="Poster">Poster</option>
        <option value="Work-in-Progress">Work-in-Progress</option>
        <option value="Workshop">Workshop</option>
        <option value="Case Study">Case Study</option>
        <option value="Panel">Panel</option>
        <option value="AltCHI">AltCHI</option>
        <option value="SIG">SIG</option>
        <option value="Keynote">Keynote</option>
        <option value="Interactivity">Interactivity</option>
        <option value="Journal">Journal</option>
        <option value="Symposia">Symposia</option>
        <option value="Competitions">Competitions</option>
        </select>
      </div>
      <div>
        {contentList}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-between mt-4">
        <button 
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Previous
        </button>
        <button 
          onClick={() => setPage(page + 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
      <footer className="mt-4">
        <p className="text-center text-sm">&copy; {new Date().getFullYear()} Ryan Field, W20017978 - Coursework assignment for KF6012 Web Application Integration, Northumbria University</p>
      </footer>
    </div>
  );
}

export default Content;
