import React, {Component} from 'react';
import ReactMapGL,  { NavigationControl } from 'react-map-gl';
import Info from "../component/Info";
import Pins from "../component/Pins";
import {MAPBOX_TOKEN} from "../util/constant";

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

    getInfo = (track) => {
        console.log(track)
        this.setState({popupInfo: track});
    }

    _renderPopup() {
        const {popupInfo} = this.state;

        return (
            popupInfo && (
                <Info popupInfo={popupInfo} close={() => this.setState({popupInfo: null})}></Info>
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
                    {this.props.tracks.map(track => <Pins key={track.trackId} track={track} displayTrack={() => this.getInfo(track)}></Pins>)}
                    {this._renderPopup()}
                    <div className="navigationControl">
                        <NavigationControl />
                    </div>
                    <div className="mapType">
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
