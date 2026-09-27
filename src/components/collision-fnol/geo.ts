import type { LatLng, TileUrlFn } from './types';

/* ------------------------------------------------------------------ */
/* Geocoding                                                           */
/* ------------------------------------------------------------------ */

export interface GeoResult {
  id: string;
  label: string;
  lat: number;
  lng: number;
  road?: string;
  postcode?: string;
  town?: string;
  provider: string;
}

/**
 * Swap this out for your own address service (Loqate, Google, an internal
 * gazetteer…). Only `search` is required; `reverse` enables "Use my location".
 */
export interface Geocoder {
  readonly name: string;
  search(query: string, signal?: AbortSignal): Promise<GeoResult[]>;
  reverse?(point: LatLng, signal?: AbortSignal): Promise<GeoResult | null>;
}

interface NominatimPlace {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address?: Record<string, string | undefined>;
}

export interface NominatimOptions {
  baseUrl?: string;
  /** ISO 3166-1 alpha-2 codes, comma separated. Defaults to "gb". */
  countryCodes?: string;
  /** Contact email, recommended by the Nominatim usage policy. */
  email?: string;
  limit?: number;
  language?: string;
}

/**
 * OpenStreetMap Nominatim. Fine for prototypes; the public instance allows
 * ~1 request/second and forbids heavy use, so point `baseUrl` at a hosted or
 * self-hosted instance (or use a different Geocoder) in production.
 */
export function createNominatimGeocoder(options: NominatimOptions = {}): Geocoder {
  const base = (options.baseUrl ?? 'https://nominatim.openstreetmap.org').replace(/\/$/, '');

  const toResult = (p: NominatimPlace): GeoResult => {
    const a = p.address ?? {};
    const road = a.road ?? a.pedestrian ?? a.footway ?? a.highway;
    const town = a.city ?? a.town ?? a.village ?? a.hamlet ?? a.suburb;
    const first = [a.house_number, road].filter(Boolean).join(' ');
    const label = [first, a.suburb !== town ? a.suburb : undefined, town, a.postcode]
      .filter((s): s is string => Boolean(s && s.trim()))
      .join(', ');
    return {
      id: String(p.place_id),
      label: label || p.display_name,
      lat: Number(p.lat),
      lng: Number(p.lon),
      road,
      postcode: a.postcode,
      town,
      provider: 'nominatim',
    };
  };

  const common = (): URLSearchParams => {
    const params = new URLSearchParams({ format: 'jsonv2', addressdetails: '1' });
    if (options.email) params.set('email', options.email);
    params.set('accept-language', options.language ?? 'en-GB');
    return params;
  };

  return {
    name: 'nominatim',
    async search(query, signal) {
      const params = common();
      params.set('q', query);
      params.set('limit', String(options.limit ?? 5));
      params.set('countrycodes', options.countryCodes ?? 'gb');
      const res = await fetch(`${base}/search?${params}`, { signal, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`Address lookup failed (${res.status})`);
      const data = (await res.json()) as NominatimPlace[];
      return data.map(toResult);
    },
    async reverse(point, signal) {
      const params = common();
      params.set('lat', String(point.lat));
      params.set('lon', String(point.lng));
      params.set('zoom', '18');
      const res = await fetch(`${base}/reverse?${params}`, { signal, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`Address lookup failed (${res.status})`);
      const data = (await res.json()) as NominatimPlace | { error: string };
      return 'error' in data ? null : toResult(data);
    },
  };
}

/* ------------------------------------------------------------------ */
/* Map tiles                                                           */
/* ------------------------------------------------------------------ */

/** OSM standard tiles. Replace for production: the public servers are not for heavy use. */
export const osmTileUrl: TileUrlFn = (z, x, y) => `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
export const OSM_ATTRIBUTION = '© OpenStreetMap contributors';

const EARTH_RADIUS = 6378137;
const TILE_SIZE = 256;
const DEG = Math.PI / 180;

/** Web-Mercator world pixel coordinates at zoom z. */
export function worldPixel(p: LatLng, z: number): { x: number; y: number } {
  const size = TILE_SIZE * 2 ** z;
  const sin = Math.min(Math.max(Math.sin(p.lat * DEG), -0.9999), 0.9999);
  return {
    x: ((p.lng + 180) / 360) * size,
    y: (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * size,
  };
}

/** Ground metres covered by one tile pixel at the given latitude and zoom. */
export function metresPerPixel(lat: number, z: number): number {
  return (2 * Math.PI * EARTH_RADIUS * Math.cos(lat * DEG)) / (TILE_SIZE * 2 ** z);
}

/** Continuous zoom level at which one metre is `pxPerMetre` screen pixels. */
export function zoomForScale(lat: number, pxPerMetre: number): number {
  return Math.log2((2 * Math.PI * EARTH_RADIUS * Math.cos(lat * DEG) * pxPerMetre) / TILE_SIZE);
}

/**
 * Converts a local offset (metres; x = east, y = SOUTH, i.e. SVG space)
 * to latitude/longitude. Accurate to centimetres over the few hundred
 * metres a collision sketch covers.
 */
export function offsetToLatLng(origin: LatLng, x: number, y: number): LatLng {
  return {
    lat: origin.lat - y / EARTH_RADIUS / DEG,
    lng: origin.lng + x / (EARTH_RADIUS * Math.cos(origin.lat * DEG)) / DEG,
  };
}

export interface TilePlacement {
  key: string;
  url: string;
  /** Top-left corner and size in local metres (SVG space). */
  x: number;
  y: number;
  size: number;
}

/**
 * Tiles needed to cover the viewport. Tiles are fetched at the next zoom
 * up from the display scale (capped at maxZoom and over-zoomed beyond it).
 */
export function visibleTiles(args: {
  origin: LatLng;
  center: { x: number; y: number };
  scale: number;
  width: number;
  height: number;
  tileUrl: TileUrlFn;
  maxZoom?: number;
}): TilePlacement[] {
  const { origin, center, scale, width, height, tileUrl } = args;
  const maxZoom = args.maxZoom ?? 19;
  const z = Math.max(0, Math.min(maxZoom, Math.ceil(zoomForScale(origin.lat, scale) - 0.25)));
  const mpp = metresPerPixel(origin.lat, z);
  const o = worldPixel(origin, z);
  const halfW = width / 2 / scale + 5;
  const halfH = height / 2 / scale + 5;
  const n = 2 ** z;

  const x0 = Math.floor((o.x + (center.x - halfW) / mpp) / TILE_SIZE);
  const x1 = Math.floor((o.x + (center.x + halfW) / mpp) / TILE_SIZE);
  const y0 = Math.max(0, Math.floor((o.y + (center.y - halfH) / mpp) / TILE_SIZE));
  const y1 = Math.min(n - 1, Math.floor((o.y + (center.y + halfH) / mpp) / TILE_SIZE));

  const tiles: TilePlacement[] = [];
  if ((x1 - x0 + 1) * (y1 - y0 + 1) > 400) return tiles; // safety valve
  const size = TILE_SIZE * mpp;
  for (let ty = y0; ty <= y1; ty++) {
    for (let tx = x0; tx <= x1; tx++) {
      const wrapped = ((tx % n) + n) % n;
      tiles.push({
        key: `${z}/${tx}/${ty}`,
        url: tileUrl(z, wrapped, ty),
        x: (tx * TILE_SIZE - o.x) * mpp,
        y: (ty * TILE_SIZE - o.y) * mpp,
        size,
      });
    }
  }
  return tiles;
}
