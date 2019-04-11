import { feature } from 'topojson'
import { Dict, Store, Region, RegionProps, Feature, Geojson, Topojson, TopoDescriptor, Choropleth } from './models'

export const MAX_INTENSITY = 7
export const INTENSITY_COLORS = ['#FFEDA0',
    '#FED976',
    '#FEB24C',
    '#FD8D3C',
    '#FC4E2A',
    '#E31A1C',
    '#BD0026',
    '#800026'
]

export const createChoropleth = ({ features, ...geo }: Geojson) => {

    const newFeatures = features.map(
        ({ properties, ...feature }, index) => {

            const props = properties as Dict<any>
            const { intensity } = props

            const isIntensityValid = typeof intensity === 'number' && intensity <= MAX_INTENSITY

            return {
                ...feature,
                properties: {
                    index,
                    ...props,
                    intensity: isIntensityValid ? intensity : 0
                }
            }
        }
    )

    const intensities = newFeatures.reduce((result, { properties }) => ({
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
        features: geo.features.map(({ properties, ...feature }) => ({
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
    const blob = new Blob([text], { type: 'text/json' })
    const event = new MouseEvent('click', {})

    const a = document.createElement('a')

    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
    a.dispatchEvent(event)
}



let idSequence = 0

export function generateID() {
    ++idSequence
    return idSequence
}

