import React from 'react'

export type Filter = 'all' | 'open' | 'closed'

type Props = {
  value: Filter
  onChange: (f: Filter) => void
}

const FilterBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="filter">
      <button 
        className={value === 'all' ? 'filter-active' : 'filter-inactive'} 
        onClick={() => onChange('all')}
      >
        📋 הכול
      </button>
      <button 
        className={value === 'open' ? 'filter-active' : 'filter-inactive'} 
        onClick={() => onChange('open')}
      >
        🔵 פתוחות
      </button>
      <button 
        className={value === 'closed' ? 'filter-active' : 'filter-inactive'} 
        onClick={() => onChange('closed')}
      >
        ✓ סגורות
      </button>
    </div>
  )
}

export default FilterBar
