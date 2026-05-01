import { describe, it, expect, vi } from 'vitest'

// Mock Vercel AI SDK
vi.mock('@ai-sdk/react', () => ({
  useChat: () => ({
    messages: [
      { id: '1', role: 'user', parts: [{ type: 'text', text: 'Hello' }] },
      { id: '2', role: 'assistant', parts: [{ type: 'text', text: 'Hi, I am CivicIQ!' }] }
    ],
    status: 'ready',
    sendMessage: vi.fn(),
  })
}))

import { render, screen } from '@testing-library/react'
import { ChatInterface } from '@/components/ChatInterface'

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn()

describe('ChatInterface', () => {
  it('renders chat messages correctly', () => {
    render(<ChatInterface />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('Hi, I am CivicIQ!')).toBeInTheDocument()
  })

  it('renders the input field', () => {
    render(<ChatInterface />)
    expect(screen.getByPlaceholderText('Ask a question about voting...')).toBeInTheDocument()
  })
})
