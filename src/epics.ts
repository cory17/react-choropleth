import {switchMap, map, catchError, pluck} from 'rxjs/operators'
import {of, pipe} from 'rxjs'
import {Epic, ofType} from 'redux-observable'
import * as actions from './actions'
import { insertChoropleth, insertToporefs, httpError } from './actions' 
import {Topojson, TopoRef} from './models'
import {topoToGeo} from './utility'

export const topojson: Epic = (action$, _, { getFile }) => action$
	.pipe(
		ofType('request topojson'),
		pluck('data'),
		switchMap(({ id, key, name }) => getFile(`topojson/${name}.json`)
			.pipe(
				map((topo: Topojson) => insertChoropleth(id, topoToGeo(topo))),
				catchError( () => of(httpError('topojson', {id})))
			)
		)
	)

export const toporefs: Epic = (action$, _, { getFile }) => action$
	.pipe(
		ofType('browse maps'),
		switchMap(() => getFile('toporefs.json')
			.pipe(
				map(({ toporefs }: { toporefs: TopoRef[] }) => insertToporefs(toporefs)),
				catchError( () => of(httpError('toporefs') ))
			)
		)
	)

