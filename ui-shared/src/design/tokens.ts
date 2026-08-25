export const colors = {
  ink: '#e8f8fb',
  muted: '#7695a4',
  cyan: '#42e7f2',
  cyan700: '#2abfd6',
  panel: 'rgba(5, 18, 32, 0.8)',
  line: 'rgba(104, 210, 229, 0.2)',
  background: '#020711',
  success: '#62dc9b',
  warning: '#f5c84e',
  info: '#58eff7',
};

export const typography = {
  fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  monospaceFontFamily: 'ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
  baseFontSize: 16,
  scale: [12, 14, 16, 20, 24, 32, 48],
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 40,
};

export const radii = {
  small: 6,
  round: 9999,
  card: 12,
};

export const gradients = {
  core: 'linear-gradient(122deg, #020812 0%, #061422 48%, #020610 100%)',
  cyanGlow: 'radial-gradient(circle at 30% 20%, rgba(66,231,242,0.14), transparent 30%)',
};

export const motion = {
  easeOrganic: 'cubic-bezier(0.22, 0.8, 0.25, 1)',
};

export default { colors, typography, spacing, radii, gradients, motion };
