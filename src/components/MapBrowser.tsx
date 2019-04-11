import React from 'react'
import { Upload, message, List, Menu, Button, Icon, Card } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload';
import { RcFile } from 'antd/lib/upload/interface';
import { TopoRef, Geojson } from '../models'
import { topoToGeo } from '../utility'
import L from 'leaflet'
const { Item } = Menu


type TopoItemProps = {
	toporef: TopoRef
}

type TopoMenuProps = {
	toporefs: TopoRef[],
	onSelect: (name: string) => void
}

type UploadError = 'topojson' | 'geojson' | 'filesystem' | 'parse'

type Props = {
	onUpload: (geo: Geojson) => void,
	onTopoSelect: (name: string) => void,
	toporefs: TopoRef[],
	onUploadError: (err: UploadError) => void
}


function parseGeographyFile(text: string) {

	const unknown = { type: 'unknown' }

	try {
		const parsed = JSON.parse(text)

		return parsed &&
			typeof parsed === 'object' &&
			typeof parsed.type === 'string' ? parsed : unknown
	}
	catch (e) {
		return unknown
	}
}


const getObjectNames = ({ objects }: TopoJSON.Topology) =>
	objects && typeof objects === 'object' ? Object.keys(objects) : []


const TopoMenu = ({ toporefs, onSelect }: TopoMenuProps) => (
	<Menu onSelect={({ key }) => onSelect(key)}>
		{toporefs.map(ref => (
			<Item key={ref.name}>{ref.name}</Item>
		))}
	</Menu>
)

//Required by antd upload button
const dummyRequest = ({ onSuccess }: { onSuccess: (message: string) => void }) => {
	setTimeout(() => {
		onSuccess("ok");
	}, 0);
};

export default class MapBrowser extends React.Component<Props> {


	handleChange = (info: UploadChangeParam) => {

		switch (info.file.status) {
			case 'done': {

				const reader = new FileReader()

				reader.onload = (e) => {
					const { target } = e
					const { result } = target as unknown as { result: string }

					this.handleDrop(result)
				}
				reader.onerror = this.handleError

				reader.readAsText(info.file.originFileObj!)
			}

		}
	}

	//TODO: Figure out what triggers this error
	handleError = () => {
		this.props.onUploadError('filesystem')
	}

	handleDrop = (text: string) => {

		const geo = parseGeographyFile(text)

		/*
			geo.type == 'Topology' -> treat as Topojson file
			geo.type == 'FeatureCollection' -> treat as Geojson file
			otherwise -> display error message
		*/

		switch (geo.type) {
			case 'Topology': {

				const {
					type,
					objects,
					arcs,
					transform
				} = (geo)

				const isValid = objects &&
					typeof objects === 'object' &&
					Object.keys(objects).length &&
					arcs

				if (isValid) {
					const objectNames = Object.keys(objects)


					/* Keep only the required props */
					const topo = transform ? {
						type, arcs, objects, transform
					} : {
							type, arcs, objects
						}

					try {
						const geojson = topoToGeo(topo)
						this.props.onUpload(geojson)
					}
					catch (e) {
						this.props.onUploadError('topojson')
					}
				}
				else {
					this.props.onUploadError('topojson')
				}

				break
			}
			case 'FeatureCollection': {

				try {
					/* L.geoJSON validates a geojson */
					L.geoJSON(geo as any)
					this.props.onUpload(geo as Geojson)
				}
				catch {
					this.props.onUploadError('geojson')
				}

				break
			}
			default:
				this.props.onUploadError('parse')
		}
	}

	render() {
		const { toporefs = [] } = this.props

		return (
			<Card title='Choose a Geography'>
				<Upload accept='application/json'
					onChange={this.handleChange}
					showUploadList={false}
					customRequest={dummyRequest}>
					<Button>
						<Icon type="upload" />
						<span>Upload a Saved Choropleth, GeoJSON, or TopoJSON file</span>
					</Button>
				</Upload>
				<TopoMenu toporefs={toporefs}
					onSelect={this.props.onTopoSelect} />
			</Card>
		)
	}
}
