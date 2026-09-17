#!/usr/bin/env node

/**
 * Test Status Reporter
 * Run this script to see current test status
 */

const { execSync } = require('child_process')

try {
  console.log('🔍 Running Vitest test status...\n')

  const output = execSync('cd "/Users/debjyotimohapatra/learning projects/Portfolio-Projects/CelestialUI-Vue" && pnpm vitest --run --reporter=verbose', {
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 10 // 10MB buffer
  })

  // Parse the output to extract test results
  const lines = output.split('\n')
  const summary = lines[lines.length - 2] || ''

  console.log('📊 Test Summary:')
  console.log(summary)

  // Count passing/failing tests
  const passed = (output.match(/✓/g) || []).length
  const failed = (output.match(/×/g) || []).length

  console.log(`\n✅ Passed: ${passed} tests`)
  console.log(`❌ Failed: ${failed} tests`)

  if (failed === 0) {
    console.log('\n🎉 All tests are passing!')
  } else {
    console.log('\n⚠️  Some tests are still failing. Focus on:')
    console.log('   - Icon component: Click events, ARIA attributes')
    console.log('   - Checkbox component: Click event handling')
    console.log('   - Input component: Helper text display, aria-describedby')
  }

} catch (error) {
  console.error('❌ Error running tests:', error.message)
  process.exit(1)
}
