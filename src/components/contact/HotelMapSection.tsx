
import React, { useEffect, useRef, useState } from "react";

// Define types for Google Maps to avoid TypeScript errors
declare global {
  interface Window {
    google: any;
  }
}

type Place = {
  name: string;
  lat: number;
  lng: number;
};

const HOTEL_LOCATION = {
  name: "Grand Hotel Badpyrmont - by STEINBERGER",
  lat: 51.984896,  // Updated to actual hotel coordinates for Bad Pyrmont
  lng: 9.258026,
  address: "Heiligenangerstraße 2-4, 31812 Bad Pyrmont, Germany"
};

const FAMOUS_PLACES: Place[] = [
  {
    name: "Hufeland Therme",
    lat: 51.985398, lng: 9.265441
  },
  {
    name: "Kurpark Bad Pyrmont",
    lat: 51.985600, lng: 9.252420
  },
  {
    name: "Bad Pyrmont Castle",
    lat: 51.983693, lng: 9.253293
  },
  {
    name: "Dunsthöhle Cave",
    lat: 51.978395, lng: 9.260283
  }
];

// Google Maps loader utility
function loadGoogleMaps(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Haversine Distance Calculator
function calcDistanceKM(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (v: number) => v * Math.PI / 180;
  const R = 6371; // radius of Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat/2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng/2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Set property API key as per instruction
const GOOGLE_MAPS_API_KEY = "AIzaSyDMqjEE2xJko-qH7TLgpZ9sNE372Jg3EBM";

const HotelMapSection: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [gmapsLoaded, setGmapsLoaded] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  // Animation state
  const [showDistance, setShowDistance] = useState(false);

  // For dev/demo: let people provide their API key if not set
  const [inputApiKey, setInputApiKey] = useState("");
  const [customApiKey, setCustomApiKey] = useState("");

  // Always use the main API key now unless user overwrites
  const apiKey = (GOOGLE_MAPS_API_KEY || customApiKey || inputApiKey).trim();

  // Load Google Maps JS API
  useEffect(() => {
    if (!apiKey) return;
    loadGoogleMaps(apiKey)
      .then(() => setGmapsLoaded(true))
      .catch(() => setGmapsLoaded(false));
  }, [apiKey]);

  // Render Google Map & markers
  useEffect(() => {
    if (!gmapsLoaded || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: HOTEL_LOCATION.lat, lng: HOTEL_LOCATION.lng },
      zoom: 15,
      mapId: "standard"
    });

    // Hotel marker
    const hotelMarker = new window.google.maps.Marker({
      position: { lat: HOTEL_LOCATION.lat, lng: HOTEL_LOCATION.lng },
      map,
      title: HOTEL_LOCATION.name,
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
        scaledSize: new window.google.maps.Size(40, 40)
      }
    });

    // Place marker
    let placeMarker: any = null;

    if (selectedPlace) {
      placeMarker = new window.google.maps.Marker({
        position: { lat: selectedPlace.lat, lng: selectedPlace.lng },
        map,
        title: selectedPlace.name,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          scaledSize: new window.google.maps.Size(36, 36)
        }
      });

      // Draw a polyline to connect
      const line = new window.google.maps.Polyline({
        path: [
          { lat: HOTEL_LOCATION.lat, lng: HOTEL_LOCATION.lng },
          { lat: selectedPlace.lat, lng: selectedPlace.lng }
        ],
        geodesic: true,
        strokeColor: "#bb9a66",
        strokeOpacity: 0.7,
        strokeWeight: 4
      });
      line.setMap(map);

      // Smooth fit bounds to show both
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(new window.google.maps.LatLng(HOTEL_LOCATION.lat, HOTEL_LOCATION.lng));
      bounds.extend(new window.google.maps.LatLng(selectedPlace.lat, selectedPlace.lng));
      map.fitBounds(bounds, 120);
    }

    // Clean up
    return () => {
      hotelMarker.setMap(null);
      if (placeMarker) placeMarker.setMap(null);
    };
    // eslint-disable-next-line
  }, [gmapsLoaded, selectedPlace]);

  // Calculate distance when place is selected
  useEffect(() => {
    if (!selectedPlace) {
      setShowDistance(false);
      setDistance(null);
      return;
    }
    const d = calcDistanceKM(
      HOTEL_LOCATION.lat,
      HOTEL_LOCATION.lng,
      selectedPlace.lat,
      selectedPlace.lng
    );
    setDistance(Number(d.toFixed(2)));
    setShowDistance(false);
    // Animate in the distance after slight delay
    const t = setTimeout(() => setShowDistance(true), 350);
    return () => clearTimeout(t);
  }, [selectedPlace]);

  return (
    <section className="relative bg-[#fbf8f3] py-12 px-0 md:px-8 mb-24 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-8 items-stretch max-w-5xl mx-auto">
        {/* Sidebar */}
        <div className="md:w-64 w-full mb-6 md:mb-0">
          <div className="bg-white rounded-lg shadow p-5 space-y-4 h-full">
            <div>
              <h2 className="text-2xl font-light mb-3">Famous Nearby Places</h2>
              <p className="text-sm text-gray-500 mb-2">
                Discover the region around {HOTEL_LOCATION.name}.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {FAMOUS_PLACES.map((place) => (
                <button
                  key={place.name}
                  className={`w-full text-left transition-all duration-300 rounded px-4 py-2 font-medium hover:bg-hotel-accent hover:text-white ${
                    selectedPlace && selectedPlace.name === place.name
                      ? "bg-hotel-accent text-white"
                      : "bg-lanserhof-light text-lanserhof-primary"
                  }`}
                  onClick={() => setSelectedPlace(place)}
                  aria-pressed={selectedPlace?.name === place.name}
                >
                  {place.name}
                </button>
              ))}
            </div>
            {selectedPlace && distance !== null ? (
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  showDistance ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="mt-6 text-center animate-fade-in">
                  <div className="text-lg text-hotel-primary font-semibold">
                    {selectedPlace.name}
                  </div>
                  <div className="mt-1 text-gray-600 text-base">
                    {distance} km from hotel
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 min-h-[360px] relative z-0">
          {!apiKey && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-10 rounded-md border border-gray-200">
              <div className="mb-3 text-lg font-medium text-gray-700">Enter Google Maps API key</div>
              <input
                className="border px-3 py-2 rounded"
                type="password"
                placeholder="Paste your Google Maps API key"
                value={inputApiKey}
                onChange={e => setInputApiKey(e.target.value)}
              />
              <button
                className="mt-2 bg-hotel-accent text-white px-4 py-2 rounded"
                onClick={() => setCustomApiKey(inputApiKey)}
              >
                Load Map
              </button>
              <div className="mt-3 text-xs text-gray-400 max-w-xs text-center">
                You can find your API key by creating a Maps JS API key at <a
                  href="https://console.cloud.google.com/google/maps-apis"
                  className="text-hotel-primary underline"
                  target="_blank" rel="noopener noreferrer"
                >Google Cloud Console</a>.
              </div>
            </div>
          )}
          <div
            ref={mapRef}
            className="rounded-lg shadow-md w-full min-h-[360px] h-[360px] md:h-[420px] transition-all"
            style={{ opacity: apiKey ? 1 : 0.35, filter: apiKey ? "" : "blur(2px)" }}
          />
        </div>
      </div>
    </section>
  );
};

export default HotelMapSection;
