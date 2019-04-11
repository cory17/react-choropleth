import L, { LeafletEventHandlerFn } from 'leaflet'
import { Dict, Geojson, RegionProps, Feature } from './models'
import { INTENSITY_COLORS } from './utility'

type MapConfig = {
	url: string,
	attribution: string,
	center?: [number, number],
	zoom?: number,
	maxZoom?: number
}

type ControlConstructor = (ops: { position: string }) => L.Control

type Project = (l: L.LatLng) => L.Point
type Unproject = (p: L.Point) => L.LatLng


export default class LeafletMap {

	map: L.Map | undefined

	geoLayer: L.GeoJSON | undefined
	featureLayers: Dict<L.Polyline> = {}

	loadMap(node: HTMLDivElement, config: MapConfig) {

		const {
			url,
			attribution,
			center = [39.8282, -98.5795] as [number, number],
			zoom = 5,
			maxZoom = 19
		} = config

		this.map = L.map(node, {
			center,
			zoom,
		})

		L.tileLayer(url, {
			maxZoom,
			attribution
		}).addTo(this.map)

		this.refresh()
	}

	//Call this.refresh() to update the screen after calling this.addGeojson
	addGeojson(
		geojson: Geojson<RegionProps>,
		onClick: (latlng: L.LatLng,
			index: number) => void
	) {

		this.featureLayers = {}
		this.geoLayer = L.geoJSON(geojson, {
			onEachFeature: (feature: Feature<RegionProps>, layer: L.Polyline) => {

				const { index, intensity } = feature.properties

				const style = {
					fillColor: INTENSITY_COLORS[intensity],
					weight: 2,
					opacity: 1,
					color: 'white',
					dashArray: '3',
					fillOpacity: 0.7
				}

				const click = (e: L.LeafletMouseEvent) => {
					onClick(e.latlng, index)
				}

				layer.setStyle(style)

				layer.on({
					click: click as unknown as LeafletEventHandlerFn
				})

				this.featureLayers[index] = layer
			}
		})

		this.geoLayer.addTo(this.map!)
	}

	updateFeature(index: number, intensity: number) {
		this.featureLayers[index].setStyle(
			{ fillColor: INTENSITY_COLORS[intensity] }
		)
	}

	fitGeoLayer() {
		this.map!.fitBounds(this.geoLayer!.getBounds())
	}

	refresh() {
		this.map!.invalidateSize()
	}

	zoomToFeature(index: number) {
		const layer = this.featureLayers[index]
		this.map!.fitBounds(layer.getBounds())
	}


	removeGeojson() {
		this.map!.removeLayer(this.geoLayer!)
		this.featureLayers = {}
	}
}
