import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Analytics Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (window as any).gtag = vi.fn();
  });

  it('pageview calls gtag with config', async () => {
    const { pageview, GA_ID } = await import('@/lib/analytics');
    
    pageview('/test-url');
    
    expect((window as any).gtag).toHaveBeenCalledWith('config', GA_ID, { page_path: '/test-url' });
  });

  it('event calls gtag with event and correct parameters', async () => {
    const { event } = await import('@/lib/analytics');
    
    event('test_action', { category: 'test_cat', label: 'test_label', value: 10 });
    
    expect((window as any).gtag).toHaveBeenCalledWith('event', 'test_action', {
      event_category: 'test_cat',
      event_label: 'test_label',
      value: 10,
    });
  });

  it('no error thrown when gtag is undefined', async () => {
    (window as any).gtag = undefined;
    const { pageview, event } = await import('@/lib/analytics');
    
    expect(() => pageview('/test')).not.toThrow();
    expect(() => event('test', { category: 'cat', label: 'lbl' })).not.toThrow();
  });
});
