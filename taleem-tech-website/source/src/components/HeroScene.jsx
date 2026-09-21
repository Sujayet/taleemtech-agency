import { useEffect, useRef } from 'react';
import {
  AmbientLight, BoxGeometry, BufferAttribute, BufferGeometry, Clock, DirectionalLight, EdgesGeometry, Group,
  IcosahedronGeometry, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial, MeshStandardMaterial,
  OctahedronGeometry, PerspectiveCamera, PointLight, Points, PointsMaterial, Scene, TorusGeometry, WebGLRenderer,
} from 'three';

const RED = 0xfd3231;   // logo red
const WHITE = 0xf6f4f1;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/**
 * Lightweight WebGL hero: faceted core, wireframe shell, two rings, orbiting satellites and a dust field.
 * Reacts to the pointer and to scroll. Pauses when off-screen or when the tab is hidden.
 * Capped pixel ratio, no shadows, no post-processing.
 */
export default function HeroScene({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return undefined;

    let renderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return undefined; // no WebGL: the CSS fallback behind the canvas stays visible
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
    el.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(42, 1, 0.1, 100);
    const root = new Group();
    scene.add(root);

    // Core + wireframe shell
    const core = new Mesh(
      new IcosahedronGeometry(1.45, 1),
      new MeshStandardMaterial({ color: 0x2b2c32, metalness: 0.6, roughness: 0.26, flatShading: true, emissive: RED, emissiveIntensity: 0.22 })
    );
    const shell = new LineSegments(
      new EdgesGeometry(new IcosahedronGeometry(2.15, 1)),
      new LineBasicMaterial({ color: 0xff5a5d, transparent: true, opacity: 0.6 })
    );
    root.add(core, shell);

    // Rings
    const ring1 = new Mesh(new TorusGeometry(3.15, 0.014, 8, 180), new MeshBasicMaterial({ color: WHITE, transparent: true, opacity: 0.4 }));
    ring1.rotation.x = 1.25;
    const ring2 = new Mesh(new TorusGeometry(3.75, 0.014, 8, 180), new MeshBasicMaterial({ color: RED, transparent: true, opacity: 0.45 }));
    ring2.rotation.y = 1.15;
    root.add(ring1, ring2);

    // Satellites (one per service family)
    const orbit = new Group();
    const satGeos = [new BoxGeometry(0.34, 0.34, 0.34), new OctahedronGeometry(0.27)];
    const satRed = new MeshStandardMaterial({ color: RED, metalness: 0.3, roughness: 0.35, emissive: RED, emissiveIntensity: 0.25 });
    const satWhite = new MeshStandardMaterial({ color: WHITE, metalness: 0.25, roughness: 0.3, emissive: WHITE, emissiveIntensity: 0.08 });
    const sats = [];
    for (let i = 0; i < 6; i += 1) {
      const m = new Mesh(satGeos[i % 2], i % 3 === 0 ? satWhite : satRed);
      const a = (i / 6) * Math.PI * 2;
      m.position.set(Math.cos(a) * 3.15, Math.sin(a * 2) * 0.6, Math.sin(a) * 3.15);
      sats.push(m);
      orbit.add(m);
    }
    root.add(orbit);

    // Dust
    const N = 520;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i += 1) {
      const r = 4.6 + Math.random() * 5;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos.set([r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph)], i * 3);
    }
    const dustGeo = new BufferGeometry();
    dustGeo.setAttribute('position', new BufferAttribute(pos, 3));
    const dust = new Points(dustGeo, new PointsMaterial({ color: 0xb9bbc2, size: 0.035, transparent: true, opacity: 0.75, sizeAttenuation: true }));
    scene.add(dust);

    // Lights
    scene.add(new AmbientLight(0xffffff, 0.55));
    const key = new PointLight(RED, 110, 0, 2); key.position.set(5, 4, 6);
    const fill = new DirectionalLight(0xffffff, 0.75); fill.position.set(-5, -2, 3);
    scene.add(key, fill);

    // Sizing
    const resize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.set(0, 0, w / h < 0.9 ? 13.5 : 10.6);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // Pointer + scroll
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    // Loop with visibility gating
    const clock = new Clock();
    let raf = 0;
    let inView = true;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const t = clock.getElapsedTime();
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      const s = clamp(window.scrollY / window.innerHeight, 0, 1.4);

      core.rotation.y = t * 0.28;
      core.rotation.x = t * 0.1;
      shell.rotation.y = -t * 0.14;
      shell.rotation.x = t * 0.09;
      ring1.rotation.z = t * 0.22;
      ring2.rotation.z = -t * 0.16;
      orbit.rotation.y = t * 0.34;
      sats.forEach((m, i) => { m.rotation.x = t * (0.6 + i * 0.1); m.rotation.y = t * 0.8; });
      dust.rotation.y = t * 0.03;

      root.rotation.y = pointer.x * 0.45 + s * 1.1;
      root.rotation.x = pointer.y * 0.25 + s * 0.6;
      root.position.y = Math.sin(t * 0.8) * 0.14 + s * 1.4;
      root.scale.setScalar(1 - s * 0.18);
      renderer.render(scene, camera);
    };
    const start = () => { if (!raf && inView && !document.hidden) frame(); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start(); else stop();
    }, { threshold: 0 });
    io.observe(el);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis);
      scene.traverse((o) => {
        o.geometry?.dispose?.();
        const m = o.material;
        if (m) (Array.isArray(m) ? m : [m]).forEach((x) => x.dispose());
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
