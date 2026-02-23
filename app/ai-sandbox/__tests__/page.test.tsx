// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import '@testing-library/jest-dom/vitest'
import AISandboxPage from '../page'

// Mock useChat from @ai-sdk/react
vi.mock('@ai-sdk/react', () => ({
  useChat: vi.fn(() => ({
    messages: [],
    status: 'ready',
    sendMessage: vi.fn(),
    error: null,
  })),
}))

// Mock navigation components
vi.mock('../../components/Header', () => ({
  default: () => <div data-testid="mock-header">Header</div>
}))
vi.mock('../../components/Footer', () => ({
  default: () => <div data-testid="mock-footer">Footer</div>
}))

describe('AISandboxPage', () => {
  beforeAll(() => {
    // Mock scrollIntoView
    window.HTMLElement.prototype.scrollIntoView = vi.fn()
  })

  it('renders the page with correct elements', () => {
    render(<AISandboxPage />)

    expect(screen.getByText('AI Sandbox')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Ask anything/i)).toBeInTheDocument()
    expect(screen.getByTestId('mock-header')).toBeInTheDocument()
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument()
  })
})
