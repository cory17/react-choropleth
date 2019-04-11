import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Layout, Button, Input } from 'antd'
import Editor from './Editor'
import Map from './Map'
import { MapGeojson, FeatureZoom } from './mapComponents'
import { Store, Choropleth } from '../models'
import { getChoropleth } from '../selectors'
import LeafletMap from '../map'
import { updateIntensity } from '../actions'
import { saveChoropleth } from '../utility'

const { Header, Content, Sider } = Layout

type Props = {
	geoID: number,
} & Choropleth & DispatchProps

type DispatchProps = {
	onIntensityChange: (mapID: number, featureID: number, newValue: number) => void
}

type State = {
	needsZoom: boolean,
	zoomIndex: number,
	map?: LeafletMap
}


class MapPageContainer extends React.Component<Props, State> {

	state: State = {
		needsZoom: false,
		zoomIndex: 0
	}


	handleRowClick = ({ index }: { index: number }) => this.setState({
		...this.state,
		needsZoom: true,
		zoomIndex: index,
	})

	handleIntensityChange = (id: number, newValue: number) => {

		const { geoID } = this.props
		const featureID = id

		this.props.onIntensityChange(geoID, featureID, newValue)
		this.state.map!.updateFeature(id, newValue)
	}

	handleZoomEnd = () => this.setState({ needsZoom: false })

	handleMapLoad = (map: LeafletMap) => {
		this.setState({
			...this.state,
			map
		})
	}

	handleSave = () => {

		const { geojson, intensities } = this.props

		saveChoropleth(geojson!, intensities!, 'choropleth.json')
	}

	render() {

		const { geojson, regions, loading } = this.props
		const { needsZoom, zoomIndex } = this.state

		return (
			<Layout className='app-content'>
				<Sider className='app-sider'
					theme='light'
					width={400}>
					<Editor loading={loading}
						regions={regions}
						onRowClick={this.handleRowClick}
						onIntensityChange={this.handleIntensityChange} />
				</Sider>
				<Content>
					<Layout className='app-content'>
						<Header style={{ background: '#f2f2f2' }}>
							<Button icon='save'
								disabled={loading}
								onClick={this.handleSave}>Save</Button>
						</Header>
						<Content>
							<Map onLoad={this.handleMapLoad}>
								{geojson &&
									<MapGeojson geojson={geojson}>
										{needsZoom &&
											<FeatureZoom index={zoomIndex}
												onZoomEnd={this.handleZoomEnd} />
										}
									</MapGeojson>
								}
							</Map>
						</Content>
					</Layout>
				</Content>
			</Layout>
		)
	}
}

export default connect<Choropleth, DispatchProps, { geoID: number }, Store>(
	getChoropleth,
	{ onIntensityChange: updateIntensity }
)(MapPageContainer)