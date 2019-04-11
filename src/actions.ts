import { topoToGeo, createChoropleth } from './utility'
import { TopoRef, Geojson } from './models'


export const browseMaps = () => ({
    type: 'browse maps',
    data: {}
})

export const insertChoropleth = (id: number, geo: Geojson) => ({
    type: 'insert choropleth',
    data: {
        id,
        ...createChoropleth(geo)
    }
})



export const requestTopojson = (name: string, key: string, id: number) => ({
    type: 'request topojson',
    data: {
        id,
        name,
        key
    }
})

export const insertToporefs = (toporefs: TopoRef[]) => ({
    type: 'insert toporefs',
    data: { toporefs }
})



export const updateIntensity = (
    geoID: number,
    featureID: number,
    newValue: number
) => ({
    type: 'update intensity',
    data: {
        geoID,
        featureID,
        newValue
    }
})

export const httpError = (type: string, info: object = {}) => ({
    type: 'http error',
    data: {
        type,
        ...info
    }
})


