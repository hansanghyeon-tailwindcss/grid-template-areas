// Tailwind CSS v4 JavaScript Plugin for grid-template-areas
// Supports grid-areas-[] pattern with row separator (|)

module.exports = function ({ matchUtilities, addUtilities }) {
  const normalizeValue = (value) => {
    // Tailwind decodes underscores to spaces and keeps escaped pipes.
    return value.replace(/\\\|/g, '|').replace(/ /g, '_')
  }
  
  // Single unified pattern: grid-areas-[...]
  matchUtilities({
    'grid-areas': (value) => {
      const normalizedValue = normalizeValue(value)

      // Handle CSS variables first
      if (normalizedValue.includes('var(')) {
        return { 'grid-template-areas': normalizedValue }
      }

      // Row separator syntax: "col1,col2|col3,col4"
      if (normalizedValue.includes('|')) {
        // Split by row separator, then by comma for columns
        const rows = normalizedValue.split('|').map(row => {
          const columns = row.split(',')
          return `"${columns.join(' ')}"`
        })
        return {
          'grid-template-areas': rows.join(' ')
        }
      }

      // Single row with comma-based columns: "col1,col2,col3"
      if (normalizedValue.includes(',')) {
        const columns = normalizedValue.split(',')
        return {
          'grid-template-areas': `"${columns.join(' ')}"`
        }
      }

      // Single area (no parsing needed)
      return {
        'grid-template-areas': `"${normalizedValue}"`
      }
    }
  })

  // Grid area utilities
  matchUtilities({
    'grid-in': (value) => {
      return {
        'grid-area': normalizeValue(value)
      }
    }
  })
}
