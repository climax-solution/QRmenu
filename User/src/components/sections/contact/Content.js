import React, { Component } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const customMarker = L.icon({
    iconUrl: process.env.PUBLIC_URL + "/assets/img/misc/marker.png",
    iconSize: [32, 32],
});

const latlng = [51.5, -0.09]

class Content extends Component {
    render() {
        return (
            <div className="contact-wrapper">
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
                    <a rel={'external'} className="btn-custom shadow-none" href={"https://maps.google.com/?q=" + latlng}>View in Google Maps</a>
                </div>
                <div>
                    <div className="section section-padding">
                        <div className="container">
                            <div className="contact-info">
                                <div className="row">
                                    <div className="col-xl-6">
                                        <div className="ct-info-box">
                                            <i className="flaticon-location" />
                                            <h5>Find Us</h5>
                                            <span>445 Mount Eden Road, Mount Eden</span>
                                            <span>21 Greens Road RD 2 Ruawai 0592</span>
                                            <span> +123 456 789 </span>
                                            <span> info@example.com </span>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="ct-info-box">
                                            <i className="flaticon-online-booking" />
                                            <h5>Opening Hours</h5>
                                            <span><span>Mon - Wed:</span> 8:00am - 8:00pm</span>
                                            <span><span>Thu:</span> 8:00am - 5:00pm</span>
                                            <span><span>Fri:</span> 8:00am - 8:00pm</span>
                                            <span><span>Sat - Sun:</span> 8:00am - 2:00pm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section pt-0">
                        <div className="container">
                            <div className="section-title-wrap">
                                <h2 className="title">Send us a Message </h2>
                                <p className="subtitle">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. There are many variations of passages
          </p>
                            </div>
                            <form>
                                <div className="row">
                                    <div className="form-group col-lg-6">
                                        <input type="text" placeholder="First Name" className="form-control" name="fname" />
                                    </div>
                                    <div className="form-group col-lg-6">
                                        <input type="text" placeholder="Last Name" className="form-control" name="lname" />
                                    </div>
                                    <div className="form-group col-lg-12">
                                        <input type="email" placeholder="Email Address" className="form-control" name="email" />
                                    </div>
                                    <div className="form-group col-lg-12">
                                        <input type="text" placeholder="Subject" className="form-control" name="subject" />
                                    </div>
                                    <div className="form-group col-lg-12">
                                        <textarea name="message" className="form-control" placeholder="Type your message" rows={8} />
                                    </div>
                                </div>
                                <button type="submit" className="btn-custom primary" name="button">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;