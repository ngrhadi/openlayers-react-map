import React, { useState } from "react";
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { osm, vector } from "./Source";
import { fromLonLat, get } from "ol/proj";
// import GeoJSON from "ol/format/GeoJSON";
import { Controls, FullScreenControl } from "./Controls";
import FeatureStyles from "./Features/Styles";

import mapConfig from "./config.json"; 
import "./App.css";

// const geojsonObject = mapConfig.geojsonObject;
// const geojsonObject2 = mapConfig.geojsonObject2;

// marker add to map
const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];

function addMarkers(lonLatArray) {
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });
  let features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}

const App = () => {
  const [center, setCenter] = useState(mapConfig.center);
  const [zoom, setZoom] = useState(5);

  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);
  const [showMarker1, setShowMarker1] = useState(false);
  const [showMarker2, setShowMarker2] = useState(false);
  const [showMarker3, setShowMarker3] = useState(false);
  const [showMarker4, setShowMarker4] = useState(false);

  const [features, setFeatures] = useState(addMarkers(markersLonLat));

  return (
    <div>
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          {/* {showLayer1 && (
            <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(geojsonObject, {
                  featureProjection: get("EPSG:3857"),
                }),
              })}
              style={FeatureStyles.MultiPolygon}
            />
          )}
          {showLayer2 && (
            <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(geojsonObject2, {
                  featureProjection: get("EPSG:3857"),
                }),
              })}
              style={FeatureStyles.MultiPolygon}
            />
          )} */}
          
        </Layers>
        <Controls>
          <FullScreenControl />
          
          {showMarker1 && <VectorLayer source={vector({ features })} />}
          {showMarker2 && <VectorLayer source={vector({ features })} />}
          {showMarker3 && <VectorLayer source={vector({ features })} />}
          {showMarker4 && <VectorLayer source={vector({ features })} />}
        </Controls>
      </Map>
      <div>
        <input
          type="checkbox"
          checked={showMarker1}
          onChange={(event) => setShowMarker1(event.target.checked)}
        />{" "}
        Show markers
      </div>
      <div>
        <input
          type="checkbox"
          checked={showMarker2}
          onChange={(event) => setShowMarker2(event.target.checked)}
        />{" "}
        Show markers
      </div>
      <div>
        <input
          type="checkbox"
          checked={showMarker3}
          onChange={(event) => setShowMarker3(event.target.checked)}
        />{" "}
        Show markers
      </div>
      <div>
        <input
          type="checkbox"
          checked={showMarker4}
          onChange={(event) => setShowMarker4(event.target.checked)}
        />{" "}
        Show markers
      </div>
      {/* <div>
        <input
          type="checkbox"
          checked={showLayer1}
          onChange={(event) => setShowLayer1(event.target.checked)}
        />{" "}
        Johnson County
      </div>
      <div>
        <input
          type="checkbox"
          checked={showLayer2}
          onChange={(event) => setShowLayer2(event.target.checked)}
        />{" "}
        Wyandotte County
      </div> */}
      <hr />
      
    </div>
  );
};

export default App;
