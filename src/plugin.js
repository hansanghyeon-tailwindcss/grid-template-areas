// Tailwind CSS v4 JavaScript Plugin for grid-template-areas
// Only supports grid-areas-[] pattern with semicolon syntax

module.exports = function ({ matchUtilities, addUtilities }) {
  
  // Single unified pattern: grid-areas-[...]
  matchUtilities({
    'grid-areas': (value) => {
      // Handle CSS variables first
      if (value.includes('var(')) {
        return { 'grid-template-areas': value }
      }

      // Semicolon-based syntax: "col1,col2;col3,col4"
      if (value.includes(';')) {
        // Split by semicolon for rows, then by comma for columns
        const rows = value.split(';').map(row => {
          const columns = row.split(',')
          return `"${columns.join(' ')}"`
        })
        return {
          'grid-template-areas': rows.join(' ')
        }
      }

      // Single row with comma-based columns: "col1,col2,col3"
      if (value.includes(',')) {
        const columns = value.split(',')
        return {
          'grid-template-areas': `"${columns.join(' ')}"`
        }
      }

      // Single area (no parsing needed)
      return {
        'grid-template-areas': `"${value}"`
      }
    }
  })

  // Grid area utilities
  matchUtilities({
    'grid-in': (value) => {
      return {
        'grid-area': value
      }
    }
  })
}