/*
 * Desktop scaling: between 1024px and 1439px the whole app is rendered at the 1440px
 * design width and scaled down with CSS zoom, so 1024px looks exactly like 1440px.
 * Below 1024px the normal responsive (tablet/mobile) layout is used.
 */
const DESIGN_WIDTH = 1440;
const MIN_DESKTOP = 1024;

export function applyDesktopScale() {
  const root = document.documentElement;
  const supportsZoom = 'zoom' in root.style;

  const update = () => {
    const w = window.innerWidth;
    const zoom = supportsZoom && w >= MIN_DESKTOP && w < DESIGN_WIDTH ? w / DESIGN_WIDTH : 1;
    root.style.setProperty('--app-zoom', String(zoom));
    document.body.style.zoom = zoom === 1 ? '' : String(zoom);
    root.classList.toggle('desktop-scaled', zoom !== 1);
  };

  update();
  window.addEventListener('resize', update);
}
