import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '../app/api/chat/route';
import { NextRequest } from 'next/server';

// Mock gemini client
vi.mock('@/lib/gemini', () => {
  return {
    geminiFlash: {
      startChat: vi.fn().mockReturnValue({
        sendMessageStream: vi.fn().mockResolvedValue({
          stream: [
            { text: () => "Hello" },
            { text: () => " World" }
          ]
        })
      })
    }
  };
});

describe('Chat API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a readable stream and 200 status', async () => {
    const req = new NextRequest('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [{ role: 'user', content: 'Hi' }] })
    });
    // mock ip
    Object.defineProperty(req, 'ip', { value: '1.2.3.4' });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(ReadableStream);
  });

  it('should enforce rate limiting and return 429', async () => {
    // Make 20 requests
    for (let i = 0; i < 20; i++) {
      const req = new NextRequest('http://localhost/api/chat', {
        method: 'POST',
        body: JSON.stringify({ messages: [{ role: 'user', content: 'Hi' }] })
      });
      Object.defineProperty(req, 'ip', { value: '9.9.9.9' });
      await POST(req);
    }

    // 21st request should fail
    const req21 = new NextRequest('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [{ role: 'user', content: 'Hi' }] })
    });
    Object.defineProperty(req21, 'ip', { value: '9.9.9.9' });

    const res = await POST(req21);
    expect(res.status).toBe(429);
  });
});
