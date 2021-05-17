import { useState } from "react";
import Link from "next/link";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface IHouse {
  id: string;
  latitude: number;
  longitude: number;
}

interface IProps {
  house: IHouse;
  nearby: IHouse[];
}

export default function SingleMap({ house, nearby }: IProps) {
  const [viewport, setViewport] = useState({
    latitude: house.latitude,
    longitude: house.longitude,
    zoom: 13,
  });
  const [mapStyle, setMapStyle] = useState("mapbox/satellite-v9");

  return (
    <>
      <div className="w-1/2 h-12 mx-auto  flex items-center justify-evenly">
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
      <div className="text-black">
        <ReactMapGL
          {...viewport}
          width="100%"
          height="calc(100vh - 112px)"
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
          minZoom={5}
          scrollZoom={false}
          mapStyle={`mapbox://styles/${mapStyle}`}
        >
          <div className="absolute top-0 left0 p-4">
            <NavigationControl showCompass={false} />
          </div>

          <Marker
            latitude={house.latitude}
            longitude={house.longitude}
            offsetLeft={-15}
            offsetTop={-15}
          >
            <button type="button" style={{ width: "30px", fontSize: "30px" }}>
              <img src="/home-color.svg" className="w-8" alt="selected house" />
            </button>
          </Marker>

          {nearby.map((near) => (
            <Marker
              key={near.id}
              latitude={near.latitude}
              longitude={near.longitude}
              offsetLeft={-15}
              offsetTop={-15}
            >
              <Link href={`/houses/${near.id}`}>
                <a style={{ width: "30px", fontSize: "30px" }}>
                  <img
                    src="/home-solid.svg"
                    className="w-8"
                    alt="nearby house"
                  />
                </a>
              </Link>
            </Marker>
          ))}
        </ReactMapGL>
      </div>
    </>
  );
}
