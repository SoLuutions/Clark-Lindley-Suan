/**
 * Vercel Speed Insights initialization
 * Tracks performance metrics and Core Web Vitals
 */
import { injectSpeedInsights } from './vercel-speed-insights.js';

// Initialize Speed Insights when the page loads
injectSpeedInsights({
  debug: false, // Set to true for development debugging
  sampleRate: 1.0 // Track 100% of page views
});
