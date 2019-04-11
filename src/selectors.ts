import { createSelector, createStructuredSelector, ParametricSelector } from 'reselect'
import { feature } from 'topojson'
import { Choropleth, Dict, Store, Region, RegionProps, Geojson} from './models'

type Props = {
    geoID: number
}

function getGeojson(store: Store, props: Props): Geojson<RegionProps> | undefined {
    return store.geojsons[props.geoID]
}

function getIntensities(store: Store, props: Props): Dict<number> | undefined {
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

const getRegions = createSelector(
    getGeojson,
    getIntensities,
    (geo, intensityMap) => geo ? geo.features.map(
        ({ properties }) => getRegion(properties, intensityMap![properties.index])
    ) : undefined
)


export const getChoropleth: ParametricSelector<Store, Props, Choropleth> = createStructuredSelector({
    loading: ({ geojsons }: Store, { geoID }: Props) => !geojsons[geoID],
    geojson: getGeojson,
    intensities: getIntensities,
    regions: getRegions
})