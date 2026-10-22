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
  {
    id: 'adani-port-130ft-crane',
    chipLabel: 'Adani Port',
    category: 'ODC Transportation | Over Dimensional Cargo',
    title: 'Transporting a 130-Foot Crane for Adani Port Projects',
    client: 'HEBEN Cranes',
    project: 'Adani Port Projects',
    overview: "Radhekrishna Roadways undertook the transportation of an oversized 130-foot-long, 10-foot-wide crane weighing 40 tons for HEBEN Cranes' Adani Port Projects. Moving cargo of this scale requires careful transport planning, suitable trailer coordination and attention to route feasibility. Our specialized ODC logistics capabilities help address the challenges associated with transporting large industrial equipment.",
    stats: [
      { value: '130 ft x 10 ft', label: 'Cargo Dimensions' },
      { value: '40 Ton', label: 'Cargo Weight' },
      { value: 'ODC', label: 'Service' },
    ],
    video: '/videos/case-studies/adani-port-crane.mp4',
    poster: '/videos/case-studies/adani-port-crane-poster.jpg',
  },
];
