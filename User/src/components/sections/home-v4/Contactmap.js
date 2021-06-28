import React, { Component } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const customMarker = L.icon({
    iconUrl: process.env.PUBLIC_URL + "/assets/img/misc/marker.png",
    iconSize: [32, 32],
});

const latlng = [51.5, -0.09]

class Contactmap extends Component {
    render() {
        return (
            <div className="section-map pb-0">
                <div className="ct-contact-map-wrapper">
                    <MapContainer
                        className="markercluster-map ct-contact-map"
                        center={latlng}
                        zoom={16}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                            attribution='&copy; Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
                            maxZoom={16}
                        />
                        <Marker position={latlng} icon={customMarker}></Marker>
                    </MapContainer>
                </div>
            </div>
        );
    }
}

export default Contactmap;