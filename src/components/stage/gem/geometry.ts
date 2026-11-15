/**
 * The gem, as two shapes that share one topology: a round brilliant cut and
 * the rough stone it was cut from. The vertex shader blends between them, so
 * "cutting" the stone costs nothing per frame.
 *
 * 112 triangles. Flat facets come from screen-space derivatives in the
 * fragment shader, so no normals are stored and the blend needs none.
 */

export interface GemGeometry {
  cut: Float32Array;
  rough: Float32Array;
  bary: Float32Array;
  face: Float32Array;
  count: number;
}

type V3 = [number, number, number];

/** Small deterministic PRNG, so the rough stone is the same stone every visit. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ring = (n: number, radius: number, y: number, offset = 0): V3[] =>
  Array.from({ length: n }, (_, i) => {
    const a = ((i + offset) / n) * Math.PI * 2;
    return [Math.cos(a) * radius, y, Math.sin(a) * radius];
  });

export function buildGem(): GemGeometry {
  // Proportions of a round brilliant, girdle radius = 1.
  const verts: V3[] = [];
  const add = (list: V3[]) => {
    const start = verts.length;
    verts.push(...list);
    return list.map((_, i) => start + i);
  };

  const TC = add([[0, 0.37, 0]])[0];
  const T = add(ring(8, 0.56, 0.37)); // table
  const M = add(ring(8, 0.81, 0.2, 0.5)); // crown mid
  const G = add(ring(16, 1, 0.035)); // girdle, upper edge
  const H = add(ring(16, 1, -0.035)); // girdle, lower edge
  const P = add(ring(8, 0.5, -0.47, 0.5)); // pavilion mid
  const C = add([[0, -0.9, 0]])[0]; // culet

  const tris: [number, number, number][] = [];
  const w8 = (i: number) => (i + 8) % 8;
  const w16 = (i: number) => (i + 16) % 16;

  for (let i = 0; i < 8; i++) {
    const j = i * 2;
    // table
    tris.push([TC, T[i], T[w8(i + 1)]]);
    // star facets
    tris.push([T[i], M[i], T[w8(i + 1)]]);
    // bezel (kite) facets
    tris.push([T[i], M[w8(i - 1)], G[j]]);
    tris.push([T[i], G[j], M[i]]);
    // upper girdle facets
    tris.push([M[i], G[j], G[w16(j + 1)]]);
    tris.push([M[i], G[w16(j + 1)], G[w16(j + 2)]]);
    // lower girdle facets
    tris.push([H[j], H[w16(j + 1)], P[i]]);
    tris.push([H[w16(j + 1)], H[w16(j + 2)], P[i]]);
    // pavilion mains
    tris.push([H[j], P[w8(i - 1)], C]);
    tris.push([H[j], C, P[i]]);
  }
  for (let j = 0; j < 16; j++) {
    const k = w16(j + 1);
    tris.push([G[j], H[j], H[k]]);
    tris.push([G[j], H[k], G[k]]);
  }

  // The rough stone: every vertex pushed out to a lumpy, lopsided pebble.
  const rand = mulberry32(7);
  const lump = verts.map(() => 0.74 + rand() * 0.34);
  // the two girdle edges travel together, or the band tears into slivers
  for (let j = 0; j < 16; j++) lump[H[j]] = lump[G[j]] - 0.03;
  const rough: V3[] = verts.map(([x, y, z], i) => {
    const sy = y * 1.25 + (i === TC ? 0.25 : 0);
    const len = Math.hypot(x, sy, z) || 1;
    const r = lump[i];
    return [
      (x / len) * r * 1.02 + (rand() - 0.5) * 0.07,
      (sy / len) * r * 0.8 + (rand() - 0.5) * 0.07,
      (z / len) * r * 0.9 + (rand() - 0.5) * 0.07,
    ];
  });

  const count = tris.length * 3;
  const cutOut = new Float32Array(count * 3);
  const roughOut = new Float32Array(count * 3);
  const bary = new Float32Array(count * 3);
  const face = new Float32Array(count);
  const faceRand = mulberry32(21);

  tris.forEach((tri, t) => {
    let [a, b, c] = tri;
    // wind every facet counter-clockwise seen from outside (the cut is convex)
    const [ax, ay, az] = verts[a];
    const [bx, by, bz] = verts[b];
    const [cx, cy, cz] = verts[c];
    const nx = (by - ay) * (cz - az) - (bz - az) * (cy - ay);
    const ny = (bz - az) * (cx - ax) - (bx - ax) * (cz - az);
    const nz = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
    const mx = ax + bx + cx;
    const my = ay + by + cy + 0.3;
    const mz = az + bz + cz;
    if (nx * mx + ny * my + nz * mz < 0) [b, c] = [c, b];

    const f = faceRand();
    [a, b, c].forEach((v, k) => {
      const o = (t * 3 + k) * 3;
      cutOut.set(verts[v], o);
      roughOut.set(rough[v], o);
      bary[o + k] = 1;
      face[t * 3 + k] = f;
    });
  });

  return { cut: cutOut, rough: roughOut, bary, face, count };
}
