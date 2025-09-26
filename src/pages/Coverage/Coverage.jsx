import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 🔹 Fix default marker icons for React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const districtData = [
  { name: "Dhaka", lat: 23.8103, lng: 90.4125 },
  { name: "Faridpur", lat: 23.6, lng: 89.8333 },
  { name: "Gazipur", lat: 23.9999, lng: 90.4203 },
  { name: "Gopalganj", lat: 23.0052, lng: 89.8266 },
  { name: "Kishoreganj", lat: 24.426, lng: 90.7829 },
  { name: "Madaripur", lat: 23.17, lng: 90.2 },
  { name: "Manikganj", lat: 23.8617, lng: 89.9767 },
  { name: "Munshiganj", lat: 23.55, lng: 90.5305 },
  { name: "Narayanganj", lat: 23.62, lng: 90.5 },
  { name: "Narsingdi", lat: 23.9226, lng: 90.7156 },
  { name: "Rajbari", lat: 23.7576, lng: 89.65 },
  { name: "Shariatpur", lat: 23.22, lng: 90.4308 },
  { name: "Tangail", lat: 24.25, lng: 89.92 },
  { name: "Chattogram", lat: 22.3569, lng: 91.8123 },
  { name: "Cox's Bazar", lat: 21.4272, lng: 92.0165 },
  { name: "Cumilla", lat: 23.4573, lng: 91.1809 },
  { name: "Brahmanbaria", lat: 23.9571, lng: 91.1116 },
  { name: "Chandpur", lat: 23.2333, lng: 90.85 },
  { name: "Feni", lat: 23.0167, lng: 91.4 },
  { name: "Khagrachari", lat: 23.1, lng: 91.9667 },
  { name: "Lakshmipur", lat: 22.9444, lng: 90.8415 },
  { name: "Noakhali", lat: 22.8245, lng: 91.0995 },
  { name: "Rangamati", lat: 22.65, lng: 92.2 },
  { name: "Sylhet", lat: 24.8949, lng: 91.8662 },
  { name: "Moulvibazar", lat: 24.4826, lng: 91.7832 },
  { name: "Habiganj", lat: 24.3745, lng: 91.4026 },
  { name: "Sunamganj", lat: 25.0658, lng: 91.395 },
  { name: "Rangpur", lat: 25.746, lng: 89.2752 },
  { name: "Dinajpur", lat: 25.6275, lng: 88.6414 },
  { name: "Thakurgaon", lat: 26.0333, lng: 88.466 },
  { name: "Panchagarh", lat: 26.3411, lng: 88.5658 },
  { name: "Nilphamari", lat: 25.931, lng: 88.856 },
  { name: "Lalmonirhat", lat: 25.9167, lng: 89.1662 },
  { name: "Kurigram", lat: 25.8054, lng: 89.65 },
  { name: "Gaibandha", lat: 25.3288, lng: 89.5418 },
  { name: "Khulna", lat: 22.8456, lng: 89.5672 },
  { name: "Jessore", lat: 23.17, lng: 89.2167 },
  { name: "Satkhira", lat: 22.7085, lng: 89.0809 },
  { name: "Bagerhat", lat: 22.6516, lng: 89.7926 },
  { name: "Magura", lat: 23.4853, lng: 89.4194 },
  { name: "Narail", lat: 23.1667, lng: 89.5 },
  { name: "Jhenaidah", lat: 23.5333, lng: 89.1833 },
  { name: "Chuadanga", lat: 23.64, lng: 88.85 },
  { name: "Meherpur", lat: 23.7623, lng: 88.6318 },
  { name: "Rajshahi", lat: 24.3745, lng: 88.6087 },
  { name: "Natore", lat: 24.4167, lng: 89 },
  { name: "Naogaon", lat: 24.8236, lng: 88.93 },
  { name: "Chapainawabganj", lat: 24.5962, lng: 88.27 },
  { name: "Pabna", lat: 24.0037, lng: 89.2331 },
  { name: "Sirajganj", lat: 24.45, lng: 89.7167 },
  { name: "Joypurhat", lat: 25.0953, lng: 89.0412 },
  { name: "Bogura", lat: 24.85, lng: 89.37 },
  { name: "Barisal", lat: 22.7, lng: 90.3667 },
  { name: "Bhola", lat: 22.685, lng: 90.6311 },
  { name: "Patuakhali", lat: 22.35, lng: 90.3333 },
  { name: "Pirojpur", lat: 22.5833, lng: 89.975 },
  { name: "Barguna", lat: 22.1667, lng: 90.1167 },
  { name: "Jhalokati", lat: 22.6417, lng: 90.2167 },
  { name: "Mymensingh", lat: 24.7539, lng: 90.3987 },
  { name: "Netrokona", lat: 24.8833, lng: 90.7333 },
  { name: "Jamalpur", lat: 24.9167, lng: 89.9333 },
  { name: "Sherpur", lat: 25.0333, lng: 90.0333 },
  { name: "Bandarban", lat: 22.1958, lng: 92.2186 },
  { name: "Kushtia", lat: 23.9013, lng: 89.122 },
];

const Coverage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Search অনুযায়ী জেলা বের করা
  const searchedDistrict = districtData.find((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-center">
        We are available in {districtData.length} districts
      </h2>
      <p className="text-center mb-6 text-gray-600">
        Search your district below to check coverage
      </p>

      {/* 🔹 Map Section */}
      <div className="h-[450px] w-full mb-6 rounded-lg overflow-hidden shadow-md">
        <MapContainer
          center={
            searchedDistrict
              ? [searchedDistrict.lat, searchedDistrict.lng] // search করলে সেই জেলার marker zoom হবে
              : [23.685, 90.3563] // শুরুতে Bangladesh এর center
          }
          zoom={searchedDistrict ? 9 : 7}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {/* 🔹 সব জেলা marker দেখানো */}
          {districtData.map((district, index) => (
            <Marker key={index} position={[district.lat, district.lng]}>
              <Popup>{district.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* 🔹 Search Box */}
      <input
        type="text"
        placeholder="Search district..."
        className="input input-bordered w-full mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 🔹 District List */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {(searchedDistrict ? [searchedDistrict] : districtData).map(
          (district, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg text-center shadow-sm transition ${
                searchedDistrict && searchedDistrict.name === district.name
                  ? "bg-primary text-white"
                  : "bg-base-200 hover:bg-primary hover:text-white"
              }`}
            >
              {district.name}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Coverage;
