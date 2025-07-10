import React, { useState } from 'react';
import Navbar from "../../components/Navbar";
import bg from "../../assets/homepagebg.jpg";
import SearchBox from './Searchbox';
import './Homepage.css';

type PropertyResult = {
  title: string;
  country: string;
  price: string;
  image_list: string[];
};

function Homepage() {
  const [properties, setProperties] = useState<PropertyResult[]>([]);

  const handleSearchResults = (results: PropertyResult[]) => {
    setProperties(results);
  };

  return (
    <div
      style={{
        position: 'relative',
        minWidth: '100vw',
        // No minHeight or flex properties needed here
      }}
    >
      {/* Background and overlay can stay the same */}
      <div
        style={{
          position: 'fixed', // Use 'fixed' to keep it in the viewport
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px)',
          zIndex: -1, // Send it behind the content
        }}
      />
      <div
        style={{
          position: 'fixed', // Also 'fixed'
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: -1,
        }}
      />

      {/* Main Content */}
      <div
        style={{
          position: 'relative', // Keep for zIndex context
          zIndex: 1,
          color: 'white',
          // Center content with flexbox
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // Add padding to prevent content from touching the edges
          padding: '20px',
        }}
      >
        <Navbar />
        <SearchBox onResults={handleSearchResults} />

        {/* Property Cards */}
        {properties.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              padding: '20px',
              width: '100%',
              maxWidth: '1200px', // Good for keeping content from being too wide
              marginTop: '20px', // Add some space above the cards
            }}
          >
            {properties.map((property, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#fff',
                  color: '#000',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                }}
              >
                {/* Property Image */}
                {property.image_list.length > 0 ? (
                  <img
                    src={"http://localhost:8000" + property.image_list[0]}
                    alt={property.title}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '200px',
                      backgroundColor: '#ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    No Image
                  </div>
                )}

                {/* Property Details */}
                <div style={{ padding: '10px' }}>
                  <h3>{property.title}</h3>
                  <p>Country: {property.country}</p>
                  <p><strong>Price: ${property.price}</strong></p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;