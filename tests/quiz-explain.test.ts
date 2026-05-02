import { describe, it, expect, vi } from 'vitest';
import { POST } from '../app/api/quiz-explain/route';

vi.mock('@/lib/gemini', () => {
  return {
    geminiFlash: {
      generateContent: vi.fn().mockResolvedValue({
        response: {
          text: () => "This is a civic explanation."
        }
      })
    }
  };
});

describe('Quiz Explain API Route', () => {
  it('should return an explanation', async () => {
    const req = new Request('http://localhost/api/quiz-explain', {
      method: 'POST',
      body: JSON.stringify({ question: 'Q1', selectedAnswer: 'A1', isCorrect: true })
    });

    const res = await POST(req);
    const data = await res.json();
    
    expect(res.status).toBe(200);
    expect(data.explanation).toBe("This is a civic explanation.");
  });
});
