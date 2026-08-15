const asset = filename => `${import.meta.env.BASE_URL}images/${filename}`;

export const imagePaths = {
  logo: asset('logo.svg'),
  heroPreview: asset('start.webp'),
  productDesignSystem: asset('design-system.webp'),
  productConfiguration: asset('flexible-configuration.webp'),
  productCompliance: asset('default.webp'),
  securityModels: asset('safety-1.webp'),
  securityCloud: asset('safety-2.webp'),
  securityStack: asset('safety-3.webp'),
  impact: ['speed-1.png', 'speed-2.png', 'speed-3.png', 'speed-4.png'].map(asset),
  brandLogos: [
    asset('ozon.svg'),
    asset('t2.svg'),
    asset('avito.svg'),
    asset('lenta.svg'),
  ],
  showcase: [
    ['site-1.webp', 'site-2.webp', 'site-3.webp', 'site-4.webp'].map(asset),
    ['image-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp'].map(asset),
    ['video-1.webp', 'video-2.webp', 'video-3.webp', 'video-4.webp'].map(asset),
    ['bunner-1.webp', 'bunner-2.webp', 'bunner-3.webp', 'bunner-4.webp'].map(asset),
    ['presentation-1.webp', 'presentation-2.webp', 'presentation-3.webp', 'presentation-4.webp'].map(asset),
  ],
};
