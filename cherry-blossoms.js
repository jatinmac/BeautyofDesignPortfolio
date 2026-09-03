import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.min.js';

const canvas = document.querySelector('.cherry-blossom-scene__canvas');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-8, 8, 6, -6, 0.1, 100);
  camera.position.set(0, 0, 20);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  scene.add(new THREE.HemisphereLight(0xfff4fb, 0x6e3c52, 2.2));
  const sunlight = new THREE.DirectionalLight(0xffffff, 2.6);
  sunlight.position.set(-5, 8, 12);
  scene.add(sunlight);

  const blossomTree = new THREE.Group();
  scene.add(blossomTree);

  const branchMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.24,
    metalness: 0,
    vertexColors: false,
    transparent: true,
    opacity: 0.58,
    transmission: 0.38,
    thickness: 0.42,
    ior: 1.42,
    clearcoat: 1,
    clearcoatRoughness: 0.2,
    specularIntensity: 1,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const twigMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.3,
    metalness: 0,
    vertexColors: false,
    transparent: true,
    opacity: 0.48,
    transmission: 0.3,
    thickness: 0.2,
    ior: 1.4,
    clearcoat: 0.9,
    clearcoatRoughness: 0.24,
    specularIntensity: 0.9,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const budMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.2,
    transmission: 0.48,
    thickness: 0.18,
    ior: 1.42,
    clearcoat: 1,
    transparent: true,
    opacity: 0.62,
    depthWrite: false
  });
  const centerMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.16,
    transmission: 0.36,
    thickness: 0.24,
    ior: 1.45,
    clearcoat: 1,
    transparent: true,
    opacity: 0.72,
    depthWrite: false
  });
  const stemMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.28,
    transmission: 0.44,
    thickness: 0.08,
    ior: 1.4,
    clearcoat: 0.9,
    transparent: true,
    opacity: 0.46,
    depthWrite: false
  });
  const leafMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.18,
    transmission: 0.52,
    thickness: 0.12,
    ior: 1.42,
    clearcoat: 1,
    clearcoatRoughness: 0.16,
    transparent: true,
    opacity: 0.54,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const petalMaterials = [
    new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.14, transmission: 0.58, thickness: 0.1, ior: 1.42, clearcoat: 1, transparent: true, opacity: 0.5, depthWrite: false, side: THREE.DoubleSide }),
    new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.2, transmission: 0.48, thickness: 0.12, ior: 1.42, clearcoat: 0.92, transparent: true, opacity: 0.58, depthWrite: false, side: THREE.DoubleSide }),
    new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.26, transmission: 0.38, thickness: 0.14, ior: 1.42, clearcoat: 0.86, transparent: true, opacity: 0.66, depthWrite: false, side: THREE.DoubleSide })
  ];

  const branchPoints = [];
  const blossomAnchors = [];

  function growPath(points, startRadius, endRadius, material = branchMaterial) {
    const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal', 0.5);
    const segmentCount = Math.max(16, (points.length - 1) * 12);
    const radialSegments = 16;
    const positions = [];
    const colors = [];
    const indices = [];
    const barkDark = new THREE.Color(0x2b171d);
    const barkLight = new THREE.Color(0x76505a);
    const tangent = new THREE.Vector3();
    const normal = new THREE.Vector3();
    const binormal = new THREE.Vector3();
    const reference = new THREE.Vector3();

    for (let ring = 0; ring <= segmentCount; ring += 1) {
      const progress = ring / segmentCount;
      const center = curve.getPointAt(progress);
      curve.getTangentAt(Math.min(progress, 0.9999), tangent).normalize();
      if (Math.abs(tangent.z) < 0.82) {
        reference.set(0, 0, 1);
      } else {
        reference.set(1, 0, 0);
      }
      normal.crossVectors(tangent, reference).normalize();
      binormal.crossVectors(tangent, normal).normalize();

      const taper = THREE.MathUtils.lerp(startRadius, endRadius, Math.pow(progress, 0.82));
      const organicRadius = taper * (1 + Math.sin(progress * 43) * 0.035 + Math.sin(progress * 91) * 0.018);

      for (let side = 0; side < radialSegments; side += 1) {
        const angle = (side / radialSegments) * Math.PI * 2;
        const barkDetail = 1 + Math.sin(angle * 5 + progress * 29) * 0.018;
        const offset = normal.clone().multiplyScalar(Math.cos(angle) * organicRadius * barkDetail)
          .add(binormal.clone().multiplyScalar(Math.sin(angle) * organicRadius * barkDetail));
        const point = center.clone().add(offset);
        positions.push(point.x, point.y, point.z);

        const grain = 0.24 + 0.2 * Math.sin(angle * 3 + progress * 54) + 0.08 * Math.sin(progress * 137);
        const barkColor = barkDark.clone().lerp(barkLight, THREE.MathUtils.clamp(grain, 0.06, 0.54));
        colors.push(barkColor.r, barkColor.g, barkColor.b);
      }
    }

    for (let ring = 0; ring < segmentCount; ring += 1) {
      for (let side = 0; side < radialSegments; side += 1) {
        const nextSide = (side + 1) % radialSegments;
        const current = ring * radialSegments + side;
        const next = ring * radialSegments + nextSide;
        const upper = (ring + 1) * radialSegments + side;
        const upperNext = (ring + 1) * radialSegments + nextSide;
        indices.push(current, upper, next, next, upper, upperNext);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    const branch = new THREE.Mesh(geometry, material);
    blossomTree.add(branch);
    points.slice(1).forEach((point) => branchPoints.push(point.clone()));
  }

  const v = (x, y, z = 0) => new THREE.Vector3(x, y, z);

  growPath([
    v(1.15, 0.9, -0.2), v(0.15, 0.42, 0.05), v(-1.1, 0.05, -0.08),
    v(-2.45, -0.32, 0.13), v(-3.75, -0.86, -0.02), v(-5.2, -1.02, 0.12),
    v(-6.55, -1.52, 0.03), v(-7.7, -1.6, -0.08)
  ], 0.11, 0.032);

  const limbs = [
    [v(-0.25, 0.3), v(-1.0, -0.5, 0.1), v(-1.35, -1.25, 0.04), v(-1.85, -1.9, -0.05)],
    [v(-1.45, -0.08), v(-2.15, 0.58, 0.08), v(-2.9, 1.0, 0.16), v(-3.75, 1.25, 0.05)],
    [v(-2.65, -0.42), v(-3.2, -1.3, 0.1), v(-3.5, -2.16, 0.02)],
    [v(-3.65, -0.8), v(-4.2, -0.05, -0.1), v(-4.85, 0.38, 0.04), v(-5.5, 0.48, 0.1)],
    [v(-4.75, -0.98), v(-5.35, -1.75, 0.08), v(-5.75, -2.58, -0.04)],
    [v(-5.85, -1.27), v(-6.35, -0.65, 0.06), v(-7.1, -0.25, -0.05), v(-7.8, -0.2, 0.08)],
    [v(-6.45, -1.45), v(-7.0, -2.05, 0.08), v(-7.55, -2.55, 0)]
  ];

  limbs.forEach((points, limbIndex) => {
    growPath(points, 0.045, 0.012, twigMaterial);
    points.slice(1).forEach((point, index) => {
      if (index > 0 || limbIndex % 2 === 0) blossomAnchors.push(point.clone());
    });
  });

  const twigs = [
    [v(-1.28, -1.2), v(-0.9, -1.75, 0.08)], [v(-2.85, 0.98), v(-2.72, 1.7, 0.04)],
    [v(-3.68, 1.23), v(-4.05, 1.82, -0.02)], [v(-3.48, -2.12), v(-4.0, -2.63, 0.06)],
    [v(-4.82, 0.36), v(-5.12, 1.04, 0.05)], [v(-5.48, 0.46), v(-5.92, 1.02, -0.02)],
    [v(-5.72, -2.54), v(-6.28, -2.94, 0.05)], [v(-7.08, -0.26), v(-7.34, 0.48, 0.02)],
    [v(-7.52, -2.52), v(-8.04, -2.78, 0.02)]
  ];

  twigs.forEach((points) => {
    growPath(points, 0.02, 0.005, twigMaterial);
    blossomAnchors.push(points[1].clone());
  });

  // Mature cherry trees flower along fine wood, not only at the growing tips.
  branchPoints.filter((_, index) => index % 2 === 0).forEach((point) => blossomAnchors.push(point.clone()));

  // Each anchor becomes a cloud of overlapping flowers, like the dense pom-pom
  // clusters of a mature cherry tree rather than a single decorative bloom.
  const flowerInstances = [];
  blossomAnchors.forEach((anchor, anchorIndex) => {
    const flowerCount = anchorIndex % 4 === 0 ? 9 : 7;
    for (let clusterIndex = 0; clusterIndex < flowerCount; clusterIndex += 1) {
      const seed = anchorIndex * 7.31 + clusterIndex * 2.399;
      const spread = 0.045 + Math.sqrt((clusterIndex + 0.5) / flowerCount) * 0.34;
      const angle = seed * 1.31;
      flowerInstances.push({
        anchor,
        position: anchor.clone().add(v(
          Math.cos(angle) * spread,
          Math.sin(angle) * spread * 0.76,
          Math.sin(seed * 1.77) * 0.22
        )),
        scale: 0.72 + ((anchorIndex * 13 + clusterIndex * 7) % 10) / 22,
        seed,
        tone: (anchorIndex * 3 + clusterIndex) % 12
      });
    }
  });

  const petalGeometry = new THREE.SphereGeometry(0.064, 12, 8);
  petalGeometry.scale(0.82, 1.42, 0.2);
  const centerGeometry = new THREE.SphereGeometry(0.031, 10, 7);
  const budGeometry = new THREE.SphereGeometry(0.045, 9, 7);
  const stemGeometry = new THREE.CylinderGeometry(0.008, 0.011, 1, 7);
  const leafGeometry = new THREE.SphereGeometry(0.065, 10, 6);
  leafGeometry.scale(0.42, 1.65, 0.12);
  const petalMeshes = petalMaterials.map((material) => (
    new THREE.InstancedMesh(petalGeometry, material, flowerInstances.length * 10)
  ));
  const flowerCenters = new THREE.InstancedMesh(centerGeometry, centerMaterial, flowerInstances.length);
  const flowerStems = new THREE.InstancedMesh(stemGeometry, stemMaterial, flowerInstances.length);
  const buds = new THREE.InstancedMesh(budGeometry, budMaterial, blossomAnchors.length * 2);
  const leaves = new THREE.InstancedMesh(leafGeometry, leafMaterial, blossomAnchors.length * 2);
  const dummy = new THREE.Object3D();
  const colorCounts = [0, 0, 0];
  const stemDirection = new THREE.Vector3();

  flowerInstances.forEach((flower, flowerIndex) => {
    const { anchor, position, scale: flowerScale, seed, tone } = flower;
    const materialIndex = tone < 6 ? 0 : tone < 10 ? 1 : 2;

    for (let petalIndex = 0; petalIndex < 10; petalIndex += 1) {
      const innerPetal = petalIndex >= 5;
      const angle = ((petalIndex % 5) / 5) * Math.PI * 2 + seed + (innerPetal ? 0.58 : 0);
      const layerScale = innerPetal ? 0.58 : 1;
      const petalDistance = (innerPetal ? 0.039 : 0.067) * flowerScale;
      dummy.position.set(
        position.x + Math.cos(angle) * petalDistance,
        position.y + Math.sin(angle) * petalDistance,
        position.z + (innerPetal ? 0.025 : 0)
      );
      dummy.rotation.set(0.25 * Math.sin(seed), 0.32 * Math.cos(seed), angle - Math.PI / 2);
      dummy.scale.setScalar(flowerScale * layerScale);
      dummy.updateMatrix();
      petalMeshes[materialIndex].setMatrixAt(colorCounts[materialIndex], dummy.matrix);
      colorCounts[materialIndex] += 1;
    }

    dummy.position.copy(position);
    dummy.position.z += 0.038;
    dummy.rotation.set(0, 0, seed);
    dummy.scale.setScalar(flowerScale);
    dummy.updateMatrix();
    flowerCenters.setMatrixAt(flowerIndex, dummy.matrix);

    stemDirection.subVectors(position, anchor);
    const stemLength = Math.max(0.035, stemDirection.length());
    dummy.position.copy(anchor).add(position).multiplyScalar(0.5);
    dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), stemDirection.normalize());
    dummy.scale.set(1, stemLength, 1);
    dummy.updateMatrix();
    flowerStems.setMatrixAt(flowerIndex, dummy.matrix);
  });

  blossomAnchors.forEach((anchor, anchorIndex) => {
    for (let detailIndex = 0; detailIndex < 2; detailIndex += 1) {
      const seed = anchorIndex * 4.73 + detailIndex * 2.1;
      const offsetX = Math.cos(seed) * (0.13 + detailIndex * 0.07);
      const offsetY = Math.sin(seed) * (0.11 + detailIndex * 0.06);

      dummy.position.set(anchor.x + offsetX, anchor.y + offsetY, anchor.z - 0.05);
      dummy.rotation.set(0.2, Math.sin(seed) * 0.5, seed);
      dummy.scale.setScalar(0.66 + detailIndex * 0.12);
      dummy.updateMatrix();
      buds.setMatrixAt(anchorIndex * 2 + detailIndex, dummy.matrix);

      dummy.position.set(anchor.x - offsetX * 0.7, anchor.y - offsetY * 0.5, anchor.z - 0.11);
      dummy.rotation.set(0.3, Math.cos(seed) * 0.5, seed + 0.7);
      dummy.scale.set(0.7 + detailIndex * 0.12, 0.7 + detailIndex * 0.12, 0.7 + detailIndex * 0.12);
      dummy.updateMatrix();
      leaves.setMatrixAt(anchorIndex * 2 + detailIndex, dummy.matrix);
    }
  });

  petalMeshes.forEach((mesh, index) => {
    mesh.count = colorCounts[index];
    mesh.instanceMatrix.needsUpdate = true;
    blossomTree.add(mesh);
  });
  flowerCenters.instanceMatrix.needsUpdate = true;
  flowerStems.instanceMatrix.needsUpdate = true;
  buds.instanceMatrix.needsUpdate = true;
  leaves.instanceMatrix.needsUpdate = true;
  blossomTree.add(flowerStems, leaves, flowerCenters, buds);

  const floatingPetalCount = window.innerWidth <= 760 ? 16 : 32;
  const floatingPetalGeometry = new THREE.SphereGeometry(0.095, 9, 6);
  floatingPetalGeometry.scale(0.72, 1.45, 0.2);
  const floatingPetals = new THREE.InstancedMesh(
    floatingPetalGeometry,
    petalMaterials[1],
    floatingPetalCount
  );
  floatingPetals.frustumCulled = false;
  scene.add(floatingPetals);

  const drifting = Array.from({ length: floatingPetalCount }, (_, index) => ({
    x: 0,
    y: Math.random() * 7 - 4.2,
    z: Math.random() * 2 - 0.6,
    speed: 0.16 + Math.random() * 0.22,
    sway: 0.45 + Math.random() * 0.75,
    phase: index * 0.83 + Math.random(),
    spin: 0.7 + Math.random() * 1.4,
    scale: 0.62 + Math.random() * 0.7
  }));

  let viewportWidth = 16;
  let viewportHeight = 12;
  let pointerX = 0;
  let pointerY = 0;
  let animationFrame = 0;
  let petalsPlaced = false;
  const clock = new THREE.Clock();

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / Math.max(height, 1);
    viewportHeight = width <= 760 ? 13.5 : 12;
    viewportWidth = viewportHeight * aspect;
    camera.left = -viewportWidth / 2;
    camera.right = viewportWidth / 2;
    camera.top = viewportHeight / 2;
    camera.bottom = -viewportHeight / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);

    const mobile = width <= 760;
    blossomTree.position.set(-viewportWidth / 2 + (mobile ? 0.1 : 0.35), viewportHeight / 2 - 0.35, 0);
    const treeScale = mobile ? 0.7 : 1;
    blossomTree.scale.set(-treeScale, treeScale, treeScale);

    if (!petalsPlaced) {
      drifting.forEach((petal) => {
        petal.x = -viewportWidth / 2 + Math.random() * Math.min(9, viewportWidth * 0.48);
      });
      petalsPlaced = true;
    }
  }

  let pendingResizeFrame = 0;

  function scheduleResize() {
    if (pendingResizeFrame) return;

    pendingResizeFrame = requestAnimationFrame(() => {
      pendingResizeFrame = 0;
      resize();
    });
  }

  function updatePetals(elapsed, animate) {
    drifting.forEach((petal, index) => {
      if (animate) {
        petal.y -= petal.speed * 0.018;
        petal.x += petal.speed * 0.014;
        if (petal.y < -viewportHeight / 2 - 0.8 || petal.x > viewportWidth / 2 + 0.8) {
          petal.x = -viewportWidth / 2 - 0.4 + Math.random() * 2.8;
          petal.y = viewportHeight / 2 + Math.random() * 1.8;
        }
      }

      const flutter = Math.sin(elapsed * petal.sway + petal.phase);
      dummy.position.set(petal.x + flutter * 0.5, petal.y, petal.z + flutter * 0.12);
      dummy.rotation.set(elapsed * petal.spin, flutter * 2.2, elapsed * petal.spin * 0.6);
      dummy.scale.setScalar(petal.scale);
      dummy.updateMatrix();
      floatingPetals.setMatrixAt(index, dummy.matrix);
    });
    floatingPetals.instanceMatrix.needsUpdate = true;
  }

  function renderFrame() {
    const elapsed = clock.getElapsedTime();
    const wind = Math.sin(elapsed * 0.72) * 0.012 + Math.sin(elapsed * 1.81) * 0.005;
    blossomTree.rotation.z = reducedMotion.matches ? -0.025 : -0.025 + wind;
    blossomTree.rotation.y = reducedMotion.matches ? 0 : Math.sin(elapsed * 0.54) * 0.025;
    blossomTree.position.x += (pointerX * 0.14 - (blossomTree.position.x - (-viewportWidth / 2 + (window.innerWidth <= 760 ? 0.1 : 0.35)))) * 0.035;
    blossomTree.position.y += (pointerY * 0.08 - (blossomTree.position.y - (viewportHeight / 2 - 0.35))) * 0.035;

    updatePetals(elapsed, !reducedMotion.matches);
    renderer.render(scene, camera);
    if (!reducedMotion.matches) animationFrame = requestAnimationFrame(renderFrame);
  }

  window.addEventListener('pointermove', (event) => {
    pointerX = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
    pointerY = 0.5 - event.clientY / Math.max(window.innerHeight, 1);
  }, { passive: true });
  window.addEventListener('resize', scheduleResize, { passive: true });
  document.addEventListener('visibilitychange', () => {
    cancelAnimationFrame(animationFrame);
    if (!document.hidden && !reducedMotion.matches) {
      clock.getDelta();
      animationFrame = requestAnimationFrame(renderFrame);
    }
  });

  resize();
  updatePetals(0, false);
  renderFrame();
}
