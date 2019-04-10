import L, { LeafletEventHandlerFn } from 'leaflet'
import { Dict, Geojson, RegionProps, Feature } from './models'

type MapConfig = {
	url: string,
	attribution: string,
	center?: [number, number],
	zoom?: number,
	maxZoom?: number
}

type Popup = {
	_latlng: L.LatLng,
	_container: {
		clientHeight: number
	}
}


type ControlConstructor = (ops: { position: string }) => L.Control

type Project = (l: L.LatLng) => L.Point
type Unproject = (p: L.Point) => L.LatLng

const colors = ['#FFEDA0',
	'#FED976',
	'#FEB24C',
	'#FD8D3C',
	'#FC4E2A',
	'#E31A1C',
	'#BD0026',
	'#800026'
]


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

		this.map.on('popupopen', e => {

			const event = e as L.PopupEvent
			const popup = event.popup as unknown as Popup
			const project = this.map!.project as unknown as Project
			const unproject = this.map!.unproject as unknown as Unproject

			const loc = project(popup._latlng)

			loc.y -= popup._container.clientHeight / 2

			this.map!.panTo(
				unproject(loc), {
					animate: true
				}
			)
		})
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
					fillColor: colors[intensity],
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
			{ fillColor: colors[intensity] }
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
