/**
 * The gem's material. No environment map, no transmission pass: a procedural
 * "studio" of soft boxes is sampled once for the surface and three times
 * (red, green, blue, slightly apart) for the light bouncing inside the stone.
 * That is the whole trick, and it is a few dozen instructions per pixel.
 */

export const GEM_VERT = /* glsl */ `
attribute vec3 aCut;
attribute vec3 aRough;
attribute vec3 aBary;
attribute float aFace;
uniform mat4 uProj;
uniform mat4 uModelView;
uniform float uMorph;
varying vec3 vView;
varying vec3 vBary;
varying float vFace;
void main() {
  vec3 p = mix(aRough, aCut, uMorph);
  vec4 mv = uModelView * vec4(p, 1.0);
  vView = mv.xyz;
  vBary = aBary;
  vFace = aFace;
  gl_Position = uProj * mv;
}`;

export const GEM_FRAG = /* glsl */ `
#extension GL_OES_standard_derivatives : enable
precision highp float;
uniform float uMorph;
uniform float uPolish;
uniform float uAlpha;
uniform float uEdge;
uniform float uBack;
uniform float uTone;
varying vec3 vView;
varying vec3 vBary;
varying float vFace;

// A photographer's studio, as a function of direction: an overhead soft box,
// two strip lights, a floor bounce and a thin horizon line.
float studio(vec3 d) {
  float top = smoothstep(0.5, 0.96, d.y);
  float stripA = smoothstep(0.1, 0.0, abs(d.x * 0.8 + d.y * 0.35 - 0.3));
  float stripB = smoothstep(0.07, 0.0, abs(d.x * 0.55 - d.z * 0.6 + 0.42));
  float floorBounce = smoothstep(-0.25, -0.95, d.y) * 0.3;
  float horizon = exp(-abs(d.y) * 7.0) * 0.22;
  return top * 1.15 + stripA * 1.5 + stripB * 0.95 + floorBounce + horizon + 0.035;
}

const vec3 UMBER = vec3(0.075, 0.052, 0.022);
const vec3 BRONZE = vec3(0.42, 0.3, 0.12);
const vec3 GOLD = vec3(0.86, 0.69, 0.36);
const vec3 CREAM = vec3(1.0, 0.95, 0.82);

vec3 gild(float i) {
  vec3 c = mix(UMBER, BRONZE, smoothstep(0.0, 0.28, i));
  c = mix(c, GOLD, smoothstep(0.2, 0.75, i));
  return mix(c, CREAM, smoothstep(0.7, 1.5, i));
}

void main() {
  vec3 N = normalize(cross(dFdx(vView), dFdy(vView)));
  vec3 V = normalize(-vView);
  if (dot(N, V) < 0.0) N = -N;
  float ndv = clamp(dot(N, V), 0.0, 1.0);
  float fresnel = 0.1 + 0.9 * pow(1.0 - ndv, 4.0);

  // surface reflection
  float mirror = studio(reflect(-V, N));

  // light inside the stone: refract in, bounce off a facet we cannot see
  float h = fract(sin(vFace * 91.7) * 43758.5453);
  vec3 hidden = normalize(N + (vec3(h, fract(h * 7.31), fract(h * 13.73)) - 0.5) * 1.7);
  vec3 inside = reflect(refract(-V, N, 0.56), hidden);
  vec3 fire = vec3(
    studio(inside + vec3(0.07, 0.0, 0.03)),
    studio(inside),
    studio(inside - vec3(0.07, 0.0, 0.03))
  );
  float glow = dot(fire, vec3(0.3333));

  vec3 body = gild(glow * 0.9);
  // dispersion: where the three samples disagree, the stone throws colour
  // (kept warm and quiet, so the fire stays inside the gold-and-cream palette)
  body += max(fire.r - glow, 0.0) * vec3(0.5, 0.22, 0.05) * uPolish;
  body += max(fire.b - glow, 0.0) * vec3(0.26, 0.22, 0.2) * uPolish;
  body += CREAM * pow(clamp(glow - 0.95, 0.0, 1.0), 2.0) * (0.25 + 0.6 * uPolish);
  vec3 cutCol = mix(body, gild(mirror * 0.95), fresnel);
  cutCol += CREAM * pow(clamp(mirror - 1.1, 0.0, 2.0), 2.0) * (0.15 + 0.5 * uPolish);
  cutCol = min(cutCol, vec3(1.0, 0.965, 0.86));

  // the rough stone: matte, lit from the upper left, only a hint of the gold inside
  vec3 L = normalize(vec3(-0.45, 0.8, 0.55));
  float lambert = max(dot(N, L), 0.0);
  float sheen = pow(max(dot(reflect(-L, N), V), 0.0), 14.0);
  vec3 roughCol = mix(UMBER * 1.6, vec3(0.5, 0.39, 0.2), lambert) + GOLD * sheen * 0.35 + fresnel * BRONZE * 0.25;

  float cutness = smoothstep(0.12, 0.92, uMorph);
  vec3 col = mix(roughCol, cutCol, cutness);
  col *= mix(1.0, 0.86, uTone);

  // facet lines: the cutter's marks, glowing while the stone is being worked
  float e = min(vBary.x, min(vBary.y, vBary.z));
  float line = 1.0 - smoothstep(0.0, fwidth(e) * 1.6, e);
  col += mix(CREAM, GOLD, 0.5) * line * uEdge;

  float alpha;
  if (uBack > 0.5) {
    col *= 0.5;
    alpha = uAlpha;
  } else {
    float solid = mix(1.0, mix(0.56, 0.98, clamp(fresnel * 1.6 + mirror * 0.25, 0.0, 1.0)), cutness);
    alpha = max(solid, line * uEdge) * uAlpha;
  }
  gl_FragColor = vec4(col * alpha, alpha);
}`;

export const DUST_VERT = /* glsl */ `
attribute vec4 aDust;
uniform float uScroll;
uniform float uTime;
uniform float uDpr;
varying float vAlpha;
void main() {
  float depth = mix(0.3, 1.0, aDust.z);
  float y = mod(aDust.y + uScroll * depth * 0.5 + uTime * 0.006 * depth + 1.0, 2.0) - 1.0;
  float x = aDust.x + sin(uTime * 0.12 + aDust.w * 6.2831) * 0.012;
  gl_Position = vec4(x, y, 0.0, 1.0);
  gl_PointSize = (1.2 + depth * depth * 4.6) * uDpr;
  float twinkle = 0.6 + 0.4 * sin(uTime * (0.4 + aDust.w) + aDust.w * 40.0);
  vAlpha = (0.1 + 0.5 * depth * depth) * twinkle;
}`;

export const DUST_FRAG = /* glsl */ `
precision mediump float;
uniform vec3 uColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.05, d) * vAlpha;
  gl_FragColor = vec4(uColor * a, a);
}`;
