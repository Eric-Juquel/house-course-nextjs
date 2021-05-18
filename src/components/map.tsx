import { useRef, useState } from "react";
import Link from "next/link";
import { Image } from "cloudinary-react";
import ReactMapGL, { Marker, Popup, ViewState } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLocalState } from "src/utils/useLocalState";
import { HousesQuery_houses } from "src/generated/HousesQuery";
import { SearchBox } from "./searchBox";
import { MapStyle } from "./mapStyle";

interface Iprops {
  setDataBounds: (bounds: string) => void;
  houses: HousesQuery_houses[];
  highlightedId: string | null;
}

export default function Map({ setDataBounds, houses, highlightedId }: Iprops) {
  const [selected, setSelected] = useState<HousesQuery_houses | null>(null);
  const mapRef = useRef<ReactMapGL | null>(null);
  const [viewport, setViewport] = useLocalState<ViewState>("viewport", {
    latitude: -16.87795,
    longitude: 49.88728,
    zoom: 10,
  });
  const [mapStyle, setMapStyle] = useState("mapbox/satellite-v9");

  return (
    <>
      <div className="w-full h-12 mx-auto p-2 flex items-center justify-evenly">
        <div className="w-1/2">
          <SearchBox
            onSelectAddress={(_address, latitude, longitude) => {
              if (latitude && longitude) {
                setViewport((old) => ({
                  ...old,
                  latitude,
                  longitude,
                  zomm: -12,
                }));
                if (mapRef.current) {
                  const bounds = mapRef.current.getMap().getBounds();
                  setDataBounds(JSON.stringify(bounds.toArray()));
                }
              }
            }}
            defaultValue=""
          />
        </div>
        <MapStyle mapStyle={mapStyle} setMapStyle={setMapStyle} />
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
          onLoad={() => {
            if (mapRef.current) {
              const bounds = mapRef.current.getMap().getBounds();
              setDataBounds(JSON.stringify(bounds.toArray()));
            }
          }}
          onInteractionStateChange={(extra) => {
            if (!extra.isDragging && mapRef.current) {
              const bounds = mapRef.current.getMap().getBounds();
              setDataBounds(JSON.stringify(bounds.toArray()));
            }
          }}
        >
          {houses.map((house) => (
            <Marker
              key={house.id}
              latitude={house.latitude}
              longitude={house.longitude}
              offsetLeft={-15}
              offsetTop={-15}
              className={highlightedId === house.id ? "marker-active" : ""}
            >
              <button
                style={{ width: "30px", height: "30px", fontSize: "30px" }}
                type="button"
                onClick={() => setSelected(house)}
              >
                <img
                  src={
                    highlightedId === house.id
                      ? "/home-color.svg"
                      : "/home-solid.svg"
                  }
                  alt="house"
                  className="w-8"
                />
              </button>
            </Marker>
          ))}

          {selected && (
            <Popup
              latitude={selected.latitude}
              longitude={selected.longitude}
              onClose={() => setSelected(null)}
              closeOnClick={false}
            >
              <div className="text-center">
                <h3 className="px-4">{selected.address.substring(0, 30)}</h3>
                <Image
                  className="max-auto my-4"
                  cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                  publicId={selected.publicId}
                  alt={selected.address}
                  secure
                  dpr="auto"
                  quality="auto"
                  width={200}
                  height={Math.floor((9 / 16) * 200)}
                  crop="fill"
                  gravity="auto"
                />
                <Link href={`/houses/${selected.id}`}>
                  <a>View house</a>
                </Link>
              </div>
            </Popup>
          )}
        </ReactMapGL>
      </div>
    </>
  );
}
