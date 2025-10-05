import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

// You'll need to get your Mapbox token from https://mapbox.com/
// Add it to your environment variables
const MAPBOX_TOKEN = "pk.eyJ1IjoiZWNvbm92YS1kZW1vIiwiYSI6ImNtNDNweHh4ZDAwazkyanE0azV1eG5mcmgifQ.Kq8LvX5rXqX5K5zP5zX5zA"; // Demo token

interface MapLocationPickerProps {
  onLocationSelect: (address: string, coordinates: [number, number]) => void;
  defaultAddress?: string;
}

const MapLocationPicker = ({ onLocationSelect, defaultAddress }: MapLocationPickerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [searchQuery, setSearchQuery] = useState(defaultAddress || "");
  const [selectedAddress, setSelectedAddress] = useState(defaultAddress || "");

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    // Initialize map centered on India
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [72.8777, 19.0760], // Mumbai coordinates
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add click handler to map
    map.current.on("click", async (e) => {
      const { lng, lat } = e.lngLat;
      
      // Add or move marker
      if (marker.current) {
        marker.current.setLngLat([lng, lat]);
      } else {
        marker.current = new mapboxgl.Marker({ color: "#22c55e" })
          .setLngLat([lng, lat])
          .addTo(map.current!);
      }

      // Reverse geocode to get address
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`
        );
        const data = await response.json();
        
        if (data.features && data.features.length > 0) {
          const address = data.features[0].place_name;
          setSelectedAddress(address);
          setSearchQuery(address);
          onLocationSelect(address, [lng, lat]);
        }
      } catch (error) {
        console.error("Error reverse geocoding:", error);
      }
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim() || !map.current) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${MAPBOX_TOKEN}&country=IN`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        const address = data.features[0].place_name;

        // Move map to location
        map.current.flyTo({ center: [lng, lat], zoom: 15 });

        // Add or move marker
        if (marker.current) {
          marker.current.setLngLat([lng, lat]);
        } else {
          marker.current = new mapboxgl.Marker({ color: "#22c55e" })
            .setLngLat([lng, lat])
            .addTo(map.current);
        }

        setSelectedAddress(address);
        onLocationSelect(address, [lng, lat]);
      }
    } catch (error) {
      console.error("Error geocoding:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search for your location..."
          className="pl-10"
        />
      </div>

      <Card className="relative overflow-hidden border-2">
        <div ref={mapContainer} className="h-[400px] w-full" />
        
        {selectedAddress && (
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border">
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Selected Location</p>
                <p className="text-xs text-muted-foreground mt-1">{selectedAddress}</p>
              </div>
            </div>
          </div>
        )}
      </Card>

      <p className="text-xs text-muted-foreground text-center">
        Click on the map to select your pickup location or search above
      </p>
    </div>
  );
};

export default MapLocationPicker;
