import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "./favourites..css";

type PropertyResult = {
  id: number;
  title: string;
  country: string;
  price: string;
  image_list: string[];
};

const FavouritesPage: React.FC = () => {
  const [properties, setProperties] = useState<PropertyResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // Or get from context/cookie
    if (!token) {
      setError("You must be logged in to view favorites.");
      setLoading(false);
      return;
    }
    fetch("http://localhost:8000/prop/getfavs/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProperties(data);
        } else if (data.results) {
          setProperties(data.results);
        } else if (data.detail) {
          setError(data.detail);
        } else {
          setProperties([]);
        }
      })
      .catch(() => setError("Failed to fetch favorites."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="favourites-page">
      <Navbar />
      <div className="favourites-content">
        <h1>My Favorite Properties</h1>
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!loading && !error && properties.length === 0 && (
          <div>No favorite properties found.</div>
        )}
        <div className="favourites-list">
          {properties.map((property) => (
            <div
              className="favourite-card"
              key={property.id}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                // Prevent property card click if favorite button is clicked
                if ((e.target as HTMLElement).classList.contains('favorite-btn')) return;
                window.location.href = `/property/${property.id}`;
              }}
            >
              {property.image_list && property.image_list.length > 0 ? (
                <img
                  src={"http://localhost:8000" + property.image_list[0]}
                  alt={property.title}
                  className="favourite-image"
                />
              ) : (
                <div className="favourite-no-image">No Image</div>
              )}
              <div className="favourite-details">
                <h3>{property.title}</h3>
                <p>Country: {property.country}</p>
                <p>Price: ${property.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;
