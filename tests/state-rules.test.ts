import { describe, it, expect, vi } from 'vitest';
import { POST } from '../app/api/state-rules/route';

vi.mock('@/lib/gemini', () => {
  return {
    geminiFlash: {
      generateContent: vi.fn().mockResolvedValue({
        response: {
          text: () => JSON.stringify({
            id_required: "Yes, photo ID",
            registration_deadline: "30 days before",
            early_voting_days: "10 days",
            mail_ballot_info: "Excuse required"
          })
        }
      })
    }
  };
});

describe('State Rules API Route', () => {
  it('should return JSON shape of rules', async () => {
    const req = new Request('http://localhost/api/state-rules', {
      method: 'POST',
      body: JSON.stringify({ state: 'Texas' })
    });

    const res = await POST(req);
    const data = await res.json();
    
    expect(res.status).toBe(200);
    expect(data.id_required).toBe("Yes, photo ID");
    expect(data.registration_deadline).toBe("30 days before");
  });
});
