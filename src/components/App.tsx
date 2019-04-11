import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Layout, Button, message } from 'antd'
import MapBrowser from './MapBrowser'
import { History } from 'history'
import MapPage from './MapPage'
import { Store, Geojson, TopoRef } from '../models'
import { browseMaps, requestTopojson, insertChoropleth } from '../actions'
import { generateID } from '../utility'
const { Header, Content } = Layout


type AppStatus = 'browsing' | 'mapping'

type Props = {
    toporefs: TopoRef[],
    browseMaps: () => void,
    requestTopojson: (name: string, key: string, id: number) => void,
    onUpload: (id: number, geo: Geojson) => void
}

type State = {
    appStatus: AppStatus,
    geoID?: number
}

type AppProps = {
    isBrowsing: boolean,
    geoID?: number,
    toporefs: TopoRef[],
    onTopoSelect: (name: string) => void,
    onUpload: (geo: Geojson) => void,
    onUploadError: () => void,
    onNewMapClick: () => void
}


const App = ({ isBrowsing, geoID, toporefs, ...actions }: AppProps) => (
    <Layout className='app'>
        <Header>

            <Button ghost={true}
                onClick={actions.onNewMapClick} >New Map</Button>

        </Header>
        <Content>
            {isBrowsing ? <MapBrowser toporefs={toporefs}
                onTopoSelect={actions.onTopoSelect}
                onUpload={actions.onUpload}
                onUploadError={actions.onUploadError} /> :
                <MapPage geoID={geoID!} />}
        </Content>
    </Layout>
)


class AppContainer extends React.Component<Props, State> {

    state: State = {
        appStatus: 'browsing'
    }


    handleTopoSelect = (name: string) => {
        const { toporefs } = this.props
        const { key } = toporefs.find(({ name: n }) => n == name)!
        this.setState({
            appStatus: 'mapping',
            geoID: generateID()
        }, () => {
            this.props.requestTopojson(name, key, this.state.geoID!)
        })
    }

    handleUpload = (geo: Geojson) => {
        this.setState({
            appStatus: 'mapping',
            geoID: generateID()
        }, () => {
            const id = this.state.geoID!
            this.props.onUpload(id, geo)
        })
    }

    handleFileError = () => {
        message.error('ERROR: Could not load file')
    }


    handleNewMapClick = () => {
        this.setState({
            appStatus: 'browsing'
        })
    }

    componentDidMount() { this.props.browseMaps() }


    render() {

        const { geoID } = this.state

        const {
            toporefs,
            requestTopojson
        } = this.props

        const { appStatus } = this.state
        const isBrowsing = appStatus == 'browsing'

        return <App isBrowsing={isBrowsing}
            geoID={geoID}
            toporefs={toporefs}
            onUploadError={this.handleFileError}
            onUpload={this.handleUpload}
            onTopoSelect={this.handleTopoSelect}
            onNewMapClick={this.handleNewMapClick} />

    }
}

export default connect(
    ({ toporefs }: Store) => ({
        toporefs
    }),
    {
        browseMaps,
        requestTopojson,
        onUpload: insertChoropleth
    }
)(AppContainer)

