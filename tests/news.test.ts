import { describe, it, expect, vi } from 'vitest';
import { GET } from '../app/api/news/route';

vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
    getGenerativeModel: vi.fn().mockReturnValue({
      generateContent: vi.fn().mockResolvedValue({
        response: {
          text: () => JSON.stringify([
            { title: "News 1", summary: "Summary 1", source: "CNN", url: "https://cnn.com" },
            { title: "News 2", summary: "Summary 2", source: "Fox", url: "https://fox.com" },
            { title: "News 3", summary: "Summary 3", source: "NPR", url: "https://npr.org" },
            { title: "News 4", summary: "Summary 4", source: "ABC", url: "https://abc.com" },
            { title: "News 5", summary: "Summary 5", source: "NBC", url: "https://nbc.com" },
          ])
        }
      })
    })
  }))
}));

describe('News API Route', () => {
  it('should return array of 5 news items', async () => {
    const res = await GET();
    const data = await res.json();
    
    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(5);
    expect(data[0].title).toBe("News 1");
  });
});
