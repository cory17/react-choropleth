import React, { useEffect, useState } from 'react'
import {compose} from 'redux'
import { connect } from 'react-redux'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import {Layout, Button, message} from 'antd'
import MapBrowser from './MapBrowser'
import {History} from 'history'
import MapPage from './MapPage'
import {Store, Geojson, TopoRef} from '../models'
import { browseMaps, requestTopojson, insertChoropleth} from '../actions'
const {Header, Content} = Layout


type AppStatus = 'browsing' | 'mapping'

type Props = {
    history: History,
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
    onAuthentication: () => void,
    onTopoSelect: (name: string) => void,
    onUpload: (geo: Geojson) => void,
    onUploadError: () => void,
    onNewMapClick: () => void
}

const App = ({isBrowsing, geoID, toporefs, ...actions}: AppProps) => (
    <Layout className='app'>
        <Header>
     
            <Button ghost={true} onClick={actions.onNewMapClick} >New Map</Button>
       
        </Header>
        <Content>
            <Switch>
                <Route path='/create'
                    render={() => isBrowsing ? <MapBrowser toporefs={toporefs}
                        onTopoSelect={actions.onTopoSelect}
                        onUpload={actions.onUpload}
                        onUploadError={actions.onUploadError} /> :
                        <MapPage geoID={geoID!} />
                    } />
                <Redirect to="/create"/>
            </Switch>
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
            geoID: Date.now()
        }, () => {
            this.props.requestTopojson(name, key, this.state.geoID!)
        })
    }

    handleUpload = (geo: Geojson) => {
        this.setState({
            appStatus: 'mapping',
            geoID: Date.now(),
        }, () => { 
            const id = this.state.geoID!
            this.props.onUpload(id, geo) 
        })
    }

    handleFileError = () => {
        message.error('ERROR: Could not load file')
    }

    handleAuthentication = () => {
        this.props.history.push('/mymaps')
    }

    handleNewMapClick = () => {
        this.setState({
            appStatus: 'browsing'
        })
    }

    componentDidMount() { this.props.browseMaps() }


    render() {

        const {geoID} = this.state

        const {
            toporefs,
            requestTopojson
        } = this.props

        const { appStatus } = this.state
        const isBrowsing = appStatus == 'browsing'

        return <App isBrowsing={isBrowsing} 
                    geoID={geoID}
                    toporefs={toporefs} 
                    onAuthentication={this.handleAuthentication}
                    onUploadError={this.handleFileError}
                    onUpload={this.handleUpload}
                    onTopoSelect={this.handleTopoSelect} 
                    onNewMapClick={this.handleNewMapClick}/>
        
    }
}

export default compose<React.ComponentType>(
    withRouter,
    connect(
        ({toporefs}: Store) => ({
        toporefs
        }),
        {
            browseMaps, 
            requestTopojson,
            onUpload: insertChoropleth
        }
    )
)(AppContainer)
    
