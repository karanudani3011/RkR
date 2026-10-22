/*
 * To add a case study: place an H.264 (yuv420p) MP4 under 8 MB in
 * public/videos/case-studies/ (do not use Git LFS), then add one object with
 * id, category, title, client, overview, stats (2–4 items), video, and an
 * optional poster. Use absolute public-root paths such as
 * /videos/case-studies/example.mp4.
 */
export const caseStudies = [
  {
    id: 'nova-crane-100ft',
    category: 'ODC Transportation | Heavy Industrial Logistics',
    title: '100-Foot Crane Transportation for NOVA Crane',
    client: 'NOVA Crane',
    overview: 'Radhekrishna Roadways undertook the transportation of a 100-foot-long, 30-ton crane for NOVA Crane using a multi-axle trailer. This project demonstrates our capability to coordinate specialized transport solutions for oversized industrial cargo.',
    stats: [
      { value: '100 ft', label: 'Cargo Length' },
      { value: '30 Ton', label: 'Cargo Weight' },
      { value: 'Multi-Axle', label: 'Trailer Type' },
    ],
    video: '/videos/case-study.mp4',
  },
];
