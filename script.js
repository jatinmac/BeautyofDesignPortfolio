/* ---------- Elements ---------- */

const pageRoot = document.documentElement;
const gridPage = document.querySelector('.page-shell');
const siteHeader = document.querySelector('.site-header');
const detailPage = document.querySelector('.detail-page');
const detailContent = document.querySelector('.detail-content');
const detailBackButton = document.querySelector('.detail-back-button');
const ballButton = document.querySelector('.ball-control');
const cardCollection = document.querySelector('.collections');
const navigationTrack = document.querySelector('.navigation-track');
const navigationLinesContainer = document.querySelector('.navigation-lines');
const navigationTargets = document.querySelectorAll('.navigation-target');
const navigationLabels = document.querySelectorAll('.navigation-label');
const homeNavigationButton = document.querySelector('.navigation-control');
const cardGrids = document.querySelectorAll('.card-grid');
const cards = document.querySelectorAll('.card');
const projectTagLists = document.querySelectorAll('.project-card__tags');
const buildsGrid = document.querySelector('.card-grid--mosaic');
const prototypeToggle = document.querySelector('.prototype-toggle');
const prototypeToggleTitle = document.querySelector('.prototype-toggle__title');
const motionPrototypeCards = document.querySelectorAll('.motion-prototype-card');
const introCard = document.querySelector('.intro-card');
const introTitle = introCard.querySelector('h1');
const introParticleCanvas = introCard.querySelector('.intro-card__particles');
const cursorFace = introCard.querySelector('.cursor-face');
const cursorFaceAsset = cursorFace.querySelector('.cursor-face__svg');
const cursorFaceBlink = cursorFaceAsset.querySelector('.cursor-face__blink');
const cursorFaceLeftEye = cursorFaceAsset.querySelector('.cursor-face__eye--left');
const cursorFaceRightEye = cursorFaceAsset.querySelector('.cursor-face__eye--right');
const reducedMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const mobileLayoutPreference = window.matchMedia('(max-width: 760px)');

document.querySelectorAll('img').forEach((image) => {
  image.decoding = 'async';
});

introParticleCanvas.hidden = reducedMotionPreference.matches;

if (!reducedMotionPreference.matches) {
  introTitle.style.opacity = '0';
}


/* ---------- Cursor-reactive intro face ---------- */

if (!reducedMotionPreference.matches) {
  function createCursorFaceEyePose(overrides = {}) {
    return {
      x: 0,
      y: 0,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      ...overrides
    };
  }

  function createCursorFaceEyeVelocity() {
    return { x: 0, y: 0, rotation: 0, scaleX: 0, scaleY: 0 };
  }

  function createCursorFaceExpression(left, right, options = {}) {
    return {
      left: createCursorFaceEyePose(left),
      right: createCursorFaceEyePose(right),
      gaze: options.gaze ?? 1,
      hold: options.hold ?? 1400
    };
  }

  // Every pose keeps the original pill artwork and changes only its transform.
  // The collection distils the eye language from the supplied reference sheet
  // into shapes that stay legible without adding pupils, brows, lids, or tears.
  const CURSOR_FACE_EXPRESSIONS = {
    neutral: createCursorFaceExpression({}, {}),
    alert: createCursorFaceExpression(
      { x: -3, scaleX: 1.08, scaleY: 1.16 },
      { x: 3, scaleX: 1.08, scaleY: 1.16 },
      { gaze: 0.82, hold: 1250 }
    ),
    wink: createCursorFaceExpression(
      { x: 1, y: 4, rotation: -9, scaleX: 1.34, scaleY: 0.08 },
      { x: -2, y: -1, rotation: -4, scaleX: 1.04, scaleY: 1.08 },
      { gaze: 0.62, hold: 900 }
    ),
    angry: createCursorFaceExpression(
      { x: 2, y: 1, rotation: 19, scaleX: 1.08, scaleY: 0.78 },
      { x: -2, y: 1, rotation: -19, scaleX: 1.08, scaleY: 0.78 },
      { gaze: 0.46, hold: 1350 }
    ),
    worried: createCursorFaceExpression(
      { x: 1, y: 2, rotation: -15, scaleX: 0.94, scaleY: 0.88 },
      { x: -1, y: 2, rotation: 15, scaleX: 0.94, scaleY: 0.88 },
      { gaze: 0.58, hold: 1550 }
    ),
    dizzy: createCursorFaceExpression(
      { x: 7, y: -1, rotation: -38, scaleX: 1.2, scaleY: 0.72 },
      { x: -7, y: 2, rotation: 38, scaleX: 1.2, scaleY: 0.72 },
      { gaze: 0.12, hold: 1450 }
    ),
    weary: createCursorFaceExpression(
      { x: -1, y: 4, rotation: 10, scaleX: 1.23, scaleY: 0.38 },
      { x: 1, y: 4, rotation: -10, scaleX: 1.23, scaleY: 0.38 },
      { gaze: 0.24, hold: 1700 }
    ),
    determined: createCursorFaceExpression(
      { x: 2, y: 1, rotation: 13, scaleX: 0.96, scaleY: 0.94 },
      { x: -2, y: 1, rotation: -13, scaleX: 0.96, scaleY: 0.94 },
      { gaze: 0.68, hold: 1350 }
    ),
    curious: createCursorFaceExpression(
      { x: -3, y: -4, rotation: -10, scaleX: 0.96, scaleY: 1.12 },
      { x: 2, y: 3, rotation: -6, scaleX: 1.04, scaleY: 0.82 },
      { gaze: 0.9, hold: 1500 }
    ),
    skeptical: createCursorFaceExpression(
      { x: 1, y: 3, rotation: 12, scaleX: 1.18, scaleY: 0.42 },
      { x: -1, y: -3, rotation: -7, scaleX: 0.95, scaleY: 1.06 },
      { gaze: 0.5, hold: 1600 }
    ),
    pleading: createCursorFaceExpression(
      { x: 2, y: 2, rotation: -12, scaleX: 1.08, scaleY: 1.08 },
      { x: -2, y: 2, rotation: 12, scaleX: 1.08, scaleY: 1.08 },
      { gaze: 0.42, hold: 1700 }
    ),
    delighted: createCursorFaceExpression(
      { x: -1, y: 3, rotation: -12, scaleX: 1.3, scaleY: 0.18 },
      { x: 1, y: 3, rotation: 12, scaleX: 1.3, scaleY: 0.18 },
      { gaze: 0.16, hold: 1150 }
    ),
    furious: createCursorFaceExpression(
      { x: 5, y: 2, rotation: 27, scaleX: 1.12, scaleY: 0.58 },
      { x: -5, y: 2, rotation: -27, scaleX: 1.12, scaleY: 0.58 },
      { gaze: 0.3, hold: 1050 }
    ),
    tired: createCursorFaceExpression(
      { x: -1, y: 5, rotation: 5, scaleX: 1.3, scaleY: 0.24 },
      { x: 1, y: 5, rotation: -5, scaleX: 1.3, scaleY: 0.24 },
      { gaze: 0.18, hold: 1900 }
    ),
    anxious: createCursorFaceExpression(
      { x: 4, y: 1, rotation: 8, scaleX: 0.86, scaleY: 1.13 },
      { x: -4, y: 2, rotation: -14, scaleX: 0.86, scaleY: 0.96 },
      { gaze: 0.72, hold: 1200 }
    ),
    startled: createCursorFaceExpression(
      { x: -6, y: -2, rotation: -5, scaleX: 1.18, scaleY: 1.27 },
      { x: 6, y: -2, rotation: 5, scaleX: 1.18, scaleY: 1.27 },
      { gaze: 0.26, hold: 650 }
    ),
    bashful: createCursorFaceExpression(
      { x: 5, y: 5, rotation: 11, scaleX: 1.15, scaleY: 0.42 },
      { x: 1, y: 5, rotation: 7, scaleX: 1.15, scaleY: 0.42 },
      { gaze: 0.34, hold: 1450 }
    ),
    sideEye: createCursorFaceExpression(
      { x: 7, y: 2, rotation: 7, scaleX: 1.04, scaleY: 0.74 },
      { x: 7, y: 2, rotation: 7, scaleX: 1.04, scaleY: 0.74 },
      { gaze: 0.15, hold: 1450 }
    ),
    sad: createCursorFaceExpression(
      { x: 2, y: 4, rotation: -18, scaleX: 1.04, scaleY: 0.68 },
      { x: -2, y: 4, rotation: 18, scaleX: 1.04, scaleY: 0.68 },
      { gaze: 0.32, hold: 1750 }
    ),
    sly: createCursorFaceExpression(
      { x: 4, y: 2, rotation: -8, scaleX: 1.17, scaleY: 0.36 },
      { x: 4, y: -1, rotation: -8, scaleX: 0.93, scaleY: 0.9 },
      { gaze: 0.28, hold: 1300 }
    ),
    overwhelmed: createCursorFaceExpression(
      { x: 2, y: 5, rotation: -10, scaleX: 0.92, scaleY: 0.5 },
      { x: -2, y: 5, rotation: 10, scaleX: 0.92, scaleY: 0.5 },
      { gaze: 0.2, hold: 1800 }
    ),
    dejected: createCursorFaceExpression(
      { x: 3, y: 6, rotation: -22, scaleX: 1.06, scaleY: 0.48 },
      { x: -3, y: 6, rotation: 22, scaleX: 1.06, scaleY: 0.48 },
      { gaze: 0.18, hold: 1800 }
    ),
    bored: createCursorFaceExpression(
      { x: -1, y: 4, rotation: 3, scaleX: 1.28, scaleY: 0.3 },
      { x: 1, y: 4, rotation: -3, scaleX: 1.28, scaleY: 0.3 },
      { gaze: 0.16, hold: 1750 }
    ),
    exhausted: createCursorFaceExpression(
      { x: 1, y: 6, rotation: 14, scaleX: 1.24, scaleY: 0.12 },
      { x: -1, y: 6, rotation: -14, scaleX: 1.24, scaleY: 0.12 },
      { gaze: 0.08, hold: 1900 }
    ),
    spin: createCursorFaceExpression(
      {},
      {},
      { gaze: 0.12, hold: 1700 }
    )
  };

  const CURSOR_FACE_EXPRESSION_DYNAMICS = {
    neutral: { response: 0.072, damping: 0.76, lag: 18, organic: 0.16 },
    alert: { response: 0.12, damping: 0.66, lag: 34, organic: 0.42 },
    wink: { response: 0.17, damping: 0.59, lag: 52, lead: 'left', organic: 0.34 },
    angry: { response: 0.105, damping: 0.7, lag: 28, organic: 0.38 },
    worried: { response: 0.078, damping: 0.77, lag: 48, organic: 0.5 },
    dizzy: { response: 0.1, damping: 0.7, lag: 76, organic: 1 },
    weary: { response: 0.06, damping: 0.82, lag: 72, organic: 0.3 },
    determined: { response: 0.1, damping: 0.71, lag: 26, organic: 0.3 },
    curious: { response: 0.082, damping: 0.76, lag: 68, lead: 'right', organic: 0.55 },
    skeptical: { response: 0.092, damping: 0.73, lag: 86, lead: 'right', organic: 0.45 },
    pleading: { response: 0.075, damping: 0.78, lag: 42, organic: 0.42 },
    delighted: { response: 0.13, damping: 0.65, lag: 38, organic: 0.56 },
    furious: { response: 0.14, damping: 0.63, lag: 20, organic: 0.58 },
    tired: { response: 0.052, damping: 0.84, lag: 82, organic: 0.24 },
    anxious: { response: 0.13, damping: 0.64, lag: 58, organic: 0.9 },
    startled: { response: 0.2, damping: 0.56, lag: 0, organic: 1 },
    bashful: { response: 0.08, damping: 0.77, lag: 62, lead: 'left', organic: 0.42 },
    sideEye: { response: 0.135, damping: 0.64, lag: 30, organic: 0.46 },
    sad: { response: 0.068, damping: 0.8, lag: 54, organic: 0.3 },
    sly: { response: 0.1, damping: 0.7, lag: 70, lead: 'right', organic: 0.46 },
    overwhelmed: { response: 0.082, damping: 0.75, lag: 54, organic: 0.72 },
    dejected: { response: 0.06, damping: 0.83, lag: 66, organic: 0.24 },
    bored: { response: 0.056, damping: 0.83, lag: 76, organic: 0.22 },
    exhausted: { response: 0.048, damping: 0.85, lag: 90, organic: 0.18 },
    spin: { response: 0.12, damping: 0.68, lag: 0, organic: 0.12 }
  };

  // Human expressions arrive in beats: notice, react, reconsider, then settle.
  // These routines also keep the stronger emotions from appearing as unrelated
  // random poses, which makes the mascot feel playful instead of erratic.
  const AUTONOMOUS_CURSOR_FACE_ROUTINES = [
    [
      { name: 'alert', duration: 380 },
      { name: 'curious', duration: 1150 },
      { name: 'sideEye', duration: 680 }
    ],
    [
      { name: 'skeptical', duration: 880 },
      { name: 'wink', duration: 620 },
      { name: 'delighted', duration: 920 }
    ],
    [
      { name: 'determined', duration: 720 },
      { name: 'angry', duration: 760 },
      { name: 'furious', duration: 520 },
      { name: 'weary', duration: 820 }
    ],
    [
      { name: 'worried', duration: 880 },
      { name: 'anxious', duration: 640 },
      { name: 'overwhelmed', duration: 980 },
      { name: 'dejected', duration: 760 }
    ],
    [
      { name: 'bored', duration: 980 },
      { name: 'tired', duration: 1080 },
      { name: 'exhausted', duration: 980 }
    ],
    [
      { name: 'startled', duration: 340 },
      { name: 'dizzy', duration: 1050 },
      { name: 'bashful', duration: 900 }
    ],
    [
      { name: 'alert', duration: 300 },
      { name: 'sly', duration: 820 },
      { name: 'delighted', duration: 860 }
    ],
    [
      { name: 'pleading', duration: 1050 },
      { name: 'sad', duration: 980 },
      { name: 'dejected', duration: 720 }
    ],
    [
      { name: 'alert', duration: 280 },
      { name: 'spin', duration: 1700 },
      { name: 'delighted', duration: 760 }
    ]
  ];

  const CONTACT_CURSOR_FACE_ROUTINES = [
    [
      { name: 'startled', duration: 360 },
      { name: 'skeptical', duration: 680 },
      { name: 'wink', duration: 560 },
      { name: 'delighted', duration: 760 }
    ],
    [
      { name: 'startled', duration: 340 },
      { name: 'angry', duration: 460 },
      { name: 'sly', duration: 720 },
      { name: 'bashful', duration: 760 }
    ],
    [
      { name: 'startled', duration: 350 },
      { name: 'dizzy', duration: 780 },
      { name: 'anxious', duration: 520 },
      { name: 'delighted', duration: 720 }
    ],
    [
      { name: 'startled', duration: 330 },
      { name: 'curious', duration: 780 },
      { name: 'sideEye', duration: 560 },
      { name: 'wink', duration: 620 }
    ],
    [
      { name: 'startled', duration: 300 },
      { name: 'spin', duration: 1600 },
      { name: 'delighted', duration: 720 }
    ]
  ];

  const CONTINUED_CONTACT_CURSOR_FACE_ROUTINES = [
    [{ name: 'curious', duration: 620 }, { name: 'wink', duration: 540 }],
    [{ name: 'skeptical', duration: 620 }, { name: 'sideEye', duration: 580 }],
    [{ name: 'determined', duration: 460 }, { name: 'delighted', duration: 680 }],
    [{ name: 'dizzy', duration: 620 }, { name: 'bashful', duration: 680 }]
  ];
  const CURSOR_FACE_POSE_PROPERTIES = ['x', 'y', 'rotation', 'scaleX', 'scaleY'];
  const CURSOR_FACE_CENTER_X = 67.0587;
  const CURSOR_FACE_LEFT_EYE_CENTER_X = 51.525;
  const CURSOR_FACE_RIGHT_EYE_CENTER_X = 83.525;
  const CURSOR_FACE_EYE_ORBIT_RADIUS = 63;
  const neutralCursorFaceExpression = CURSOR_FACE_EXPRESSIONS.neutral;

  const faceMotion = {
    targetX: 0,
    targetY: 0,
    head: { x: 0, y: 0, velocityX: 0, velocityY: 0 },
    leftEye: { x: 0, y: 0, velocityX: 0, velocityY: 0, targetX: 0, targetY: 0 },
    rightEye: { x: 0, y: 0, velocityX: 0, velocityY: 0, targetX: 0, targetY: 0 },
    frameId: null,
    previousFrameTime: null,
    previousPointerX: null,
    previousPointerY: null,
    previousPointerTime: null,
    expression: {
      name: 'neutral',
      current: {
        left: createCursorFaceEyePose(),
        right: createCursorFaceEyePose(),
        gaze: 1
      },
      velocity: {
        left: createCursorFaceEyeVelocity(),
        right: createCursorFaceEyeVelocity(),
        gaze: 0
      },
      target: {
        left: neutralCursorFaceExpression.left,
        right: neutralCursorFaceExpression.right,
        gaze: neutralCursorFaceExpression.gaze
      },
      startedAt: performance.now(),
      activeUntil: 0,
      gestureId: 0
    },
    spin: {
      active: false,
      startedAt: 0,
      duration: 1500,
      direction: 1
    }
  };

  let autonomousExpressionTimerId = null;
  let expressionSequenceTimerId = null;
  let expressionEyeLagTimerId = null;
  let previousAutonomousRoutineIndex = -1;
  let previousContactRoutineIndex = -1;
  let shouldLeadWithSignatureSpin = true;
  let isPointerTouchingFace = false;
  let nextContactExpressionTime = 0;

  function clampFaceMotion(value) {
    return Math.max(-1, Math.min(1, value));
  }

  function updateFaceSpring(state, targetX, targetY, stiffness, damping, frameScale) {
    state.velocityX += (targetX - state.x) * stiffness * frameScale;
    state.velocityY += (targetY - state.y) * stiffness * frameScale;
    state.velocityX *= damping ** frameScale;
    state.velocityY *= damping ** frameScale;
    state.x += state.velocityX * frameScale;
    state.y += state.velocityY * frameScale;
  }

  function smoothCursorFaceStep(edgeStart, edgeEnd, value) {
    const progress = Math.max(0, Math.min(1, (value - edgeStart) / (edgeEnd - edgeStart)));
    return progress * progress * (3 - 2 * progress);
  }

  function startCursorFaceSpin(activeDuration) {
    const spinMotion = faceMotion.spin;

    if (spinMotion.active) return;

    spinMotion.active = true;
    spinMotion.startedAt = performance.now();
    spinMotion.duration = Math.max(900, activeDuration - 120);
    spinMotion.direction *= -1;
    cursorFace.dataset.spinning = 'true';
    window.clearTimeout(blinkTimerId);
    stopCursorFaceBlink();
  }

  function getCursorFaceSpinMotion(now) {
    const spinMotion = faceMotion.spin;

    if (!spinMotion.active) {
      return { angle: 0, progress: 0, direction: spinMotion.direction };
    }

    const progress = Math.min(1, Math.max(0, (now - spinMotion.startedAt) / spinMotion.duration));
    const easedProgress = progress * progress * (3 - 2 * progress);
    const angle = spinMotion.direction * Math.PI * 2 * easedProgress;

    if (progress >= 1) {
      spinMotion.active = false;
      delete cursorFace.dataset.spinning;
      scheduleCursorFaceBlink(650 + Math.random() * 900);
    }

    return { angle, progress, direction: spinMotion.direction };
  }

  // Project each eye around a virtual sphere. Positive depth is the visible
  // hemisphere; negative depth puts the artwork behind the opaque ball.
  function getCursorFaceEyeSpinProjection(baseCenterX, localX, spinAngle) {
    const baseOffset = baseCenterX - CURSOR_FACE_CENTER_X;
    const surfaceOffset = Math.max(
      -CURSOR_FACE_EYE_ORBIT_RADIUS * 0.92,
      Math.min(CURSOR_FACE_EYE_ORBIT_RADIUS * 0.92, baseOffset + localX)
    );
    const longitude = Math.asin(surfaceOffset / CURSOR_FACE_EYE_ORBIT_RADIUS);
    const rotatedLongitude = longitude + spinAngle;
    const depth = Math.cos(rotatedLongitude);
    const restingDepth = Math.cos(longitude);
    const projectedOffset = Math.sin(rotatedLongitude) * CURSOR_FACE_EYE_ORBIT_RADIUS;
    const visibility = smoothCursorFaceStep(0.015, 0.18, depth);
    const foreshortening = Math.max(
      0.035,
      Math.min(1.08, Math.abs(depth) / Math.max(0.2, restingDepth))
    );

    return {
      x: projectedOffset - baseOffset,
      opacity: visibility,
      scaleX: foreshortening
    };
  }

  function updateCursorFaceExpression(frameScale) {
    const expressionMotion = faceMotion.expression;
    const { current, target, velocity } = expressionMotion;
    const dynamics = CURSOR_FACE_EXPRESSION_DYNAMICS[expressionMotion.name]
      ?? CURSOR_FACE_EXPRESSION_DYNAMICS.neutral;
    const responseByProperty = {
      x: 1,
      y: 1,
      rotation: 0.72,
      scaleX: 0.9,
      scaleY: 1.12
    };

    ['left', 'right'].forEach((eye) => {
      CURSOR_FACE_POSE_PROPERTIES.forEach((property) => {
        velocity[eye][property] += (
          (target[eye][property] - current[eye][property])
          * dynamics.response
          * responseByProperty[property]
          * frameScale
        );
        velocity[eye][property] *= dynamics.damping ** frameScale;
        current[eye][property] += velocity[eye][property] * frameScale;
      });

      current[eye].scaleX = Math.max(0.72, Math.min(1.46, current[eye].scaleX));
      current[eye].scaleY = Math.max(0.045, Math.min(1.42, current[eye].scaleY));
    });

    velocity.gaze += (target.gaze - current.gaze) * dynamics.response * 0.7 * frameScale;
    velocity.gaze *= (dynamics.damping + 0.04) ** frameScale;
    current.gaze += velocity.gaze * frameScale;
    current.gaze = Math.max(0.04, Math.min(1, current.gaze));
  }

  function isCursorFaceExpressionSettled() {
    const { current, target, velocity } = faceMotion.expression;
    const eyesAreSettled = ['left', 'right'].every((eye) => (
      CURSOR_FACE_POSE_PROPERTIES.every((property) => (
        Math.abs(current[eye][property] - target[eye][property]) < 0.002
        && Math.abs(velocity[eye][property]) < 0.002
      ))
    ));

    return eyesAreSettled
      && Math.abs(current.gaze - target.gaze) < 0.002
      && Math.abs(velocity.gaze) < 0.002;
  }

  function setCursorFaceExpression(name, activeDuration = 700) {
    const expression = CURSOR_FACE_EXPRESSIONS[name] ?? neutralCursorFaceExpression;
    const expressionName = name in CURSOR_FACE_EXPRESSIONS ? name : 'neutral';
    const dynamics = CURSOR_FACE_EXPRESSION_DYNAMICS[expressionName]
      ?? CURSOR_FACE_EXPRESSION_DYNAMICS.neutral;
    const expressionMotion = faceMotion.expression;
    const now = performance.now();

    window.clearTimeout(expressionEyeLagTimerId);
    expressionMotion.gestureId += 1;
    expressionMotion.name = expressionName;
    expressionMotion.startedAt = now;
    expressionMotion.activeUntil = now + activeDuration;
    expressionMotion.target.gaze = expression.gaze;

    ['left', 'right'].forEach((eye) => {
      CURSOR_FACE_POSE_PROPERTIES.forEach((property) => {
        expressionMotion.velocity[eye][property] *= 0.52;
      });
    });
    expressionMotion.velocity.gaze *= 0.52;

    const leadingEye = dynamics.lead
      ?? (expressionMotion.gestureId % 2 === 0 ? 'left' : 'right');
    const delayedEye = leadingEye === 'left' ? 'right' : 'left';
    expressionMotion.target[leadingEye] = expression[leadingEye];

    if (dynamics.lag > 0) {
      expressionMotion.target[delayedEye] = {
        ...expressionMotion.current[delayedEye]
      };
      const gestureId = expressionMotion.gestureId;

      expressionEyeLagTimerId = window.setTimeout(() => {
        if (faceMotion.expression.gestureId !== gestureId) return;
        faceMotion.expression.target[delayedEye] = expression[delayedEye];
        startCursorFaceMotion();
      }, dynamics.lag);
    } else {
      expressionMotion.target[delayedEye] = expression[delayedEye];
    }

    cursorFace.dataset.expression = expressionName;

    if (expressionName === 'spin') {
      startCursorFaceSpin(activeDuration);
    }

    startCursorFaceMotion();
  }

  function getRandomRoutineIndex(routines, excludedIndex) {
    if (routines.length < 2) return 0;

    let routineIndex = Math.floor(Math.random() * routines.length);
    while (routineIndex === excludedIndex) {
      routineIndex = Math.floor(Math.random() * routines.length);
    }
    return routineIndex;
  }

  function clearCursorFaceExpressionTimers() {
    window.clearTimeout(autonomousExpressionTimerId);
    window.clearTimeout(expressionSequenceTimerId);
    window.clearTimeout(expressionEyeLagTimerId);
  }

  function playCursorFaceRoutine(routine, beatIndex = 0, onComplete) {
    const beat = routine[beatIndex];
    if (!beat) {
      onComplete?.();
      return;
    }

    setCursorFaceExpression(beat.name, beat.duration);
    expressionSequenceTimerId = window.setTimeout(() => {
      playCursorFaceRoutine(routine, beatIndex + 1, onComplete);
    }, beat.duration);
  }

  function scheduleAutonomousCursorFaceExpression(delay = 2800 + Math.random() * 3200) {
    window.clearTimeout(autonomousExpressionTimerId);
    autonomousExpressionTimerId = window.setTimeout(() => {
      if (document.hidden || isPointerTouchingFace) {
        scheduleAutonomousCursorFaceExpression();
        return;
      }

      const routineIndex = shouldLeadWithSignatureSpin
        ? AUTONOMOUS_CURSOR_FACE_ROUTINES.length - 1
        : getRandomRoutineIndex(
          AUTONOMOUS_CURSOR_FACE_ROUTINES,
          previousAutonomousRoutineIndex
        );
      shouldLeadWithSignatureSpin = false;
      previousAutonomousRoutineIndex = routineIndex;
      playCursorFaceRoutine(AUTONOMOUS_CURSOR_FACE_ROUTINES[routineIndex], 0, () => {
        setCursorFaceExpression('neutral', 520);
        expressionSequenceTimerId = window.setTimeout(() => {
          scheduleAutonomousCursorFaceExpression(2500 + Math.random() * 3200);
        }, 520);
      });
    }, delay);
  }

  function playCursorFaceContactReaction(now, isInitialContact) {
    clearCursorFaceExpressionTimers();
    const routines = isInitialContact
      ? CONTACT_CURSOR_FACE_ROUTINES
      : CONTINUED_CONTACT_CURSOR_FACE_ROUTINES;
    const routineIndex = getRandomRoutineIndex(routines, previousContactRoutineIndex);
    const routine = routines[routineIndex];
    const routineDuration = routine.reduce((duration, beat) => duration + beat.duration, 0);
    previousContactRoutineIndex = routineIndex;
    nextContactExpressionTime = now + routineDuration + 800;

    playCursorFaceRoutine(routine, 0, () => {
      if (!isPointerTouchingFace) return;
      setCursorFaceExpression('neutral', 520);
      nextContactExpressionTime = performance.now() + 800 + Math.random() * 500;
    });
  }

  function updateCursorFaceContact(event, faceBounds) {
    const centerX = faceBounds.left + faceBounds.width / 2;
    const centerY = faceBounds.top + faceBounds.height / 2;
    const radius = Math.min(faceBounds.width, faceBounds.height) * 0.49;
    const isTouching = Math.hypot(event.clientX - centerX, event.clientY - centerY) <= radius;
    const now = event.timeStamp || performance.now();

    if (isTouching && !isPointerTouchingFace) {
      isPointerTouchingFace = true;
      playCursorFaceContactReaction(now, true);
      return;
    }

    if (isTouching && now >= nextContactExpressionTime) {
      playCursorFaceContactReaction(now, false);
      return;
    }

    if (!isTouching && isPointerTouchingFace) {
      isPointerTouchingFace = false;
      clearCursorFaceExpressionTimers();
      setCursorFaceExpression('neutral', 560);
      scheduleAutonomousCursorFaceExpression(2200 + Math.random() * 2400);
    }
  }

  function getCursorFaceSaccadeValue(elapsed, phase, interval) {
    const segment = elapsed / interval;
    const segmentIndex = Math.floor(segment);
    const segmentProgress = segment - segmentIndex;
    const valueAt = (index) => Math.sin((index + phase) * 12.9898 + phase * 37.719);
    const from = valueAt(segmentIndex);
    const to = valueAt(segmentIndex + 1);
    const movementProgress = Math.min(1, segmentProgress / 0.14);
    const easedProgress = 1 - (1 - movementProgress) ** 3;

    return from + (to - from) * easedProgress;
  }

  function getCursorFaceOrganicMotion(now) {
    const expressionMotion = faceMotion.expression;
    const dynamics = CURSOR_FACE_EXPRESSION_DYNAMICS[expressionMotion.name]
      ?? CURSOR_FACE_EXPRESSION_DYNAMICS.neutral;
    const elapsed = Math.max(0, now - expressionMotion.startedAt);
    const phase = expressionMotion.gestureId * 0.731;
    const isActive = now < expressionMotion.activeUntil;
    const intensity = isActive ? dynamics.organic : 0;
    const horizontalSaccade = getCursorFaceSaccadeValue(elapsed, phase, 620);
    const verticalSaccade = getCursorFaceSaccadeValue(elapsed, phase + 2.17, 790);
    const slowSettle = Math.sin(elapsed * 0.0052 + phase) * 0.18 * intensity;
    const organicMotion = {
      left: {
        x: horizontalSaccade * 0.42 * intensity,
        y: verticalSaccade * 0.22 * intensity + slowSettle,
        rotation: horizontalSaccade * 0.38 * intensity,
        scaleX: 0,
        scaleY: Math.sin(elapsed * 0.007 + phase) * 0.008 * intensity
      },
      right: {
        x: horizontalSaccade * 0.36 * intensity,
        y: verticalSaccade * 0.19 * intensity + slowSettle * 0.82,
        rotation: horizontalSaccade * 0.31 * intensity,
        scaleX: 0,
        scaleY: Math.sin(elapsed * 0.0064 + phase + 0.4) * 0.007 * intensity
      }
    };

    if (expressionMotion.name === 'startled') {
      const recoil = Math.exp(-elapsed / 260);
      const tremble = Math.sin(elapsed * 0.13) * 1.35 * recoil;
      organicMotion.left.x += tremble;
      organicMotion.right.x -= tremble;
      organicMotion.left.y -= Math.abs(tremble) * 0.28;
      organicMotion.right.y -= Math.abs(tremble) * 0.24;
      organicMotion.left.rotation += tremble * 1.25;
      organicMotion.right.rotation -= tremble * 1.25;
    }

    if (expressionMotion.name === 'dizzy') {
      const sway = Math.sin(elapsed * 0.013 + phase);
      organicMotion.left.x += sway * 1.2;
      organicMotion.right.x -= sway * 1.2;
      organicMotion.left.y += Math.cos(elapsed * 0.011) * 0.65;
      organicMotion.right.y -= Math.cos(elapsed * 0.011) * 0.65;
      organicMotion.left.rotation += sway * 3.1;
      organicMotion.right.rotation += sway * 3.1;
    }

    if (expressionMotion.name === 'anxious' || expressionMotion.name === 'overwhelmed') {
      const nervousTremble = Math.sin(elapsed * 0.09 + phase) * 0.42 * intensity;
      organicMotion.left.x += nervousTremble;
      organicMotion.right.x += nervousTremble * 0.78;
    }

    if (expressionMotion.name === 'delighted') {
      const happyBounce = Math.sin(elapsed * 0.014) * 0.28;
      organicMotion.left.y -= happyBounce;
      organicMotion.right.y -= happyBounce * 0.9;
      organicMotion.left.rotation -= happyBounce * 1.4;
      organicMotion.right.rotation += happyBounce * 1.4;
    }

    if (['weary', 'tired', 'bored', 'exhausted'].includes(expressionMotion.name)) {
      const sleepyDrift = (1 - Math.cos(elapsed * 0.0032)) * 0.24;
      organicMotion.left.y += sleepyDrift;
      organicMotion.right.y += sleepyDrift * 0.88;
    }

    if (expressionMotion.name === 'sideEye' || expressionMotion.name === 'sly') {
      organicMotion.left.x += horizontalSaccade * 0.48;
      organicMotion.right.x += horizontalSaccade * 0.42;
    }

    return organicMotion;
  }

  function getCursorGaze(cursorX, cursorY, originX, originY, responseRadius) {
    const deltaX = cursorX - originX;
    const deltaY = cursorY - originY;
    const distance = Math.max(0.001, Math.hypot(deltaX, deltaY));
    const intensity = 1 - Math.exp(-distance / responseRadius);

    return {
      x: deltaX / distance * intensity,
      y: deltaY / distance * intensity
    };
  }

  function renderCursorFace(now) {
    const frameScale = faceMotion.previousFrameTime === null
      ? 1
      : Math.min(2, (now - faceMotion.previousFrameTime) / 16.67);

    faceMotion.previousFrameTime = now;

    updateFaceSpring(
      faceMotion.head,
      faceMotion.targetX,
      faceMotion.targetY,
      0.035,
      0.74,
      frameScale
    );
    updateFaceSpring(
      faceMotion.leftEye,
      faceMotion.leftEye.targetX,
      faceMotion.leftEye.targetY,
      0.11,
      0.63,
      frameScale
    );
    updateFaceSpring(
      faceMotion.rightEye,
      faceMotion.rightEye.targetX,
      faceMotion.rightEye.targetY,
      0.092,
      0.67,
      frameScale
    );
    updateCursorFaceExpression(frameScale);

    const headDistance = Math.min(1, Math.hypot(faceMotion.head.x, faceMotion.head.y));
    const headVelocity = Math.hypot(faceMotion.head.velocityX, faceMotion.head.velocityY);
    const renderedLeftX = clampFaceMotion(faceMotion.leftEye.x + faceMotion.leftEye.velocityX * 0.55);
    const renderedLeftY = clampFaceMotion(faceMotion.leftEye.y + faceMotion.leftEye.velocityY * 0.55);
    const renderedRightX = clampFaceMotion(faceMotion.rightEye.x + faceMotion.rightEye.velocityX * 0.68);
    const renderedRightY = clampFaceMotion(faceMotion.rightEye.y + faceMotion.rightEye.velocityY * 0.68);

    const expressionPose = faceMotion.expression.current;
    const organicMotion = getCursorFaceOrganicMotion(now);
    const leftGazeX = renderedLeftX * 36 * expressionPose.gaze;
    const leftGazeY = renderedLeftY * 33 * expressionPose.gaze;
    const rightGazeX = renderedRightX * 39 * expressionPose.gaze;
    const rightGazeY = renderedRightY * 35 * expressionPose.gaze;
    const leftLocalX = leftGazeX + expressionPose.left.x + organicMotion.left.x;
    const rightLocalX = rightGazeX + expressionPose.right.x + organicMotion.right.x;
    const spinMotion = getCursorFaceSpinMotion(now);
    const leftSpinProjection = getCursorFaceEyeSpinProjection(
      CURSOR_FACE_LEFT_EYE_CENTER_X,
      leftLocalX,
      spinMotion.angle
    );
    const rightSpinProjection = getCursorFaceEyeSpinProjection(
      CURSOR_FACE_RIGHT_EYE_CENTER_X,
      rightLocalX,
      spinMotion.angle
    );
    const spinMomentum = Math.sin(spinMotion.progress * Math.PI);
    const spinLean = spinMotion.direction * spinMomentum * 1.1;
    const headScaleX = (1 + headDistance * 0.008 + headVelocity * 0.035)
      * (1 - spinMomentum * 0.012);
    const headScaleY = (1 - headDistance * 0.006 + headVelocity * 0.018)
      * (1 + spinMomentum * 0.008);

    cursorFaceAsset.style.transform = `translate(${faceMotion.head.x * 4}px, ${faceMotion.head.y * 4}px) rotate(${faceMotion.head.x * 3.8 + spinLean}deg) scale(${headScaleX}, ${headScaleY})`;
    cursorFaceLeftEye.style.opacity = String(leftSpinProjection.opacity);
    cursorFaceRightEye.style.opacity = String(rightSpinProjection.opacity);
    cursorFaceLeftEye.style.transform = `translate(${leftSpinProjection.x}px, ${leftGazeY + expressionPose.left.y + organicMotion.left.y}px) rotate(${renderedLeftX * 15 - renderedLeftY * 3 + expressionPose.left.rotation + organicMotion.left.rotation}deg) scale(${(expressionPose.left.scaleX + organicMotion.left.scaleX) * leftSpinProjection.scaleX}, ${Math.max(0.045, expressionPose.left.scaleY + organicMotion.left.scaleY)})`;
    cursorFaceRightEye.style.transform = `translate(${rightSpinProjection.x}px, ${rightGazeY + expressionPose.right.y + organicMotion.right.y}px) rotate(${renderedRightX * 18 + renderedRightY * 3 + expressionPose.right.rotation + organicMotion.right.rotation}deg) scale(${(expressionPose.right.scaleX + organicMotion.right.scaleX) * rightSpinProjection.scaleX}, ${Math.max(0.045, expressionPose.right.scaleY + organicMotion.right.scaleY)})`;

    const springs = [faceMotion.head, faceMotion.leftEye, faceMotion.rightEye];
    const isSettled = Math.abs(faceMotion.head.x - faceMotion.targetX) < 0.001
      && Math.abs(faceMotion.head.y - faceMotion.targetY) < 0.001
      && Math.abs(faceMotion.leftEye.x - faceMotion.leftEye.targetX) < 0.001
      && Math.abs(faceMotion.leftEye.y - faceMotion.leftEye.targetY) < 0.001
      && Math.abs(faceMotion.rightEye.x - faceMotion.rightEye.targetX) < 0.001
      && Math.abs(faceMotion.rightEye.y - faceMotion.rightEye.targetY) < 0.001
      && springs.every((spring) => (
        Math.abs(spring.velocityX) < 0.0005 && Math.abs(spring.velocityY) < 0.0005
      ))
      && isCursorFaceExpressionSettled()
      && !faceMotion.spin.active
      && now >= faceMotion.expression.activeUntil;

    if (isSettled) {
      faceMotion.frameId = null;
      faceMotion.previousFrameTime = null;
      return;
    }

    faceMotion.frameId = requestAnimationFrame(renderCursorFace);
  }

  function startCursorFaceMotion() {
    if (faceMotion.frameId === null) {
      faceMotion.frameId = requestAnimationFrame(renderCursorFace);
    }
  }

  window.addEventListener('pointermove', (event) => {
    const faceBounds = cursorFace.getBoundingClientRect();
    updateCursorFaceContact(event, faceBounds);
    const centerX = faceBounds.left + faceBounds.width / 2;
    const centerY = faceBounds.top + faceBounds.height / 2;
    const leftEyeCenterX = faceBounds.left + faceBounds.width * (51.525 / 135);
    const rightEyeCenterX = faceBounds.left + faceBounds.width * (83.525 / 135);
    const eyeCenterY = faceBounds.top + faceBounds.height * (67.06 / 135);
    const responseRadius = Math.max(
      160,
      Math.min(240, Math.min(window.innerWidth, window.innerHeight) * 0.25)
    );
    const headGaze = getCursorGaze(
      event.clientX,
      event.clientY,
      centerX,
      centerY,
      responseRadius * 1.15
    );
    const leftGaze = getCursorGaze(
      event.clientX,
      event.clientY,
      leftEyeCenterX,
      eyeCenterY,
      responseRadius
    );
    const rightGaze = getCursorGaze(
      event.clientX,
      event.clientY,
      rightEyeCenterX,
      eyeCenterY,
      responseRadius
    );
    const pointerTime = event.timeStamp || performance.now();
    const pointerDeltaTime = faceMotion.previousPointerTime === null
      ? 16.67
      : Math.max(8, Math.min(80, pointerTime - faceMotion.previousPointerTime));
    const pointerVelocityX = faceMotion.previousPointerX === null
      ? 0
      : (event.clientX - faceMotion.previousPointerX) / pointerDeltaTime;
    const pointerVelocityY = faceMotion.previousPointerY === null
      ? 0
      : (event.clientY - faceMotion.previousPointerY) / pointerDeltaTime;
    const velocityLeadX = clampFaceMotion(pointerVelocityX * 0.055) * 0.12;
    const velocityLeadY = clampFaceMotion(pointerVelocityY * 0.055) * 0.12;

    faceMotion.targetX = clampFaceMotion(headGaze.x);
    faceMotion.targetY = clampFaceMotion(headGaze.y);
    faceMotion.leftEye.targetX = clampFaceMotion(
      leftGaze.x * (leftGaze.x < 0 ? 1.04 : 0.92) + velocityLeadX
    );
    faceMotion.leftEye.targetY = clampFaceMotion(leftGaze.y * 0.96 + velocityLeadY);
    faceMotion.rightEye.targetX = clampFaceMotion(
      rightGaze.x * (rightGaze.x > 0 ? 1.04 : 0.92) + velocityLeadX * 0.86
    );
    faceMotion.rightEye.targetY = clampFaceMotion(rightGaze.y * 1.02 + velocityLeadY * 0.9);
    faceMotion.previousPointerX = event.clientX;
    faceMotion.previousPointerY = event.clientY;
    faceMotion.previousPointerTime = pointerTime;
    startCursorFaceMotion();
  }, { passive: true });

  document.documentElement.addEventListener('mouseleave', () => {
    clearCursorFaceExpressionTimers();
    isPointerTouchingFace = false;
    setCursorFaceExpression('neutral');
    scheduleAutonomousCursorFaceExpression(1600 + Math.random() * 1800);
    faceMotion.targetX = 0;
    faceMotion.targetY = 0;
    faceMotion.leftEye.targetX = 0;
    faceMotion.leftEye.targetY = 0;
    faceMotion.rightEye.targetX = 0;
    faceMotion.rightEye.targetY = 0;
    faceMotion.previousPointerX = null;
    faceMotion.previousPointerY = null;
    faceMotion.previousPointerTime = null;
    startCursorFaceMotion();
  });

  let blinkTimerId = null;
  let cursorFaceBlinkEndHandler = null;
  const CURSOR_FACE_BLINK_SUPPRESSED_EXPRESSIONS = new Set([
    'wink', 'delighted', 'weary', 'tired', 'bored', 'exhausted', 'spin'
  ]);

  function stopCursorFaceBlink() {
    if (cursorFaceBlinkEndHandler) {
      cursorFaceBlink.removeEventListener('animationend', cursorFaceBlinkEndHandler);
      cursorFaceBlinkEndHandler = null;
    }
    cursorFaceBlink.classList.remove('is-blinking');
  }

  function scheduleCursorFaceBlink(delay = 2400 + Math.random() * 4200) {
    window.clearTimeout(blinkTimerId);
    blinkTimerId = window.setTimeout(() => playCursorFaceBlink(true), delay);
  }

  function playCursorFaceBlink(canDoubleBlink) {
    if (document.hidden) {
      scheduleCursorFaceBlink();
      return;
    }

    if (
      faceMotion.spin.active
      || CURSOR_FACE_BLINK_SUPPRESSED_EXPRESSIONS.has(faceMotion.expression.name)
    ) {
      scheduleCursorFaceBlink(650 + Math.random() * 850);
      return;
    }

    const isReflectiveExpression = ['worried', 'sad', 'dejected'].includes(
      faceMotion.expression.name
    );
    const blinkDuration = isReflectiveExpression && Math.random() < 0.45
      ? 225 + Math.random() * 55
      : 155 + Math.random() * 55;
    cursorFaceBlink.style.setProperty('--cursor-face-blink-duration', `${blinkDuration}ms`);

    stopCursorFaceBlink();
    cursorFaceBlink.classList.add('is-blinking');
    cursorFaceBlinkEndHandler = () => {
      cursorFaceBlink.removeEventListener('animationend', cursorFaceBlinkEndHandler);
      cursorFaceBlinkEndHandler = null;
      cursorFaceBlink.classList.remove('is-blinking');

      if (canDoubleBlink && Math.random() < 0.18) {
        blinkTimerId = window.setTimeout(() => playCursorFaceBlink(false), 115 + Math.random() * 95);
        return;
      }

      scheduleCursorFaceBlink();
    };
    cursorFaceBlink.addEventListener('animationend', cursorFaceBlinkEndHandler);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      window.clearTimeout(blinkTimerId);
      clearCursorFaceExpressionTimers();
      stopCursorFaceBlink();
      return;
    }

    setCursorFaceExpression('neutral');
    scheduleAutonomousCursorFaceExpression(1200 + Math.random() * 1800);
    scheduleCursorFaceBlink(900 + Math.random() * 1800);
  });

  cursorFace.dataset.expression = 'neutral';
  scheduleAutonomousCursorFaceExpression(1800 + Math.random() * 2200);
  scheduleCursorFaceBlink(1600 + Math.random() * 1800);
}


/* ---------- Project case-study content ---------- */

const PROJECT_CASE_STUDIES = [
  {
    id: 'double-ai',
    number: '01',
    title: 'Double AI — Voice AI Agent',
    description: 'Case study: designing Double AI’s agentic platform across AI Twin Agents, voice, onboarding, analytics, workflow automation, billing, and referrals.',
    subtitle: 'Designing an agentic platform that turns professional identity into an interactive AI Twin.',
    image: 'assets/images/projects/double-ai.webp',
    role: 'Product Designer',
    year: '2026',
    tools: 'Figma, AI for research and flow design, AI coding agents',
    tags: ['AI twin', 'AI SaaS', 'Voice agent', 'Identity'],
    hook: 'Professional profiles can explain who someone is, but they cannot answer questions, qualify intent, or act on their behalf. Double AI turns that static identity into an AI Twin Agent that people can configure, teach, speak with, and use to engage visitors.',
    context: {
      Company: 'Double AI (Early-Stage AI Startup)',
      Role: 'Sole Product Designer',
      Timeline: '2025 December - present',
      Team: 'Founders and engineering',
      Tools: 'Figma, AI for research and flow design, AI coding agents',
      Constraints: 'The product had to move quickly while voice cloning, text-to-speech quality, open-source model performance, and GPU infrastructure were still evolving.'
    },
    challenge: 'Double AI is an agentic platform for professionals who want to create an AI Twin that can represent their identity, use their knowledge, speak in a cloned voice, interact with visitors, and support lead-generation workflows.',
    details: 'I owned the end-to-end UX as the sole designer, partnering directly with founders and engineering across conversational AI, voice interfaces, onboarding, analytics, workflow automation, and billing. The central design challenge was turning a technically complex set of capabilities into one understandable path from identity to working agent.',
    problems: {
      'Business problem': 'The original digital-card product gave professionals a richer identity layer, but it remained a passive destination. As general-purpose AI agents became more capable, Double AI needed a stronger proposition: help professionals turn their identity and knowledge into an agent that could engage visitors, qualify leads, and support repeatable work.',
      'User problem': 'Creating a useful AI Twin required people to bring together their profile, knowledge, personality, voice, actions, and usage settings. The experience had to make that complexity understandable without asking users to think like AI engineers.'
    },
    process: {
      'Research & benchmarking': 'The founders brought deep sales-workflow knowledge to the product direction. I used session recordings and user feedback to evaluate how people moved through the existing experience, identify friction, and turn those observations into changes across setup and core product flows.',
      'Ideation & flow design': 'When the product shifted from a digital card to an agent-first platform, I helped redefine its mental model: the profile became the identity and knowledge foundation for an active AI Twin. I mapped that model across six connected surfaces—conversational agents, voice, onboarding, analytics, workflow automation, and billing.',
      'Trade-offs & priorities': 'We needed to demonstrate and ship the new direction quickly while the underlying AI and voice stack was still changing. I designed within those technical limits, prioritized the flows needed to make the agent understandable and usable, and used Figma MCP and AI coding agents to deliver developer-ready specifications directly to engineering.',
      'Iterations & feedback': 'I redesigned onboarding to move users from signup to a working AI Twin in fewer, clearer steps. I continued refining the product through session recordings, feedback, and close collaboration with engineering, contributing to more than five major feature releases in three months.'
    },
    difficulty: 'The original product was built around digital identity and business cards. Rapid improvements in general-purpose AI agents weakened that positioning, so the company moved toward an agentic platform. As the sole designer, I translated that strategic change into the product itself—reframing a static profile as an active AI Twin and redesigning the journeys around creating, configuring, demonstrating, and managing that agent.',
    impact: {
      Quantitative: 'The Double AI platform serves more than 600 professionals who create, manage, and interact with AI Twin Agents. I helped ship 5+ major feature releases in three months.',
      Qualitative: 'The redesign gave the pivot a coherent end-to-end experience: a clearer path from signup to a working agent, connected controls for knowledge and voice, visibility into leads and usage, and referral and billing flows that support monetization.'
    },
    architecture: [
      'Conversational AI agents grounded in each professional’s identity and knowledge.',
      'Voice interfaces for cloning, configuring, and speaking with an AI Twin.',
      'Onboarding from account creation to a working agent.',
      'Analytics for conversations, leads, and product usage.',
      'Actions and workflow automation for agent-led tasks.',
      'Billing, usage limits, and referrals supporting product monetization.'
    ],
    video: { title: 'Double AI product walkthrough', youtubeId: 'vSX0Tjq4voU' },
    gallery: Array.from({ length: 10 }, (_, index) => ({
      src: `assets/images/double-ai/Double ai ${index + 1}.webp`,
      alt: `Double AI product frame ${index + 1}`
    })),
    liveUrl: 'https://thedouble.ai/',
    linkText: 'View product',
    work: [
      'Owned end-to-end UX across six product surfaces as the sole designer embedded with founders and engineering.',
      'Redesigned onboarding to take users from signup to a working AI Twin through fewer, clearer, and more intuitive steps.',
      'Designed the conversational and voice-agent experience, including personality, knowledge, voice configuration, chat, and usage states.',
      'Designed Actions and Workflows so an AI Twin could move beyond answering questions and support repeatable tasks.',
      'Created the AI Agent Demo Feature to make the agent-first proposition easier to experience and communicate.',
      'Designed analytics for conversations, leads, and usage so professionals could understand how their AI Twin was performing.',
      'Designed referral, pricing, billing, and limit-management flows end to end to support monetization.',
      'Used Figma MCP and AI coding agents to shorten design-to-development handoff and ship developer-ready specifications directly.'
    ]
  },
  {
    id: 'maruti-suzuki-smartplay', number: '02', title: 'Maruti Suzuki SmartPlay Pro X',
    description: 'Case study: designing the production SmartPlay Pro X automotive infotainment experience shipped in the Maruti Suzuki Victoris.',
    subtitle: 'Taking a 10.1-inch automotive HMI from early concepts to production.', image: 'assets/images/projects/maruti-suzuki.webp', role: 'Product Designer', year: '2025',
    tools: 'Figma, Adobe Creative Suite, competitive benchmarking, usability analysis', tags: ['10.1-inch', 'Infotainment HMI', 'Automotive UI'],
    hook: 'Designing for a car is different from designing for a browser: every interaction has to remain clear at a glance, responsive on constrained hardware, and dependable across changing road and light conditions. I helped take SmartPlay Pro X from early interaction models to a production HMI shipped in the Maruti Suzuki Victoris.',
    context: { Company: 'Maruti Suzuki', Role: 'Product Designer (Automotive HMI)', Timeline: '2 years · concept to production-ready handoff', Team: 'Two designers, one Maruti Suzuki engineer, and two Bosch engineers', Tools: 'Figma, Adobe Creative Suite, competitive benchmarking, usability analysis', Constraints: 'Automotive-grade hardware, limited processing power, display latency, fixed screen geometry, safety requirements, and legibility across real driving conditions.' },
    challenge: 'SmartPlay Pro X is Maruti Suzuki’s 10.1-inch connected infotainment system, designed for production vehicles rather than as a concept interface. It combines native vehicle experiences with smartphone connectivity, voice assistance, built-in applications, and OTA updates.',
    details: 'I contributed across the product lifecycle: competitive benchmarking, user flows, information architecture, interaction models, high-fidelity UI, design-system foundations, and production-ready specifications. The central challenge was preserving clarity and consistency while translating the design into constrained automotive hardware with embedded and firmware engineers.',
    problems: { 'Business problem': 'Maruti Suzuki needed a modern infotainment experience for its next generation of vehicles while preserving the reliability, consistency, and production feasibility expected of an automotive platform. The system also needed reusable foundations that could support more than one vehicle interface.', 'User problem': 'Drivers needed familiar functions—navigation, media, calling, vehicle controls, and smartphone connectivity—to be easy to find and understand without demanding prolonged attention. Wireless Apple CarPlay and Android Auto were becoming baseline expectations, but the native HMI still had to feel coherent and useful.' },
    process: { 'Research & benchmarking': 'I benchmarked automotive HMIs from Hyundai, Tata, and other manufacturers, studying navigation depth, information hierarchy, common interaction patterns, and how competing systems handled frequently used driving tasks. Usability analysis and in-vehicle evaluation helped move decisions beyond visual comparison alone.', 'Ideation & flow design': 'Working as one of two designers, I built user flows, information architecture, and interaction models from early concepts through production-ready handoff. I also contributed reusable components, interaction patterns, iconography, and UI standards to a design-system foundation used across infotainment and cluster interfaces.', 'Trade-offs & priorities': 'SmartPlay Pro X could not be treated like a smartphone interface. I worked directly with Maruti Suzuki and Bosch engineers to align layouts, states, transitions, and specifications with limited processing power, display latency, fixed hardware, safety considerations, and implementation feasibility.', 'Iterations & feedback': 'We reviewed concepts with stakeholders and engineering, then evaluated them in realistic vehicle and lighting conditions. That loop exposed problems a studio monitor could not: an early dark visual direction lost legibility in daylight, requiring a system-level response rather than a cosmetic adjustment.' },
    difficulty: 'Our initial dark theme used subtle neon accents and looked strong in controlled reviews. In daylight road tests, glare made critical interface elements difficult to read—a failure that would not have surfaced on a studio monitor. We rebuilt the visual system around higher contrast and automatic day/night switching driven by the vehicle’s ambient-light sensor. Legibility became adaptive system behaviour, not merely a static colour choice.',
    impact: { Quantitative: 'SmartPlay Pro X shipped in the Maruti Suzuki Victoris. The vehicle reached more than 100,000 units sold within nine months of launch—the fastest ramp among models in Maruti Suzuki’s current portfolio—showing the production scale at which the HMI is experienced.', Qualitative: 'The production system brought together a 10.1-inch interface, wireless Apple CarPlay and Android Auto, Alexa Auto Voice AI, built-in apps, and over-the-air updates within one coherent HMI. The underlying component and interaction standards also contributed to consistency across multiple vehicle interfaces.' },
    liveUrl: 'https://www.marutisuzuki.com/arena/victoris#technology-block', linkText: 'View product',
    work: ['Built the user flows, information architecture, and interaction models that took SmartPlay Pro X from early concepts to production-ready handoff.', 'Designed navigation, system states, and screen behaviour around glanceability, predictable access to frequent actions, and the realities of in-vehicle attention.', 'Reworked the visual system after daylight road testing exposed glare, introducing higher contrast and ambient-light-driven day/night behaviour.', 'Contributed reusable components, interaction patterns, iconography, and UI standards adopted across multiple infotainment and cluster interfaces.', 'Partnered directly with embedded and firmware engineers to resolve hardware constraints, display latency, specification details, and production feasibility.']
  },
  {
    id: 'quilo', number: '03', title: 'Quilo Chrome Extension',
    description: 'Case study: conceiving, designing, building, and launching Quilo, an AI prompt library spanning a Chrome extension and a Next.js web application.',
    subtitle: 'Taking an AI prompt library from browser extension to a connected product ecosystem.', image: 'assets/images/projects/quilo.webp', role: 'Product Designer & Builder', year: '2025',
    tools: 'Figma, Claude Code, Chrome APIs, Next.js, React, Tailwind CSS, Vercel', tags: ['0→1 product', 'Browser extension', 'Product growth'],
    hook: 'Reusable prompts often live in documents and notes, away from the AI tools where people need them. I designed Quilo to make finding, adapting, and reusing a prompt part of the conversation—first through a Chrome extension, then through a companion web application for easier management.',
    context: { Company: 'Quilo (Self-Initiated Product)', Role: 'Product Designer & Builder', Timeline: '3 months · 2025', Team: 'Independent project', Tools: 'Figma, Claude Code, Chrome APIs, Next.js, React, Tailwind CSS, Vercel', Constraints: 'A zero-marketing-budget launch, Chrome extension security and interaction constraints, and the need to keep the first version lightweight and privacy-conscious.' },
    challenge: 'Quilo is a self-initiated AI prompt library that I conceived, designed, built, and launched. Its first release placed 56+ curated prompts and personal prompt management directly inside the browser; its second iteration explored a companion web application for managing the library beyond the extension window.',
    details: 'Owning the full lifecycle made this both a product-design and product-building exercise. I defined the product scope, structured the content taxonomy, designed the interaction model, built both surfaces, prepared the Chrome Web Store launch, localized the listing, and used the resulting acquisition data to identify where the product needed to improve next.',
    problems: { 'Business problem': 'The product needed to prove that a focused prompt utility could provide immediate value before I invested in accounts, cloud infrastructure, and synchronization. After launch, the harder problem became distribution: turning Chrome Web Store visitors into active installs.', 'User problem': 'People using multiple AI tools had to retrieve prompts from disconnected documents or notes, interrupting their work. They needed fast access to useful starting points as well as a simple way to create and manage prompts of their own.' },
    process: { 'Research & benchmarking': 'I framed the first release around the complete prompt-reuse journey: discover a useful prompt, find it again, adapt it, copy it into an AI tool, and create personal prompts. That led to a launch catalogue of 56+ curated prompts organized across 16+ categories for different professional use cases.', 'Ideation & flow design': 'I chose a Chrome extension because it could remain available on top of the websites where AI conversations already happened. The experience combined keyboard access, real-time search, category filtering, one-click copying, and custom prompt management in a compact browser surface.', 'Trade-offs & priorities': 'For the first release, I used local storage instead of introducing accounts and cloud sync. That kept the extension lightweight, reduced infrastructure scope, enabled offline use, and avoided collecting user data while I tested whether the core utility deserved a larger system.', 'Iterations & feedback': 'The second iteration expanded Quilo into a standalone Next.js and React web application deployed on Vercel. I explored a connected model in which the extension provided in-context access while the web application offered more space to organize and manage a growing prompt library.' },
    difficulty: 'The product reached 680 visitors at its peak but converted only 41 into active installs. That gap challenged the assumption that shipping a useful product was enough to create adoption. It reframed the next design problem around the acquisition funnel—positioning, store-listing communication, screenshots, trust, and the moment of install—rather than adding more features to the extension.',
    impact: { Quantitative: 'Localized Chrome Web Store listings in English, Spanish, and Portuguese reached 680 unique visitors at peak across 7+ countries, including the United States, Brazil, and India. The funnel converted to 41 active installs—approximately 6%.', Qualitative: 'The launch validated that I could take a product through research, information architecture, interaction design, implementation, localization, and distribution independently. More importantly, the modest conversion rate identified the listing-to-install funnel—not feature depth—as the clearest growth bottleneck.' },
    architecture: ['Chrome extension for in-context prompt discovery and reuse.', '56+ curated prompts organized across 16+ categories.', 'Real-time search, filtering, keyboard access, and one-click copying.', 'Custom prompt creation and local, offline management.', 'Companion web-application concept for managing prompts at greater scale.', 'Reusable interface patterns shared across the extension and web product.'],
    liveUrl: 'https://chromewebstore.google.com/detail/quilo-%E2%80%93-ai-prompt-library/ofdelgfdnchpifecekmlaanebfkboehb', linkText: 'View Chrome extension',
    work: ['Owned the full 0→1 lifecycle from problem framing and product scope through design, implementation, localization, and Chrome Web Store launch.', 'Designed the prompt taxonomy, search and filtering model, custom-prompt workflow, keyboard interactions, and offline experience.', 'Curated and structured 56+ prompts across 16+ categories to make the product useful immediately after installation.', 'Built the Chrome extension and a second product iteration using Next.js, React, Tailwind CSS, and Vercel.', 'Established reusable UI patterns and component-driven architecture across the extension and web application.', 'Localized the store presence into three languages and analyzed the 680-visitor to 41-install funnel to identify conversion as the primary growth constraint.']
  },
  {
    id: 'autoflux', number: '04', title: 'AutoFlux.in',
    description: 'Case study: independently designing and building AutoFlux, an India-first platform for comparing EV, hybrid, and CNG vehicles by real-world suitability and ownership cost.',
    subtitle: 'Helping Indian buyers compare alternative-powertrain vehicles beyond the sticker price.', image: 'assets/images/projects/autoflux.webp', role: 'Founder, Product Designer & Builder', year: '2026',
    tools: 'Next.js, React, TypeScript, Payload CMS, PostgreSQL/Neon, Netlify, Trigger.dev, PostHog, Sentry', tags: ['0→1 product', 'Decision design', 'Automotive data', 'Explainable recommendations'],
    hook: 'Choosing between an EV, hybrid, and CNG vehicle is not a specification-comparison problem. Buyers must weigh budget, daily travel, charging access, real-world range, running cost, and long-term ownership at the same time. I built AutoFlux to turn those competing variables into a guided, explainable decision.',
    context: { Company: 'AutoFlux', Role: 'Founder, Product Designer & Builder', Timeline: 'Soft-launched in 2026 · live, before public marketing', Team: 'Independent project', Tools: 'Next.js, React, TypeScript, Payload CMS, PostgreSQL/Neon, Netlify, Trigger.dev, PostHog, Sentry', Constraints: 'Designing a trustworthy decision experience while independently researching and maintaining 188 variant-level records, building the product, and operating within early-stage infrastructure limits.' },
    challenge: 'AutoFlux is an India-first vehicle decision platform for comparing EV, hybrid, and CNG vehicles through real-world range, running cost, and total ownership—not only specifications and sticker price.',
    details: 'I independently own the product end to end: brand identity, information architecture, guided discovery, comparison and catalogue data models, ownership tools, frontend, backend and database structure, content governance, and SEO strategy. The design challenge is to make a technically complex purchase feel understandable without hiding uncertainty or oversimplifying the trade-offs.',
    problems: { 'Business problem': 'India’s vehicle market is expanding beyond petrol and diesel, but established automotive portals are still largely organized around listings, specifications, and purchase price. AutoFlux needed to differentiate through decision support: helping buyers understand which powertrain fits their life and what that choice costs over time.', 'User problem': 'A buyer cannot answer “Which vehicle is right for me?” with a single filter. Budget, commute, body type, charging access, range confidence, fuel cost, financing, and break-even interact with one another. Presenting every variable at once creates overload; hiding the reasoning behind a recommendation creates mistrust.' },
    process: { 'Research & benchmarking': 'I mapped the decision around the questions buyers must resolve, then designed the catalogue around exact variants rather than generic model pages. Each of the 188 records preserves sources, evidence, review status, and normalization assumptions so a recommendation can be traced back to the information behind it.', 'Ideation & flow design': 'I translated that complexity into a four-step guided discovery flow. The sequence narrows the decision progressively instead of exposing a dense filter panel upfront, then carries the buyer into ranked results, side-by-side comparison, saved vehicles, and ownership calculators without making them restart their research.', 'Trade-offs & priorities': 'I separated non-negotiable suitability constraints from weighted preferences. A vehicle that fails a hard requirement should not rank highly because of unrelated strengths; vehicles that remain viable can be ordered by transparent, versioned weights. This makes the recommendation logic explainable and gives the interface a defensible reason for every result.', 'Iterations & feedback': 'The live product is soft-launched and has not yet undergone structured user validation. PostHog is instrumented for the next phase: measuring finder completion, result engagement, comparison and shortlist behaviour, and use of ownership-cost tools before expanding features or investing in acquisition.' },
    difficulty: 'I initially treated acquiring vehicle data as the difficult part. The deeper product problem was deciding when that data was reliable enough to guide a purchase. Specifications change, sources conflict, and real-world range differs from certified figures. I responded by designing provenance, review status, conservative assumptions, public methodology, and corrections into the product model. The limitation remains clear: the experience is live, but its interaction model still needs validation with real buyers.',
    impact: { Quantitative: 'Scope at soft launch—not yet a measure of user impact—includes 188 variant-level vehicle records and 103 generated pages spanning discovery, vehicle research, comparison, calculators, methodology, and supporting content.', Qualitative: 'AutoFlux now has a coherent decision journey from an open-ended need to a traceable recommendation. Its public methodology, source attribution, review states, and corrections framework make trust part of the product experience rather than an invisible editorial promise.' },
    architecture: ['Four-step guided discovery for progressively narrowing a buyer’s needs.', 'Explainable results separating hard suitability requirements from weighted preferences.', 'Exact-variant catalogue, comparison, shortlist, and saved-vehicle journeys.', 'Real-world range, running-cost, EMI, charging, total-cost, and break-even tools.', 'Source attribution, review status, methodology, owner evidence, and correction flows.', 'Programmatic vehicle pages and partial Hindi journeys supporting discovery through search.'],
    liveUrl: 'https://autoflux.in', linkText: 'View live product',
    work: ['Defined the product around buyer decisions and ownership trade-offs rather than recreating a conventional vehicle-listing portal.', 'Designed the information architecture for a four-step finder, ranked results, vehicle comparison, shortlists, saved vehicles, and detail pages.', 'Designed calculators for real-world range, running cost, financing, charging, total ownership, and powertrain break-even.', 'Created an explainable recommendation model that distinguishes hard suitability constraints from weighted preferences.', 'Designed a source-attributed content system with evidence, review status, public methodology, owner input, and correction handling.', 'Built the brand identity and SEO architecture, including structured programmatic pages for each vehicle and multilingual search journeys.', 'Implemented the frontend, backend, database, analytics, and quality infrastructure needed to ship and evaluate the product independently.']
  },
  {
    id: 'formula-1-design', number: '05', title: 'Formula 1 Visual Storytelling',
    description: 'Creative side project: using Formula 1 knowledge, AI media tools, prompting, editing, and audience feedback to build a channel with 1.45M+ lifetime views.',
    subtitle: 'A creative side project in AI-assisted storytelling and audience-led iteration.', image: 'assets/images/projects/formula-1-youtube.webp', role: 'Creator & Designer', year: '2025',
    tools: 'AI video generation, image generation, prompt design, image editing, DaVinci Resolve', tags: ['Creative side project', 'AI media', 'Audience growth'],
    hook: 'Formula 1 history contains extraordinary cars, liveries, and design stories, but archival material cannot always show how those ideas might move, evolve, or look in a new context. I combined subject knowledge, precise prompting, AI media tools, and video editing to turn those ideas into concise visual stories.',
    context: { Company: 'Formula 1 Design Channel', Role: 'Creator & Designer', Timeline: 'F1 content direction developed in 2025 on an existing channel', Team: 'Independent creative side project', Tools: 'AI video generation, image generation, prompt design, image editing, DaVinci Resolve', Constraints: 'Maintaining visual quality and factual credibility while working with inconsistent AI generations, limited archival material, copyright considerations, and a fast-moving content platform.' },
    challenge: 'This is a creative side project, not a conventional product-design case study. I developed a Formula 1 visual-storytelling direction on an existing YouTube channel and used it to explore how AI-assisted creation, domain expertise, and audience feedback can work together.',
    details: 'The value of the project is the process behind the reach: finding a narrow audience promise, translating specialist knowledge into accessible stories, building a repeatable production workflow, and improving that system through behavioural feedback.',
    problems: { 'Business problem': 'The challenge was to establish a recognizable niche and repeatable creative system in an attention-driven platform. Each piece needed a clear premise, strong opening, and distinctive visual language before an audience would choose to watch it.', 'User problem': 'Formula 1 fans already know the sport is visually compelling. The opportunity was to make design history, classic cars, and livery ideas immediately engaging without relying on long, theory-heavy explanations.' },
    process: { 'Research & benchmarking': 'I used my Formula 1 knowledge to identify stories with an immediate visual premise, then studied audience response in YouTube analytics to understand which subjects, openings, and formats earned attention. This was applied creative research rather than a formal product-research study.', 'Ideation & flow design': 'I explored concepts around classic and vintage cars, alternative liveries, and imagined motion. Each video began with a concise narrative idea, followed by prompt development, generation, selection, image correction, sequencing, sound, and final editing.', 'Trade-offs & priorities': 'AI tools accelerated production but did not replace craft. Generated cars often lost defining proportions, sponsor placement, mechanical details, or continuity between frames. I traded volume for control by iterating prompts, rejecting weak outputs, editing images, and using my F1 knowledge to preserve recognizable details.', 'Iterations & feedback': 'I treated each release as a small experiment. Audience response informed the next subject, visual treatment, pacing, and format, while reusable prompt structures and editing patterns made the creative process more consistent over time.' },
    difficulty: 'My earliest approach placed too much value on what AI could generate and too little on why someone would keep watching. More elaborate output did not automatically create a stronger story. I shifted the workflow to start with one clear visual idea and use AI only where it strengthened that idea, making editorial judgment—not generation—the center of the process.',
    impact: { Quantitative: 'The channel has reached 1.45M+ lifetime views and 1,000 subscribers. These figures describe channel reach, not the outcome of a product-design engagement.', Qualitative: 'The project strengthened skills that transfer directly to product work: framing a clear proposition, building a repeatable system, communicating complex ideas visually, reading behavioural signals, and iterating without mistaking output volume for quality.' },
    liveUrl: 'https://www.youtube.com/@formula1design/shorts', linkText: 'View channel',
    work: ['Defined a focused content proposition around Formula 1 cars, liveries, history, and visual experimentation.', 'Combined domain knowledge with detailed prompts to guide AI video and image-generation tools toward credible, recognizable results.', 'Edited generated assets for composition, continuity, factual detail, pacing, sound, and narrative clarity.', 'Built reusable prompt structures and production patterns instead of treating every video as an isolated experiment.', 'Used YouTube performance signals to inform subsequent subjects, openings, pacing, and visual treatments.', 'Grew the channel to 1.45M+ lifetime views and 1,000 subscribers while keeping the work clearly positioned as a creative side project.']
  },
  {
    id: 'u3k-instrument-cluster', number: '06', title: 'Maruti Suzuki U3K Instrument Cluster',
    description: 'Case study: leading the design of a pre-production segmented digital instrument cluster for an entry-level Maruti Suzuki vehicle program.',
    subtitle: 'Making an entry-level instrument cluster feel modern without compromising safety or readability.', image: 'assets/images/projects/u3k.webp', role: 'Product Designer', year: '2024',
    tools: 'Figma, Adobe Creative Suite, competitive benchmarking, automotive HMI analysis', tags: ['Automotive HMI', 'Safety-critical UI', 'Hardware constraints'], underDevelopment: true,
    hook: 'A digital instrument cluster has to modernize the cockpit while communicating safety-critical information in a fraction of a second. As the sole designer, I led U3K from engineering discovery and early proposals to a selected direction now being prepared for prototype development.',
    context: { Company: 'Maruti Suzuki · entry-level vehicle program', Role: 'Product Designer · sole designer', Timeline: '2024 · pre-production prototype preparation', Team: 'MSIL engineering, senior management, and development vendors', Tools: 'Figma, Adobe Creative Suite, competitive benchmarking, automotive HMI analysis', Constraints: 'A sub-₹3,000 target, fixed segmented-display geometry, regulatory tell-tales, limited display states, manufacturing feasibility, and readability across different drivers and conditions.' },
    challenge: 'U3K is a pre-production segmented digital instrument-cluster program for an entry-level Maruti Suzuki vehicle. The project explores how constrained display technology can deliver a modern cockpit experience while protecting glanceability, regulatory compliance, and safety-critical feedback.',
    details: 'I led the design and high-fidelity UI as the sole designer, collaborating with MSIL engineering from initial technical discovery through proposal selection, management review, vendor onboarding, and prototype-ready detailing. Public details are intentionally limited while the program remains under development.',
    problems: { 'Business problem': 'Maruti Suzuki wanted to give an entry-level vehicle program a more contemporary cockpit without moving to the cost and complexity of a full TFT display. The design had to create a premium digital impression while remaining feasible for a tightly constrained production program.', 'User problem': 'The design had to resolve a real tension: younger, first-time buyers expected a modern digital experience, while drivers accustomed to analog meters still needed large, familiar, immediately readable information. Safety-critical tell-tales could never become secondary to visual novelty.' },
    process: { 'Research & benchmarking': 'I worked with MSIL engineers from the start to understand the existing meter architecture, display technology, packaging constraints, and regulatory tell-tales. I complemented that technical study with competitive benchmarking and usability analysis of instrument clusters from Hyundai, Tata, and other manufacturers.', 'Ideation & flow design': 'Using the engineering-provided layout as a fixed foundation, I created initial design proposals for the cluster layout, information hierarchy, speed presentation, supporting vehicle data, and driver-facing tell-tales. My proposed direction was selected to move into further refinement.', 'Trade-offs & priorities': 'A segmented display cannot place or animate information as freely as a TFT screen. I prioritized the speed readout and essential driving information, then worked with engineering to decide which indicators belonged in the primary display and which required dedicated physical tell-tales for clarity, regulation, and failure resilience.', 'Iterations & feedback': 'I incorporated senior-management feedback into successive high-fidelity iterations, onboarded the vendors responsible for developing the meter, and translated the selected design into the visual assets, states, dimensions, and implementation details needed for the first prototype sample.' },
    difficulty: 'An early direction placed turn-signal and headlight status inside the segmented display. Engineering review exposed a critical single point of failure: if the display module failed, the driver could also lose confirmation of those safety-relevant states. I moved them to dedicated physical LED tell-tales outside the main display, separating critical feedback from the failure domain of the digital module.',
    impact: { Quantitative: 'Pre-production outcome: the initial concept was selected and approved for refinement within the program’s sub-₹3,000 target. The project is now being prepared for its first prototype sample; it has not shipped in a production vehicle.', Qualitative: 'The selected direction establishes a clearer hierarchy between primary driving information, secondary vehicle data, and regulatory tell-tales while giving constrained segmented hardware a more contemporary visual character.' },
    work: ['Built a working understanding of the existing meter architecture, regulatory tell-tales, and segmented-display constraints with MSIL engineering.', 'Created the initial cluster proposals; my design direction was selected for further refinement.', 'Defined the cluster layout, information hierarchy, speed presentation, supporting vehicle information, and high-fidelity visual treatment.', 'Moved safety-relevant status indicators outside the main display after identifying a single-point-of-failure risk.', 'Iterated the selected direction with senior-management and engineering feedback while preserving production feasibility.', 'Onboarded development vendors and prepared the assets, states, dimensions, and specifications required to build the first prototype sample.']
  }
];

const PROJECTS_BY_ID = new Map(PROJECT_CASE_STUDIES.map((project) => [project.id, project]));

/* ---------- Interaction state ---------- */

let horizontalScrollTarget = 0;
let scrollAnimationFrameId = null;
let scrollSnapTimerId = null;
let navigationSyncAnimationFrameId = null;
let activeGridIndex = -1;
let isCardTransitionActive = false;

const PROJECT_TRANSITION_TIMING = Object.freeze({
  lift: 170,
  morph: 880,
  contentReveal: 620
});

/* ---------- Intro particle-to-type motion ---------- */

let introParticleAnimationFrameId = null;
let hasCompletedInitialIntroAnimation = false;
let hasStartedInitialIntroAnimation = false;
let resolveInitialIntroAnimation;
const initialIntroAnimationComplete = new Promise((resolve) => {
  resolveInitialIntroAnimation = resolve;
});

function markInitialIntroAnimationComplete() {
  if (hasCompletedInitialIntroAnimation) return;

  hasCompletedInitialIntroAnimation = true;
  resolveInitialIntroAnimation();
}

function smootherStep(progress) {
  const clampedProgress = Math.min(1, Math.max(0, progress));

  return clampedProgress ** 3
    * (clampedProgress * (clampedProgress * 6 - 15) + 10);
}

function getRenderedText(element, styles) {
  const text = element.textContent.trim();

  switch (styles.textTransform) {
    case 'uppercase':
      return text.toLocaleUpperCase(document.documentElement.lang || undefined);
    case 'lowercase':
      return text.toLocaleLowerCase(document.documentElement.lang || undefined);
    case 'capitalize':
      return text.replace(/(^|\s)(\S)/g, (match) => (
        match.toLocaleUpperCase(document.documentElement.lang || undefined)
      ));
    default:
      return text;
  }
}

function createIntroParticleTargets() {
  const titleStyles = getComputedStyle(introTitle);
  const titleBounds = introTitle.getBoundingClientRect();
  const cardBounds = introCard.getBoundingClientRect();
  const sampleCanvas = document.createElement('canvas');
  const sampleContext = sampleCanvas.getContext('2d', { willReadFrequently: true });
  const samplePadding = 6;
  // Canvas text does not inherit CSS text-transform. Sample the exact casing
  // shown by the heading so the particle silhouette and final text match.
  const titleText = getRenderedText(introTitle, titleStyles);
  const lineHeight = Number.parseFloat(titleStyles.lineHeight);

  sampleContext.font = `${titleStyles.fontStyle} ${titleStyles.fontWeight} ${titleStyles.fontSize} ${titleStyles.fontFamily}`;
  sampleContext.fontKerning = titleStyles.fontKerning;

  if ('letterSpacing' in sampleContext) {
    sampleContext.letterSpacing = titleStyles.letterSpacing;
  }

  const textMetrics = sampleContext.measureText(titleText);
  const textAscent = textMetrics.actualBoundingBoxAscent;
  const textDescent = textMetrics.actualBoundingBoxDescent;
  const measuredTextHeight = textAscent + textDescent;
  const resolvedLineHeight = Number.isFinite(lineHeight)
    ? lineHeight
    : Number.parseFloat(titleStyles.fontSize) * 1.2;
  const textBaseline = samplePadding
    + (resolvedLineHeight - measuredTextHeight) / 2
    + textAscent;

  sampleCanvas.width = Math.ceil(textMetrics.width + samplePadding * 2);
  sampleCanvas.height = Math.ceil(resolvedLineHeight + samplePadding * 2);

  // Resetting canvas dimensions clears its drawing state.
  sampleContext.font = `${titleStyles.fontStyle} ${titleStyles.fontWeight} ${titleStyles.fontSize} ${titleStyles.fontFamily}`;
  sampleContext.fontKerning = titleStyles.fontKerning;

  if ('letterSpacing' in sampleContext) {
    sampleContext.letterSpacing = titleStyles.letterSpacing;
  }

  sampleContext.textBaseline = 'alphabetic';
  sampleContext.fillStyle = '#ffffff';
  sampleContext.fillText(titleText, samplePadding, textBaseline);

  const pixels = sampleContext.getImageData(0, 0, sampleCanvas.width, sampleCanvas.height).data;
  const targets = [];
  const samplingStep = 3;
  const titleOffsetX = titleBounds.left - cardBounds.left - samplePadding;
  const titleOffsetY = titleBounds.top - cardBounds.top - samplePadding;

  for (let y = 0; y < sampleCanvas.height; y += samplingStep) {
    for (let x = 0; x < sampleCanvas.width; x += samplingStep) {
      const alpha = pixels[(y * sampleCanvas.width + x) * 4 + 3];

      if (alpha > 90) {
        targets.push({
          x: titleOffsetX + x,
          y: titleOffsetY + y
        });
      }
    }
  }

  return targets;
}

function playIntroParticleMerge() {
  if (hasStartedInitialIntroAnimation) {
    introParticleCanvas.hidden = true;
    introTitle.style.removeProperty('opacity');
    markInitialIntroAnimationComplete();
    return;
  }

  if (reducedMotionPreference.matches || gridPage.hidden) {
    introParticleCanvas.hidden = true;
    introTitle.style.removeProperty('opacity');
    markInitialIntroAnimationComplete();
    return;
  }

  hasStartedInitialIntroAnimation = true;

  if (introParticleAnimationFrameId !== null) {
    cancelAnimationFrame(introParticleAnimationFrameId);
  }

  const canvasContext = introParticleCanvas.getContext('2d');
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const cardWidth = introCard.clientWidth;
  const cardHeight = introCard.clientHeight;
  const targets = createIntroParticleTargets();
  const particleColor = getComputedStyle(introCard).color;
  const mergeDuration = 1900;
  const settleDuration = 220;
  const blendDuration = 900;
  const totalDuration = mergeDuration + settleDuration + blendDuration;

  introParticleCanvas.width = Math.round(cardWidth * pixelRatio);
  introParticleCanvas.height = Math.round(cardHeight * pixelRatio);
  canvasContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const particles = targets.map((target, index) => {
    const launchAngle = Math.random() * Math.PI * 2;
    const launchRadius = 90 + Math.random() * 330;

    return {
      targetX: target.x,
      targetY: target.y,
      startX: cardWidth * 0.5 + Math.cos(launchAngle) * launchRadius,
      startY: cardHeight * 0.35 + Math.sin(launchAngle) * launchRadius * 0.68,
      delay: Math.random() * 0.22,
      drift: 8 + Math.random() * 22,
      phase: index * 0.18 + Math.random() * Math.PI,
      radius: 0.65 + Math.random() * 1.15
    };
  });

  introParticleCanvas.hidden = false;
  introParticleCanvas.style.transition = 'none';
  introParticleCanvas.style.opacity = '1';
  introTitle.style.transition = 'none';
  introTitle.style.opacity = '0';

  const startedAt = performance.now();

  function animateIntroParticles(now) {
    const elapsed = now - startedAt;
    const overallProgress = Math.min(elapsed / mergeDuration, 1);
    const blendProgress = smootherStep(
      (elapsed - mergeDuration - settleDuration) / blendDuration
    );

    canvasContext.clearRect(0, 0, cardWidth, cardHeight);
    canvasContext.fillStyle = particleColor;
    canvasContext.shadowBlur = 0;

    particles.forEach((particle) => {
      const delayedProgress = Math.min(
        1,
        Math.max(0, (overallProgress - particle.delay) / (1 - particle.delay))
      );
      const easedProgress = smootherStep(delayedProgress);
      const remainingEnergy = 1 - easedProgress;
      const orbit = Math.sin(elapsed * 0.006 + particle.phase)
        * particle.drift
        * remainingEnergy;
      const x = particle.startX
        + (particle.targetX - particle.startX) * easedProgress
        + orbit;
      const y = particle.startY
        + (particle.targetY - particle.startY) * easedProgress
        + Math.cos(elapsed * 0.005 + particle.phase) * particle.drift * remainingEnergy;

      const settledRadius = 1;
      const radius = particle.radius
        + (settledRadius - particle.radius) * blendProgress;

      canvasContext.globalAlpha = 0.18 + easedProgress * 0.82;
      canvasContext.beginPath();
      canvasContext.arc(x, y, radius, 0, Math.PI * 2);
      canvasContext.fill();
    });

    canvasContext.globalAlpha = 1;
    introParticleCanvas.style.opacity = String(1 - blendProgress);
    introTitle.style.opacity = String(blendProgress);

    if (elapsed < totalDuration) {
      introParticleAnimationFrameId = requestAnimationFrame(animateIntroParticles);
      return;
    }

    introParticleAnimationFrameId = null;
    introParticleCanvas.hidden = true;
    introParticleCanvas.style.removeProperty('transition');
    introParticleCanvas.style.removeProperty('opacity');
    introTitle.style.removeProperty('transition');
    introTitle.style.removeProperty('opacity');
    markInitialIntroAnimationComplete();
  }

  introParticleAnimationFrameId = requestAnimationFrame(animateIntroParticles);
}

document.fonts.ready.then(() => {
  if (!('IntersectionObserver' in window)) {
    playIntroParticleMerge();
    return;
  }

  let wasIntroVisible = false;
  const introVisibilityObserver = new IntersectionObserver((entries) => {
    const isIntroVisible = entries[0].intersectionRatio >= 0.65;

    if (isIntroVisible && !wasIntroVisible) {
      playIntroParticleMerge();
    }

    wasIntroVisible = isIntroVisible;
  }, {
    root: cardCollection,
    threshold: [0, 0.65]
  });

  introVisibilityObserver.observe(introCard);
});

/* ---------- Card entrance motion ---------- */

if (!reducedMotionPreference.matches) {
  cardGrids.forEach((grid) => {
    const gridBounds = grid.getBoundingClientRect();
    const isGridInitiallyVisible = gridBounds.right > 0
      && gridBounds.left < window.innerWidth
      && gridBounds.bottom > 0
      && gridBounds.top < window.innerHeight;

    // Entrance animations that start fully off-screen finish before anyone can
    // see them, but still consume paint and compositing time during page load.
    if (!isGridInitiallyVisible) return;

    const gridCards = [...grid.querySelectorAll('.card:not(.motion-prototype-card)')];

    gridCards.forEach((card, cardIndex) => {
      card.style.setProperty('--card-entrance-delay', `${80 + cardIndex * 55}ms`);
      card.classList.add('is-entering');

      function finishCardEntrance(event) {
        if (event.animationName !== 'card-drop-in') return;

        card.classList.remove('is-entering');
        card.style.removeProperty('--card-entrance-delay');
        card.removeEventListener('animationend', finishCardEntrance);
      }

      card.addEventListener('animationend', finishCardEntrance);
    });
  });
}

/* ---------- Navigation label sizing ---------- */

function fitNavigationLabelsToTheirText() {
  const horizontalPadding = 16;

  navigationLabels.forEach((label) => {
    const textRange = document.createRange();
    textRange.selectNodeContents(label);

    const textWidth = textRange.getBoundingClientRect().width;
    const fittedLabelWidth = Math.ceil(textWidth + horizontalPadding);

    label.parentElement.style.setProperty('--label-width', `${fittedLabelWidth}px`);
  });
}

function hideProjectTagsThatDoNotFit() {
  projectTagLists.forEach((tagList) => {
    const tags = [...tagList.children];
    let shouldHideRemainingTags = false;

    // Reset the row before measuring it again.
    tags.forEach((tag) => {
      tag.hidden = false;
    });

    const tagListRightEdge = tagList.getBoundingClientRect().right;

    tags.forEach((tag) => {
      if (shouldHideRemainingTags || tag.getBoundingClientRect().right > tagListRightEdge) {
        tag.hidden = true;
        shouldHideRemainingTags = true;
      }
    });
  });
}

// Wait for the web fonts so all text measurements use the final typefaces.
document.fonts.ready.then(() => {
  fitNavigationLabelsToTheirText();
  hideProjectTagsThatDoNotFit();
});

window.addEventListener('resize', hideProjectTagsThatDoNotFit);

/* ---------- Collapsible motion prototypes ---------- */

motionPrototypeCards.forEach((card, prototypeIndex) => {
  card.style.setProperty('--prototype-delay', `${prototypeIndex * 25}ms`);
});

prototypeToggle.addEventListener('click', () => {
  const isExpanded = buildsGrid.classList.toggle('is-prototypes-expanded');

  prototypeToggle.setAttribute('aria-expanded', String(isExpanded));
  prototypeToggleTitle.textContent = isExpanded
    ? 'Collapse prototypes'
    : 'Motion prototypes';

  if (isExpanded) {
    requestAnimationFrame(hideProjectTagsThatDoNotFit);
  }
});

/* ---------- Card detail page ---------- */

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderPills(tags, underDevelopment = false) {
  const pills = tags.map((tag) => `<li>${escapeHtml(tag)}</li>`);

  if (underDevelopment) pills.push('<li>In development</li>');

  return `<ul class="case-study__tags" aria-label="Project tags">${pills.join('')}</ul>`;
}

function renderLabelledGrid(entries, className = '') {
  return `
    <div class="case-study__labelled-grid ${className}">
      ${Object.entries(entries).map(([label, value]) => `
        <div class="case-study__labelled-item">
          <span class="case-study__item-label">${escapeHtml(label)}</span>
          <p>${escapeHtml(value)}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function renderNumberedList(items) {
  return `
    <ol class="case-study__numbered-list">
      ${items.map((item, index) => `
        <li>
          <span class="case-study__number">${String(index + 1).padStart(2, '0')}</span>
          <p>${escapeHtml(item)}</p>
        </li>
      `).join('')}
    </ol>
  `;
}

function renderProcess(process) {
  return `
    <ol class="case-study__process-list">
      ${Object.entries(process).map(([label, description], index) => `
        <li>
          <span class="case-study__number">${String(index + 1).padStart(2, '0')}</span>
          <div>
            <h3>${escapeHtml(label)}</h3>
            <p>${escapeHtml(description)}</p>
          </div>
        </li>
      `).join('')}
    </ol>
  `;
}

function renderProjectGallery(project) {
  if (!project.gallery?.length) return '';

  return `
    <section class="case-study__section" aria-labelledby="project-gallery-title">
      <span class="case-study__eyebrow">Pitch deck</span>
      <div class="case-study__gallery-heading">
        <h2 id="project-gallery-title">The problem.</h2>
        <div class="case-study__gallery-controls" aria-label="Image gallery controls">
          <button class="case-study__gallery-button" type="button" data-gallery-direction="previous" aria-label="Previous image">
            <span class="material-symbols-rounded" aria-hidden="true">arrow_back</span>
          </button>
          <button class="case-study__gallery-button" type="button" data-gallery-direction="next" aria-label="Next image">
            <span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
          </button>
        </div>
      </div>
      <div class="case-study__gallery" tabindex="0" aria-label="Double AI product direction; scroll horizontally to view all frames">
        ${project.gallery.map(({ src, alt }) => `
          <figure class="case-study__gallery-frame">
            <img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" width="1379" height="774" loading="lazy" decoding="async" />
          </figure>
        `).join('')}
      </div>
    </section>
  `;
}

function initializeProjectGalleryControls() {
  const gallery = detailContent.querySelector('.case-study__gallery');
  const previousButton = detailContent.querySelector('[data-gallery-direction="previous"]');
  const nextButton = detailContent.querySelector('[data-gallery-direction="next"]');

  if (!gallery || !previousButton || !nextButton) return;

  const frames = [...gallery.querySelectorAll('.case-study__gallery-frame')];

  function getFramePositions() {
    return frames.map((frame) => frame.offsetLeft - gallery.offsetLeft);
  }

  function getCurrentFrameIndex(framePositions) {
    return framePositions.reduce((nearestIndex, framePosition, frameIndex) => {
      const nearestDistance = Math.abs(framePositions[nearestIndex] - gallery.scrollLeft);
      const frameDistance = Math.abs(framePosition - gallery.scrollLeft);

      return frameDistance < nearestDistance ? frameIndex : nearestIndex;
    }, 0);
  }

  function updateGalleryButtons() {
    const maximumScrollPosition = gallery.scrollWidth - gallery.clientWidth;
    previousButton.disabled = gallery.scrollLeft <= 1;
    nextButton.disabled = gallery.scrollLeft >= maximumScrollPosition - 1;
  }

  function moveGallery(direction) {
    const framePositions = getFramePositions();
    const currentIndex = getCurrentFrameIndex(framePositions);
    const nextIndex = clamp(currentIndex + direction, 0, framePositions.length - 1);

    gallery.scrollTo({
      left: framePositions[nextIndex],
      behavior: reducedMotionPreference.matches ? 'auto' : 'smooth'
    });
  }

  previousButton.addEventListener('click', () => moveGallery(-1));
  nextButton.addEventListener('click', () => moveGallery(1));
  gallery.addEventListener('scroll', updateGalleryButtons, { passive: true });

  // The detail view is still hidden while its markup is populated. Measure on
  // the next frame, after the gallery has its real width and scroll range.
  requestAnimationFrame(updateGalleryButtons);
}

function renderProjectVideo(project) {
  if (!project.video) return '';

  return `
    <section class="case-study__section" aria-labelledby="project-video-title">
      <span class="case-study__eyebrow">Video</span>
      <h2 id="project-video-title">${escapeHtml(project.video.title)}</h2>
      <div class="case-study__video">
        <iframe
          src="https://www.youtube-nocookie.com/embed/${escapeHtml(project.video.youtubeId)}"
          title="${escapeHtml(project.video.title)}"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </section>
  `;
}

function renderDoubleAICaseStudy(project) {
  const externalAction = project.liveUrl ? `
    <a class="case-study__action" href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer">
      <span>${escapeHtml(project.linkText || 'View live product')}</span>
    </a>
  ` : '';

  return `
    <div class="case-study case-study--segmented case-study--work-project case-study--double-ai">
      <header class="case-study__hero">
        <div class="case-study__intro">
          <span class="case-study__meta">Case file ${escapeHtml(project.number)} · ${escapeHtml(project.role)} · ${escapeHtml(project.year)}</span>
          <h1>${escapeHtml(project.title)}</h1>
          <p class="case-study__subtitle">${escapeHtml(project.subtitle)}</p>
          ${renderPills(project.tags, project.underDevelopment)}
        </div>

        <nav class="case-study-section-nav" aria-label="${escapeHtml(project.title)} case study sections">
          <button type="button" data-case-target="project-challenge-title"><span>01</span>Challenge</button>
          <button type="button" data-case-target="project-process-title"><span>02</span>Process</button>
          <button type="button" data-case-target="project-difficulty-title"><span>03</span>Pivot</button>
          <button type="button" data-case-target="project-impact-title"><span>04</span>Impact</button>
          <button type="button" data-case-target="project-architecture-title"><span>05</span>Architecture</button>
          <button type="button" data-case-target="project-work-title"><span>06</span>Key work</button>
        </nav>

        <figure class="case-study__hero-media">
          <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" width="1440" height="1024" decoding="async" fetchpriority="high" />
        </figure>

        <article class="work-case-proposition">
          <span class="case-study__item-label">Product proposition</span>
          <p>${escapeHtml(project.hook)}</p>
        </article>

        <span class="case-study__eyebrow work-case-context-label">At a glance</span>
        ${renderLabelledGrid(project.context, 'case-study__context work-case-context')}
        ${externalAction}
      </header>

      ${renderProjectGallery(project)}
      ${renderProjectVideo(project)}

      <section class="case-study__section segmented-section segmented-section--challenge double-ai-section" data-section-number="01" aria-labelledby="project-challenge-title">
        <span class="case-study__eyebrow">Challenge</span>
        <h2 id="project-challenge-title">From static identity to an active AI Twin.</h2>
        <div class="work-case-challenge-grid">
          <article>
            <span class="case-study__item-label">The platform</span>
            <p>${escapeHtml(project.challenge)}</p>
          </article>
          <article>
            <span class="case-study__item-label">Design ownership</span>
            <p>${escapeHtml(project.details)}</p>
          </article>
        </div>
        ${renderLabelledGrid(project.problems, 'case-study__problems work-case-problems')}
      </section>

      <section class="case-study__section segmented-section segmented-section--process double-ai-section" data-section-number="02" aria-labelledby="project-process-title">
        <span class="case-study__eyebrow">Process</span>
        <h2 id="project-process-title">Four connected design decisions.</h2>
        ${renderProcess(project.process)}
      </section>

      <section class="case-study__section segmented-section segmented-section--difficulty double-ai-section" data-section-number="03" aria-labelledby="project-difficulty-title">
        <span class="case-study__eyebrow">Pivotal difficulty</span>
        <h2 id="project-difficulty-title">The product’s mental model had to change.</h2>
        <p class="case-study__lead">${escapeHtml(project.difficulty)}</p>
      </section>

      <section class="case-study__section segmented-section segmented-section--impact double-ai-section" data-section-number="04" aria-labelledby="project-impact-title">
        <span class="case-study__eyebrow">Impact</span>
        <h2 id="project-impact-title">Reach and product coherence.</h2>
        ${renderLabelledGrid(project.impact, 'case-study__impact work-case-impact')}
      </section>

      <section class="case-study__section segmented-section segmented-section--architecture double-ai-section" data-section-number="05" aria-labelledby="project-architecture-title">
        <span class="case-study__eyebrow">Product architecture</span>
        <h2 id="project-architecture-title">Six connected surfaces behind the AI Twin.</h2>
        ${renderNumberedList(project.architecture)}
      </section>

      <section class="case-study__section segmented-section segmented-section--work double-ai-section" data-section-number="06" aria-labelledby="project-work-title">
        <span class="case-study__eyebrow">Key work</span>
        <h2 id="project-work-title">What I designed and delivered.</h2>
        ${renderNumberedList(project.work)}
      </section>
    </div>
  `;
}

function renderCaseStudy(project) {
  if (project.id === 'double-ai') return renderDoubleAICaseStudy(project);

  const hasArchitecture = Boolean(project.architecture?.length);
  const architectureSection = hasArchitecture ? `
    <section class="case-study__section segmented-section segmented-section--architecture" data-section-number="05" aria-labelledby="project-architecture-title">
      <span class="case-study__eyebrow">Product architecture</span>
      <h2 id="project-architecture-title">Functions of the client/UI layer.</h2>
      ${renderNumberedList(project.architecture)}
    </section>
  ` : '';

  const architectureNavigation = hasArchitecture ? `
    <button type="button" data-case-target="project-architecture-title"><span>05</span>Architecture</button>
  ` : '';

  const workSectionNumber = hasArchitecture ? '06' : '05';

  const externalAction = project.liveUrl ? `
    <a class="case-study__action" href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer">
      <span>${escapeHtml(project.linkText || 'View live product')}</span>
    </a>
  ` : '';

  return `
    <div class="case-study case-study--segmented case-study--work-project">
      <header class="case-study__hero">
        <div class="case-study__intro">
          <span class="case-study__meta">Case file ${escapeHtml(project.number)} · ${escapeHtml(project.role)} · ${escapeHtml(project.year)}</span>
          <h1>${escapeHtml(project.title)}</h1>
          <p class="case-study__subtitle">${escapeHtml(project.subtitle)}</p>
          ${renderPills(project.tags, project.underDevelopment)}
        </div>

        <nav class="case-study-section-nav" aria-label="${escapeHtml(project.title)} case study sections">
          <button type="button" data-case-target="project-challenge-title"><span>01</span>Challenge</button>
          <button type="button" data-case-target="project-process-title"><span>02</span>Process</button>
          <button type="button" data-case-target="project-difficulty-title"><span>03</span>Difficulty</button>
          <button type="button" data-case-target="project-impact-title"><span>04</span>Impact</button>
          ${architectureNavigation}
          <button type="button" data-case-target="project-work-title"><span>${workSectionNumber}</span>Key work</button>
        </nav>

        <figure class="case-study__hero-media">
          <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" width="1440" height="1024" decoding="async" fetchpriority="high" />
        </figure>

        <article class="work-case-proposition">
          <span class="case-study__item-label">Product proposition</span>
          <p>${escapeHtml(project.hook)}</p>
        </article>

        <span class="case-study__eyebrow work-case-context-label">At a glance</span>
        ${renderLabelledGrid(project.context, 'case-study__context work-case-context')}
        ${externalAction}
      </header>

      ${renderProjectGallery(project)}
      ${renderProjectVideo(project)}

      <section class="case-study__section segmented-section segmented-section--challenge" data-section-number="01" aria-labelledby="project-challenge-title">
        <span class="case-study__eyebrow">Challenge</span>
        <h2 id="project-challenge-title">What had to become clear.</h2>
        <div class="work-case-challenge-grid">
          <article>
            <span class="case-study__item-label">The project</span>
            <p>${escapeHtml(project.challenge)}</p>
          </article>
          <article>
            <span class="case-study__item-label">Design contribution</span>
            <p>${escapeHtml(project.details)}</p>
          </article>
        </div>
        ${renderLabelledGrid(project.problems, 'case-study__problems work-case-problems')}
      </section>

      <section class="case-study__section segmented-section segmented-section--process" data-section-number="02" aria-labelledby="project-process-title">
        <span class="case-study__eyebrow">Process</span>
        <h2 id="project-process-title">Decisions before decoration.</h2>
        ${renderProcess(project.process)}
      </section>

      <section class="case-study__section case-study__section--difficulty segmented-section segmented-section--difficulty" data-section-number="03" aria-labelledby="project-difficulty-title">
        <span class="case-study__eyebrow">Difficulty</span>
        <h2 id="project-difficulty-title">The difficult part was what required the most care.</h2>
        <p class="case-study__lead">${escapeHtml(project.difficulty)}</p>
      </section>

      <section class="case-study__section segmented-section segmented-section--impact" data-section-number="04" aria-labelledby="project-impact-title">
        <span class="case-study__eyebrow">Impact</span>
        <h2 id="project-impact-title">Evidence.</h2>
        ${renderLabelledGrid(project.impact, 'case-study__impact work-case-impact')}
      </section>

      ${architectureSection}

      <section class="case-study__section segmented-section segmented-section--work" data-section-number="${workSectionNumber}" aria-labelledby="project-work-title">
        <span class="case-study__eyebrow">Key work</span>
        <h2 id="project-work-title">What I designed and delivered.</h2>
        ${renderNumberedList(project.work)}
      </section>
    </div>
  `;
}

function renderEmergentCaseStudy() {
  return `
    <div class="case-study case-study--segmented case-study--emergent">
      <header class="case-study__hero">
        <div class="case-study__intro">
          <span class="case-study__meta">Product design case study</span>
          <h1>Emergent: Fixing the Credit Economy</h1>
          <p class="case-study__subtitle">Making AI-agent spend predictable, transparent, and fair without slowing down the no-code building experience.</p>
          ${renderPills(['AI product design', 'Billing transparency', 'Trust', 'No-code'], false)}
        </div>

        <nav class="case-study-section-nav" aria-label="Emergent case study sections">
          <button type="button" data-case-target="emergent-users-title"><span>01</span>Users</button>
          <button type="button" data-case-target="emergent-problem-title"><span>02</span>Problem</button>
          <button type="button" data-case-target="emergent-business-title"><span>03</span>Impact</button>
          <button type="button" data-case-target="emergent-alternatives-title"><span>04</span>Alternatives</button>
          <button type="button" data-case-target="emergent-solution-title"><span>05</span>Solution</button>
          <button type="button" data-case-target="emergent-metrics-title"><span>06</span>Metrics</button>
          <button type="button" data-case-target="emergent-scope-title"><span>07</span>Scope</button>
          <button type="button" data-case-target="emergent-validation-title"><span>08</span>Validation</button>
        </nav>

        <figure class="case-study__hero-media emergent-credit-preview">
          <img
            src="assets/images/CaseStudy/emergent.png"
            alt="Emergent case study interface showing credit estimates and task activity"
            width="1440"
            height="1024"
            decoding="async"
            fetchpriority="high"
          />
        </figure>

        <span class="case-study__eyebrow emergent-summary-label">Executive summary</span>
        <div class="emergent-summary-grid">
          <article>
            <span class="case-study__item-label">Current failure</span>
            <p class="case-study__hook">Emergent bills identically whether a task is new work or the agent fixing its own mistake, with no cost estimate before a task runs. This makes spend unpredictable, charges users for platform errors, and quietly erodes trust and conversion.</p>
          </article>
          <article>
            <span class="case-study__item-label">Proposed fix &amp; expected outcome</span>
            <p class="case-study__secondary">The proposed fix: a pre-task credit estimate paired with a transparent, itemized credit ledger, so users can see exactly what’s being charged and why, in real time. Expected outcome: improved free-to-paid conversion, reduced wasted credit spend, and fewer billing disputes.</p>
          </article>
        </div>

        <section class="emergent-video" aria-labelledby="emergent-video-title">
          <span class="case-study__eyebrow">Product walkthrough</span>
          <h2 id="emergent-video-title">See the proposed experience in action.</h2>
          <div class="case-study__video case-study__video--click-to-play" data-loom-video>
            <button
              class="case-study__video-play"
              type="button"
              data-loom-play
              aria-label="Play the Emergent product walkthrough"
            >
              <img
                src="assets/images/CaseStudy/emergent.png"
                alt=""
                width="1440"
                height="1024"
                loading="lazy"
                decoding="async"
              />
              <span class="case-study__video-play-icon" aria-hidden="true"></span>
              <span class="case-study__video-play-label">Play walkthrough</span>
            </button>
          </div>
        </section>
      </header>

      <section class="case-study__section segmented-section emergent-section emergent-section--users" data-section-number="01" aria-labelledby="emergent-users-title">
        <span class="case-study__eyebrow">01 · Users &amp; pain points</span>
        <h2 id="emergent-users-title">Target users &amp; pain points.</h2>
        <p class="case-study__lead"><strong>Who:</strong> Non-technical and lightly-technical builders—indie founders, PMs, and designers—who build apps from natural language without writing code. This spans individual self-serve users and employees at companies that purchase the platform for their teams.</p>
        <p class="case-study__secondary"><strong>What they’re running into</strong>, from reviews and hands-on testing:</p>
        ${renderNumberedList([
          'Credits drain unpredictably, even on small tasks.',
          'Bugs the agent introduces get billed the same as new work.',
          'Builds are marked “done” while features are silently broken—confirmed firsthand: a feature I’d explicitly requested was disclosed as non-functional in a routine bullet, easy to miss.',
          'Refunds are hard to get, even when the platform admits fault.'
        ])}
      </section>

      <section class="case-study__section segmented-section emergent-section emergent-section--problem" data-section-number="02" aria-labelledby="emergent-problem-title">
        <span class="case-study__eyebrow">02 · Problem</span>
        <h2 id="emergent-problem-title">Problem statement.</h2>
        <div class="emergent-problem-grid">
          <article>
            <span class="case-study__item-label">Scope decision</span>
            <p class="case-study__lead">Reviews and testing surfaced six categories of user pain: credit economy, agent reliability, build/deploy stability, billing practices, support responsiveness, and data portability. This case study focuses on <strong>credit economy</strong>—the one problem solvable through product design alone, without model, infrastructure, or policy changes.</p>
          </article>
          <article>
            <span class="case-study__item-label">Core failure</span>
            <p class="case-study__secondary">Emergent bills identically whether a task is new work or the agent correcting its own error, with no cost estimate up front. Users can’t predict spend, pay to diagnose bugs the platform introduced, and only learn something’s wrong after the credits are gone.</p>
          </article>
        </div>
      </section>

      <section class="case-study__section segmented-section emergent-section emergent-section--business" data-section-number="03" aria-labelledby="emergent-business-title">
        <span class="case-study__eyebrow">03 · Business</span>
        <h2 id="emergent-business-title">Business impact.</h2>
        ${renderLabelledGrid({
          'Revenue integrity': 'Every unexplained charge risks feeling like money taken without consent—a fragile foundation for a self-serve product.',
          'Conversion risk': 'Unpredictable billing surfaces right at the free-to-paid decision.',
          'Public trust': 'Unexplained charges drive the exact disputes now visible in public reviews, the same channel fueling organic growth.'
        }, 'case-study__business-impact')}
      </section>

      <section class="case-study__section segmented-section emergent-section emergent-section--alternatives" data-section-number="04" aria-labelledby="emergent-alternatives-title">
        <span class="case-study__eyebrow">04 · Alternatives</span>
        <h2 id="emergent-alternatives-title">Alternatives considered.</h2>
        ${renderProcess({
          'Lower prices / more free credits': 'Treats the symptom, not predictability or fairness.',
          'Faster refunds': 'Still reactive; the user is surprised first.',
          'Full code or log transparency': 'Breaks the no-code promise and the paywalled business model.',
          'Chosen approach': 'Estimate cost upfront and make every charge clearly visible as it happens; fixes the mechanism without touching pricing, support, or the business model.'
        })}
      </section>

      <section class="case-study__section case-study__section--solution segmented-section emergent-section emergent-section--solution" data-section-number="05" aria-labelledby="emergent-solution-title">
        <span class="case-study__eyebrow">05 · Solution</span>
        <h2 id="emergent-solution-title">Proposed solution.</h2>
        <p class="case-study__lead">Every charge should be visible, clearly explained, and estimated in advance—without slowing down the fast, no-code experience that defines the product.</p>
        <p class="case-study__secondary"><strong>Scenario:</strong> building a to-do app with recurring tasks.</p>
        <ol class="emergent-solution-flow">
          <li>
            <span class="emergent-solution-flow__number">01</span>
            <div><h3>Before the task</h3><p>Show a rough credit estimate for the build, broken down by feature (core list, due dates, recurring tasks).</p></div>
          </li>
          <li>
            <span class="emergent-solution-flow__number">02</span>
            <div><h3>During a retry</h3><p>Show clearly that this is another attempt at the same issue, with a running cost for this task so far, so the user can decide whether to continue.</p></div>
          </li>
          <li>
            <span class="emergent-solution-flow__number">03</span>
            <div><h3>At completion</h3><p>Replace the flat “done” summary with an itemized cost breakdown and a pass/fail check per feature, so what was spent and what actually works are both clear.</p></div>
          </li>
        </ol>
      </section>

      <section class="case-study__section segmented-section emergent-section emergent-section--metrics" data-section-number="06" aria-labelledby="emergent-metrics-title">
        <span class="case-study__eyebrow">06 · Metrics</span>
        <h2 id="emergent-metrics-title">Success metrics.</h2>
        <div class="emergent-metrics">
          <article class="emergent-metric emergent-metric--north-star">
            <span>North star</span>
            <strong>Free-to-paid conversion rate</strong>
          </article>
          <article class="emergent-metric">
            <span>Supporting</span>
            <strong>Credits consumed per successful build</strong>
            <p>Efficiency and margin recovered.</p>
          </article>
          <article class="emergent-metric">
            <span>Supporting</span>
            <strong>Credit dispute / refund ticket volume</strong>
            <p>Trust and support cost.</p>
          </article>
        </div>
      </section>

      <section class="case-study__section segmented-section emergent-section emergent-section--scope" data-section-number="07" aria-labelledby="emergent-scope-title">
        <span class="case-study__eyebrow">07 · Scope</span>
        <h2 id="emergent-scope-title">Out of scope.</h2>
        ${renderProcess({
          'Agent reliability': 'Context loss and regressions are a model-capability issue, not an interface one.',
          'Build/deploy stability': 'Bundler, tunnel, and EAS crashes are an infrastructure problem.',
          'Billing practices': 'Trial pricing and post-cancellation charges are a checkout, legal, and policy issue.',
          'Data portability': 'Code export and deletion on cancellation are a business-model decision.',
          'Support responsiveness': 'This transparency reduces how often users need to ask “why was I charged that,” but doesn’t fix support itself.'
        })}
      </section>

      <section class="case-study__section segmented-section emergent-section emergent-section--validation" data-section-number="08" aria-labelledby="emergent-validation-title">
        <span class="case-study__eyebrow">08 · Validation</span>
        <h2 id="emergent-validation-title">Validation plan.</h2>
        ${renderNumberedList([
          'Share of current charges that are same-issue retries vs. genuinely new work.',
          'Correlation between retry-heavy sessions and free-to-paid drop-off.',
          'Current credit-dispute ticket volume, to size the potential impact.'
        ])}
      </section>
    </div>
  `;
}

function initializeCaseStudyNavigation() {
  const navigationButtons = [...detailContent.querySelectorAll('[data-case-target]')];

  navigationButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = detailContent.querySelector(`#${button.dataset.caseTarget}`);
      if (!target) return;

      navigationButtons.forEach((navigationButton) => {
        navigationButton.classList.toggle('is-active', navigationButton === button);
      });

      target.closest('.segmented-section')?.scrollIntoView({
        behavior: reducedMotionPreference.matches ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  });
}

function initializeInlineVideos() {
  detailContent.querySelectorAll('[data-loom-video]').forEach((container) => {
    const playButton = container.querySelector('[data-loom-play]');
    if (!playButton) return;

    playButton.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.loom.com/embed/3f27f295a4324b0da973c9463540d34b?autoplay=1&hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true';
      iframe.title = 'Emergent product walkthrough';
      iframe.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.setAttribute('allowfullscreen', '');
      container.replaceChildren(iframe);
    }, { once: true });
  });
}

const readableParagraphSources = new WeakMap();

function getReadableSentenceIntervals(text) {
  const trimmed = text.trim();
  if (!trimmed) return [[0, text.length]];

  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter('en', { granularity: 'sentence' });
    const rawSegments = [...segmenter.segment(text)];
    const meaningfulSegments = rawSegments.filter((seg) => /\S/.test(seg.segment));

    if (meaningfulSegments.length <= 1) return [[0, text.length]];

    const intervals = [];
    for (let i = 0; i < meaningfulSegments.length; i += 1) {
      const current = meaningfulSegments[i];
      let start = current.index;
      while (start < text.length && /\s/.test(text[start])) start += 1;

      let end = i === meaningfulSegments.length - 1
        ? text.length
        : meaningfulSegments[i + 1].index;
      while (end > start && /\s/.test(text[end - 1])) end -= 1;

      if (start < end) {
        intervals.push([start, end]);
      }
    }

    return intervals.length > 1 ? intervals : [[0, text.length]];
  }

  const sentenceRegex = /[^.!?]+(?:[.!?]+["'’”)]*|\s*$)/g;
  const matches = [...text.matchAll(sentenceRegex)].filter((match) => /\S/.test(match[0]));

  if (matches.length <= 1) return [[0, text.length]];

  const intervals = [];
  for (const match of matches) {
    let start = match.index;
    while (start < text.length && /\s/.test(text[start])) start += 1;
    let end = match.index + match[0].length;
    while (end > start && /\s/.test(text[end - 1])) end -= 1;
    if (start < end) {
      intervals.push([start, end]);
    }
  }

  return intervals.length > 1 ? intervals : [[0, text.length]];
}

function resolveTextOffset(textNodes, offset, isEndBoundary) {
  let runningOffset = 0;

  for (let index = 0; index < textNodes.length; index += 1) {
    const node = textNodes[index];
    const nodeEnd = runningOffset + node.nodeValue.length;
    const isLastNode = index === textNodes.length - 1;

    if (
      offset < nodeEnd
      || (isEndBoundary && offset === nodeEnd)
      || isLastNode
    ) {
      return {
        node,
        offset: Math.max(0, Math.min(node.nodeValue.length, offset - runningOffset))
      };
    }

    runningOffset = nodeEnd;
  }

  return null;
}

function formatReadableParagraph(paragraph) {
  if (!readableParagraphSources.has(paragraph)) {
    readableParagraphSources.set(paragraph, paragraph.innerHTML);
  }

  paragraph.innerHTML = readableParagraphSources.get(paragraph);

  const source = paragraph.cloneNode(true);
  const text = source.textContent;
  const intervals = getReadableSentenceIntervals(text);
  if (intervals.length <= 1) return;

  const walker = document.createTreeWalker(source, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  let textNode = walker.nextNode();

  while (textNode) {
    textNodes.push(textNode);
    textNode = walker.nextNode();
  }

  const chunks = intervals.map(([startOffset, endOffset]) => {
    const start = resolveTextOffset(textNodes, startOffset, false);
    const end = resolveTextOffset(textNodes, endOffset, true);
    const chunk = document.createElement('span');
    chunk.className = 'readable-chunk';

    if (!start || !end) return chunk;

    const range = document.createRange();
    range.setStart(start.node, start.offset);
    range.setEnd(end.node, end.offset);
    chunk.append(range.cloneContents());
    return chunk;
  });

  paragraph.replaceChildren(...chunks);
}

function formatCaseStudyParagraphs() {
  detailContent.querySelectorAll('.case-study p').forEach((paragraph) => {
    formatReadableParagraph(paragraph);
  });
}

function populateCardDetail(projectId, projectTitle) {
  const project = PROJECTS_BY_ID.get(projectId);

  detailContent.dataset.projectId = projectId;
  detailContent.setAttribute('aria-label', `${projectTitle} content`);
  if (projectId === 'emergent') {
    detailContent.innerHTML = renderEmergentCaseStudy();
  } else {
    detailContent.innerHTML = project
      ? renderCaseStudy(project)
      : '<div class="case-study__missing"><h1>Project details coming soon.</h1></div>';
  }

  initializeProjectGalleryControls();
  initializeCaseStudyNavigation();
  initializeInlineVideos();
  formatCaseStudyParagraphs();

  return project;
}

function commitCardDetail(projectId, projectTitle, addToBrowserHistory = true) {
  const project = PROJECTS_BY_ID.get(projectId);

  window.scrollTo({ top: 0, behavior: 'auto' });
  gridPage.hidden = true;
  detailPage.hidden = false;
  detailPage.removeAttribute('aria-hidden');
  document.title = 'Jatin Davis';

  if (addToBrowserHistory) {
    const projectCard = document.querySelector(`[data-project-id="${projectId}"]`);
    const section = projectCard?.dataset.projectSection || 'work';
    history.pushState({ projectId }, '', `#${section}/${projectId}`);
  }
}

function showCardDetail(projectId, projectTitle, addToBrowserHistory = true) {
  populateCardDetail(projectId, projectTitle);
  commitCardDetail(projectId, projectTitle, addToBrowserHistory);
}

function showGridPage() {
  detailPage.hidden = true;
  detailPage.removeAttribute('aria-hidden');
  gridPage.hidden = false;
  document.title = 'Jatin Davis';
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function applyFixedBounds(element, bounds) {
  Object.assign(element.style, {
    top: `${bounds.top}px`,
    left: `${bounds.left}px`,
    width: `${bounds.width}px`,
    height: `${bounds.height}px`
  });
}

function createProjectTransitionLayers(card) {
  const cardBounds = card.getBoundingClientRect();
  const media = card.querySelector('.project-card__media');
  const mediaBounds = media?.getBoundingClientRect();
  const surface = card.cloneNode(true);
  let mediaLayer = null;

  surface.classList.add('project-card-transition-clone');
  surface.removeAttribute('role');
  surface.removeAttribute('tabindex');
  surface.setAttribute('aria-hidden', 'true');
  surface.querySelector('.project-card__media')?.style.setProperty('opacity', '0');
  applyFixedBounds(surface, cardBounds);
  surface.style.transform = 'none';
  document.body.append(surface);

  if (media && mediaBounds) {
    mediaLayer = media.cloneNode(true);
    mediaLayer.className = 'project-media-transition-clone';
    mediaLayer.setAttribute('aria-hidden', 'true');
    applyFixedBounds(mediaLayer, mediaBounds);
    mediaLayer.style.borderRadius = getComputedStyle(media).borderRadius;
    document.body.append(mediaLayer);
  }

  return { surface, mediaLayer, cardBounds, mediaBounds };
}

function settleAnimation(animation) {
  return animation?.finished.catch(() => undefined);
}

async function morphCardIntoDetail(card, projectId, projectTitle) {
  if (isCardTransitionActive) return;

  if (reducedMotionPreference.matches) {
    showCardDetail(projectId, projectTitle);
    return;
  }

  isCardTransitionActive = true;

  const cardStyles = getComputedStyle(card);
  const cardRadius = Number.parseFloat(cardStyles.borderTopLeftRadius) || 8;
  const previousWillChange = card.style.willChange;
  const previousVisibility = card.style.visibility;
  let transitionLayers;
  let liftAnimation;
  let mediaLiftAnimation;
  let gridExitAnimation;
  let surfaceMorphAnimation;
  let mediaMorphAnimation;
  let detailRevealAnimation;
  let hasCommittedDetail = false;

  document.body.classList.add('is-card-transitioning');
  card.style.willChange = 'transform, opacity';

  try {
    transitionLayers = createProjectTransitionLayers(card);
    const { surface, mediaLayer } = transitionLayers;
    card.style.visibility = 'hidden';

    liftAnimation = surface.animate([
      { transform: 'translate3d(0, 0, 0) scale(1)', borderRadius: `${cardRadius}px` },
      { transform: 'translate3d(0, -8px, 0) scale(1.012)', borderRadius: `${cardRadius + 4}px` }
    ], {
      duration: PROJECT_TRANSITION_TIMING.lift,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      fill: 'forwards'
    });

    if (mediaLayer) {
      mediaLiftAnimation = mediaLayer.animate([
        { transform: 'translate3d(0, 0, 0) scale(1)' },
        { transform: 'translate3d(0, -8px, 0) scale(1.012)' }
      ], {
        duration: PROJECT_TRANSITION_TIMING.lift,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'forwards'
      });
    }

    gridExitAnimation = gridPage.animate([
      { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' },
      { opacity: 0, transform: 'translate3d(0, 8px, 0) scale(0.992)' }
    ], {
      duration: PROJECT_TRANSITION_TIMING.lift + 90,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    });

    await Promise.all([settleAnimation(liftAnimation), settleAnimation(mediaLiftAnimation)]);

    const liftedSurfaceBounds = surface.getBoundingClientRect();
    const liftedMediaBounds = mediaLayer?.getBoundingClientRect();
    liftAnimation.cancel();
    mediaLiftAnimation?.cancel();
    applyFixedBounds(surface, liftedSurfaceBounds);
    surface.style.transform = 'none';

    if (mediaLayer && liftedMediaBounds) {
      applyFixedBounds(mediaLayer, liftedMediaBounds);
      mediaLayer.style.transform = 'none';
    }

    detailPage.style.opacity = '0';
    populateCardDetail(projectId, projectTitle);
    commitCardDetail(projectId, projectTitle);
    hasCommittedDetail = true;

    const detailBounds = detailContent.getBoundingClientRect();
    const detailRadius = Number.parseFloat(getComputedStyle(detailContent).borderTopLeftRadius) || 8;
    const detailSurfaceHeight = Math.max(
      1,
      window.innerHeight - detailBounds.top + (mobileLayoutPreference.matches ? 20 : 32)
    );
    const heroMedia = detailContent.querySelector('.case-study__hero-media');
    const heroMediaBounds = heroMedia?.getBoundingClientRect();

    surfaceMorphAnimation = surface.animate([
      {
        top: `${liftedSurfaceBounds.top}px`,
        left: `${liftedSurfaceBounds.left}px`,
        width: `${liftedSurfaceBounds.width}px`,
        height: `${liftedSurfaceBounds.height}px`,
        borderRadius: `${cardRadius + 4}px`,
        opacity: 1
      },
      {
        top: `${detailBounds.top}px`,
        left: `${detailBounds.left}px`,
        width: `${detailBounds.width}px`,
        height: `${detailSurfaceHeight}px`,
        borderRadius: `${detailRadius}px`,
        opacity: 1,
        offset: 0.82
      },
      {
        top: `${detailBounds.top}px`,
        left: `${detailBounds.left}px`,
        width: `${detailBounds.width}px`,
        height: `${detailSurfaceHeight}px`,
        borderRadius: `${detailRadius}px`,
        opacity: 0
      }
    ], {
      duration: PROJECT_TRANSITION_TIMING.morph,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'forwards'
    });

    const surfaceContent = surface.querySelectorAll('.project-card__title, .project-card__impact, .project-card__tags');
    surfaceContent.forEach((element) => {
      element.animate([
        { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        { opacity: 0, transform: 'translate3d(0, 8px, 0)', offset: 0.42 },
        { opacity: 0, transform: 'translate3d(0, 8px, 0)' }
      ], {
        duration: PROJECT_TRANSITION_TIMING.morph,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      });
    });

    if (mediaLayer && liftedMediaBounds && heroMediaBounds) {
      mediaMorphAnimation = mediaLayer.animate([
        {
          top: `${liftedMediaBounds.top}px`,
          left: `${liftedMediaBounds.left}px`,
          width: `${liftedMediaBounds.width}px`,
          height: `${liftedMediaBounds.height}px`,
          borderRadius: '4px',
          opacity: 1
        },
        {
          top: `${heroMediaBounds.top}px`,
          left: `${heroMediaBounds.left}px`,
          width: `${heroMediaBounds.width}px`,
          height: `${heroMediaBounds.height}px`,
          borderRadius: `${detailRadius}px`,
          opacity: 1,
          offset: 0.82
        },
        {
          top: `${heroMediaBounds.top}px`,
          left: `${heroMediaBounds.left}px`,
          width: `${heroMediaBounds.width}px`,
          height: `${heroMediaBounds.height}px`,
          borderRadius: `${detailRadius}px`,
          opacity: 0
        }
      ], {
        duration: PROJECT_TRANSITION_TIMING.morph,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'forwards'
      });
    }

    detailRevealAnimation = detailPage.animate([
      { opacity: 0, transform: 'translate3d(0, 18px, 0)' },
      { opacity: 1, transform: 'translate3d(0, 0, 0)' }
    ], {
      duration: PROJECT_TRANSITION_TIMING.contentReveal,
      delay: 170,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      fill: 'both'
    });

    await Promise.all([
      settleAnimation(surfaceMorphAnimation),
      settleAnimation(mediaMorphAnimation),
      settleAnimation(detailRevealAnimation)
    ]);
  } finally {
    try {
      if (!hasCommittedDetail) {
        populateCardDetail(projectId, projectTitle);
        commitCardDetail(projectId, projectTitle);
      }
    } finally {
      liftAnimation?.cancel();
      mediaLiftAnimation?.cancel();
      gridExitAnimation?.cancel();
      surfaceMorphAnimation?.cancel();
      mediaMorphAnimation?.cancel();
      detailRevealAnimation?.cancel();
      transitionLayers?.surface.remove();
      transitionLayers?.mediaLayer?.remove();
      detailPage.style.removeProperty('opacity');
      detailPage.style.removeProperty('transform');
      card.style.visibility = previousVisibility;
      if (previousWillChange) {
        card.style.willChange = previousWillChange;
      } else {
        card.style.removeProperty('will-change');
      }
      document.body.classList.remove('is-card-transitioning');
      isCardTransitionActive = false;
      detailBackButton.focus({ preventScroll: true });
    }
  }
}

// Add the card--static class later to any tile that should not open a page.
cards.forEach((card, cardIndex) => {
  if (card.classList.contains('card--static')) return;

  const projectId = card.dataset.projectId || `card-${cardIndex + 1}`;
  const projectTitle = card.dataset.projectTitle || `Project ${cardIndex + 1}`;
  const externalUrl = card.dataset.externalUrl;

  function openCardDestination() {
    if (externalUrl) {
      window.open(externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    morphCardIntoDetail(card, projectId, projectTitle);
  }

  card.setAttribute('role', 'link');
  card.setAttribute('aria-label', `Open ${projectTitle}`);

  card.addEventListener('click', openCardDestination);

  card.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    openCardDestination();
  });
});

detailBackButton.addEventListener('click', () => {
  if (/^#(?:work|case-studies)\//.test(window.location.hash)) {
    history.back();
    return;
  }

  showGridPage();
});

window.addEventListener('popstate', () => {
  const projectMatch = window.location.hash.match(/^#(?:work|case-studies)\/([a-z0-9-]+)$/);

  if (projectMatch) {
    const matchingCard = document.querySelector(`[data-project-id="${projectMatch[1]}"]`);
    const projectTitle = matchingCard?.dataset.projectTitle || 'Selected project';
    showCardDetail(projectMatch[1], projectTitle, false);
  } else {
    showGridPage();
  }
});

// Restore a linked project page when the site loads with a project hash.
const initialProjectMatch = window.location.hash.match(/^#(?:work|case-studies)\/([a-z0-9-]+)$/);
if (initialProjectMatch) {
  const matchingCard = document.querySelector(`[data-project-id="${initialProjectMatch[1]}"]`);
  const projectTitle = matchingCard?.dataset.projectTitle || 'Selected project';
  showCardDetail(initialProjectMatch[1], projectTitle, false);
}

/* ---------- Playful falling balls ---------- */

function dropBalls(onComplete) {
  const layer = document.createElement('div');
  const prefersReducedMotion = reducedMotionPreference.matches;
  const ballCount = prefersReducedMotion ? 10 : 30;
  const ballSize = 34;
  const balls = [];
  const burstStartsAt = prefersReducedMotion ? 1500 : 4050;
  const burstStagger = prefersReducedMotion ? 160 : 480;
  const animationEndsAt = prefersReducedMotion ? 1900 : 5300;
  const startedAt = performance.now();
  let previousFrame = startedAt;

  layer.className = 'falling-ball-layer';
  layer.setAttribute('aria-hidden', 'true');
  document.body.append(layer);

  for (let index = 0; index < ballCount; index += 1) {
    const element = document.createElement('span');
    const size = ballSize;
    const hue = Math.floor(Math.random() * 360);

    element.className = 'falling-ball';
    element.style.setProperty('--ball-size', `${size}px`);
    element.style.setProperty('--ball-hue', String(hue));
    layer.append(element);

    balls.push({
      element,
      size,
      hue,
      x: Math.random() * Math.max(1, window.innerWidth - size),
      y: -size - Math.random() * window.innerHeight * 0.45,
      velocityX: (Math.random() - 0.5) * 230,
      velocityY: 40 + Math.random() * 120,
      rotation: Math.random() * 180,
      rotationSpeed: (Math.random() - 0.5) * 240,
      bounce: 0.56 + Math.random() * 0.16,
      explodeAt: burstStartsAt + Math.random() * burstStagger,
      exploded: false
    });
  }

  function explodeBall(ball) {
    const burst = document.createElement('span');
    const ring = document.createElement('span');
    const particleCount = prefersReducedMotion ? 5 : 9;

    burst.className = 'ball-burst';
    burst.style.transform = `translate3d(${ball.x + ball.size / 2}px, ${ball.y + ball.size / 2}px, 0)`;
    burst.style.setProperty('--burst-color', `hsl(${ball.hue} 88% 62% / 0.76)`);
    ring.className = 'ball-burst__ring';
    burst.append(ring);

    for (let index = 0; index < particleCount; index += 1) {
      const particle = document.createElement('span');
      const angle = (360 / particleCount) * index + (Math.random() - 0.5) * 22;

      particle.className = 'ball-burst__particle';
      particle.style.setProperty('--particle-angle', `${angle}deg`);
      particle.style.setProperty('--particle-distance', `${30 + Math.random() * 30}px`);
      particle.style.setProperty('--particle-spin', `${120 + Math.random() * 300}deg`);
      particle.style.setProperty(
        '--particle-color',
        `hsl(${ball.hue} 90% ${62 + Math.random() * 18}% / 0.88)`
      );
      burst.append(particle);
    }

    ball.exploded = true;
    ball.element.remove();
    layer.append(burst);
    window.setTimeout(() => burst.remove(), 700);
  }

  function getVisibleCardBounds() {
    return [...document.querySelectorAll('.card')]
      .map((card) => card.getBoundingClientRect())
      .filter((bounds) => (
        bounds.width > 0
        && bounds.height > 0
        && bounds.right > 0
        && bounds.left < window.innerWidth
        && bounds.bottom > 0
        && bounds.top < window.innerHeight
      ));
  }

  function resolveCardCollision(ball, previousX, previousY, cardBounds) {
    const ballRight = ball.x + ball.size;
    const ballBottom = ball.y + ball.size;
    const overlapsCard = ballRight > cardBounds.left
      && ball.x < cardBounds.right
      && ballBottom > cardBounds.top
      && ball.y < cardBounds.bottom;

    if (!overlapsCard) return;

    const previousRight = previousX + ball.size;
    const previousBottom = previousY + ball.size;

    if (previousBottom <= cardBounds.top && ball.velocityY > 0) {
      ball.y = cardBounds.top - ball.size;
      ball.velocityY *= -ball.bounce;
      ball.velocityX *= 0.94;
      return;
    }

    if (previousY >= cardBounds.bottom && ball.velocityY < 0) {
      ball.y = cardBounds.bottom;
      ball.velocityY *= -ball.bounce;
      return;
    }

    if (previousRight <= cardBounds.left && ball.velocityX > 0) {
      ball.x = cardBounds.left - ball.size;
      ball.velocityX *= -0.72;
      return;
    }

    if (previousX >= cardBounds.right && ball.velocityX < 0) {
      ball.x = cardBounds.right;
      ball.velocityX *= -0.72;
    }
  }

  let visibleCardBounds = getVisibleCardBounds();
  let collisionBoundsFrame = 0;

  function animateBalls(now) {
    const elapsed = now - startedAt;
    const delta = Math.min((now - previousFrame) / 1000, 0.034);
    const floor = window.innerHeight;
    previousFrame = now;

    // Refresh periodically so collisions follow horizontal grid movement without
    // forcing a layout measurement for every animation frame.
    collisionBoundsFrame += 1;
    if (collisionBoundsFrame % 6 === 0) {
      visibleCardBounds = getVisibleCardBounds();
    }

    balls.forEach((ball) => {
      if (ball.exploded) return;

      const previousX = ball.x;
      const previousY = ball.y;

      ball.velocityY += 1350 * delta;
      ball.x += ball.velocityX * delta;
      ball.y += ball.velocityY * delta;
      ball.rotation += ball.rotationSpeed * delta;

      visibleCardBounds.forEach((cardBounds) => {
        resolveCardCollision(ball, previousX, previousY, cardBounds);
      });

      if (ball.x <= 0 || ball.x + ball.size >= window.innerWidth) {
        ball.x = clamp(ball.x, 0, window.innerWidth - ball.size);
        ball.velocityX *= -0.72;
      }

      if (ball.y + ball.size >= floor) {
        ball.y = floor - ball.size;
        ball.velocityY *= -ball.bounce;
        ball.velocityX *= 0.92;
        ball.rotationSpeed *= 0.9;
      }

      ball.element.style.transform = `translate3d(${ball.x}px, ${ball.y}px, 0) rotate(${ball.rotation}deg)`;

      if (elapsed >= ball.explodeAt) {
        explodeBall(ball);
      }
    });

    if (elapsed < animationEndsAt) {
      requestAnimationFrame(animateBalls);
    } else {
      layer.remove();
      onComplete();
    }
  }

  requestAnimationFrame(animateBalls);
}

let isBallEffectRunning = false;

ballButton.addEventListener('click', () => {
  if (isBallEffectRunning) return;

  isBallEffectRunning = true;
  dropBalls(() => {
    isBallEffectRunning = false;
  });
});

/* ---------- Smooth horizontal wheel scrolling ---------- */

function clamp(number, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, number));
}

function getMaximumScrollPosition() {
  return cardCollection.scrollWidth - cardCollection.clientWidth;
}

function animateHorizontalScroll() {
  const currentPosition = cardCollection.scrollLeft;
  const remainingDistance = horizontalScrollTarget - currentPosition;

  // Finish on an exact pixel so the grid remains correctly aligned.
  if (Math.abs(remainingDistance) < 0.5) {
    cardCollection.scrollLeft = horizontalScrollTarget;
    scrollAnimationFrameId = null;

    if (scrollSnapTimerId === null) {
      cardCollection.classList.remove('is-wheel-scrolling');
    }

    return;
  }

  cardCollection.scrollLeft += remainingDistance * 0.14;
  scrollAnimationFrameId = requestAnimationFrame(animateHorizontalScroll);
}

function findNearestGridPosition(scrollPosition) {
  const collectionStyles = getComputedStyle(cardCollection);
  const collectionLeftPadding = parseFloat(collectionStyles.paddingLeft);
  const maximumScrollPosition = getMaximumScrollPosition();
  const cardGrids = document.querySelectorAll('.card-grid');

  // Each position places a grid on the navigation bar's left alignment line.
  const gridPositions = [...cardGrids].map((grid) => {
    const alignedPosition = grid.offsetLeft - collectionLeftPadding;
    return clamp(alignedPosition, 0, maximumScrollPosition);
  });

  return gridPositions.reduce((nearestPosition, candidatePosition) => {
    const candidateDistance = Math.abs(candidatePosition - scrollPosition);
    const nearestDistance = Math.abs(nearestPosition - scrollPosition);

    return candidateDistance < nearestDistance ? candidatePosition : nearestPosition;
  });
}

function startScrollAnimation() {
  if (scrollAnimationFrameId !== null) return;

  scrollAnimationFrameId = requestAnimationFrame(animateHorizontalScroll);
}

function centerGrid(gridIndex, isPreview = true) {
  const selectedGrid = cardGrids[gridIndex];
  if (!selectedGrid) return;

  if (mobileLayoutPreference.matches) {
    cardCollection.classList.remove('is-navigation-preview', 'is-wheel-scrolling');
    selectedGrid.scrollIntoView({
      behavior: reducedMotionPreference.matches ? 'auto' : 'smooth',
      block: 'start'
    });
    return;
  }

  const centeredPosition = selectedGrid.offsetLeft
    + selectedGrid.offsetWidth / 2
    - cardCollection.clientWidth / 2;

  horizontalScrollTarget = clamp(centeredPosition, 0, getMaximumScrollPosition());
  cardCollection.classList.toggle('is-navigation-preview', isPreview);

  if (!isPreview) {
    cardCollection.classList.add('is-wheel-scrolling');
  }

  startScrollAnimation();
}

/* Keep the navigation marker in sync with the section currently in view. */
function setActiveGrid(gridIndex) {
  if (gridIndex === activeGridIndex) return;

  activeGridIndex = gridIndex;

  navigationTargets.forEach((target, targetIndex) => {
    const isActive = targetIndex === gridIndex;
    target.classList.toggle('is-active', isActive);

    if (isActive) {
      target.setAttribute('aria-current', 'true');
    } else {
      target.removeAttribute('aria-current');
    }
  });
}

function getActiveGridIndex() {
  if (mobileLayoutPreference.matches) {
    const headerBottom = siteHeader.getBoundingClientRect().bottom;
    let currentIndex = 0;
    let largestVisibleArea = -1;

    cardGrids.forEach((grid, gridIndex) => {
      const gridBounds = grid.getBoundingClientRect();
      const visibleTop = Math.max(gridBounds.top, headerBottom);
      const visibleBottom = Math.min(gridBounds.bottom, window.innerHeight);
      const visibleArea = Math.max(0, visibleBottom - visibleTop);

      if (visibleArea > largestVisibleArea) {
        largestVisibleArea = visibleArea;
        currentIndex = gridIndex;
      }
    });

    return currentIndex;
  }

  const collectionStyles = getComputedStyle(cardCollection);
  const collectionLeftPadding = parseFloat(collectionStyles.paddingLeft);
  const maximumScrollPosition = getMaximumScrollPosition();
  let nearestIndex = 0;
  let nearestDistance = Infinity;

  cardGrids.forEach((grid, gridIndex) => {
    const alignedPosition = clamp(
      grid.offsetLeft - collectionLeftPadding,
      0,
      maximumScrollPosition
    );
    const distance = Math.abs(alignedPosition - cardCollection.scrollLeft);

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = gridIndex;
    }
  });

  return nearestIndex;
}

function syncNavigationToScroll() {
  navigationSyncAnimationFrameId = null;
  setActiveGrid(getActiveGridIndex());
}

function scheduleNavigationSync() {
  if (navigationSyncAnimationFrameId !== null) return;

  navigationSyncAnimationFrameId = requestAnimationFrame(syncNavigationToScroll);
}

cardCollection.addEventListener('scroll', scheduleNavigationSync, { passive: true });
window.addEventListener('scroll', scheduleNavigationSync, { passive: true });
window.addEventListener('resize', scheduleNavigationSync);
mobileLayoutPreference.addEventListener('change', scheduleNavigationSync);
mobileLayoutPreference.addEventListener('change', formatCaseStudyParagraphs);
syncNavigationToScroll();

/* Hovering over the navigation markers previews each grid in the center. */
navigationTargets.forEach((target) => {
  target.addEventListener('pointerenter', () => {
    centerGrid(Number(target.dataset.gridIndex));
  });

  target.addEventListener('focus', () => {
    centerGrid(Number(target.dataset.gridIndex));
  });

  target.addEventListener('click', () => {
    centerGrid(Number(target.dataset.gridIndex), false);
  });
});

homeNavigationButton.addEventListener('click', () => {
  centerGrid(0, false);
});

navigationTrack.addEventListener('pointerleave', () => {
  cardCollection.classList.remove('is-navigation-preview');
});

/* ---------- Cursor-reactive navigation lines ---------- */

let navigationLines = [];
let activeNavigationLineIndexes = new Set();
let pendingLineAnimationFrame = null;
let latestPointerPosition = null;

function createNavigationLines() {
  const availableWidth = navigationLinesContainer.clientWidth;
  const lineWidth = 1;
  const gapBetweenLines = 4;
  const numberOfLines = Math.max(
    1,
    Math.floor((availableWidth + gapBetweenLines) / (lineWidth + gapBetweenLines))
  );

  navigationLines = Array.from({ length: numberOfLines }, () => {
    const line = document.createElement('span');
    line.className = 'navigation-line';
    return line;
  });

  navigationLinesContainer.replaceChildren(...navigationLines);
  activeNavigationLineIndexes.clear();
}

function resetNavigationLines() {
  activeNavigationLineIndexes.forEach((lineIndex) => {
    const line = navigationLines[lineIndex];
    if (!line) return;

    line.style.removeProperty('--line-scale');
    line.style.removeProperty('--line-offset');
    line.style.removeProperty('--line-opacity');
  });

  activeNavigationLineIndexes.clear();
}

function animateNavigationLines() {
  pendingLineAnimationFrame = null;

  if (!latestPointerPosition || reducedMotionPreference.matches) {
    resetNavigationLines();
    return;
  }

  const trackBounds = navigationTrack.getBoundingClientRect();
  const lineLayerBounds = navigationLinesContainer.getBoundingClientRect();
  const pointerX = latestPointerPosition.x - lineLayerBounds.left;
  const pointerY = latestPointerPosition.y - trackBounds.top;
  const verticalDistanceFromCenter = pointerY - trackBounds.height / 2;
  const influenceRadius = 105;
  const lineWidth = 1;
  const gapBetweenLines = 4;
  const lineStep = lineWidth + gapBetweenLines;
  const linesTotalWidth = navigationLines.length * lineWidth
    + (navigationLines.length - 1) * gapBetweenLines;
  const firstLineCenter = (lineLayerBounds.width - linesTotalWidth) / 2 + lineWidth / 2;
  const firstInfluencedLine = clamp(
    Math.floor((pointerX - influenceRadius - firstLineCenter) / lineStep),
    0,
    navigationLines.length - 1
  );
  const lastInfluencedLine = clamp(
    Math.ceil((pointerX + influenceRadius - firstLineCenter) / lineStep),
    0,
    navigationLines.length - 1
  );
  const nextActiveLineIndexes = new Set();

  for (let lineIndex = firstInfluencedLine; lineIndex <= lastInfluencedLine; lineIndex += 1) {
    const line = navigationLines[lineIndex];
    const linePositionX = firstLineCenter + lineIndex * lineStep;
    const distanceFromPointer = Math.abs(linePositionX - pointerX);
    const influence = Math.max(0, 1 - distanceFromPointer / influenceRadius);
    const softenedInfluence = influence * influence;

    const heightScale = 1 + softenedInfluence * 0.7;
    const verticalOffset = verticalDistanceFromCenter * softenedInfluence * 0.18;
    const opacity = 0.65 + softenedInfluence * 0.35;

    line.style.setProperty('--line-scale', heightScale.toFixed(3));
    line.style.setProperty('--line-offset', `${verticalOffset.toFixed(2)}px`);
    line.style.setProperty('--line-opacity', opacity.toFixed(3));
    nextActiveLineIndexes.add(lineIndex);
  }

  activeNavigationLineIndexes.forEach((lineIndex) => {
    if (nextActiveLineIndexes.has(lineIndex)) return;

    const line = navigationLines[lineIndex];
    line.style.removeProperty('--line-scale');
    line.style.removeProperty('--line-offset');
    line.style.removeProperty('--line-opacity');
  });

  activeNavigationLineIndexes = nextActiveLineIndexes;
}

navigationTrack.addEventListener('pointermove', (event) => {
  latestPointerPosition = { x: event.clientX, y: event.clientY };

  if (pendingLineAnimationFrame === null) {
    pendingLineAnimationFrame = requestAnimationFrame(animateNavigationLines);
  }
});

navigationTrack.addEventListener('pointerleave', () => {
  latestPointerPosition = null;
  resetNavigationLines();
});

// Recalculate the number of lines whenever the responsive navbar changes size.
const navigationResizeObserver = new ResizeObserver(createNavigationLines);
navigationResizeObserver.observe(navigationTrack);
createNavigationLines();

function scheduleGridAlignment() {
  clearTimeout(scrollSnapTimerId);

  // Wait until the wheel stops, then align the nearest grid with the navbar.
  scrollSnapTimerId = setTimeout(() => {
    scrollSnapTimerId = null;
    cardCollection.classList.add('is-wheel-scrolling');
    horizontalScrollTarget = findNearestGridPosition(horizontalScrollTarget);
    startScrollAnimation();
  }, 110);
}

cardCollection.addEventListener('wheel', (event) => {
  // The mobile layout is a native vertical document flow.
  if (mobileLayoutPreference.matches) return;

  const isHorizontalGesture = Math.abs(event.deltaX) > Math.abs(event.deltaY);
  const rawWheelMovement = isHorizontalGesture ? event.deltaX : event.deltaY;

  // Some mice report wheel distance as lines instead of pixels.
  const wheelMovementInPixels = event.deltaMode === WheelEvent.DOM_DELTA_LINE
    ? rawWheelMovement * 16
    : rawWheelMovement;

  if (wheelMovementInPixels === 0) return;

  if (scrollAnimationFrameId === null) {
    horizontalScrollTarget = cardCollection.scrollLeft;
  }

  const nextScrollTarget = clamp(
    horizontalScrollTarget + wheelMovementInPixels,
    0,
    getMaximumScrollPosition()
  );

  // At either end, allow the browser to handle the wheel normally.
  if (nextScrollTarget === horizontalScrollTarget) return;

  event.preventDefault();
  horizontalScrollTarget = nextScrollTarget;
  cardCollection.classList.add('is-wheel-scrolling');

  startScrollAnimation();
  scheduleGridAlignment();
}, { passive: false });

/* ---------- Temporary card hover effect ---------- */

cards.forEach((card) => {
  if (card.classList.contains('card--static') || card.classList.contains('card--no-tilt')) return;

  let pendingTiltAnimationFrame = null;
  let latestCardPointerPosition = null;

  card.addEventListener('pointermove', (event) => {
    if (reducedMotionPreference.matches) return;

    latestCardPointerPosition = { x: event.clientX, y: event.clientY };
    if (pendingTiltAnimationFrame !== null) return;

    pendingTiltAnimationFrame = requestAnimationFrame(() => {
      pendingTiltAnimationFrame = null;
      if (!latestCardPointerPosition) return;

      const cardBounds = card.getBoundingClientRect();
      const horizontalPointerPosition = (
        latestCardPointerPosition.x - cardBounds.left
      ) / cardBounds.width - 0.5;
      const verticalPointerPosition = (
        latestCardPointerPosition.y - cardBounds.top
      ) / cardBounds.height - 0.5;

      card.style.setProperty('--rx', `${(-verticalPointerPosition * 1.6).toFixed(2)}deg`);
      card.style.setProperty('--ry', `${(horizontalPointerPosition * 1.6).toFixed(2)}deg`);
    });
  });

  card.addEventListener('pointerleave', () => {
    latestCardPointerPosition = null;
    if (pendingTiltAnimationFrame !== null) {
      cancelAnimationFrame(pendingTiltAnimationFrame);
      pendingTiltAnimationFrame = null;
    }

    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  });
});

/* ---------- Landing confetti and welcome toast ---------- */

let hasPlayedWelcomeCelebration = false;
const introToConfettiDelay = 2000;
const confettiToToastDelay = 300;

function waitForAnimationSequence(delay) {
  return new Promise((resolve) => window.setTimeout(resolve, delay));
}

function burstWelcomeConfetti() {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const confettiGradients = [
    ['#ff4f9a', '#ff7a45', '#ffd84d'],
    ['#ff5edb', '#a86cff', '#625dff'],
    ['#7c5cff', '#3f8cff', '#42e8ff'],
    ['#16d9c5', '#58efa1', '#d5f75f'],
    ['#ffe45e', '#ff9f43', '#ff5364']
  ];
  const confettiShapes = ['ribbon', 'ribbon', 'ribbon', 'diamond', 'circle'];
  const particleCount = mobileLayoutPreference.matches ? 320 : 700;
  const pulseCount = 5;
  const particlesPerPulse = particleCount / pulseCount;
  const particles = Array.from({ length: particleCount }, (_, index) => {
    const launchesFromLeft = index % 2 === 0;
    const pulseIndex = Math.floor(index / particlesPerPulse);
    const gradient = confettiGradients[
      (index + Math.floor(Math.random() * confettiGradients.length)) % confettiGradients.length
    ];

    return {
      x: launchesFromLeft ? -12 : viewportWidth + 12,
      y: viewportHeight * (0.32 + Math.random() * 0.58),
      launchDelay: pulseIndex * 240 + Math.random() * 45,
      velocityX: (launchesFromLeft ? 1 : -1) * (7 + Math.random() * 15),
      velocityY: -7 - Math.random() * 15,
      width: 5 + Math.random() * 7,
      height: 3 + Math.random() * 5,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.38,
      flip: Math.random() * Math.PI,
      flipSpeed: 0.08 + Math.random() * 0.16,
      drift: Math.random() * Math.PI * 2,
      driftSpeed: 0.035 + Math.random() * 0.035,
      opacity: 0.78 + Math.random() * 0.22,
      shape: confettiShapes[Math.floor(Math.random() * confettiShapes.length)],
      gradient: Math.random() > 0.5 ? gradient : [...gradient].reverse()
    };
  });
  const animationDuration = 2800;
  const fadeDuration = 600;
  const startedAt = performance.now();
  let previousFrame = startedAt;

  canvas.className = 'welcome-confetti';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.width = Math.round(viewportWidth * pixelRatio);
  canvas.height = Math.round(viewportHeight * pixelRatio);
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  document.body.append(canvas);

  return new Promise((resolve) => {
    function finishConfetti() {
      canvas.remove();
      resolve();
    }

    function runConfettiFrame(now) {
      const elapsed = now - startedAt;
      const frameScale = Math.min(2, (now - previousFrame) / 16.67);
      const opacity = elapsed > animationDuration - fadeDuration
        ? Math.max(0, (animationDuration - elapsed) / fadeDuration)
        : 1;

      previousFrame = now;
      context.clearRect(0, 0, viewportWidth, viewportHeight);

      particles.forEach((particle) => {
        if (elapsed < particle.launchDelay) return;

        particle.velocityX *= 0.992 ** frameScale;
        particle.velocityY += 0.19 * frameScale;
        particle.drift += particle.driftSpeed * frameScale;
        particle.x += (particle.velocityX + Math.sin(particle.drift) * 0.32) * frameScale;
        particle.y += particle.velocityY * frameScale;
        particle.rotation += particle.rotationSpeed * frameScale;
        particle.flip += particle.flipSpeed * frameScale;

        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.rotation);
        context.scale(1, Math.max(0.16, Math.abs(Math.cos(particle.flip))));
        context.globalAlpha = opacity * particle.opacity;

        const particleGradient = context.createLinearGradient(
          -particle.width / 2,
          -particle.height / 2,
          particle.width / 2,
          particle.height / 2
        );
        particleGradient.addColorStop(0, particle.gradient[0]);
        particleGradient.addColorStop(0.52, particle.gradient[1]);
        particleGradient.addColorStop(1, particle.gradient[2]);
        context.fillStyle = particleGradient;

        if (particle.shape === 'circle') {
          const radius = particle.width * 0.45;
          context.beginPath();
          context.arc(0, 0, radius, 0, Math.PI * 2);
          context.fill();
        } else if (particle.shape === 'diamond') {
          context.beginPath();
          context.moveTo(0, -particle.width * 0.58);
          context.lineTo(particle.width * 0.5, 0);
          context.lineTo(0, particle.width * 0.58);
          context.lineTo(-particle.width * 0.5, 0);
          context.closePath();
          context.fill();
        } else {
          const halfWidth = particle.width / 2;
          const halfHeight = particle.height / 2;
          context.beginPath();
          context.moveTo(-halfWidth, -halfHeight);
          context.quadraticCurveTo(0, -halfHeight * 1.5, halfWidth, -halfHeight);
          context.lineTo(halfWidth, halfHeight);
          context.quadraticCurveTo(0, halfHeight * 0.5, -halfWidth, halfHeight);
          context.closePath();
          context.fill();
        }

        context.restore();
      });

      context.globalAlpha = 1;

      if (elapsed < animationDuration) {
        requestAnimationFrame(runConfettiFrame);
        return;
      }

      finishConfetti();
    }

    requestAnimationFrame(runConfettiFrame);
  });
}

function showWelcomeToast() {
  const toast = document.createElement('aside');
  const title = document.createElement('strong');
  const message = document.createElement('p');
  const closeButton = document.createElement('button');
  const closeIcon = document.createElement('span');
  let removalTimer;

  toast.className = 'welcome-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  title.className = 'welcome-toast__title';
  title.textContent = 'Welcome to my portfolio!';
  message.className = 'welcome-toast__message';
  message.textContent = 'Glad you’re here — explore my work, builds, and story.';
  closeButton.className = 'welcome-toast__close';
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Dismiss welcome message');
  closeIcon.className = 'material-symbols-rounded';
  closeIcon.setAttribute('aria-hidden', 'true');
  closeIcon.textContent = 'close';
  closeButton.append(closeIcon);

  function removeToast() {
    clearTimeout(removalTimer);
    toast.classList.remove('is-visible');
    window.setTimeout(() => toast.remove(), reducedMotionPreference.matches ? 0 : 650);
  }

  closeButton.addEventListener('click', removeToast);
  toast.append(title, message, closeButton);
  document.body.append(toast);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('is-visible'));
  });
  removalTimer = window.setTimeout(removeToast, 5200);
}

async function playWelcomeCelebration() {
  if (hasPlayedWelcomeCelebration || gridPage.hidden) return;

  hasPlayedWelcomeCelebration = true;
  await waitForAnimationSequence(introToConfettiDelay);

  if (gridPage.hidden) return;

  if (!reducedMotionPreference.matches) {
    await burstWelcomeConfetti();
    await waitForAnimationSequence(confettiToToastDelay);
  }

  if (!gridPage.hidden) {
    showWelcomeToast();
  }
}

initialIntroAnimationComplete.then(playWelcomeCelebration);
