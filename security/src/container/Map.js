import React, {Component} from 'react';
import ReactMapGL,  { Marker, NavigationControl, Popup } from 'react-map-gl';
const ICON = `M150,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGl4aXRiYWZuYSIsImEiOiJja2Q3dnFiZWYwNzN6MnFwY21vM2tpMTVnIn0.yRZH8srcee_qXgwIErF6_Q';
const SIZE=15;


class Map extends Component {
    state = {
        viewport: {
            latitude: this.props.tracks[0].position.latitude,
            longitude: this.props.tracks[0].position.longitude,
            zoom: 15,
        },
        popupInfo: null,
        mapType: 'mapbox://styles/mapbox/satellite-v9'
    }

    getInfo = (m) => {
        this.setState({popupInfo: m});
    }

    _renderPopup() {
        const {popupInfo} = this.state;

        return (
            popupInfo && (
                <Popup
                    longitude={popupInfo.position.longitude}
                    latitude={popupInfo.position.latitude}
                    onClose={() => this.setState({popupInfo: null})}
                >
                    {this.state.popupInfo.name}
                </Popup>
            )
        );
    }

    render() {
        const {viewport} = this.state;
        return (
            <div>
                <ReactMapGL
                    {...viewport}
                    width="100vw"
                    height="100vh"
                    mapStyle={this.state.mapType}
                    onViewportChange={viewport => this.setState({viewport})}
                    mapboxApiAccessToken={MAPBOX_TOKEN}>
                    {this.props.tracks.map(m => {
                        return (
                            <Marker key={m.trackId}
                                    longitude={m.position.longitude}
                                    latitude={m.position.latitude}
                            >
                                <svg
                                    height={SIZE}
                                    viewBox="0 0 24 24"
                                    style={{
                                        cursor: 'pointer',
                                        fill: '#d00',
                                        stroke: 'none',
                                        transform: `rotate(${m.kinematics.course}deg)`
                                    }}
                                    onClick={() => this.getInfo(m)}>
                                    <path d={ICON} />
                                </svg>
                            </Marker>
                        )
                    })}
                    {this._renderPopup()}
                    <div style={{position: 'absolute', top:0 , margin: '10px'}}>
                        <NavigationControl />
                    </div>
                    <div style={{position: 'absolute', right: 0, margin: '10px'}}>
                        <select onChange={(event) => this.setState({mapType: event.target.value})}>
                            <option value="mapbox://styles/mapbox/satellite-v9">Satellite</option>
                            <option value="mapbox://styles/mapbox/light-v9">Light</option>
                            <option value="mapbox://styles/mapbox/dark-v9">Dark</option>
                        </select>
                    </div>
                </ReactMapGL>
            </div>
        );
    }
}

export default Map;
