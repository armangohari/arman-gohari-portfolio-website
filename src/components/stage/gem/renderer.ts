import { buildGem } from "./geometry";
import { DUST_FRAG, DUST_VERT, GEM_FRAG, GEM_VERT } from "./shaders";

/** Everything the renderer needs to draw one frame. Positions are CSS pixels. */
export interface GemFrame {
  x: number;
  y: number;
  radius: number;
  morph: number;
  polish: number;
  alpha: number;
  edge: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  /** 0 on dark scenes, 1 on cream. */
  tone: number;
  /** Scroll position in viewports, for the dust parallax. */
  scroll: number;
  time: number;
}

export interface GemRenderer {
  resize(width: number, height: number): void;
  render(frame: GemFrame): void;
  dispose(): void;
}

const FOV = (30 * Math.PI) / 180;
/** Camera distance at which one world unit is half the viewport height. */
const DIST = 1 / Math.tan(FOV / 2);

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (process.env.NODE_ENV !== "production")
      console.warn("[gem] shader:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function link(gl: WebGLRenderingContext, vert: string, frag: string) {
  const vs = compile(gl, gl.VERTEX_SHADER, vert);
  const fs = compile(gl, gl.FRAGMENT_SHADER, frag);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  return program;
}

function buffer(gl: WebGLRenderingContext, data: Float32Array) {
  const b = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, b);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  return b;
}

/**
 * A WebGL1 renderer for exactly one object. No scene graph, no library:
 * two draw calls for the gem (back facets, then front), one for the dust.
 */
export function createGemRenderer(
  canvas: HTMLCanvasElement,
  options: { dpr: number; dust: number; antialias: boolean },
): GemRenderer | null {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: options.antialias,
    depth: false,
    stencil: false,
    premultipliedAlpha: true,
    powerPreference: "default",
  });
  if (!gl) return null;
  // flat facets are derived per pixel; without this there is no gem to draw
  if (!gl.getExtension("OES_standard_derivatives")) return null;

  const gem = link(gl, GEM_VERT, GEM_FRAG);
  if (!gem) return null;
  const geometry = buildGem();
  const attribs = [
    {
      loc: gl.getAttribLocation(gem, "aCut"),
      buf: buffer(gl, geometry.cut),
      size: 3,
    },
    {
      loc: gl.getAttribLocation(gem, "aRough"),
      buf: buffer(gl, geometry.rough),
      size: 3,
    },
    {
      loc: gl.getAttribLocation(gem, "aBary"),
      buf: buffer(gl, geometry.bary),
      size: 3,
    },
    {
      loc: gl.getAttribLocation(gem, "aFace"),
      buf: buffer(gl, geometry.face),
      size: 1,
    },
  ];
  const u = (name: string) => gl.getUniformLocation(gem, name);
  const uniforms = {
    proj: u("uProj"),
    modelView: u("uModelView"),
    morph: u("uMorph"),
    polish: u("uPolish"),
    alpha: u("uAlpha"),
    edge: u("uEdge"),
    back: u("uBack"),
    tone: u("uTone"),
  };

  // Dust: a handful of points, wrapped vertically so scroll never runs out.
  const dustCount = options.dust;
  const dust = dustCount > 0 ? link(gl, DUST_VERT, DUST_FRAG) : null;
  let dustBuf: WebGLBuffer | null = null;
  let dustLoc = -1;
  if (dust) {
    const data = new Float32Array(dustCount * 4);
    let seed = 99;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < dustCount; i++) {
      data[i * 4] = rand() * 2 - 1;
      data[i * 4 + 1] = rand() * 2 - 1;
      data[i * 4 + 2] = rand();
      data[i * 4 + 3] = rand();
    }
    dustBuf = buffer(gl, data);
    dustLoc = gl.getAttribLocation(dust, "aDust");
  }
  const dustUniforms = dust
    ? {
        scroll: gl.getUniformLocation(dust, "uScroll"),
        time: gl.getUniformLocation(dust, "uTime"),
        dpr: gl.getUniformLocation(dust, "uDpr"),
        color: gl.getUniformLocation(dust, "uColor"),
      }
    : null;

  gl.disable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.enable(gl.CULL_FACE);
  gl.clearColor(0, 0, 0, 0);

  const proj = new Float32Array(16);
  const modelView = new Float32Array(16);
  let width = 1;
  let height = 1;

  return {
    resize(w, h) {
      width = Math.max(1, w);
      height = Math.max(1, h);
      canvas.width = Math.round(width * options.dpr);
      canvas.height = Math.round(height * options.dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      const f = DIST;
      const near = 0.5;
      const far = 20;
      proj.fill(0);
      proj[0] = f / (width / height);
      proj[5] = f;
      proj[10] = (far + near) / (near - far);
      proj[11] = -1;
      proj[14] = (2 * far * near) / (near - far);
    },

    render(frame) {
      gl.clear(gl.COLOR_BUFFER_BIT);

      if (dust && dustUniforms) {
        gl.useProgram(dust);
        gl.bindBuffer(gl.ARRAY_BUFFER, dustBuf);
        gl.enableVertexAttribArray(dustLoc);
        gl.vertexAttribPointer(dustLoc, 4, gl.FLOAT, false, 0, 0);
        gl.uniform1f(dustUniforms.scroll, frame.scroll);
        gl.uniform1f(dustUniforms.time, frame.time);
        gl.uniform1f(dustUniforms.dpr, options.dpr);
        const t = frame.tone;
        gl.uniform3f(
          dustUniforms.color,
          0.93 + (0.5 - 0.93) * t,
          0.83 + (0.38 - 0.83) * t,
          0.61 + (0.15 - 0.61) * t,
        );
        gl.drawArrays(gl.POINTS, 0, dustCount);
        gl.disableVertexAttribArray(dustLoc);
      }

      if (frame.alpha < 0.005 || frame.radius < 1) return;

      // Pixel position → world, on the plane the camera is focused on.
      const unit = 2 / height;
      const tx = (frame.x - width / 2) * unit;
      const ty = (height / 2 - frame.y) * unit;
      const s = frame.radius * unit;
      const cx = Math.cos(frame.rotX);
      const sx = Math.sin(frame.rotX);
      const cy = Math.cos(frame.rotY);
      const sy = Math.sin(frame.rotY);
      const cz = Math.cos(frame.rotZ);
      const sz = Math.sin(frame.rotZ);
      // R = Rx · Ry · Rz, column-major, scaled
      modelView[0] = cy * cz * s;
      modelView[1] = (cx * sz + sx * sy * cz) * s;
      modelView[2] = (sx * sz - cx * sy * cz) * s;
      modelView[3] = 0;
      modelView[4] = -cy * sz * s;
      modelView[5] = (cx * cz - sx * sy * sz) * s;
      modelView[6] = (sx * cz + cx * sy * sz) * s;
      modelView[7] = 0;
      modelView[8] = sy * s;
      modelView[9] = -sx * cy * s;
      modelView[10] = cx * cy * s;
      modelView[11] = 0;
      modelView[12] = tx;
      modelView[13] = ty;
      modelView[14] = -DIST;
      modelView[15] = 1;

      gl.useProgram(gem);
      for (const a of attribs) {
        if (a.loc < 0) continue;
        gl.bindBuffer(gl.ARRAY_BUFFER, a.buf);
        gl.enableVertexAttribArray(a.loc);
        gl.vertexAttribPointer(a.loc, a.size, gl.FLOAT, false, 0, 0);
      }
      gl.uniformMatrix4fv(uniforms.proj, false, proj);
      gl.uniformMatrix4fv(uniforms.modelView, false, modelView);
      gl.uniform1f(uniforms.morph, frame.morph);
      gl.uniform1f(uniforms.polish, frame.polish);
      gl.uniform1f(uniforms.alpha, frame.alpha);
      gl.uniform1f(uniforms.edge, frame.edge);
      gl.uniform1f(uniforms.tone, frame.tone);

      // back facets first, seen through the front ones
      gl.cullFace(gl.FRONT);
      gl.uniform1f(uniforms.back, 1);
      gl.drawArrays(gl.TRIANGLES, 0, geometry.count);
      gl.cullFace(gl.BACK);
      gl.uniform1f(uniforms.back, 0);
      gl.drawArrays(gl.TRIANGLES, 0, geometry.count);
      for (const a of attribs)
        if (a.loc >= 0) gl.disableVertexAttribArray(a.loc);
    },

    dispose() {
      // The context belongs to the canvas and outlives this renderer (React
      // re-runs effects in development), so free what was made, not the context.
      gl.deleteProgram(gem);
      if (dust) gl.deleteProgram(dust);
      for (const a of attribs) gl.deleteBuffer(a.buf);
      if (dustBuf) gl.deleteBuffer(dustBuf);
    },
  };
}
