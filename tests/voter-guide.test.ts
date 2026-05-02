import { describe, it, expect, vi } from 'vitest';
import { POST } from '../app/api/voter-guide/route';

vi.mock('@/lib/gemini', () => {
  return {
    geminiFlash: {
      generateContent: vi.fn().mockResolvedValue({
        response: {
          text: () => JSON.stringify({
            state: "Texas",
            registration_tip: "Tip here",
            key_dates: "Dates here",
            rights_summary: "Rights here",
            encouragement_message: "Message here"
          })
        }
      })
    }
  };
});

describe('Voter Guide API Route', () => {
  it('should return structured voter guide data', async () => {
    const req = new Request('http://localhost/api/voter-guide', {
      method: 'POST',
      body: JSON.stringify({ state: 'Texas' })
    });

    const res = await POST(req);
    const data = await res.json();
    
    expect(res.status).toBe(200);
    expect(data.state).toBe("Texas");
    expect(data.registration_tip).toBe("Tip here");
  });
});
