<template>
  <div class="icon-component">
    <!-- Page Banner -->
    <div class="page-banner">
      <div class="banner-navigation">
        <span class="material-symbols-outlined nav-icon w-6"
        @click="$router.push('/components')">
        arrow_back
          </span>
        <h1>Icon Component</h1>
        <span class="material-symbols-outlined nav-icon w-6"
            @click="$router.push('/')">
          home
          </span>

      </div>
    </div>

    <!-- <div class="icon-examples">
      Material Icons Example
      <div class="icon-section">
        <h3>Material Icons</h3>
        <p>Use Google's Material Icons by specifying the icon name</p>
        <div class="icon-row">
          <CIcon name="home" size="24" color="#2196F3" />
          <CIcon name="favorite" size="32" color="#E91E63" />
          <CIcon name="settings" size="48" color="#4CAF50" />
        </div>
        <code>
          &lt;CIcon name="home" size="24" color="#2196F3" /&gt;
        </code>
      </div>

      Font Awesome Example
      <div class="icon-section">
        <h3>Font Awesome Icons</h3>
        <p>Use Font Awesome icons by setting type="fa" and the icon name</p>
        <div class="icon-row">
          <CIcon type="fa" name="user" size="24" color="#9C27B0" />
          <CIcon type="fa" name="heart" size="32" color="#FF5722" />
          <CIcon type="fa" name="star" size="48" color="#FFC107" />
        </div>
        <code>
          &lt;CIcon type="fa" name="user" size="24" color="#9C27B0" /&gt;
        </code>
      </div>

      SVG Icon Example
      <div class="icon-section">
        <h3>SVG Icons</h3>
        <p>Use custom SVG icons by providing the SVG content</p>
        <div class="icon-row">
          <CIcon
            type="svg"
            :svgContent="trianglePath"
            size="24"
            color="#795548"
          />
          <CIcon
            type="svg"
            :svgContent="circlePath"
            size="32"
            color="#607D8B"
          />
          <CIcon
            type="svg"
            :svgContent="squarePath"
            size="48"
            color="#009688"
          />
        </div>
        <code>
          &lt;CIcon type="svg" :svgContent="svgPath" size="24" color="#795548" /&gt;
        </code>
      </div>

      Image Icon Example
      <div class="icon-section">
        <h3>Image Icons</h3>
        <p>Use image files as icons by providing the image path</p>
        <div class="icon-row">
          <CIcon
            type="image"
            :name="iconPaths.icon1"
            size="24"
            alt="Small icon"
          />
          <CIcon
            type="image"
            :name="iconPaths.icon2"
            size="32"
            alt="Medium icon"
          />
          <CIcon
            type="image"
            :name="iconPaths.icon3"
            size="48"
            alt="Large icon"
          />
        </div>
        <code>
          &lt;CIcon type="image" name="/path-to-icon.png" size="24" alt="Icon description" /&gt;
        </code>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
// SVG paths
// const trianglePath = '<path d="M12 2L1 21h22L12 2z" fill="currentColor"/>'
// const circlePath = '<circle cx="12" cy="12" r="10" fill="currentColor"/>'
// const squarePath = '<rect width="20" height="20" fill="currentColor"/>'

// Image paths
// const iconPaths = {
//   icon1: '/icons/icon1.png',
//   icon2: '/icons/icon2.png',
//   icon3: '/icons/icon3.png'
// }
</script>

<style scoped>
.page-banner {
  padding: 1rem;
  background-color: #f5f5f5;
  margin-bottom: 2rem;
}

.banner-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-icon {
  cursor: pointer;
}

.icon-examples {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.icon-section {
  margin-bottom: 3rem;
}

.icon-section h3 {
  margin-bottom: 1rem;
  color: #333;
}

.icon-row {
  display: flex;
  gap: 2rem;
  margin: 1rem 0;
  align-items: center;
}

code {
  display: block;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  font-family: monospace;
}
</style>
