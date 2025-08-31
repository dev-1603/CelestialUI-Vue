import axios from 'axios'

// SVG cache to avoid repeated network requests
const svgCache = new Map<string, string>()

// Loading states to prevent duplicate requests
const loadingPromises = new Map<string, Promise<string>>()

/**
 * SVG Loader Options
 */
export interface SvgLoaderOptions {
  /**
   * Cache the loaded SVG content
   * @default true
   */
  cache?: boolean

  /**
   * Timeout for the request in milliseconds
   * @default 5000
   */
  timeout?: number

  /**
   * Transform the SVG content before returning
   */
  transform?: (svg: string) => string
}

/**
 * Load SVG content from a URL
 */
export async function loadSvg(
  url: string,
  options: SvgLoaderOptions = {}
): Promise<string> {
  const {
    cache = true,
    timeout = 5000,
    transform
  } = options

  // Return cached content if available
  if (cache && svgCache.has(url)) {
    const cached = svgCache.get(url)!
    return transform ? transform(cached) : cached
  }

  // Return existing promise if already loading
  if (loadingPromises.has(url)) {
    const content = await loadingPromises.get(url)!
    return transform ? transform(content) : content
  }

  // Create loading promise
  const loadingPromise = loadSvgContent(url, timeout)
  loadingPromises.set(url, loadingPromise)

  try {
    const content = await loadingPromise

    // Cache the content
    if (cache) {
      svgCache.set(url, content)
    }

    return transform ? transform(content) : content
  } finally {
    // Clean up loading promise
    loadingPromises.delete(url)
  }
}

/**
 * Load SVG content from URL using axios
 */
async function loadSvgContent(url: string, timeout: number): Promise<string> {
  try {
    const response = await axios.get(url, {
      timeout,
      responseType: 'text',
      headers: {
        'Accept': 'image/svg+xml, text/plain, */*'
      }
    })

    const content = response.data

    // Validate that the response is actually SVG
    if (typeof content !== 'string' || !content.includes('<svg')) {
      throw new Error(`Invalid SVG content received from ${url}`)
    }

    return content
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error(`SVG loading timeout: ${url}`)
      }
      throw new Error(`Failed to load SVG from ${url}: ${error.message}`)
    }
    throw error
  }
}

/**
 * Extract SVG content (remove xml declaration and get inner content)
 */
export function extractSvgContent(svgString: string): string {
  // Remove XML declaration
  let content = svgString.replace(/<\?xml[^>]*\?>/gi, '')

  // Remove comments
  content = content.replace(/<!--[\s\S]*?-->/g, '')

  // Trim whitespace
  content = content.trim()

  return content
}

/**
 * Transform SVG for inline use
 */
export function transformSvgForInline(svgString: string): string {
  let content = extractSvgContent(svgString)

  // Extract just the inner content if it's a complete SVG
  const svgMatch = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i)
  if (svgMatch) {
    // Return the inner content without the svg wrapper
    return svgMatch[1]
  }

  return content
}

/**
 * Get SVG attributes from SVG string
 */
export function getSvgAttributes(svgString: string): Record<string, string> {
  const attributes: Record<string, string> = {}

  // Extract svg tag
  const svgMatch = svgString.match(/<svg([^>]*)>/i)
  if (!svgMatch) return attributes

  const attributeString = svgMatch[1]

  // Extract individual attributes
  const attrRegex = /(\w+)=["']([^"']*)["']/g
  let match

  while ((match = attrRegex.exec(attributeString)) !== null) {
    attributes[match[1]] = match[2]
  }

  return attributes
}

/**
 * Clear SVG cache
 */
export function clearSvgCache(): void {
  svgCache.clear()
}

/**
 * Get cache size
 */
export function getSvgCacheSize(): number {
  return svgCache.size
}

/**
 * Check if URL is cached
 */
export function isSvgCached(url: string): boolean {
  return svgCache.has(url)
}

/**
 * Remove specific URL from cache
 */
export function removeSvgFromCache(url: string): boolean {
  return svgCache.delete(url)
}
