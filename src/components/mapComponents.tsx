import React from 'react'
import PropTypes from 'prop-types'
import { Geojson, RegionProps, Dict } from '../models'
import { MapContext } from './Map'


type MapGeojsonProps = {
	geojson: Geojson<RegionProps>,
	onClick: (latlng: [number, number], index: number) => void,
	children?: any
}

type FeatureZoomProps = {
	index: number,
	onZoomEnd: () => void
}


export class MapGeojson extends React.Component<MapGeojsonProps> {

	static contextType = MapContext

	static defaultProps = {
		onClick: () => { }
	}


	componentDidMount() {
		const map = this.context

		const { geojson, onClick } = this.props

		map.addGeojson(geojson, onClick)
		map.refresh()
		map.fitGeoLayer()
	}

	componentDidUpdate(prev: MapGeojsonProps) {
		const map = this.context
		const { geojson, onClick } = this.props

		if (this.props.geojson !== prev.geojson) {

			map.removeGeojson()

			map.addGeojson(geojson, onClick)
			map.fitGeoLayer()
			map.refresh()
		}
	}

	componentWillUnmount() {
		const map = this.context
		map.removeGeojson()
	}

	remove() {
		const map = this.context
		map.removeGeojson()
	}

	render() {
		return this.props.children ? this.props.children : null
	}
}


export class FeatureZoom extends React.PureComponent<FeatureZoomProps> {

	static contextType = MapContext


	componentDidMount() {
		const map = this.context
		const { index } = this.props

		map.zoomToFeature(index)
		this.props.onZoomEnd()
	}

	render() { return null }
}
