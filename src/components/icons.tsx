// Иконки — outline, 1.6px, currentColor, без эмодзи
import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { size?: number }
const base = (size = 20): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
})

export const IconBike = (p: P) => (
  <svg {...base(p.size)} {...p}>
    <circle cx="5.5" cy="17.5" r="3.5" />
    <circle cx="18.5" cy="17.5" r="3.5" />
    <path d="M5.5 17.5L9 10l3 7.5L18.5 10l-3 7.5M9 10h5l-2-4" />
  </svg>
)
export const IconBook = (p: P) => (
  <svg {...base(p.size)} {...p}>
    <path d="M4 5a2 2 0 012-2h6v16H6a2 2 0 00-2 2V5z" />
    <path d="M12 3h6a2 2 0 012 2v16a2 2 0 00-2-2h-6z" />
  </svg>
)
export const IconSpark = (p: P) => (
  <svg {...base(p.size)} {...p}>
    <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3z" />
    <path d="M19 11l.9 2.1L22 14l-2.1.9L19 17l-.9-2.1L16 14l2.1-.9L19 11z M5 14l.9 1.9L8 17l-2.1.9L5 20l-.9-2.1L2 17l2.1-1.1L5 14z" />
  </svg>
)
export const IconUser = (p: P) => (
  <svg {...base(p.size)} {...p}>
    <circle cx="12" cy="8" r="3.2" />
    <path d="M5 20a7 7 0 0114 0" />
  </svg>
)
export const IconWrench = (p: P) => (
  <svg {...base(p.size)} {...p}>
    <path d="M14.7 6.3a4 4 0 010 5.6L9 17.6a1 1 0 01-1.4 0l-1-1a1 1 0 010-1.4l5.7-5.7a4 4 0 015.4-.2z" />
  </svg>
)
export const IconChain = (p: P) => (
  <svg {...base(p.size)} {...p}>
    <path d="M10 13a2 2 0 101.4-3.4L9 7.2a2 2 0 10-2.8 2.8l1 1M14 11a2 2 0 10-1.4 3.4l2.4 2.4a2 2 0 102.8-2.8l-1-1" />
  </svg>
)
export const IconCassette = (p: P) => (
  <svg {...base(p.size)} {...p}>
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M12 6v3M12 15v3M6 12h3M15 12h3M7.5 7.5l2.1 2.1M14.4 14.4l2.1 2.1M16.5 7.5l-2.1 2.1M9.6 14.4l-2.1 2.1" />
  </svg>
)
export const IconWheel = (p: P) => (
  <svg {...base(p.size)} {...p}>
    <circle cx="12" cy="12" r="7" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 5v3M12 16v3M5 12h3M16 12h3M6.8 6.8l2.1 2.1M15.1 15.1l2.1 2.1M17.2 6.8l-2.1 2.1M8.9 15.1l-2.1 2.1" />
  </svg>
)
export const IconBrake = (p: P) => (
  <svg {...base(p.size)} {...p}>
    <circle cx="12" cy="12" r="7" />
    <path d="M12 12l3.5-3.5M12 12l-3.5 3.5M12 12l3.5 3.5M12 12l-3.5-3.5" />
    <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
  </svg>
)
export const IconGears = (p: P) => (
  <svg {...base(p.size)} {...p}>
    <circle cx="9" cy="12" r="3" />
    <circle cx="16" cy="12" r="2" />
    <path d="M12 9l4-1M12 15l4 1" />
  </svg>
)
export const IconFrame = (p: P) => (
  <svg {...base(p.size)} {...p}>
    <path d="M7 17L12 7l5 10M7 17h10M12 7l-1.5 4M12 7l1.5 4" />
  </svg>
)
export const IconCloud = (p: P) => (
  <svg {...base(p.size)} {...p}>
    <path d="M7 17a3 3 0 01-.2-6A4 4 0 0114 9a3 3 0 015 2 3 3 0 01.5 6H7z" />
  </svg>
)
export const IconGauge = (p: P) => (
  <svg {...base(p.size)} {...p}>
    <path d="M4 14a8 8 0 0116 0" />
    <path d="M12 14l3.5-2.5" />
    <circle cx="12" cy="14" r="1.4" fill="currentColor" stroke="none" />
  </svg>
)
export const IconHome = (p: P) => (
  <svg {...base(p.size)} {...p}>
    <path d="M3 10l9-6 9 6v9a1 1 0 01-1 1h-4v-5H8v5H4a1 1 0 01-1-1v-9z" />
  </svg>
)
export const IconShield = (p: P) => (
  <svg {...base(p.size)} {...p}>
    <path d="M12 3l7 3v5a9 9 0 01-7 8 9 9 0 01-7-8V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)
