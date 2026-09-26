import { useState } from 'react';
import { submitContact } from '../../lib/api.js';
import './ContactForm.css';

/* Contact form — accessible request form wired to POST /api/contact.
   Frontend validation mirrors the server limits and messages exactly
   (the server still validates independently). Direct contact links
   stay untouched elsewhere in this section; the form is an addition,
   not a replacement. Success language stays factual: the API only
   acknowledges receipt — nothing is stored or emailed. */

const MAX = { name: 100, email: 254, message: 2000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_VALUES = { name: '', email: '', message: '' };

function validate(values) {
  const trimmed = {
    name: values.name.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
  };
  const errors = {};
  if (trimmed.name === '') {
    errors.name = 'Name is required';
  } else if (trimmed.name.length > MAX.name) {
    errors.name = 'Name must be 100 characters or fewer';
  }
  if (trimmed.email === '') {
    errors.email = 'Email is required';
  } else if (trimmed.email.length > MAX.email) {
    errors.email = 'Email must be 254 characters or fewer';
  } else if (!EMAIL_PATTERN.test(trimmed.email)) {
    errors.email = 'Email must be a valid email address';
  }
  if (trimmed.message === '') {
    errors.message = 'Message is required';
  } else if (trimmed.message.length > MAX.message) {
    errors.message = 'Message must be 2000 characters or fewer';
  }
  return { errors, trimmed };
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [formError, setFormError] = useState(null);

  const sending = status === 'sending';

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setFieldErrors((previous) => {
      if (!previous[name]) return previous;
      const next = { ...previous };
      delete next[name];
      return next;
    });
    if (status === 'success') setStatus('idle');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (sending) return;
    const { errors, trimmed } = validate(values);
    setFieldErrors(errors);
    setFormError(null);
    if (Object.keys(errors).length > 0) return;
    setStatus('sending');
    try {
      await submitContact(trimmed);
      setStatus('success');
      setValues(EMPTY_VALUES);
      setFieldErrors({});
    } catch (error) {
      if (error?.fields && Object.keys(error.fields).length > 0) {
        setFieldErrors(error.fields);
        setStatus('idle');
      } else if (error?.status === 429) {
        setFormError('Too many requests. Please wait a few minutes and try again.');
        setStatus('idle');
      } else if (error?.status === 502) {
        setFormError(
          'Unable to deliver the request right now. Please try again or use the email link above.',
        );
        setStatus('idle');
      } else {
        setFormError(
          'Unable to send the request right now. Please try again or use the email link above.',
        );
        setStatus('idle');
      }
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form__field">
        <label className="tech-label" htmlFor="contact-name">
          Name
        </label>
        <input
          className="form__input"
          type="text"
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          value={values.name}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
        />
        {fieldErrors.name ? (
          <p className="form__error" id="contact-name-error" role="alert">
            {fieldErrors.name}
          </p>
        ) : null}
      </div>
      <div className="form__field">
        <label className="tech-label" htmlFor="contact-email">
          Email
        </label>
        <input
          className="form__input"
          type="email"
          id="contact-email"
          name="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
        />
        {fieldErrors.email ? (
          <p className="form__error" id="contact-email-error" role="alert">
            {fieldErrors.email}
          </p>
        ) : null}
      </div>
      <div className="form__field">
        <label className="tech-label" htmlFor="contact-message">
          Message
        </label>
        <textarea
          className="form__input form__textarea"
          id="contact-message"
          name="message"
          required
          rows={6}
          value={values.message}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
        />
        {fieldErrors.message ? (
          <p className="form__error" id="contact-message-error" role="alert">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>
      {status === 'success' ? (
        <p className="form__status" role="status">
          Your contact request was received.
        </p>
      ) : null}
      {formError ? (
        <p className="form__error" role="alert">
          {formError}
        </p>
      ) : null}
      <button className="btn btn--primary" type="submit" disabled={sending}>
        {sending ? 'Sending…' : 'Send Message →'}
      </button>
    </form>
  );
}
