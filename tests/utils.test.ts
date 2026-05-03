import { describe, it, expect } from 'vitest';
import {
  sanitizeInput,
  formatDate,
  getDaysUntil,
  generateSessionId,
  truncate,
} from '@/lib/utils';

describe('sanitizeInput', () => {
  it('strips HTML tags leaving inner text', () => {
    expect(sanitizeInput('<b>hello</b>')).toBe('hello');
  });

  it('strips script tags and leaves inner text', () => {
    const result = sanitizeInput('<script>alert("xss")</script>hello');
    expect(result).not.toContain('<script>');
    expect(result).toContain('hello');
  });

  it('limits to 1000 chars', () => {
    const long = 'a'.repeat(1500);
    expect(sanitizeInput(long).length).toBe(1000);
  });

  it('trims whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello');
  });
});

describe('formatDate', () => {
  it('returns a human-readable date string', () => {
    const result = formatDate('2026-11-03');
    expect(result).toContain('November');
    expect(result).toContain('2026');
  });
});

describe('getDaysUntil', () => {
  it('returns correct positive number for future date', () => {
    const future = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const days = getDaysUntil(future);
    expect(days).toBeGreaterThan(0);
    expect(days).toBeLessThanOrEqual(6);
  });
});

describe('generateSessionId', () => {
  it('returns non-empty string', () => {
    const id = generateSessionId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('returns unique values across calls', () => {
    const id1 = generateSessionId();
    const id2 = generateSessionId();
    expect(id1).not.toBe(id2);
  });
});

describe('truncate', () => {
  it('truncates with ellipsis when over limit', () => {
    expect(truncate('hello world', 5)).toBe('hello...');
  });

  it('does not truncate when under limit', () => {
    expect(truncate('hi', 10)).toBe('hi');
  });

  it('does not truncate at exact limit', () => {
    expect(truncate('hello', 5)).toBe('hello');
  });
});
