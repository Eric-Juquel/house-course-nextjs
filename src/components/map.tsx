import { useRef, useState } from "react";
// import Link from "next/link";
import { Image } from "cloudinary-react";
import ReactMapGL, { Marker, Popup, ViewState } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import { useLocalState } from "src/utils/useLocalState";
// import { HousesQuery_houses } from "src/generated/HousesQuery";
// import { SearchBox } from "./searchBox";

interface Iprops {}

export default function Map({}: Iprops) {
  const mapRef = useRef<ReactMapGL | null>(null);
  const [viewport, setViewport] = useState<ViewState>({
    latitude: -16.87795,
    longitude: 49.88728,
    zoom: 10,
  });
  const [mapStyle, setMapStyle] = useState("mapbox/satellite-v9");

  return (
    <>
      <div className="w-full h-12 mx-auto  flex items-center justify-evenly">
        <div className="flex items-center m-auto">
          <input
            id="radio1"
            type="radio"
            name="radio"
            className="hidden"
            value="mapbox/satellite-v9"
            checked={mapStyle === "mapbox/satellite-v9"}
            onChange={(e) => setMapStyle(e.target.value)}
          />
          <label htmlFor="radio1" className="flex items-center cursor-pointer">
            <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
            Satellite
          </label>
        </div>

        <div className="flex items-center m-auto">
          <input
            id="radio2"
            type="radio"
            name="radio"
            className="hidden"
            value="mapbox/streets-v11"
            checked={mapStyle === "mapbox/streets-v11"}
            onChange={(e) => setMapStyle(e.target.value)}
          />
          <label htmlFor="radio2" className="flex items-center cursor-pointer">
            <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
            Streets
          </label>
        </div>

        <div className="flex items-center m-auto">
          <input
            id="radio3"
            type="radio"
            name="radio"
            className="hidden"
            value="leighhalliday/ckhjaksxg0x2v19s1ovps41ef"
            checked={mapStyle === "leighhalliday/ckhjaksxg0x2v19s1ovps41ef"}
            onChange={(e) => setMapStyle(e.target.value)}
          />
          <label htmlFor="radio3" className="flex items-center cursor-pointer">
            <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
            Dark
          </label>
        </div>
      </div>
      <div className="text-black relative ">
        <ReactMapGL
          {...viewport}
          width="100%"
          height="calc(100vh - 112px)"
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          ref={(instance) => (mapRef.current = instance)}
          minZoom={5}
          maxZoom={20}
          mapStyle={`mapbox://styles/${mapStyle}`}
        ></ReactMapGL>
      </div>
    </>
  );
}
