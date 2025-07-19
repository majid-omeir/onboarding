# Wireframe Specifications

## Layout Structure

### Global Layout
```
┌─────────────────────────────────────────────────┐
│                 Header Bar                       │
│  Logo    Progress Bar (5 steps)    Help   │
├─────────────────────────────────────────────────┤
│                                                 │
│              Main Content Area                   │
│                                                 │
│                                                 │
│                                                 │
│                                                 │
├─────────────────────────────────────────────────┤
│     [Previous]              [Next/Continue]     │
│                                                 │
│          Footer (Minimal)                       │
└─────────────────────────────────────────────────┘
```

## Step 1: Account Creation

### Desktop Layout (1024px+)
```
┌─────────────────────────────────────────────────┐
│  🌐 CloudflareFlow   ●○○○○ 20%        ? Help    │
├─────────────────────────────────────────────────┤
│                                                 │
│         Welcome to CloudflareFlow               │
│         Create your account                     │
│                                                 │
│  ┌─────────────────┐ ┌─────────────────┐       │
│  │  First Name     │ │  Last Name      │       │
│  │  [____________] │ │  [____________] │       │
│  └─────────────────┘ └─────────────────┘       │
│                                                 │
│  Email Address *                                │
│  [________________________________]           │
│                                                 │
│  Company (Optional)                             │
│  [________________________________]           │
│                                                 │
│  Password *                                     │
│  [________________________________] 👁         │
│  ████░░░░ Strong                                │
│                                                 │
│  Confirm Password *                             │
│  [________________________________]           │
│                                                 │
│  ☑ I agree to Terms of Service                 │
│      and Privacy Policy                        │
│                                                 │
├─────────────────────────────────────────────────┤
│                            [Create Account]     │
│                                                 │
│           Have an account? Sign in              │
└─────────────────────────────────────────────────┘
```

### Mobile Layout (320px-767px)
```
┌─────────────────────────┐
│ ☰ CloudflareFlow  ? Help │
│ ●○○○○ 20%              │
├─────────────────────────┤
│                         │
│    Welcome to           │
│    CloudflareFlow       │
│    Create account       │
│                         │
│ First Name              │
│ [_________________]     │
│                         │
│ Last Name               │
│ [_________________]     │
│                         │
│ Email Address *         │
│ [_________________]     │
│                         │
│ Company (Optional)      │
│ [_________________]     │
│                         │
│ Password *              │
│ [_________________] 👁   │
│ ████░░░░ Strong         │
│                         │
│ Confirm Password *      │
│ [_________________]     │
│                         │
│ ☑ I agree to Terms     │
│   and Privacy Policy   │
│                         │
├─────────────────────────┤
│    [Create Account]     │
│                         │
│  Have an account?       │
│      Sign in            │
└─────────────────────────┘
```

## Step 2: Profile Setup

### Desktop Layout
```
┌─────────────────────────────────────────────────┐
│  🌐 CloudflareFlow   ●●○○○ 40%        ? Help    │
├─────────────────────────────────────────────────┤
│                                                 │
│            Tell us about yourself               │
│                                                 │
│  Role/Position *                                │
│  [Developer           ▼]                       │
│                                                 │
│  Company Size *                                 │
│  [1-10 employees      ▼]                       │
│                                                 │
│  Industry *                                     │
│  [Technology          ▼]                       │
│  [Search industries...]                        │
│                                                 │
│  Phone Number (Optional)                        │
│  [________________________________]           │
│                                                 │
│  Time Zone                                      │
│  [UTC-8 Pacific Time  ▼] 📍 Auto-detected      │
│                                                 │
│  How did you hear about us?                     │
│  [Search engine       ▼]                       │
│                                                 │
│  Use case (Optional)                            │
│  [________________________________]           │
│  [________________________________]           │
│                                                 │
├─────────────────────────────────────────────────┤
│     [← Previous]              [Continue →]      │
│                                                 │
│                Saved ✓                         │
└─────────────────────────────────────────────────┘
```

## Step 3: Feature Tour (Optional)

### Desktop Layout
```
┌─────────────────────────────────────────────────┐
│  🌐 CloudflareFlow   ●●●○○ 60%        ? Help    │
├─────────────────────────────────────────────────┤
│                                                 │
│        🚀 Welcome! Let's show you around        │
│                                                 │
│  ┌─────────────────────────────────────────────┐ │
│  │                                             │ │
│  │         📊 Dashboard Preview                │ │
│  │                                             │ │
│  │  [Chart mockup]    [Metrics cards]        │ │
│  │                                             │ │
│  │  Your central hub for monitoring           │ │
│  │  and managing your Cloudflare services     │ │
│  │                                             │ │
│  └─────────────────────────────────────────────┘ │
│                                                 │
│                 ●○○○○                          │
│              Tour progress                      │
│                                                 │
│     Key features you'll discover:               │
│     ✓ Real-time analytics                      │
│     ✓ Security monitoring                      │
│     ✓ Performance optimization                 │
│     ✓ Easy integrations                        │
│                                                 │
├─────────────────────────────────────────────────┤
│  [← Previous]  [Skip Tour]     [Next Feature →] │
│                                                 │
│            Step 1 of 5                         │
└─────────────────────────────────────────────────┘
```

## Step 4: E-Signature

### Desktop Layout
```
┌─────────────────────────────────────────────────┐
│  🌐 CloudflareFlow   ●●●●○ 80%        ? Help    │
├─────────────────────────────────────────────────┤
│                                                 │
│              Service Agreement                  │
│                                                 │
│  ┌─────────────────────────────────────────────┐ │
│  │ Terms of Service                    ▲       │ │
│  │                                             │ │
│  │ 1. Service Description                      │ │
│  │ CloudflareFlow provides...                  │ │
│  │                                             │ │
│  │ 2. User Responsibilities                    │ │
│  │ You agree to...                             │ │
│  │                                             │ │
│  │ 3. Data Processing                          │ │
│  │ We process your data...                     │ │
│  │                                     ▼       │ │
│  └─────────────────────────────────────────────┘ │
│                                                 │
│  📄 Privacy Policy  📄 Service Level Agreement │
│                                                 │
│  Legal Signature *                              │
│  [________________________________]           │
│  Type your full legal name                     │
│                                                 │
│  ☑ I have read and agree to the                │
│      Terms of Service and Privacy Policy       │
│                                                 │
│  Date: January 18, 2025                        │
│                                                 │
├─────────────────────────────────────────────────┤
│     [← Previous]          [Sign Agreement]     │
│                                                 │
│          🔒 Legally binding signature          │
└─────────────────────────────────────────────────┘
```

## Step 5: Feedback Modal

### Modal Overlay (All Screens)
```
┌─────────────────────────────────────────────────┐
│                     ⚫                          │
│  ┌─────────────────────────────────────────────┐ │
│  │                   ✓                        │ │
│  │                                             │ │
│  │         Welcome to CloudflareFlow!         │ │
│  │                                             │ │
│  │      How was your onboarding experience?   │ │
│  │                                             │ │
│  │        ⭐ ⭐ ⭐ ⭐ ⭐                        │ │
│  │                                             │ │
│  │  Tell us more (optional):                  │ │
│  │  ┌─────────────────────────────────────┐   │ │
│  │  │                                     │   │ │
│  │  │                                     │   │ │
│  │  │                                     │   │ │
│  │  └─────────────────────────────────────┘   │ │
│  │  250 characters                            │ │
│  │                                             │ │
│  │  What's most important to you?              │ │
│  │  ☑ Easy setup     ☐ Performance           │ │
│  │  ☐ Security       ☐ Support               │ │
│  │  ☐ Integration    ☐ Pricing               │ │
│  │                                             │ │
│  │    [Submit Feedback]  [Remind Later]       │ │
│  │                                             │ │
│  │              Skip (available in 10s)       │ │
│  └─────────────────────────────────────────────┘ │
│                                                 │
└─────────────────────────────────────────────────┘
```

## Component Specifications

### Progress Bar
- Height: 8px
- Background: #F3F4F6 (gray-100)
- Active step: #0066CC (primary blue)
- Completed steps: #10B981 (success green)
- Step indicators: 24px circles with numbers
- Responsive: Stacks vertically on mobile

### Form Fields
- Height: 44px minimum (touch target)
- Border: 1px solid #D1D5DB (gray-300)
- Focus: 2px solid #0066CC (primary blue)
- Error: 2px solid #EF4444 (error red)
- Radius: 8px
- Font size: 16px (prevents zoom on mobile)

### Buttons
- Primary: #0066CC background, white text
- Height: 44px minimum
- Padding: 12px 24px
- Radius: 8px
- Font weight: 600 (semibold)
- Hover: #004499 (primary dark)
- Loading: Spinner + "Processing..."

### Cards/Containers
- Background: #FFFFFF (white)
- Border: 1px solid #E5E7EB (gray-200)
- Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px rgba(0,0,0,0.1)

### Typography Hierarchy
- Page title: 36px, bold, #1A1A1A
- Section titles: 24px, semibold, #1A1A1A
- Field labels: 16px, medium, #4A4A4A
- Body text: 16px, regular, #1A1A1A
- Help text: 14px, regular, #9CA3AF

## Responsive Breakpoints

### Mobile Adaptations
- Single column layout
- Larger touch targets
- Simplified navigation
- Collapsible sections
- Swipe gestures for tour

### Tablet Adaptations
- Two-column forms where appropriate
- Larger content areas
- Touch-optimized interactions
- Portrait orientation priority

### Desktop Enhancements
- Multi-column layouts
- Hover states
- Keyboard shortcuts
- Detailed help tooltips
- Expanded content areas