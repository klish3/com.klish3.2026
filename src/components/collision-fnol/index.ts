/**
 * CollisionFnol — motor first notification of loss, sketch-first.
 *
 *   import { CollisionFnol } from './collision-fnol';
 *
 *   <CollisionFnol
 *     onSubmit={async (payload) => {
 *       const res = await api.post('/claims/motor/fnol', payload);
 *       return { reference: res.data.reference };
 *     }}
 *   />
 *
 * Or let the component POST for you: <CollisionFnol endpoint="/api/fnol" headers={{ Authorization }} />
 * The back-end contract is `CollisionFnolPayload` in ./types.
 */
export { CollisionFnol, type CollisionFnolProps } from './CollisionFnol';
export { createNominatimGeocoder, osmTileUrl, OSM_ATTRIBUTION, type Geocoder, type GeoResult } from './geo';
export { buildPayload, validate, COMPONENT_VERSION } from './payload';
export type * from './types';
