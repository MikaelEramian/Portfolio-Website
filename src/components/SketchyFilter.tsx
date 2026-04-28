/**
 * Mounted once. Defines the SVG displacement filter used to give borders,
 * underlines and pill outlines a barely-perceptible hand-drawn wobble.
 */
const SketchyFilter = () => (
  <svg
    aria-hidden
    width="0"
    height="0"
    style={{ position: "absolute", overflow: "hidden" }}
  >
    <defs>
      <filter id="sketchy-filter" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="4" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" />
      </filter>
    </defs>
  </svg>
);

export default SketchyFilter;
