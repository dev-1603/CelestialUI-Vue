import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import axios from 'axios'
import {
  loadSvg,
  extractSvgContent,
  transformSvgForInline,
  getSvgAttributes,
  clearSvgCache,
  getSvgCacheSize,
  isSvgCached,
  removeSvgFromCache
} from '../utils/svgLoader'

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    isAxiosError: vi.fn()
  }
}))

const mockedAxios = vi.mocked(axios)

describe('SVG Loader', () => {
  beforeEach(() => {
    clearSvgCache()
    vi.clearAllMocks()
  })

  afterEach(() => {
    clearSvgCache()
  })

  describe('loadSvg', () => {
    it('loads SVG content from URL', async () => {
      const mockSvgContent = '<svg><path d="M12 2l3.09 6.26"/></svg>'
      mockedAxios.get.mockResolvedValueOnce({
        data: mockSvgContent
      })

      const result = await loadSvg('https://example.com/icon.svg')

      expect(result).toBe(mockSvgContent)
      expect(mockedAxios.get).toHaveBeenCalledWith('https://example.com/icon.svg', {
        timeout: 5000,
        responseType: 'text',
        headers: {
          'Accept': 'image/svg+xml, text/plain, */*'
        }
      })
    })

    it('caches SVG content by default', async () => {
      const mockSvgContent = '<svg><path d="M12 2l3.09 6.26"/></svg>'
      mockedAxios.get.mockResolvedValueOnce({
        data: mockSvgContent
      })

      const url = 'https://example.com/icon.svg'

      // First load
      await loadSvg(url)
      expect(isSvgCached(url)).toBe(true)
      expect(getSvgCacheSize()).toBe(1)

      // Second load should use cache
      const result = await loadSvg(url)
      expect(result).toBe(mockSvgContent)
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    })

    it('respects cache option', async () => {
      const mockSvgContent = '<svg><path d="M12 2l3.09 6.26"/></svg>'
      mockedAxios.get.mockResolvedValueOnce({
        data: mockSvgContent
      })

      const url = 'https://example.com/icon.svg'

      await loadSvg(url, { cache: false })
      expect(isSvgCached(url)).toBe(false)
      expect(getSvgCacheSize()).toBe(0)
    })

    it('applies transform function', async () => {
      const mockSvgContent = '<svg><path d="M12 2l3.09 6.26"/></svg>'
      mockedAxios.get.mockResolvedValueOnce({
        data: mockSvgContent
      })

      const transform = (svg: string) => svg.toUpperCase()
      const result = await loadSvg('https://example.com/icon.svg', { transform })

      expect(result).toBe(mockSvgContent.toUpperCase())
    })

    it('handles timeout errors', async () => {
      const error = new Error('timeout')
      error.code = 'ECONNABORTED'
      mockedAxios.get.mockRejectedValueOnce(error)
      mockedAxios.isAxiosError.mockReturnValueOnce(true)

      await expect(loadSvg('https://example.com/icon.svg', { timeout: 1000 }))
        .rejects.toThrow('SVG loading timeout')
    })

    it('handles network errors', async () => {
      const error = new Error('Network Error')
      mockedAxios.get.mockRejectedValueOnce(error)
      mockedAxios.isAxiosError.mockReturnValueOnce(true)

      await expect(loadSvg('https://example.com/icon.svg'))
        .rejects.toThrow('Failed to load SVG')
    })

    it('validates SVG content', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: 'Not an SVG file'
      })

      await expect(loadSvg('https://example.com/icon.svg'))
        .rejects.toThrow('Invalid SVG content')
    })
  })

  describe('extractSvgContent', () => {
    it('removes XML declaration', () => {
      const input = '<?xml version="1.0" encoding="UTF-8"?><svg><path d="M12 2"/></svg>'
      const result = extractSvgContent(input)
      expect(result).toBe('<svg><path d="M12 2"/></svg>')
    })

    it('removes comments', () => {
      const input = '<svg><!-- This is a comment --><path d="M12 2"/></svg>'
      const result = extractSvgContent(input)
      expect(result).toBe('<svg><path d="M12 2"/></svg>')
    })

    it('trims whitespace', () => {
      const input = '   <svg><path d="M12 2"/></svg>   '
      const result = extractSvgContent(input)
      expect(result).toBe('<svg><path d="M12 2"/></svg>')
    })
  })

  describe('transformSvgForInline', () => {
    it('extracts inner content from complete SVG', () => {
      const input = '<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26"/></svg>'
      const result = transformSvgForInline(input)
      expect(result).toBe('<path d="M12 2l3.09 6.26"/>')
    })

    it('returns content as-is if no SVG wrapper', () => {
      const input = '<path d="M12 2l3.09 6.26"/>'
      const result = transformSvgForInline(input)
      expect(result).toBe('<path d="M12 2l3.09 6.26"/>')
    })
  })

  describe('getSvgAttributes', () => {
    it('extracts attributes from SVG tag', () => {
      const input = '<svg viewBox="0 0 24 24" width="100" height="100"><path d="M12 2"/></svg>'
      const result = getSvgAttributes(input)

      expect(result).toEqual({
        viewBox: '0 0 24 24',
        width: '100',
        height: '100'
      })
    })

    it('returns empty object for invalid SVG', () => {
      const input = '<div>Not an SVG</div>'
      const result = getSvgAttributes(input)
      expect(result).toEqual({})
    })
  })

  describe('Cache Management', () => {
    it('clears cache', () => {
      // Mock a cached item
      loadSvg('https://example.com/icon.svg', { cache: true })
      clearSvgCache()
      expect(getSvgCacheSize()).toBe(0)
    })

    it('removes specific item from cache', async () => {
      const mockSvgContent = '<svg><path d="M12 2"/></svg>'
      mockedAxios.get.mockResolvedValueOnce({
        data: mockSvgContent
      })

      const url = 'https://example.com/icon.svg'
      await loadSvg(url)

      expect(isSvgCached(url)).toBe(true)
      const removed = removeSvgFromCache(url)
      expect(removed).toBe(true)
      expect(isSvgCached(url)).toBe(false)
    })

    it('returns false when removing non-existent item', () => {
      const removed = removeSvgFromCache('https://example.com/nonexistent.svg')
      expect(removed).toBe(false)
    })
  })
})
