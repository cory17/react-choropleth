import { Geometry } from 'geojson'

export interface RegionProps extends Dict<any> {
    index: number,
    intensity: number
}

export type Region = {
    index: number,
    intensity: number,
    props: Array<{ key: string, value: any }>
}

export type Dict<T> = {
    [key: string]: T
}

export type Feature<T> = {
    type: 'Feature',
    properties: T
}

export type Geojson<T = {}> = GeoJSON.FeatureCollection<Geometry, T>

export type GeometryCollection = {
    type: 'GeometryCollection',
    geometries: any[]
}

export type Topojson = {
    type: 'GeometryCollection',
    objects: { [key: string]: GeometryCollection }
}

export type TopoDescriptor = {
    objectKey: string,
    json: Topojson
}

export type GeojsonStore = Dict<Geojson<RegionProps>>

export type TopoRef = {
    name: string,
    key: string
}

export type IntensityMap = Dict<number>
export type IntensityMapStore = Dict<IntensityMap>


export type Choropleth = {
    loading: boolean,
    intensities?: Dict<number>,
    geojson?: Geojson<RegionProps>,
    regions?: Region[]
}

export type Store = {
    geojsons: GeojsonStore,
    toporefs: TopoRef[],
    intensityMaps: IntensityMapStore
}