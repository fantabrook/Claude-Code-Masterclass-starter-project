# Spec for auth-forms

branch: claude/feature/auth-forms
figma_component (if used): N/A

## Summary

Add functional authentication forms to the `/login` and `/signup` pages. Each page renders a form with an email field, a password field with a show/hide toggle, and a submit button. On submission the form logs the field values to the console (no real auth yet). A navigation link allows users to switch between the two forms without leaving the flow.

## Functional Requirements

- The `/login` page renders a login form with:
  - An email input field (type `email`)
  - A password input field (type `password`) with a toggle icon to show/hide the password
  - A "Log In" submit button
  - A link to the `/signup` page ("Don't have an account? Sign up")
- The `/signup` page renders a signup form with:
  - An email input field (type `email`)
  - A password input field (type `password`) with a toggle icon to show/hide the password
  - A "Sign Up" submit button
  - A link to the `/login` page ("Already have an account? Log in")
- When either form is submitted, the email and password values are logged to the browser console
- The password show/hide toggle switches the input between `type="password"` and `type="text"`
- The toggle uses an icon (e.g. eye / eye-off) to indicate the current visibility state
- Form submission does not navigate away from the page or trigger any network request

## Figma Design Reference (only if referenced)

N/A

## Possible Edge Cases

- Submitting with empty fields should still log (no client-side validation required for now)
- Toggling password visibility should not clear the field value
- Rapid toggling of the password field should remain stable
- The switch link should work correctly when navigating back and forth between the two pages

## Acceptance Criteria

- Visiting `/login` shows the login form with all required fields and the switch link
- Visiting `/signup` shows the signup form with all required fields and the switch link
- Submitting either form logs `{ email, password }` to the console
- The password toggle icon changes appearance to reflect the visible/hidden state
- Clicking the switch link on `/login` navigates to `/signup` and vice versa
- Both pages are styled consistently with the existing app theme

## Open Questions

- Should the toggle icon come from the existing `lucide-react` icon library already used in the project? Yes.
- Should both pages share a single reusable `AuthForm` component, or remain as separate implementations? Yes.

## Testing Guidelines

Create a test file(s) in the ./tests folder for the new feature, and create meaningful tests for the following cases, without going too heavy:

- Login form renders email field, password field, and submit button
- Signup form renders email field, password field, and submit button
- Password field defaults to hidden (`type="password"`)
- Clicking the toggle changes the password field to visible (`type="text"`) and back
- Submitting the login form calls `console.log` with the entered email and password
- Submitting the signup form calls `console.log` with the entered email and password
- The switch link on the login page points to `/signup`
- The switch link on the signup page points to `/login`
