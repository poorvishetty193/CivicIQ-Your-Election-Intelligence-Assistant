import { describe, it, expect, vi } from 'vitest';
import { POST } from '../app/api/translate/route';

vi.mock('@/lib/gemini', () => {
  return {
    geminiFlash: {
      generateContent: vi.fn().mockResolvedValue({
        response: {
          text: () => "Hola"
        }
      })
    }
  };
});

describe('Translate API Route', () => {
  it('should translate text successfully', async () => {
    const req = new Request('http://localhost/api/translate', {
      method: 'POST',
      body: JSON.stringify({ text: 'Hello', targetLang: 'es' })
    });

    const res = await POST(req);
    const data = await res.json();
    
    expect(res.status).toBe(200);
    expect(data.translatedText).toBe("Hola");
  });

  it('should return 400 if parameters are missing', async () => {
    const req = new Request('http://localhost/api/translate', {
      method: 'POST',
      body: JSON.stringify({})
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
