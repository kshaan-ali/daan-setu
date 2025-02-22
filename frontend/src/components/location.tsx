import { useState } from "react";

export default function LocationTracker() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    if ("geolocation" in navigator) {
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position)
          setLocation({ lat: latitude, lon: longitude });
          setError(null);

          // Get Address from OpenStreetMap (Nominatim)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          setAddress(data.display_name);
        },
        (error) => {
            console.log(error.message)
          setError(`Error: ${error.message}`);
          setLocation(null);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="p-4 text-center">
      <button
        onClick={getLocation}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
      >
        Get My Location
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {location && (
        <div className="mt-4">
          <p className="text-lg font-semibold">
            Latitude: {location.lat}, Longitude: {location.lon}
          </p>
          <p className="text-gray-700 mt-2">📍 Address: {address || "Fetching..."}</p>
        </div>
      )}
    </div>
  );
}
