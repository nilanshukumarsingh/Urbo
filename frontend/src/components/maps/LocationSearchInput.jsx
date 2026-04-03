import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { MapPin, Loader2, ArrowRight } from "lucide-react";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const LocationSearchInput = ({ onSelect, placeholder = "Search for a location...", className = "" }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    requestOptions: {
      types: ["geocode", "establishment"],
    },
  });

  const isKeyValid = GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY !== "Your Google Maps API Key";

  const handleSelect = async (description) => {
    setValue(description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);
      onSelect({ address: description, lat, lng });
    } catch (error) {
      console.error("Error selecting location:", error);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isKeyValid && value) {
              e.preventDefault();
              onSelect({ address: value, lat: null, lng: null });
            }
          }}
          disabled={isKeyValid ? !ready : false}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        {!isKeyValid && value && (
          <button
            type="button"
            onClick={() => onSelect({ address: value, lat: null, lng: null })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
        {isKeyValid && !ready && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          </div>
        )}
      </div>

      {status === "OK" && isKeyValid && (
        <ul className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg max-h-60 overflow-auto">
          {data.map((suggestion) => (
            <li key={suggestion.place_id} onClick={() => handleSelect(suggestion.description)} className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-700">{suggestion.description}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearchInput;
