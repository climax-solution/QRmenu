import React, { Component } from 'react';
import location from '../../../data/restaurant.json';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const customMarker = L.icon({
    iconUrl: process.env.PUBLIC_URL + "/assets/img/misc/marker.png",
    iconSize: [32, 32],
});

class Content extends Component {
    render() {
        return (
            <div className="section">
                <div className="container locations-wrapper">
                    {location.map((item, i) => (
                        <div key={i} className="location-item">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="location-item-inner">
                                        <img src={process.env.PUBLIC_URL + "/" + item.img} alt={item.title} />
                                        <div className="location-desc">
                                            <h3>{item.title}</h3>
                                            <p>{item.brancetype}</p>
                                        </div>
                                        <div className="location-info">
                                            <div className="row">
                                                <div className="col-6">
                                                    {item.location.map((item, i) => (
                                                        <span key={i}>{item}</span>
                                                    ))}
                                                </div>
                                                <div className="col-6">
                                                    <span> Give us a call: <a rel={'external'} href={"tel:" + item.contactno}>{item.contactno}</a> </span>
                                                    <span> Email Us: <a rel={'external'} href={"mailto:" + item.emailid}>{item.emailid}</a></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="ct-contact-map-wrapper">
                                        <MapContainer
                                            className="markercluster-map ct-contact-map"
                                            center={item.mapdata}
                                            zoom={16}
                                            scrollWheelZoom={false}
                                        >
                                            <TileLayer
                                                url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                                                attribution='&copy; Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
                                                maxZoom={16}
                                            />
                                            <Marker position={item.mapdata} icon={customMarker}></Marker>
                                        </MapContainer>
                                        <a rel={'external'} className="btn-custom shadow-none" href={"http://maps.google.com/?q=" + item.mapdata}>View in Google Maps</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Content;