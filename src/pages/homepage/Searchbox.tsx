import React, { useEffect, useState } from 'react';
import "./Searchbox.css";

type Country = {
  country: string;
  country_name: string;
};

type PropertyResult = {
  title: string;
  country: string;
  price: string;
  image_list: string[];
};

type SearchBoxProps = {
  onResults: (results: PropertyResult[]) => void; // Send results to parent
};

export default function SearchBox({ onResults }: SearchBoxProps) {
  const [activeTab, setActiveTab] = useState('BUY');
  const [country, setCountry] = useState('');
  const [location, setLocation] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/prop/properties/?search=${encodeURIComponent(location)}`
      );
      const data = await response.json();
      console.log("Search results:", data.results);

      // Send the results to Homepage
      onResults(data.results);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/prop/countries");
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data: Country[] = await response.json();
        setCountries(data);
        if (data.length > 0) {
          setCountry(data[0].country); // Default to first country
        }
      } catch (err: any) {
        console.error(err);
        setError("Could not load countries");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="app-container">
      <div className="search-box-wrapper">
        <h1 className="search-title">Search properties for sale in Pakistan</h1>

        <div className="tabs-container">
          {['BUY', 'RENT'].map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="search-inputs-container">
          {/* Country Selector */}
          <div className="input-wrapper">
            <label htmlFor="country" className="sr-only">Country</label>
            {loading ? (
              <div className="loading-text">Loading countries...</div>
            ) : error ? (
              <div className="error-text">{error}</div>
            ) : (
              <select
                id="country"
                className="search-select"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {countries.map((c) => (
                  <option key={c.country} value={c.country}>
                    {c.country_name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Location Input */}
          <div className="input-wrapper">
            <label htmlFor="location" className="sr-only">Location</label>
            <input
              type="text"
              id="location"
              className="search-input"
              placeholder="LOCATION"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <button
            className="find-button"
            onClick={handleSearch}
          >
            click maro
          </button>
        </div>
      </div>
    </div>
  );
}
