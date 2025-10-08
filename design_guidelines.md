# Design Guidelines: Seongbuk-gu University Student Beauty Salon Reservation Service

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern booking platforms like Airbnb and Booking.com, with a youthful, accessible aesthetic tailored for university students. The design emphasizes trust, ease of use, and a welcoming atmosphere for first-time beauty service users.

## Core Design Principles
- **Student-First Design**: Approachable, modern interface that resonates with university students
- **Trust & Credibility**: Professional presentation to establish confidence in the service
- **Efficient Booking Flow**: Streamlined form experience with clear visual hierarchy
- **Local Identity**: Subtle incorporation of Seongbuk-gu community feel

## Color Palette

### Light Mode
- **Primary Brand**: 280 65% 55% (Soft Purple) - Trustworthy, beauty-industry appropriate
- **Secondary**: 340 70% 60% (Warm Pink) - Accent for CTAs and highlights
- **Background**: 0 0% 98% (Soft White)
- **Surface**: 0 0% 100% (White) - Form cards and containers
- **Text Primary**: 240 20% 15% (Deep Navy)
- **Text Secondary**: 240 10% 45% (Muted Gray)

### Dark Mode
- **Primary Brand**: 280 60% 65% (Lighter Purple)
- **Secondary**: 340 65% 70% (Softer Pink)
- **Background**: 240 15% 8% (Dark Navy)
- **Surface**: 240 12% 12% (Elevated Dark)
- **Text Primary**: 0 0% 95% (Off White)
- **Text Secondary**: 240 5% 65% (Light Gray)

## Typography
- **Headings**: 'Pretendard' or 'Inter' - Clean, modern Korean/English support
  - H1: 3.5rem (56px) font-bold leading-tight
  - H2: 2.5rem (40px) font-bold
  - H3: 1.75rem (28px) font-semibold
- **Body**: 'Pretendard' or 'Inter'
  - Base: 1rem (16px) font-normal
  - Large: 1.125rem (18px) for emphasis
- **Form Labels**: 0.875rem (14px) font-medium uppercase tracking-wide

## Layout System
**Spacing Units**: Consistently use Tailwind units of **4, 6, 8, 12, 16, 20** for harmonious rhythm
- Section padding: py-20 lg:py-32
- Component spacing: space-y-8 to space-y-12
- Form field gaps: gap-6
- Container max-width: max-w-7xl for sections, max-w-4xl for forms

## Landing Page Structure

### Hero Section (80vh minimum)
- **Layout**: Two-column on desktop (lg:grid-cols-2), stacked on mobile
- **Left Column**: 
  - Compelling headline: "성북구 대학생을 위한 프리미엄 미용 서비스" (large, bold)
  - Supporting tagline emphasizing student discounts and convenience
  - Trust indicators: "1000+ 학생들의 선택" with star ratings
  - Smooth scroll CTA to booking form
- **Right Column**: Hero image showcasing modern salon environment or happy students
- **Background**: Subtle gradient overlay (primary color at 5% opacity)

### Features Section
- **Three-column grid** (lg:grid-cols-3, md:grid-cols-2, base:grid-cols-1)
- Feature cards with:
  - Icon (from Heroicons - scissors, clock, map-pin)
  - Bold title
  - Brief description
- Features: "학생 특화 가격", "편리한 위치", "전문 스타일리스트"

### Booking Form Section (Primary Focus)
- **Container**: Centered card with shadow-2xl, max-w-5xl
- **Layout**: Two-column grid on desktop (lg:grid-cols-2 gap-8), stacked on mobile
- **Left Panel - 예약정보**:
  - Date picker with calendar icon
  - Time select (10:00-20:00, 30-min intervals) as dropdown
  - Text inputs: name, phone, school, student ID, email
  - All fields with floating labels or clear top labels
- **Right Panel - 요구사항**:
  - Location dropdown (성북구 동 단위)
  - Price range dropdown
  - Desired treatment text input
  - Optional notes textarea (light background to indicate optional)
  - Photo upload zone with dashed border, drag-and-drop area
- **Submit Button**: Full-width below both panels, lg:col-span-2
  - Large, prominent with secondary color
  - Loading state with spinner

### Trust & Social Proof Section
- Student testimonials in card format (2-3 visible)
- Before/after gallery or service showcase (optional images)

### Footer
- Contact information
- Quick links (서비스 안내, 이용약관)
- Social media icons
- Copyright and admin login link (subtle, small)

## Component Library

### Form Inputs
- **Style**: Rounded-lg borders (border-2), generous padding (px-4 py-3)
- **Focus State**: Ring-2 ring-primary with border-primary transition
- **Dark Mode**: bg-surface with lighter borders, white text
- **Validation**: Red border for errors with error message below (text-red-500 text-sm)

### Dropdowns/Selects
- Custom styled select with chevron icon
- Dropdown menu with hover states (bg-gray-50 dark:bg-gray-800)
- Clear visual hierarchy for options

### Buttons
- **Primary CTA**: bg-secondary text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition
- **Secondary**: bg-white text-primary border-2 border-primary
- **Admin Login**: Subtle text button in footer

### Cards
- Shadow-lg for elevation
- Rounded-2xl for modern feel
- Hover state: subtle scale and shadow increase (hover:shadow-xl hover:scale-102)

### Admin Dashboard (Separate Page)
- Clean table layout with alternating row colors
- Filter and search bar at top
- Reservation cards showing all submission details
- Status indicators (pending/confirmed with color badges)

## Images & Assets
- **Hero Image**: Modern salon interior or diverse group of university students (vibrant, welcoming)
- **Feature Icons**: Heroicons (solid variant) in primary color
- **Background Patterns**: Subtle geometric patterns or gradients (optional, very light opacity)

## Animations
- **Minimal approach**: Smooth transitions only
- Form field focus: 200ms transition
- Button hover: transform scale with 300ms ease
- Page scroll: Smooth scroll to form section
- NO complex animations or parallax effects

## Accessibility & Quality
- All form inputs with proper labels and aria-labels
- Color contrast ratio 4.5:1 minimum for text
- Keyboard navigation fully supported
- Focus indicators clearly visible
- Consistent dark mode across all inputs and surfaces
- Mobile-first responsive breakpoints (sm:640px, md:768px, lg:1024px, xl:1280px)