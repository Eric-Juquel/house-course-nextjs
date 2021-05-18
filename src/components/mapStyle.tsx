interface IProps {
  setMapStyle: (value: string) => void;
  mapStyle: string;
}

export function MapStyle({ mapStyle, setMapStyle }: IProps) {
  return (
    <div className="w-1/2 h-12 mx-auto  flex items-center justify-evenly">
      <div className="flex items-center m-auto w-3">
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

      <div className="flex items-center m-auto w-3">
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

      <div className="flex items-center m-auto w-3">
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
  );
}
