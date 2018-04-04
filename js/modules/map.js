/* global google */
/* global ReactDOM */
import Map from '../Components/Map.js';

if (navigator.onLine && window.google) {
    ReactDOM.render(
        React.createElement(
            Map,
            {origin: {lat: 32.3541635, lng: -95.3020852}},
        ),
        document.querySelector('.js-map-component')
    );
}
