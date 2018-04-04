/* global google */
/* global React */
const e = React.createElement;

export default class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        }
    }

    componentDidMount() {
        this.map = new window.google.maps.Map(this.refs.map, {
            center: this.props.origin,
            zoom: 15,
            mapTypeControl: false,
            streetViewControl: false,
            rotateControl: false,
            scrollwheel: false,
            draggable: (window.innerWidth > 600),
        });

        new window.google.maps.Marker({
            position: this.props.origin,
            map: this.map,
            title: 'Tyler Web Dev'
        });

        this.directionsDisplay = new google.maps.DirectionsRenderer({
            map: this.map
        });

        this.forceUpdate();
    }

    handleEnableDragging() {
        this.map.setOptions({
            draggable: true
        });

        this.forceUpdate();
    }

    handleGetDirections() {
        this.setState({
            loading: true
        }, () => {
            navigator.geolocation.getCurrentPosition((position) => {
                new google.maps.DirectionsService().route({
                    destination: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    },
                    origin: this.props.origin,
                    travelMode: google.maps.TravelMode.DRIVING
                }, (response, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        /**
                         * Display the route on the map.
                         */
                        this.directionsDisplay.setDirections(response);
                    }

                    /**
                     * There was a problem with the route
                     */

                    this.setState({
                        loading: false
                    });
                });
            })
        });
    }

    static renderLoading() {
        return e(
            'div',
            {className: 'map-component__loading'},
            e(
                'div',
                {className: 'map-component__loading-outer'},
                e(
                    'span',
                    {className: 'map-component__loading-inner'},
                )
            )
        );
    }

    renderMap() {
        return e(
            'div',
            {},
            e(
                'div',
                {className: 'map-component__controls-container'},
                this.map && this.map.draggable
                    ? ''
                    : e(
                    'div',
                    {onClick: this.handleEnableDragging.bind(this), className: 'map-component__button'},
                    e(
                        'img',
                        {src: '/img/icons/hand.svg', height: '20'}
                    ),
                    ),
            ),
            e(
                'div',
                {className: 'map-component__map', ref: 'map'}
            ),
            e(
                'div',
                {style: {marginTop: '50px'}},
                navigator.geolocation
                    ? e('a', {className: 'button', onClick: this.handleGetDirections.bind(this)}, 'Get Directions!')
                    : ''
            )
        );
    }

    render() {
        return e(
            'div',
            {className: 'map-component'},
            this.state.loading ? Map.renderLoading() : '',
            this.renderMap()
        );
    }
}
