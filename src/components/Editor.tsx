import React from 'react'
import { Tabs, Table, Tag, Slider } from 'antd'
import { feature } from 'topojson'
import { Region } from '../models'
import { SliderValue } from 'antd/lib/slider';
const {TabPane} = Tabs
const {Column} = Table

type Props = {
	loading: boolean,
	regions?: Region[],
	onRowClick: (r: Region) => void,
	onIntensityChange: (id: number, value: number) => void
}

type PropItem = {
	key: string,
	value: any
}

const PropertyList = ({ items = [] }: { items: PropItem[] }) => (
	<ul>
		{items.map(({ key, value }) => <li key={key}>{`${key}: ${value}`}</li>)}
	</ul>
)

const renderPropertyList = (_: any, feature: Region) => (
	<PropertyList items={feature.props} />
)

const colors = ['#FFEDA0',
	'#FED976',
	'#FEB24C',
	'#FD8D3C',
	'#FC4E2A',
	'#E31A1C',
	'#BD0026',
	'#800026'
]

const renderColor = (intensity: number) => (
	<div>
		<Slider min={0} max={7} />
		<Tag color={colors[intensity]}>{intensity}</Tag>
	</div>
)

type IntensityCellProps = {
	index: number,
	intensity: number,
	onChange: (id: number, value: number) => void
}

class IntensityCell extends React.Component<IntensityCellProps> {

	state = {
		value: this.props.intensity
	}

	handleChange = (v: SliderValue) => {
		this.setState({ value: v as number })
	}

	handleAfterChange = (v: SliderValue) => {
		this.props.onChange(this.props.index, v as number)
	}

	render() {

		const { value } = this.state
		const { index, onChange } = this.props

		return (
			<div>
				<Slider value={value}
					min={0}
					max={7}
					onChange={this.handleChange}
					onAfterChange={this.handleAfterChange} />
				<Tag color={colors[value]}>{value}</Tag>
			</div>
		)
	}
}

const Editor = ({ loading, regions, onRowClick, onIntensityChange }: Props) => (
	<Table dataSource={regions}
		loading={loading}
		rowKey="index"
		onRow={(record) => ({ onClick: () => onRowClick(record) })}>
		<Column title="Index"
			dataIndex='index' />
		<Column title="Intensity"
			dataIndex='intensity'
			key="intensity"
			render={(intensity, { index }, id) => (
				<IntensityCell index={index}
					intensity={intensity}
					onChange={onIntensityChange} />
			)} />
		<Column title="Properties"
			key="properties"
			render={renderPropertyList} />
	</Table>
)

export default Editor
