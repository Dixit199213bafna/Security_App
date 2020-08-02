import { Marker } from 'react-map-gl';
import React from "react";
import {ICON, SIZE} from "../util/constant";

const Pins = props => (
    <Marker key={props.track.trackId}
            longitude={props.track.position.longitude}
            latitude={props.track.position.latitude}
    >
        <svg
            height={SIZE}
            viewBox="0 0 24 24"
            style={{
                cursor: 'pointer',
                fill: '#d00',
                stroke: 'none',
                transform: `rotate(${props.track.kinematics.course}deg)`
            }}
            onClick={props.displayTrack}>
            <path d={ICON} />
        </svg>
    </Marker>
)

export default Pins;
