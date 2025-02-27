import { Category, Project } from './types';

export const projects: Project[] = [
  {
    title: 'Triptalk',
    slug: 'triptalk',
    id: 0,
    coordinates: {
      lat: 6.094775390625,
      lon: -107.879150390625,
    },
    data: {
      thumb: {
        src: '/images/triptalk_thumb_1.webp',
        size: {
          width: 2048,
          height: 1536,
        },
      },
      projectLink: {
        href: 'https://triptalk.space/',
        text: 'Visit Website',
      },
      images: [
        {
          src: '/images/triptalkt_mockup_1.webp',
          description: '',
          size: {
            width: 3382,
            height: 2536,
          },
        },
        {
          src: '/images/triptalk_1.webp',
          description: '',
          size: {
            width: 2048,
            height: 1536,
          },
        },
      ],
      year: '2021',
      categories: ['Design', 'Development', 'Generative AI'],
      description:
        'Triptalk transforms ordinary journeys into captivating historical experiences through an AI-powered audio guide that plays automatically podcasts if you cross a point of interest. I developed this app as a university project at HTW Berlin, creating a system that automatically converts Wikipedia content into engaging podcasts with summaries and interviews. The project was nominated for the UX Design Award 2021.\n\nThe technical backbone combines VueJS and CapacitorJS (web technologies for creating native apps) for the frontend, bundled into a native app. I built a custom Python backend with my own library called "topcast" that generates podcasts from prompts like Wikipedia articles. The system, which emerged in the pre-ChatGPT era and required custom transformers for text generation, handles the complex process of summarizing texts, generating interview formats, converting text to speech, and producing the final podcast output.',
      hex: '#EFE9D9',
      rgb: {
        r: 239,
        g: 233,
        b: 217,
      },
    },
  },
  {
    title: 'Mapoly',
    slug: 'mapoly',
    id: 1,
    coordinates: {
      lat: -30.47783203125,
      lon: -12.689384765625,
    },
    data: {
      thumb: {
        src: '/images/mapoly_thumb_1.webp',
        size: {
          width: 2048,
          height: 1536,
        },
      },
      projectLink: {
        href: 'https://mapoly.de/',
        text: 'Visit Website',
      },
      images: [
        {
          src: '/images/mapoly_mockup_1.webp',
          description: 'The web app interface',
          size: {
            width: 3498,
            height: 2029,
          },
        },
        {
          src: '/images/mapoly_mockup_2.webp',
          description: 'The mobile app interface',
          size: {
            width: 3382,
            height: 2536,
          },
        },
        {
          src: '/images/mapoly_1.webp',
          description: 'Preview of the color schemes',
          size: {
            width: 2048,
            height: 1536,
          },
        },
        {
          src: '/images/mapoly_2.webp',
          description: 'Different screens in the design application Fimga',
          size: {
            width: 2048,
            height: 1536,
          },
        },
      ],
      year: '2022',
      categories: ['Design', 'Development', 'Cartography'],
      description:
        "Mapoly reimagines navigation for large events by offering a free digital alternative to traditional wayfinding systems. My Bachelor project at HTW Berlin addresses the gap in conventional navigation systems that don't cover temporary infrastructure. It enables event organizers to mark key locations with rich content (images, descriptions, schedules) while attendees can explore independently and receive real-time updates through an intuitive map interface.\n\nI built Mapoly after extensive research into digital geographical spaces, implementing it with VueJS and CapacitorJS (web technologies for creating native mobile apps) as a native app. The data architecture uses Supabase.io (a cloud database service) as the backend service for efficient storage and retrieval of user-generated content, maintaining a responsive experience even in crowded event environments.",
      hex: '#FADB9F',
      rgb: {
        r: 250,
        g: 219,
        b: 159,
      },
    },
  },
  {
    title: 'Trender',
    slug: 'trender',
    id: 2,

    coordinates: {
      lat: 36.633779296875,
      lon: 34.0871484375,
    },
    data: {
      thumb: {
        src: '/images/trender_thumb_1.webp',
        size: {
          width: 2048,
          height: 1536,
        },
      },
      projectLink: {
        href: 'https://patreon.com/labenz?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink',
        text: 'Visit Patreon',
      },
      images: [
        {
          src: '/images/trender_mockup_1.webp',
          description: 'The interface of the Trender application',
          size: {
            width: 3498,
            height: 2029,
          },
        },
        {
          src: '/images/trender_mockup_2.webp',
          description: 'Trender application working with Blender',
          size: {
            width: 3498,
            height: 2029,
          },
        },
        {
          src: '/images/trender_mockup_3.webp',
          description: 'Trender application working with Blender',
          size: {
            width: 3498,
            height: 2029,
          },
        },
        {
          src: '/images/trender_mockup_4.webp',
          description: 'Trender application working with Cinema 4D',
          size: {
            width: 3498,
            height: 2029,
          },
        },
      ],
      year: '2022',
      categories: ['Development', '3D', 'Generative AI'],
      description:
        "Trender bridges the gap between text-to-image AI and 3D visualization by transforming Stable Diffusion (an AI image generation system) into a (near) real-time renderer for professional 3D software. Working with my intern, I developed a solution that synchronizes image data from Blender or Cinema 4D (professional 3D modeling software) and processes it through Stable Diffusion. This improves the image generation process by adding details that would otherwise need to be manually modeled, giving artists fine control over generated images while allowing them to modify, enhance, or dynamize 3D scenes using text prompts.\n\nThe implementation combines the desktop bundler Tauri with VueJS (technologies for creating desktop applications) for the application interface, while custom Python add-ons enable seamless integration with 3D software. We built on an open-source Stable Diffusion implementation to handle the AI processing components, creating a commercial tool that's now distributed through my Patreon subscription service.",
      hex: '#868780',
      rgb: {
        r: 158,
        g: 124,
        b: 1,
      },
    },
  },
  {
    title: 'Island! Island! Island!',
    slug: 'island-island-island',
    id: 3,
    coordinates: {
      lat: 71.580498046875,
      lon: 97.3698046875,
    },
    data: {
      thumb: {
        src: '/images/island_thumb_1.webp',
        size: {
          width: 2048,
          height: 1536,
        },
      },
      projectLink: {
        href: 'https://vimeo.com/796407585?share=copy#t=0',
        text: 'Watch Screencast',
      },
      images: [
        {
          src: '/images/island_mockup_1.webp',
          description: 'Start screen of the scrollstory',
          size: {
            width: 3498,
            height: 2029,
          },
        },
        {
          src: '/images/island_1.webp',
          size: {
            width: 2048,
            height: 1536,
          },
        },
        {
          src: '/images/island_2.webp',
          size: {
            width: 2048,
            height: 1536,
          },
        },
        {
          src: '/images/island_3.webp',

          size: {
            width: 2048,
            height: 1536,
          },
        },
      ],
      year: '2018',
      categories: ['Motion Design', '3D'],
      description:
        'This scrollstory explores the fascinating geographical oddity of an island within a lake within an island within a lake within an island in the Philippines. Created during my time at Infographics Group, this interactive piece triggers animations as users scroll through the webpage, delivering content in an engaging, motion-driven narrative format.\n\nI designed the visual narrative and created the animations to gradually reveal the nested geographical layers, creating a sense of discovery that mirrors the unusual nature of this real-world location. The technical implementation used a specialized tool based on ThreeJS (a JavaScript 3D library) to handle the complex animation sequences that respond to scroll events.',
      hex: '#2C3C4D',
      rgb: {
        r: 44,
        g: 60,
        b: 77,
      },
    },
  },
  {
    title: 'Autobahn Speedracer',
    slug: 'autobahn-speedracer',
    id: 4,
    coordinates: {
      lat: 49.1129296875,
      lon: -161.150537109375,
    },
    data: {
      thumb: {
        src: '/images/autobahn_thumb_1.webp',
        size: {
          width: 2048,
          height: 1536,
        },
      },
      projectLink: {
        href: 'https://vimeo.com/795221909?share=copy#t=0',
        text: 'Watch Animation',
      },
      images: [
        {
          src: '/images/autobahn_1.webp',
          size: {
            width: 3969,
            height: 2234,
          },
        },
        {
          src: '/images/autobahn_2.webp',
          size: {
            width: 3969,
            height: 2234,
          },
        },
        {
          src: '/images/autobahn_3.webp',
          description: '',
          size: {
            width: 3969,
            height: 2234,
          },
        },
        {
          src: '/images/autobahn_4.webp',
          description: '',
          size: {
            width: 3969,
            height: 2234,
          },
        },
      ],
      year: '2018',
      categories: ['Motion Design'],
      description:
        'Autobahn Speedracer serves as a teaser for an infographic about Germany\'s autobahn speed record, set in 1938 and unbroken to this day. Working at Infographics Group, I developed the concept, created the animation, and contributed to the illustrations for this piece that would later expand into a series on highways and appear in the book "The World Explained."\n\nI produced the motion design using Adobe After Effects, with illustrations crafted in Illustrator and Photoshop. The project included complete sound design in Adobe Audition to enhance the visual storytelling of this historical automotive achievement.',
      hex: '#A69574',
      rgb: {
        r: 166,
        g: 149,
        b: 116,
      },
    },
  },
  {
    title: 'Traces of the Conflict',
    slug: 'traces-of-the-conflict',
    id: 5,
    coordinates: {
      lat: -31.61671875,
      lon: 134.59833984375,
    },
    data: {
      thumb: {
        src: '/images/gaza_thumb_1.webp',
        size: {
          width: 2048,
          height: 1536,
        },
      },
      projectLink: {
        href: 'https://vertical52-stern-gaza.vercel.app/',
        text: 'Visit Website',
      },
      images: [
        {
          src: '/images/gaza_1.webp',
          description: 'Desctruction of buildings in April 2024',
          size: {
            width: 2048,
            height: 1536,
          },
        },
        {
          src: '/images/gaza_2.webp',
          description: 'Desctruction of buildings in November 2023',
          size: {
            width: 2048,
            height: 1536,
          },
        },
        {
          src: '/images/gaza_3.webp',
          description: 'Desctruction of buildings in Oktober 2023',
          size: {
            width: 2048,
            height: 1536,
          },
        },
        {
          src: '/images/gaza_mockup_1.webp',
          description: 'Cover story for STERN magazine',
          size: {
            width: 3498,
            height: 2029,
          },
        },
      ],
      year: '2024',
      categories: ['Design', 'Development', 'Cartography'],
      description:
        'Traces of the Conflict visualizes destruction in the Gaza Strip through interactive elements that create animation through user interaction. Working with Vertical52 for STRG_F and ARD Panorama (German media outlets), I conducted data analysis and implemented the visualization system that later featured as the cover story for STERN magazine. The research behind this project received the CIVIS Media Prize.\n\nThe technical implementation pushed the boundaries of web-based geographical visualization. I processed complex datasets using QGIS (a geospatial data analysis software) and established a dedicated geodata server that outputs optimized geolayers I created. The frontend, built with NextJS and Maplibre (mapping technologies), delivers high-performance rendering by dynamically tiling the map into smaller SVG chunks, creating an optimized data pipeline between server and frontend that maintains smooth interactions despite the density of information.',
      hex: '#1E1C1F',
      rgb: {
        r: 30,
        g: 28,
        b: 31,
      },
    },
  },
  {
    title: 'Radonradar',
    slug: 'radonradar',
    id: 6,
    coordinates: {
      lat: -63.849375,
      lon: -83.0401171875,
    },
    data: {
      thumb: {
        src: '/images/radonradar_thumb_1.webp',
        size: {
          width: 2048,
          height: 1536,
        },
      },
      projectLink: {
        href: 'https://www.radon-radar.de/',
        text: 'Visit Website',
      },
      images: [
        {
          src: '/images/radonradar_mockup_1.webp',
          description: 'Landing page of the Radonradar',
          size: {
            width: 3498,
            height: 2029,
          },
        },
        {
          src: '/images/radonradar_mockup_2.webp',
          description: 'Subpage of the Radonradar',
          size: {
            width: 3498,
            height: 2029,
          },
        },
      ],
      year: '2024',
      categories: ['Design', 'Development', 'Cartography'],
      description:
        'Radonradar addresses the overlooked health risk of radon exposure (a radioactive gas that can cause lung cancer) by providing users with predictive air quality information. In collaboration with Radonfinder GmbH, I developed a web app that forecasts radon levels based on ten different weather parameters, helping users understand and mitigate this potential health hazard.\n\nI designed the UI with a focus on clarity and accessibility, implementing the complete solution with NextJS (a React framework for web applications). Similar to a rain radar, the system makes complex data accessible to everyone regardless of their specialized knowledge. The visualization receives data from existing predictive models by the Radonfinder GmbH and presents it in an intuitive, easy-to-understand format that allows users to quickly assess radon risks in their area.',
      hex: '#70CDF8',
      rgb: {
        r: 112,
        g: 205,
        b: 248,
      },
    },
  },
];

export const categories: Category[] = [
  {
    title: 'Generative AI',
    id: 0,
    coordinates: { lat: 28.571923828125, lon: -42.920244140625 },
  },
  {
    title: 'Cartography',
    id: 1,
    coordinates: { lat: -76.1741015625, lon: 52.33078125 },
  },
  {
    title: 'Design',
    id: 2,
    coordinates: { lat: -54.46283203125, lon: -164.6240625 },
  },
  {
    title: 'Motion Design',
    id: 3,
    coordinates: { lat: 64.181689453125, lon: -44.277451171875 },
  },
  {
    title: '3D',
    id: 4,
    coordinates: { lat: 13.24458984375, lon: 141.74701171875 },
  },
  {
    title: 'Development',
    id: 5,
    coordinates: { lat: -8.048671875, lon: 52.6890234375 },
  },
];
