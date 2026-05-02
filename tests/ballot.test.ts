import { describe, it, expect, vi } from 'vitest';
import { POST } from '../app/api/ballot-explain/route';

vi.mock('@/lib/gemini', () => {
  return {
    geminiFlash: {
      generateContent: vi.fn().mockResolvedValue({
        response: {
          text: () => JSON.stringify({ explanation: "It does X.", complexity: "Moderate" })
        }
      })
    }
  };
});

describe('Ballot Explain API Route', () => {
  it('should return complexity and explanation', async () => {
    const req = new Request('http://localhost/api/ballot-explain', {
      method: 'POST',
      body: JSON.stringify({ text: 'Prop 1' })
    });

    const res = await POST(req);
    const data = await res.json();
    
    expect(res.status).toBe(200);
    expect(data.explanation).toBe("It does X.");
    expect(data.complexity).toBe("Moderate");
  });
});
