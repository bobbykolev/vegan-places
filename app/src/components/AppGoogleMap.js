import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

export const AppGoogleMap = withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={17}
    center={{ lat: (props.latitude || 42.684362), lng: (props.longitude || 23.327338)}}
  >

    {props.isMarkerShown && props.icon && <Marker
          position={{ lat: (props.latitude || 42.684362), lng: (props.longitude || 23.327338) }}
          icon={{url: props.icon || null, scaledSize: new google.maps.Size(33, 44)}} />}

    {props.isMarkerShown && !props.icon && <Marker
              position={{ lat: (props.latitude || 42.684362), lng: (props.longitude || 23.327338) }} />}
  </GoogleMap>
);