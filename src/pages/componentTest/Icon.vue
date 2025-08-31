<template>
  <div class="icon-test-page">
    <!-- Back Button -->
    <div class="back-button-section mb-6">
      <button
        @click="goBack"
        class="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Component Testing
      </button>
    </div>

    <!-- Header -->
    <div class="header-section">
      <h1 class="text-4xl font-bold mb-4">CIcon Component</h1>
      <p class="text-lg text-gray-600 mb-8">
        CelestialUI has a component called CIcon which is a versatile icon component with comprehensive features.
        It supports multiple icon libraries, sizes, states, and accessibility options with full customization support.
      </p>

      <!-- API Reference -->
      <ApiReference v-bind="iconApiData" />
    </div>

    <!-- Icon Variants Section -->
    <div class="test-section">
      <h2 class="text-2xl font-semibold mb-6">Icon Libraries</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Material Icons -->
        <div class="demo-card">
          <h3 class="text-lg font-medium mb-4">Material Icons</h3>
          <div class="grid grid-cols-4 gap-3">
            <div v-for="icon in materialIcons" :key="icon" class="flex flex-col items-center p-2">
              <CIcon :name="icon" library="material" variant="filled" size="md" class="mb-1" />
              <span class="text-xs text-gray-500">{{ icon }}</span>
            </div>
          </div>
        </div>

        <!-- Font Awesome Icons -->
        <div class="demo-card">
          <h3 class="text-lg font-medium mb-4">Font Awesome Icons</h3>
          <div class="grid grid-cols-4 gap-3">
            <div v-for="icon in fontAwesomeIcons" :key="icon" class="flex flex-col items-center p-2">
              <CIcon :name="icon" library="fontawesome" fa-style="solid" size="md" class="mb-1" />
              <span class="text-xs text-gray-500">{{ icon }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Icon Sizes Section -->
    <div class="test-section">
      <h2 class="text-2xl font-semibold mb-6">Icon Sizes</h2>
      <div class="demo-card">
        <div class="flex items-center gap-6 flex-wrap">
          <div class="flex flex-col items-center">
            <CIcon name="star" library="material" variant="filled" size="xs" class="mb-2" />
            <span class="text-sm">XS (12px)</span>
          </div>
          <div class="flex flex-col items-center">
            <CIcon name="star" library="material" variant="filled" size="sm" class="mb-2" />
            <span class="text-sm">SM (16px)</span>
          </div>
          <div class="flex flex-col items-center">
            <CIcon name="star" library="material" variant="filled" size="md" class="mb-2" />
            <span class="text-sm">MD (20px)</span>
          </div>
          <div class="flex flex-col items-center">
            <CIcon name="star" library="material" variant="filled" size="lg" class="mb-2" />
            <span class="text-sm">LG (24px)</span>
          </div>
          <div class="flex flex-col items-center">
            <CIcon name="star" library="material" variant="filled" size="xl" class="mb-2" />
            <span class="text-sm">XL (32px)</span>
          </div>
          <div class="flex flex-col items-center">
            <CIcon name="star" library="material" variant="filled" :size="48" class="mb-2" />
            <span class="text-sm">Custom (48px)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Icon Colors Section -->
    <div class="test-section">
      <h2 class="text-2xl font-semibold mb-6">Icon Colors</h2>
      <div class="demo-card">
        <div class="flex items-center gap-6 flex-wrap">
          <div class="flex flex-col items-center">
            <CIcon name="favorite" library="material" variant="filled" size="lg" color="red" class="mb-2" />
            <span class="text-sm">Red</span>
          </div>
          <div class="flex flex-col items-center">
            <CIcon name="favorite" library="material" variant="filled" size="lg" color="blue" class="mb-2" />
            <span class="text-sm">Blue</span>
          </div>
          <div class="flex flex-col items-center">
            <CIcon name="favorite" library="material" variant="filled" size="lg" color="green" class="mb-2" />
            <span class="text-sm">Green</span>
          </div>
          <div class="flex flex-col items-center">
            <CIcon name="favorite" library="material" variant="filled" size="lg" color="purple" class="mb-2" />
            <span class="text-sm">Purple</span>
          </div>
          <div class="flex flex-col items-center">
            <CIcon name="favorite" library="material" variant="filled" size="lg" color="orange" class="mb-2" />
            <span class="text-sm">Orange</span>
          </div>
          <div class="flex flex-col items-center">
            <CIcon name="favorite" library="material" variant="filled" size="lg" color="#ff6b9d" class="mb-2" />
            <span class="text-sm">Custom Hex</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Icon Animations Section -->
    <div class="test-section">
      <h2 class="text-2xl font-semibold mb-6">Icon Animations</h2>
      <div class="demo-card">
        <div class="flex items-center gap-8 flex-wrap">
          <div class="flex flex-col items-center">
            <CIcon name="refresh" library="material" variant="filled" size="lg" animation="spin" class="mb-2" />
            <span class="text-sm">Spin</span>
          </div>
          <div class="flex flex-col items-center">
            <CIcon name="favorite" library="material" variant="filled" size="lg" animation="pulse" color="error" class="mb-2" />
            <span class="text-sm">Pulse</span>
          </div>
          <div class="flex flex-col items-center">
            <CIcon name="arrow_upward" library="material" variant="filled" size="lg" :rotate="45" class="mb-2" />
            <span class="text-sm">Rotate 45°</span>
          </div>
          <div class="flex flex-col items-center">
            <CIcon name="arrow_forward" library="material" variant="filled" size="lg" :flip-x="true" class="mb-2" />
            <span class="text-sm">Flip Horizontal</span>
          </div>
          <div class="flex flex-col items-center">
            <CIcon name="arrow_forward" library="material" variant="filled" size="lg" :flip-y="true" class="mb-2" />
            <span class="text-sm">Flip Vertical</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Icons Section -->
    <div class="test-section">
      <h2 class="text-2xl font-semibold mb-6">Interactive Icons</h2>
      <div class="demo-card">
        <div class="flex items-center gap-6 flex-wrap">
          <button
            @click="toggleLike"
            class="flex flex-col items-center p-3 rounded-lg border-2 border-gray-200 hover:border-red-300 transition-colors"
          >
            <CIcon
              name="favorite"
              library="material"
              variant="filled"
              :color="isLiked ? 'error' : 'secondary'"
              size="lg"
              class="mb-2"
            />
            <span class="text-sm">{{ isLiked ? 'Liked' : 'Like' }}</span>
          </button>

          <button
            @click="toggleBookmark"
            class="flex flex-col items-center p-3 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-colors"
          >
            <CIcon
              name="bookmark"
              library="material"
              variant="filled"
              :color="isBookmarked ? 'primary' : 'secondary'"
              size="lg"
              class="mb-2"
            />
            <span class="text-sm">{{ isBookmarked ? 'Saved' : 'Save' }}</span>
          </button>

          <button
            @click="toggleTheme"
            class="flex flex-col items-center p-3 rounded-lg border-2 border-gray-200 hover:border-yellow-300 transition-colors"
          >
            <CIcon
              :name="isDark ? 'light_mode' : 'dark_mode'"
              library="material"
              variant="filled"
              :color="isDark ? 'warning' : 'secondary'"
              size="lg"
              class="mb-2"
            />
            <span class="text-sm">{{ isDark ? 'Light' : 'Dark' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Accessibility Section -->
    <div class="test-section">
      <h2 class="text-2xl font-semibold mb-6">Accessibility Features</h2>
      <div class="demo-card">
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <CIcon name="info" library="material" variant="filled" size="md" aria-label="Information icon" />
            <span class="text-sm">Icon with aria-label attribute</span>
          </div>
          <div class="flex items-center gap-4">
            <CIcon name="warning" library="material" variant="filled" size="md" aria-label="Warning message" color="warning" />
            <span class="text-sm">Icon with aria-label</span>
          </div>
          <div class="flex items-center gap-4">
            <CIcon name="check" library="material" variant="filled" size="md" color="success" :aria-hidden="true" />
            <span class="text-sm">Decorative icon (hidden from screen readers)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- SVG File Icons Section -->
    <div class="test-section">
      <h2 class="text-2xl font-semibold mb-6">SVG File Icons</h2>
      <p class="text-gray-600 mb-4">Icons loaded from SVG files in the public directory</p>
      <div class="demo-card">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <div v-for="icon in svgFileIcons" :key="icon.name" class="flex flex-col items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
            <CIcon
              type="svg"
              :name="`/icons/${icon.file}`"
              size="lg"
              :color="icon.color"
              class="mb-2"
            />
            <span class="text-xs text-gray-500 text-center">{{ icon.name }}</span>
            <code class="text-xs text-gray-400 mt-1">{{ icon.file }}</code>
          </div>
        </div>

        <!-- Code Example -->
        <div class="mt-6 p-4 bg-gray-100 rounded-lg">
          <h4 class="font-medium mb-2">Usage Example:</h4>
          <code class="text-sm">
            &lt;CIcon type="svg" name="/icons/star.svg" size="lg" color="gold" /&gt;
          </code>
        </div>
      </div>
    </div>

    <!-- Image Icons Section -->
    <div class="test-section">
      <h2 class="text-2xl font-semibold mb-6">Image Icons</h2>
      <p class="text-gray-600 mb-4">Icons using image files (PNG, JPG, etc.) from various project assets</p>
      <div class="demo-card">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div class="flex flex-col items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
            <CIcon
              type="image"
              name="/icons/sample-image-icon.png"
              size="lg"
              alt="Sample image icon"
              class="mb-2"
            />
            <span class="text-xs text-gray-500 text-center">Custom PNG</span>
            <code class="text-xs text-gray-400 mt-1">sample-image-icon.png</code>
          </div>

          <div class="flex flex-col items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
            <CIcon
              type="image"
              name="/src/stories/assets/docs.png"
              size="lg"
              alt="Documentation"
              class="mb-2"
            />
            <span class="text-xs text-gray-500 text-center">Docs</span>
            <code class="text-xs text-gray-400 mt-1">docs.png</code>
          </div>

          <div class="flex flex-col items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
            <CIcon
              type="image"
              name="/src/stories/assets/testing.png"
              size="lg"
              alt="Testing"
              class="mb-2"
            />
            <span class="text-xs text-gray-500 text-center">Testing</span>
            <code class="text-xs text-gray-400 mt-1">testing.png</code>
          </div>

          <div class="flex flex-col items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
            <CIcon
              type="image"
              name="/src/stories/assets/accessibility.png"
              size="lg"
              alt="Accessibility"
              class="mb-2"
            />
            <span class="text-xs text-gray-500 text-center">A11y</span>
            <code class="text-xs text-gray-400 mt-1">accessibility.png</code>
          </div>

          <div class="flex flex-col items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
            <CIcon
              type="image"
              name="/src/stories/assets/theming.png"
              size="lg"
              alt="Theming"
              class="mb-2"
            />
            <span class="text-xs text-gray-500 text-center">Theming</span>
            <code class="text-xs text-gray-400 mt-1">theming.png</code>
          </div>

          <!-- Placeholder for additional image icons -->
          <div class="flex flex-col items-center p-3 border rounded-lg border-dashed">
            <div class="w-8 h-8 bg-gray-200 rounded mb-2 flex items-center justify-center">
              <span class="text-xs text-gray-400">IMG</span>
            </div>
            <span class="text-xs text-gray-500 text-center">Your Image</span>
            <code class="text-xs text-gray-400 mt-1">custom.png</code>
          </div>
        </div>

        <!-- Code Examples -->
        <div class="mt-6 space-y-4">
          <div class="p-4 bg-gray-100 rounded-lg">
            <h4 class="font-medium mb-2">Basic Image Icon:</h4>
            <code class="text-sm">
              &lt;CIcon type="image" name="/path/to/image.png" size="lg" alt="Description" /&gt;
            </code>
          </div>

          <div class="p-4 bg-blue-50 rounded-lg">
            <h4 class="font-medium mb-2 text-blue-800">💡 Pro Tip:</h4>
            <p class="text-sm text-blue-700">
              Image icons work best for complex graphics that can't be represented as simple SVGs.
              Consider using SVG or font icons for simpler graphics for better performance and scalability.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Custom Slot Icons Section -->
    <div class="test-section">
      <h2 class="text-2xl font-semibold mb-6">Custom Slot Icons</h2>
      <p class="text-gray-600 mb-4">Icons using custom content via slots for maximum flexibility</p>
      <div class="demo-card">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          <!-- Gradient Icon Slot -->
          <div class="flex flex-col items-center p-3">
            <CIcon size="lg" class="mb-2">
              <template #default>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:#FF6B6B"/>
                      <stop offset="100%" style="stop-color:#4ECDC4"/>
                    </linearGradient>
                  </defs>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#gradient1)"/>
                </svg>
              </template>
            </CIcon>
            <span class="text-xs text-gray-500 text-center">Gradient Star</span>
          </div>

          <!-- Animated Icon Slot -->
          <div class="flex flex-col items-center p-3">
            <CIcon size="lg" class="mb-2">
              <template #default>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="animate-spin">
                  <circle cx="12" cy="12" r="10" stroke="#E5E7EB" stroke-width="2"/>
                  <path fill="#3B82F6" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
              </template>
            </CIcon>
            <span class="text-xs text-gray-500 text-center">Loading Spinner</span>
          </div>

          <!-- Multi-Color Icon Slot -->
          <div class="flex flex-col items-center p-3">
            <CIcon size="lg" class="mb-2">
              <template #default>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#FF6B9D"/>
                  <circle cx="8" cy="8" r="2" fill="#FFD93D"/>
                  <circle cx="16" cy="8" r="2" fill="#6BCF7F"/>
                </svg>
              </template>
            </CIcon>
            <span class="text-xs text-gray-500 text-center">Multi-Color</span>
          </div>

          <!-- Text Icon Slot -->
          <div class="flex flex-col items-center p-3">
            <CIcon size="lg" class="mb-2">
              <template #default>
                <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  AI
                </div>
              </template>
            </CIcon>
            <span class="text-xs text-gray-500 text-center">Text Badge</span>
          </div>

          <!-- Emoji Icon Slot -->
          <div class="flex flex-col items-center p-3">
            <CIcon size="lg" class="mb-2">
              <template #default>
                <span class="text-2xl">🚀</span>
              </template>
            </CIcon>
            <span class="text-xs text-gray-500 text-center">Emoji</span>
          </div>

          <!-- Custom Component Slot -->
          <div class="flex flex-col items-center p-3">
            <CIcon size="lg" class="mb-2">
              <template #default>
                <div class="relative">
                  <div class="w-8 h-8 bg-green-500 rounded-full"></div>
                  <div class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span class="text-white text-xs">!</span>
                  </div>
                </div>
              </template>
            </CIcon>
            <span class="text-xs text-gray-500 text-center">Notification</span>
          </div>

        </div>

        <!-- Code Examples -->
        <div class="mt-6 space-y-4">
          <div class="p-4 bg-gray-100 rounded-lg">
            <h4 class="font-medium mb-2">Gradient Icon Example:</h4>
            <code class="text-sm block">
              &lt;CIcon size="lg"&gt;<br/>
              &nbsp;&nbsp;&lt;template #default&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;svg&gt;...gradient SVG content...&lt;/svg&gt;<br/>
              &nbsp;&nbsp;&lt;/template&gt;<br/>
              &lt;/CIcon&gt;
            </code>
          </div>

          <div class="p-4 bg-gray-100 rounded-lg">
            <h4 class="font-medium mb-2">Custom Component Example:</h4>
            <code class="text-sm block">
              &lt;CIcon size="lg"&gt;<br/>
              &nbsp;&nbsp;&lt;template #default&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="custom-icon"&gt;Custom Content&lt;/div&gt;<br/>
              &nbsp;&nbsp;&lt;/template&gt;<br/>
              &lt;/CIcon&gt;
            </code>
          </div>
        </div>
      </div>
    </div>

    <!-- Icon Types Comparison Section -->
    <div class="test-section">
      <h2 class="text-2xl font-semibold mb-6">Icon Types Comparison</h2>
      <p class="text-gray-600 mb-4">Comparing different icon implementation approaches</p>
      <div class="demo-card">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b">
                <th class="text-left py-3 px-4">Type</th>
                <th class="text-left py-3 px-4">Example</th>
                <th class="text-left py-3 px-4">Pros</th>
                <th class="text-left py-3 px-4">Cons</th>
                <th class="text-left py-3 px-4">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b">
                <td class="py-3 px-4 font-medium">Font Icons</td>
                <td class="py-3 px-4">
                  <CIcon name="star" library="material" size="md" />
                </td>
                <td class="py-3 px-4 text-green-600">Lightweight, cacheable</td>
                <td class="py-3 px-4 text-red-600">Limited styling</td>
                <td class="py-3 px-4">Standard UI icons</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 px-4 font-medium">SVG Files</td>
                <td class="py-3 px-4">
                  <CIcon type="svg" name="/icons/star.svg" size="md" color="gold" />
                </td>
                <td class="py-3 px-4 text-green-600">Scalable, customizable</td>
                <td class="py-3 px-4 text-red-600">More requests</td>
                <td class="py-3 px-4">Custom designs</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 px-4 font-medium">Images</td>
                <td class="py-3 px-4">
                  <CIcon type="image" name="/icons/sample-image-icon.png" size="md" />
                </td>
                <td class="py-3 px-4 text-green-600">Any format support</td>
                <td class="py-3 px-4 text-red-600">Not scalable</td>
                <td class="py-3 px-4">Complex graphics</td>
              </tr>
              <tr>
                <td class="py-3 px-4 font-medium">Slot Content</td>
                <td class="py-3 px-4">
                  <CIcon size="md">
                    <template #default>
                      <span class="text-blue-500">⭐</span>
                    </template>
                  </CIcon>
                </td>
                <td class="py-3 px-4 text-green-600">Maximum flexibility</td>
                <td class="py-3 px-4 text-red-600">More complex</td>
                <td class="py-3 px-4">Dynamic content</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Mobile Responsive Testing Section -->
    <div class="test-section">
      <h2 class="text-2xl font-semibold mb-6">Mobile Responsive Icons</h2>
      <p class="text-gray-600 mb-4">Icons optimized for different screen sizes and touch interfaces</p>
      <div class="demo-card">
        <div class="space-y-6">

          <!-- Touch-Friendly Sizes -->
          <div>
            <h4 class="font-medium mb-3">Touch-Friendly Sizes (44px minimum)</h4>
            <div class="flex flex-wrap gap-4">
              <button class="p-3 min-w-[44px] min-h-[44px] bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors flex items-center justify-center">
                <CIcon name="home" library="material" size="lg" color="blue" />
              </button>
              <button class="p-3 min-w-[44px] min-h-[44px] bg-green-100 hover:bg-green-200 rounded-lg transition-colors flex items-center justify-center">
                <CIcon name="favorite" library="material" size="lg" color="green" />
              </button>
              <button class="p-3 min-w-[44px] min-h-[44px] bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors flex items-center justify-center">
                <CIcon name="settings" library="material" size="lg" color="purple" />
              </button>
            </div>
          </div>

          <!-- Responsive Size Classes -->
          <div>
            <h4 class="font-medium mb-3">Responsive Sizing</h4>
            <div class="flex items-center gap-4 flex-wrap">
              <div class="flex flex-col items-center">
                <CIcon name="star" library="material" size="sm" class="mb-1 md:hidden" color="orange" />
                <CIcon name="star" library="material" size="lg" class="mb-1 hidden md:block" color="orange" />
                <span class="text-xs">SM on mobile, LG on desktop</span>
              </div>
            </div>
          </div>

          <!-- High DPI / Retina Support -->
          <div>
            <h4 class="font-medium mb-3">High DPI Support</h4>
            <div class="flex items-center gap-6">
              <div class="flex flex-col items-center">
                <CIcon type="svg" name="/icons/star.svg" size="md" color="gold" class="mb-1" />
                <span class="text-xs">SVG (Crisp on any DPI)</span>
              </div>
              <div class="flex flex-col items-center">
                <CIcon name="star" library="material" size="md" color="gold" class="mb-1" />
                <span class="text-xs">Font Icon (Vector)</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Performance Testing Section -->
    <div class="test-section">
      <h2 class="text-2xl font-semibold mb-6">Performance Testing</h2>
      <p class="text-gray-600 mb-4">Testing icon rendering performance with multiple icons</p>
      <div class="demo-card">
        <div class="space-y-4">
          <div class="flex items-center gap-4 mb-4">
            <button
              @click="generatePerformanceIcons"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Generate {{ performanceIconCount }} Icons
            </button>
            <input
              v-model.number="performanceIconCount"
              type="number"
              min="10"
              max="1000"
              class="px-3 py-2 border rounded-lg w-24"
            />
            <span class="text-sm text-gray-600">Icons to generate</span>
          </div>

          <div class="grid grid-cols-8 md:grid-cols-12 lg:grid-cols-16 gap-2 max-h-64 overflow-y-auto">
            <div
              v-for="(icon, index) in performanceIcons"
              :key="index"
              class="flex items-center justify-center p-2 border rounded"
            >
              <CIcon
                :name="icon.name"
                :library="icon.library"
                :type="icon.type"
                size="sm"
                :color="icon.color"
              />
            </div>
          </div>

          <div class="text-sm text-gray-600" v-if="performanceIcons.length > 0">
            Rendered {{ performanceIcons.length }} icons
          </div>
        </div>
      </div>
    </div>

    <!-- Custom Testing Section -->
    <div class="test-section">
      <h2 class="text-2xl font-semibold mb-6">Custom Icon Testing</h2>
      <div class="demo-card">
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="font-medium mb-4">Test Configuration</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">Icon Name:</label>
                <input
                  v-model="testIconName"
                  type="text"
                  class="w-full px-3 py-2 border rounded-md"
                  placeholder="e.g., star, heart, home"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Type:</label>
                <select v-model="testIconType" class="w-full px-3 py-2 border rounded-md">
                  <option value="font">Font Icon</option>
                  <option value="svg">SVG File</option>
                  <option value="image">Image File</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Library:</label>
                <select v-model="testIconLibrary" class="w-full px-3 py-2 border rounded-md">
                  <option value="material">Material Icons</option>
                  <option value="fontawesome">Font Awesome</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Size:</label>
                <select v-model="testIconSize" class="w-full px-3 py-2 border rounded-md">
                  <option value="xs">XS</option>
                  <option value="sm">SM</option>
                  <option value="md">MD</option>
                  <option value="lg">LG</option>
                  <option value="xl">XL</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Color:</label>
                <input
                  v-model="testIconColor"
                  type="text"
                  class="w-full px-3 py-2 border rounded-md"
                  placeholder="e.g., red, #ff0000"
                />
              </div>
            </div>
          </div>
          <div>
            <h3 class="font-medium mb-4">Preview</h3>
            <div class="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
              <CIcon
                :name="testIconName"
                :type="testIconType"
                :library="testIconLibrary"
                :size="testIconSize"
                :color="testIconColor"
              />
            </div>
            <div class="mt-4 p-3 bg-gray-100 rounded text-sm flex flex-wrap">
              <code>
                &lt;CIcon name="{{ testIconName }}" type="{{ testIconType }}" library="{{ testIconLibrary }}" size="{{ testIconSize }}" color="{{ testIconColor }}" /&gt;
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CIcon from '../../../lib/components/atoms/icon/CIcon.vue'
import ApiReference from '@/components/Common/ApiReference/apiReference.vue'
import { iconApiData } from '@/data/apiReference'

// Router
const router = useRouter()

// Back button functionality
const goBack = () => {
  router.push('/playground')
}

// Sample icon names for different libraries
const materialIcons = ['star', 'favorite', 'home', 'person', 'settings', 'search', 'add', 'remove']
const fontAwesomeIcons = ['star', 'heart', 'house', 'user', 'gear', 'magnifying-glass', 'plus', 'minus']

// SVG File Icons (using our created SVG files)
const svgFileIcons = [
  { name: 'Star', file: 'star.svg', color: 'gold' },
  { name: 'Heart', file: 'heart.svg', color: 'red' },
  { name: 'Home', file: 'home.svg', color: 'blue' },
  { name: 'Settings', file: 'settings.svg', color: 'gray' },
  { name: 'Moon', file: 'moon.svg', color: 'indigo' },
  { name: 'Sun', file: 'sun.svg', color: 'yellow' },
  { name: 'User', file: 'user.svg', color: 'green' }
]

// Interactive state
const isLiked = ref(false)
const isBookmarked = ref(false)
const isDark = ref(false)

// Performance testing
const performanceIconCount = ref(100)
const performanceIcons = ref<Array<{name: string, library: string, type: string, color: string}>>([])

// Test configuration
const testIconName = ref('star')
const testIconType = ref('font')
const testIconLibrary = ref('material')
const testIconSize = ref('md')
const testIconColor = ref('inherit')

// Interactive functions
const toggleLike = () => {
  isLiked.value = !isLiked.value
}

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value
}

const toggleTheme = () => {
  isDark.value = !isDark.value
}

// Performance testing function
const generatePerformanceIcons = () => {
  const iconTypes = ['font', 'svg']
  const iconNames = ['star', 'heart', 'home', 'settings']
  const iconLibraries = ['material', 'fontawesome']
  const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink', 'yellow', 'gray']

  performanceIcons.value = []

  for (let i = 0; i < performanceIconCount.value; i++) {
    const type = iconTypes[Math.floor(Math.random() * iconTypes.length)]
    const name = type === 'svg'
      ? `/icons/${iconNames[Math.floor(Math.random() * iconNames.length)]}.svg`
      : iconNames[Math.floor(Math.random() * iconNames.length)]
    const library = iconLibraries[Math.floor(Math.random() * iconLibraries.length)]
    const color = colors[Math.floor(Math.random() * colors.length)]

    performanceIcons.value.push({
      name,
      library: type === 'svg' ? 'custom' : library,
      type,
      color
    })
  }
}
</script>

<style scoped>
.icon-test-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem;
}

.header-section {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 3rem;
}

.test-section {
  max-width: 1200px;
  margin: 0 auto 3rem;
}

.demo-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

code {
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.875rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .icon-test-page {
    padding: 1rem;
  }

  .demo-card {
    padding: 1rem;
  }

  .grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

/* Animation for interactive icons */
.transition-colors {
  transition: all 0.2s ease-in-out;
}

button:hover {
  transform: translateY(-1px);
}

/* Custom scrollbar for code blocks */
code {
  overflow-x: auto;
  white-space: pre;
}
</style>
