import { createSelector } from 'reselect'
import { feature } from 'topojson'
import { Dict, Store, Region, RegionProps, Feature, Geojson, Topojson } from './models'

type Props = {
    geoID: number
}

type RegionSelector = {
    (s: Store, p: Props): Region[] | undefined
}


export function getGeojson(store: Store, props: Props): Geojson<RegionProps> | undefined {
    return store.geojsons[props.geoID]
}

export function getIntensities(store: Store, props: Props): Dict<number> | undefined {
    return store.intensityMaps[props.geoID]
}


function getRegion(props: RegionProps, intensity: number) {

    const { 
        index, 
        intensity: initialIntensity, 
        ...rest 
    } = props

    return {
        index,
        intensity,
        props: Object.keys(rest).map(
            key => ({ key, value: props[key] })
        )
    }
}

export const getRegions: RegionSelector = createSelector(
    getGeojson,
    getIntensities,
    (geo, intensityMap) => geo ? geo.features.map(
        ({ properties }) => getRegion(properties, intensityMap![properties.index])
    ) : undefined
)
