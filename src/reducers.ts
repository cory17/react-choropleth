import { Dict, TopoRef, GeojsonStore, Geojson, RegionProps, IntensityMap } from './models'
import { ReactReduxContext } from 'react-redux';
import { Reducer } from 'redux'


export const geojsons: Reducer<GeojsonStore> = (state = {}, action) => {

    switch (action.type) {
        case 'insert choropleth': {

            const { geo, id } = action.data

            return {
                ...state,
                [id]: geo
            }
        }
        default: return state
    }
}

export const toporefs: Reducer<TopoRef[]> = (state = [], action) => {

    switch (action.type) {
        case 'insert toporefs':
            return action.data.toporefs
        default: return state
    }
}

export const intensityMaps: Reducer<Dict<IntensityMap>> = (state = {}, action) => {

    switch (action.type) {
        case 'insert choropleth': {
            const { id, intensities } = action.data
            return {
                ...state,
                [id]: intensities
            }
        }
        case 'update intensity': {
            const { geoID, featureID, newValue } = action.data
            return {
                ...state,
                [geoID]: {
                    ...state[geoID],
                    [featureID]: newValue
                }
            }
        }
        default: return state
    }
}