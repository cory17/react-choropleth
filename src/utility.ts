import { feature } from 'topojson'
import { Dict, Store, Region, RegionProps, Feature, Geojson, Topojson, TopoDescriptor, Choropleth} from './models'


const defaultIntensity = 0
const maxIntensity = 7



export const createChoropleth = ({features, ...geo}: Geojson): Choropleth => {

    const newFeatures = features.map( 
        ({properties, ...feature}, index) => {

            const props = properties as Dict<any>
            const {intensity} = props

            const isIntensityValid = typeof intensity === 'number' && intensity < maxIntensity

            return {
                ...feature,
                properties: {
                    index,
                    ...props,
                    intensity: isIntensityValid ? intensity : defaultIntensity
             }
        }
        }
    )

    const intensities = newFeatures.reduce((result, {properties}) => ({
        ...result,
        [properties.index]: properties.intensity
    }), {})

    return {
        geo: {
            ...geo,
            features: newFeatures
        },
        intensities
    }
}


export function topoToGeo(topo: Topojson): Geojson {

    const key = Object.keys(topo.objects)[0]
    return feature(topo as any, topo.objects[key]) as Geojson
}

export function saveChoropleth(geo: Geojson<RegionProps>, intensities: Dict<number>, fileName: string) {

    saveJSON({
        ...geo,
        features: geo.features.map( ({properties, ...feature}) => ({
            ...feature,
            properties: {
                ...properties,
                intensity: intensities[properties.index]
            }
        }))
    }, fileName)
}

function saveJSON(data: object, fileName: string) {

    const text = JSON.stringify(data)
    const blob = new Blob([text], {type: 'text/json'})
    const event = new MouseEvent('click', {})

    const a = document.createElement('a')

    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
    a.dispatchEvent(event)
}


