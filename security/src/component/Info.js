import { Popup } from 'react-map-gl';
import React from "react";

const Info = props => (
    <Popup
        longitude={props.popupInfo.position.longitude}
        latitude={props.popupInfo.position.latitude}
        onClose={props.close}
    >
        {props.popupInfo.name}
    </Popup>
)

export default Info;
