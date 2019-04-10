import {switchMap, map, catchError, pluck} from 'rxjs/operators'
import {of, pipe, Observable} from 'rxjs'
import {Epic, ofType} from 'redux-observable'
import * as actions from './actions'
import { insertChoropleth, insertToporefs } from './actions' 
import {Topojson, TopoRef} from './models'
import {topoToGeo} from './utility'

export const topojson: Epic = (action$, _, { getFile }) => action$
	.pipe(
		ofType('request topojson'),
		pluck('data'),
		switchMap(({ id, key, name }) => getFile('/topojson/' + name)
			.pipe(
				map((topo: Topojson) => insertChoropleth(id, topoToGeo(topo)))
			)
		)
	)

export const toporefs: Epic = (action$, _, { getFile }) => action$
	.pipe(
		ofType('browse maps'),
		switchMap(() => getFile('/toporefs')
			.pipe(
				map(({ toporefs }: { toporefs: TopoRef[] }) => insertToporefs(toporefs)
			))
		)
	)

