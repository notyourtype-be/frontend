import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PropertyPage.css';
import Navbar from '../../components/Navbar';

// Add Property type
interface Property {
  id: number;
  title: string;
  description?: string;
  country: string;
  price: string;
  image_list: string[];
}

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://localhost:8000/prop/properties/${id}`);
        if (!response.ok) throw new Error('Failed to fetch property');
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        setError('Could not load property');
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <div className="property-loading">Loading...</div>;
  if (error) return <div className="property-error">{error}</div>;
  if (!property) return null;

  return (
    <div className="property-page">
      <Navbar />
      <div className="property-card">
        {property.image_list && property.image_list.length > 0 ? (
          <div className="property-image-carousel">
            <button
              className="carousel-arrow left"
              onClick={() => setCurrentImage((prev) => (prev === 0 ? property.image_list.length - 1 : prev - 1))}
              aria-label="Previous image"
            >
              &#8592;
            </button>
            <img
              src={`http://localhost:8000${property.image_list[currentImage]}`}
              alt={property.title}
              className="property-image"
            />
            <button
              className="carousel-arrow right"
              onClick={() => setCurrentImage((prev) => (prev === property.image_list.length - 1 ? 0 : prev + 1))}
              aria-label="Next image"
            >
              &#8594;
            </button>
          </div>
        ) : (
          <div className="property-no-image">No Image</div>
        )}
        <div className="property-details">
          <h2>{property.title}</h2>
          <p><strong>Country:</strong> {property.country}</p>
          <p><strong>Price:</strong> ${property.price}</p>
          <p><strong>Description:</strong> {property.description || 'No description provided.'}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
