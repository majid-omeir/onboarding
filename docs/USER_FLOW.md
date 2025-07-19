# User Flow - Onboarding Journey

## Overview
5-step onboarding process designed to complete in ≤5 minutes with ≥85% completion rate.

## Flow Diagram

```
[Landing Page] 
     ↓
[Step 1: Account Creation] ← JWT issued here
     ↓ (autosave to KV)
[Step 2: Profile Setup]
     ↓ (autosave to KV)
[Step 3: Feature Tour] (Optional - can skip)
     ↓ (autosave to KV)
[Step 4: E-Signature]
     ↓ (store signature)
[Step 5: Feedback Request] ← Modal pops immediately
     ↓
[Welcome Dashboard/Success]
```

## Detailed Step Breakdown

### Step 1: Account Creation (20% Progress)
**Purpose**: Capture basic user information and establish session
**Duration**: ~60 seconds

**Required Fields**:
- Email address (validation required)
- Password (strength indicator)
- Confirm password
- Accept terms checkbox

**Optional Fields**:
- First name
- Last name
- Company name

**API Calls**:
- `POST /api/onboard/start` - Creates user, issues JWT
- `PUT /api/onboard/step` - Auto-saves form data

**Success Criteria**:
- Valid email format
- Password meets strength requirements
- Terms accepted
- JWT token stored in localStorage

**Error Handling**:
- Email already exists → Suggest login
- Weak password → Show requirements
- Network error → Retry mechanism

---

### Step 2: Profile Setup (40% Progress)
**Purpose**: Gather context for personalized experience
**Duration**: ~90 seconds

**Required Fields**:
- Role/Position (dropdown)
- Company size (dropdown)
- Industry (searchable dropdown)

**Optional Fields**:
- Phone number
- Time zone (auto-detected)
- How did you hear about us?

**API Calls**:
- `PUT /api/onboard/step` - Auto-saves on field change

**Success Criteria**:
- All required fields completed
- Data validated and saved

**Progressive Enhancement**:
- Auto-complete for company names
- Smart industry suggestions
- Timezone detection via browser API

---

### Step 3: Feature Tour (60% Progress)
**Purpose**: Introduce key product capabilities (optional)
**Duration**: ~60 seconds

**Format**: Interactive guided tour with 4-5 key features

**Features Highlighted**:
1. Dashboard overview
2. Core functionality #1
3. Core functionality #2
4. Integration capabilities
5. Support resources

**Interaction**:
- "Next" and "Previous" buttons
- "Skip Tour" option prominently displayed
- Progress dots for tour steps

**API Calls**:
- `PUT /api/onboard/step` - Tracks completion/skip

**Success Criteria**:
- User completes tour OR consciously skips
- Engagement tracked for optimization

---

### Step 4: E-Signature (80% Progress)
**Purpose**: Legal agreement completion
**Duration**: ~90 seconds

**Components**:
- Terms of Service display (scrollable)
- Privacy Policy link
- Service Agreement highlights
- Signature capture area

**Required Actions**:
- Scroll through ToS (tracked)
- Type full legal name
- Check "I agree" checkbox
- Click "Sign Agreement"

**API Calls**:
- `POST /api/sign` - Stores signature with timestamp

**Success Criteria**:
- Terms reviewed (scroll completion)
- Legal name provided
- Agreement checkbox checked
- Signature timestamp recorded

**Compliance**:
- GDPR-compliant data handling
- Audit trail for legal signatures
- Clear withdrawal instructions

---

### Step 5: Feedback Request (100% Progress)
**Purpose**: Capture immediate user sentiment
**Duration**: ~30 seconds

**Format**: Modal overlay (non-dismissible initially)

**Feedback Components**:
- 5-star rating scale
- Optional comment box (250 char limit)
- "What's most important to you?" (multi-select)

**Options**:
- "Submit Feedback" (primary action)
- "Remind me later" (24hr email follow-up)
- "Skip" (available after 10 seconds)

**API Calls**:
- `POST /api/feedback` - Stores rating and comments

**Success Criteria**:
- Rating provided (minimum requirement)
- Comment captured (optional)
- Preferences recorded

---

## Cross-Step Features

### Progress Bar
- Always visible at top
- Shows current step (highlighted)
- Completed steps (green check)
- Remaining steps (gray)
- Clickable to return to previous steps

### Auto-Save
- Triggers on field blur (300ms debounce)
- Background API calls to `PUT /api/onboard/step`
- Visual indicator: "Saving..." → "Saved ✓"
- Handles network failures gracefully

### Navigation
- "Previous" button (except Step 1)
- "Next" button (validates current step)
- "Save & Continue Later" option
- URL reflects current step for bookmarking

### Error States
- Inline validation messages
- Network error banners
- Retry mechanisms
- Clear recovery instructions

## Responsive Behavior

### Mobile (320px - 767px)
- Single column layout
- Larger touch targets (44px minimum)
- Simplified form layouts
- Swipe gestures for tour navigation

### Tablet (768px - 1023px)
- Two-column layout where appropriate
- Optimized for portrait orientation
- Touch-friendly interactions maintained

### Desktop (1024px+)
- Full responsive layout
- Keyboard shortcuts available
- Hover states for enhanced UX
- Parallel content where space allows

## Performance Targets
- First Contentful Paint: ≤1.5s on 3G
- Step transition: ≤200ms
- Auto-save response: ≤500ms
- Total flow completion: ≤5 minutes

## Accessibility Considerations
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader optimization
- High contrast mode support
- Reduced motion preferences respected