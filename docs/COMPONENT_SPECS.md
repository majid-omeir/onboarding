# Component Specifications & Interactions

## Core Components

### ProgressBar Component

**Purpose**: Visual indicator of user progress through onboarding flow

**Props**:
```typescript
interface ProgressBarProps {
  currentStep: number; // 1-5
  totalSteps: number; // 5
  completedSteps: number[];
  clickable?: boolean; // Allow navigation to previous steps
  className?: string;
}
```

**States**:
- **Completed**: Green circle with checkmark (#10B981)
- **Current**: Blue circle with number (#0066CC)
- **Upcoming**: Gray circle with number (#9CA3AF)

**Interactions**:
- Click completed steps to navigate back
- Hover shows step names as tooltips
- Keyboard navigation with arrow keys
- Screen reader announces progress percentage

**Responsive**:
- Desktop: Horizontal layout with connecting lines
- Mobile: Simplified horizontal dots or vertical list

---

### StepForm Component

**Purpose**: Generic wrapper for each onboarding step with auto-save

**Props**:
```typescript
interface StepFormProps {
  stepId: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  onNext: () => void;
  onPrevious?: () => void;
  isValid: boolean;
  isSubmitting?: boolean;
  autoSave?: boolean;
}
```

**Features**:
- Auto-save on field blur (300ms debounce)
- Form validation before proceeding
- Loading states during API calls
- Error handling and retry mechanisms
- Keyboard shortcuts (Enter to submit, Escape to cancel)

**Auto-save Indicator**:
```
Saving... → Saved ✓ → [Error ⚠ Retry]
```

---

### FormField Component

**Purpose**: Standardized input field with validation and accessibility

**Props**:
```typescript
interface FormFieldProps {
  type: 'text' | 'email' | 'password' | 'tel' | 'select' | 'textarea';
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  help?: string;
  disabled?: boolean;
  autoComplete?: string;
  options?: SelectOption[]; // For select fields
}
```

**States**:
- **Default**: Gray border (#D1D5DB)
- **Focus**: Blue border (#0066CC), blue glow
- **Valid**: Green border (#10B981) after validation
- **Error**: Red border (#EF4444), error message below
- **Disabled**: Gray background, reduced opacity

**Interactions**:
- Real-time validation on blur
- Password strength indicator for password fields
- Auto-complete suggestions where appropriate
- Clear button for text inputs (on focus)

---

### Button Component

**Purpose**: Primary and secondary action buttons

**Variants**:
```typescript
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant: ButtonVariant;
  size: ButtonSize;
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}
```

**Styles**:
- **Primary**: Blue background, white text, bold
- **Secondary**: White background, blue border and text
- **Ghost**: Transparent background, blue text
- **Danger**: Red background, white text

**States**:
- **Hover**: Darker shade, slight scale (1.02)
- **Active**: Pressed appearance
- **Loading**: Spinner replaces text/icon
- **Disabled**: Reduced opacity, no interactions

---

### SelectField Component

**Purpose**: Enhanced dropdown with search and async loading

**Features**:
- Searchable options
- Async data loading
- Multi-select capability
- Custom option rendering
- Keyboard navigation
- Mobile-optimized picker

**Props**:
```typescript
interface SelectFieldProps {
  options: SelectOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder: string;
  searchable?: boolean;
  multiple?: boolean;
  loading?: boolean;
  onSearch?: (query: string) => Promise<SelectOption[]>;
  renderOption?: (option: SelectOption) => React.ReactNode;
}
```

---

### Modal Component

**Purpose**: Overlay dialogs for feedback and confirmations

**Props**:
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
```

**Accessibility**:
- Focus trapping within modal
- Restore focus to trigger element on close
- ARIA attributes for screen readers
- Escape key to close
- Overlay click to close (configurable)

---

### SignaturePage Component

**Purpose**: Legal agreement and signature capture

**Features**:
- Scrollable terms display with scroll tracking
- Legal name input field
- Agreement checkbox
- Signature timestamp
- Audit trail logging

**Props**:
```typescript
interface SignaturePageProps {
  termsContent: string;
  onSign: (signature: SignatureData) => void;
  loading?: boolean;
}

interface SignatureData {
  legalName: string;
  timestamp: string;
  termsScrolled: boolean;
  agreedToTerms: boolean;
  ipAddress: string;
}
```

**Validation**:
- Terms must be scrolled to bottom
- Legal name required (minimum 2 words)
- Agreement checkbox must be checked
- All fields validated before submission

---

### FeedbackModal Component

**Purpose**: Post-onboarding feedback collection

**Features**:
- 5-star rating system
- Optional comment field
- Multi-select preferences
- Delayed skip option (10 seconds)
- Reminder scheduling

**Props**:
```typescript
interface FeedbackModalProps {
  isOpen: boolean;
  onSubmit: (feedback: FeedbackData) => void;
  onRemindLater: () => void;
  onSkip: () => void;
}

interface FeedbackData {
  rating: number; // 1-5
  comment?: string;
  preferences: string[];
  timestamp: string;
}
```

**Interactions**:
- Star rating: Click or keyboard navigation
- Comment: 250 character limit with counter
- Skip button: Appears after 10 seconds
- Remind later: Schedules 24-hour email

---

### ToastNotification Component

**Purpose**: Temporary status messages and alerts

**Types**:
- **Success**: Green background, checkmark icon
- **Error**: Red background, warning icon
- **Warning**: Yellow background, exclamation icon
- **Info**: Blue background, info icon

**Props**:
```typescript
interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number; // ms, 0 for persistent
  actions?: ToastAction[];
  onDismiss: () => void;
}
```

**Behavior**:
- Auto-dismiss after duration (default 5s)
- Swipe to dismiss on mobile
- Stack multiple toasts
- Respect reduced motion preferences

---

## Interaction Patterns

### Form Validation

**Real-time Validation**:
- On field blur: Validate individual field
- On form submit: Validate entire form
- Show success state after valid input
- Clear error state when user starts typing

**Error Display**:
- Inline messages below fields
- Error summary at top for screen readers
- Focus management on error state
- Clear, actionable error messages

### Auto-save Behavior

**Trigger Conditions**:
- Field blur event (300ms debounce)
- Form value change (if user idle for 2s)
- Page visibility change (user switches tabs)
- Before navigation to next step

**Visual Feedback**:
```
[Field focused] → [User types] → [User blurs field] 
    ↓
"Saving..." (spinner) → "Saved ✓" (green check) → [Fade out after 2s]
```

**Error Handling**:
- Network failure: Show "Failed to save" with retry button
- Validation error: Show specific field errors
- Rate limiting: Queue saves and retry with backoff

### Navigation Patterns

**Step Progression**:
- Next: Validate current step before proceeding
- Previous: Allow navigation without validation
- Direct step navigation: Only to completed steps
- URL updates: Reflect current step for bookmarking

**Keyboard Shortcuts**:
- Enter: Submit form / proceed to next step
- Escape: Cancel current action / close modal
- Tab: Navigate form fields
- Shift+Tab: Navigate backwards
- Arrow keys: Navigate progress bar steps

### Loading States

**Button Loading**:
- Replace text with spinner
- Maintain button size
- Disable interactions
- Show loading text for screen readers

**Form Loading**:
- Disable all form fields
- Show skeleton placeholders
- Overlay spinner for long operations
- Maintain focus position

**Page Loading**:
- Progressive content loading
- Skeleton screens for slow connections
- Error boundaries for failed loads
- Graceful degradation

### Error Recovery

**Network Errors**:
- Automatic retry with exponential backoff
- Manual retry button after 3 failures
- Offline detection and queuing
- Clear error messages with next steps

**Validation Errors**:
- Field-level error messages
- Form-level error summary
- Focus management to first error
- Progressive enhancement of validation

**Session Errors**:
- JWT refresh on expiration
- Graceful logout with data preservation
- Session restoration on return
- Clear security messaging

## Responsive Adaptations

### Mobile Optimizations

**Touch Targets**:
- Minimum 44px x 44px
- Increased spacing between elements
- Larger form fields
- Swipe gestures where appropriate

**Layout Changes**:
- Single column forms
- Simplified navigation
- Collapsible sections
- Bottom sheet modals

**Performance**:
- Lazy load non-critical components
- Optimize images for mobile screens
- Minimize bundle size
- Use system fonts

### Desktop Enhancements

**Advanced Interactions**:
- Hover states and tooltips
- Keyboard shortcuts
- Multi-column layouts
- Parallel content loading

**Visual Hierarchy**:
- Larger typography scale
- More generous spacing
- Rich visual feedback
- Enhanced micro-interactions