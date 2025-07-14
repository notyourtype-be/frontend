import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar";
import bg from "../../assets/homepagebg.jpg";
import SearchBox from './Searchbox';
import './Homepage.css';

type PropertyResult = {
  id: number;
  title: string;
  country: string;
  price: string;
  image_list: string[];
};

// Add Category type
interface Category {
  id: number;
  name: string;
  image: string | null;
}

function Homepage() {
  const [properties, setProperties] = useState<PropertyResult[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Add favorite state
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  useEffect(() => {
    // Fetch all properties on mount
    fetch('http://localhost:8000/prop/properties/')
      .then(res => res.json())
      .then(data => setProperties(data.results || []));
    fetch('http://localhost:8000/prop/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleSearchResults = (results: PropertyResult[]) => {
    setProperties(results);
  };

  // Add handler for category click
  const handleCategoryClick = (catId: number) => {
    fetch(`http://localhost:8000/prop/propbycat/${catId}`)
      .then(res => res.json())
      .then(data => {
        // Some APIs return an array, some return {results: [...]}
        if (Array.isArray(data)) {
          setProperties(data);
        } else if (data.results) {
          setProperties(data.results);
        } else {
          setProperties([]);
        }
      })
      .catch(() => setProperties([]));
  };

  const handleFavorite = (propertyId: number) => {
    const token = localStorage.getItem('accessToken'); // Or get from context/cookie
    if (!token) {
      alert('You must be logged in to favorite properties.');
      return;
    }
    fetch(`http://localhost:8000/prop/fav/${propertyId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then(data => {
        // Toggle favorite in UI
        setFavoriteIds(prev =>
          prev.includes(propertyId)
            ? prev.filter(id => id !== propertyId)
            : [...prev, propertyId]
        );
      })
      .catch(() => alert('Failed to update favorite.'));
  };

  return (
    <div
      style={{
        position: 'relative',
        minWidth: '100vw',
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <Navbar />
        <SearchBox onResults={handleSearchResults} />
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          maxWidth: 1400,
          marginTop: 32,
          gap: 32,
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
          {/* Categories Sidebar */}
          <div style={{
            background: 'rgba(255,255,255,0.97)',
            borderRadius: 16,
            boxShadow: '0 2px 12px rgba(44,62,80,0.10)',
            minWidth: 260,
            maxWidth: 320,
            padding: '24px 18px',
            color: '#193a3a',
            fontWeight: 500,
            fontSize: 20,
            marginRight: 0,
            height: 'fit-content',
          }}>
            <div style={{fontWeight: 700, fontSize: 22, marginBottom: 18, color: '#0a2a2a'}}>Categories</div>
            <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
              {categories.map((cat, idx) => (
                <li key={cat.id} style={{marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer'}} onClick={() => handleCategoryClick(cat.id)}>
                  {cat.image && (
                    <img src={`http://localhost:8000${cat.image}`} alt={cat.name} style={{width: 32, height: 32, objectFit: 'cover', borderRadius: 6}} />
                  )}
                  <span style={{fontWeight: 600, color: '#193a3a', fontSize: 18}}>{cat.name}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Products Grid as List */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            padding: 0,
            width: '100%',
            maxWidth: 1000,
          }}>
            {properties.map((property, index) => (
              <div
                key={property.id}
                style={{
                  backgroundColor: '#fff',
                  color: '#000',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: 140,
                  transition: 'box-shadow 0.2s',
                  position: 'relative',
                }}
                onClick={e => {
                  // Prevent property card click if favorite button is clicked
                  if ((e.target as HTMLElement).classList.contains('favorite-btn')) return;
                  window.location.href = `/property/${property.id}`;
                }}
              >
                {property.image_list.length > 0 ? (
                  <img
                    src={"http://localhost:8000" + property.image_list[0]}
                    alt={property.title}
                    style={{ width: 160, height: 120, objectFit: 'cover', borderRadius: '8px', margin: 16 }}
                  />
                ) : (
                  <div
                    style={{
                      width: 160,
                      height: 120,
                      backgroundColor: '#ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      borderRadius: '8px',
                      margin: 16,
                    }}
                  >
                    No Image
                  </div>
                )}
                <div style={{ padding: '10px 0', flex: 1 }}>
                  <h3 style={{margin: 0, fontSize: 22}}>{property.title}</h3>
                  <p style={{margin: '6px 0'}}>Country: {property.country}</p>
                  <p style={{margin: '6px 0'}}><strong>Price: ${property.price}</strong></p>
                </div>
                <button
                  className="favorite-btn"
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 28,
                    color: favoriteIds.includes(property.id) ? '#10B981' : '#aaa',
                    transition: 'color 0.2s',
                  }}
                  onClick={e => {
                    e.stopPropagation();
                    handleFavorite(property.id);
                  }}
                  aria-label={favoriteIds.includes(property.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {favoriteIds.includes(property.id) ? '♥' : '♡'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;