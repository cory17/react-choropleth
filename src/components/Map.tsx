import React from 'react'
import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
import LeafletMap from '../map'

type Props = {
	onLoad: (node: HTMLDivElement) => void
}

type ProviderProps = {
	onLoad: (map: LeafletMap) => void
}

const MapContext = React.createContext<LeafletMap | null>(null)

class LeafletWrapper extends React.Component<Props> {

	node: HTMLDivElement | undefined

	componentDidMount() {
		this.props.onLoad(this.node!)
	}

	shouldComponentUpdate() {
		return false
	}

	render() {
		return (
			<div className="app-map"
				ref={node => { this.node = node! }} />
		)
	}
}

export default class MapProvider extends React.Component<ProviderProps> {

	state = {
		map: new LeafletMap(),
		isLoaded: false
	}

	handleMapLoad = (node: HTMLDivElement) => {

		this.state.map.loadMap(node, {
			url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		})

		this.setState({ isLoaded: true })

		this.props.onLoad(this.state.map)
	}

	render() {
		const { isLoaded } = this.state

		return (
			<MapContext.Provider value={this.state.map}>
				<div className="map-container">
					<LeafletWrapper onLoad={this.handleMapLoad} />
					{isLoaded ? this.props.children : null}
				</div>
			</MapContext.Provider>
		)
	}
}

export { MapContext }
