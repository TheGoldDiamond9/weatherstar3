/**
 * Text Formatting Utility for Weather Descriptions
 * Fixes the spacing and abbreviation issues in weather text
 */

window.weatherTextFormatter = {
  
  /**
   * Clean and format weather condition text
   */
  formatCondition: function(text) {
    if (!text) return "";
    
    // First, normalize the text
    let cleaned = text.toString().trim();
    
    // Fix common spacing issues and abbreviations
    cleaned = cleaned
      .replace(/\bShowers?\b/gi, 'SHWR')
      .replace(/\bThunderstorms?\b/gi, 'T-STORMS')
      .replace(/\bThunderstorm\b/gi, 'T-STORM')
      .replace(/\bT-Storm\b/gi, 'T-STM')
      .replace(/\bPartly\b/gi, 'PARTLY')
      .replace(/\bMostly\b/gi, 'MOSTLY')
      .replace(/\bSlight\b/gi, 'SLT')
      .replace(/\bChance\b/gi, 'CHANCE')
      .replace(/\bLikely\b/gi, 'LIKELY')
      .replace(/\bLight\b/gi, 'LGT')
      .replace(/\bHeavy\b/gi, 'HVY')
      .replace(/\bScattered\b/gi, "SCT'D")
      .replace(/\bIsolated\b/gi, "ISOL'D")
      .replace(/\bCloudy\b/gi, 'CLOUDY')
      .replace(/\bOvercast\b/gi, 'OVCST')
      .replace(/\bFog\b/gi, 'FOG')
      .replace(/\bMist\b/gi, 'MIST')
      .replace(/\bDrizzle\b/gi, 'DRZL')
      .replace(/\bRain\b/gi, 'RAIN')
      .replace(/\bSnow\b/gi, 'SNOW')
      .replace(/\bSleet\b/gi, 'SLEET')
      .replace(/\bHail\b/gi, 'HAIL')
      .replace(/\bWind\b/gi, 'WIND')
      .replace(/\bWindy\b/gi, 'WINDY')
      .replace(/\bBreezy\b/gi, 'BREEZY')
      .replace(/\bClear\b/gi, 'CLEAR')
      .replace(/\bSunny\b/gi, 'SUNNY')
      .replace(/\bFair\b/gi, 'FAIR')
      .replace(/\bNear\s+/gi, '')  // Remove "Near " at start of phrases
      .replace(/\s+Near\s+/gi, ' ') // Remove " Near " in middle of phrases
      .replace(/\bEarly\b/gi, 'ERLY')
      .replace(/\bLate\b/gi, 'LATE')
      .replace(/\bBefore\b/gi, 'BFR')
      .replace(/\bAfter\b/gi, 'AFT')
      .replace(/\bAround\b/gi, 'ARND')
      .replace(/\bTonight\b/gi, 'TONIGHT')
      .replace(/\bToday\b/gi, 'TODAY')
      .replace(/\bTomorrow\b/gi, 'TOMORROW')
      .replace(/\s+/g, ' ') // Clean up multiple spaces
      .trim();
    
    return cleaned.toUpperCase();
  }
};
