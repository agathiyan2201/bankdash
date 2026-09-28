// Photos are imported here so Vite bundles them into dist (works on Netlify).
// JSON data refers to them by key, e.g. "photo": "workman".
import profile from './profile.jpg';
import workman from './workman.jpg';
import liviaBator from './livia-bator.jpg';
import randyPress from './randy-press.jpg';

export const photos = {
  profile,
  workman,
  'livia-bator': liviaBator,
  'randy-press': randyPress,
};

export const photoFor = (key) => (key ? photos[key] : undefined);
export default profile;
