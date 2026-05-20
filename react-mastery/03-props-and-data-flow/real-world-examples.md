# 📊 Props & Data Flow: Real-World Implementation Showcase

Here are three complete, production-ready component implementations demonstrating prop declarations, typing patterns, and structured data handling.

---

## 1. E-Commerce Product Card

This component renders product details, stock levels, and handles a click callback.

### Implementation Code
```jsx
import React from 'react';
import PropTypes from 'prop-types';

export default function ProductCard({ 
  product, 
  onAddToCart, 
  currencySymbol = '$' 
}) {
  const { name, price, stock, isFeatured } = product;
  const isOutOfStock = stock === 0;

  return (
    <div 
      style={{
        border: isFeatured ? '2px solid #ffc107' : '1px solid #ddd',
        borderRadius: '6px',
        padding: '16px',
        maxWidth: '300px',
        fontFamily: 'sans-serif',
        position: 'relative'
      }}
    >
      {isFeatured && (
        <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#ffc107', padding: '2px 6px', fontSize: '10px', fontWeight: 'bold', borderRadius: '3px' }}>
          BEST SELLER
        </span>
      )}
      <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{name}</h3>
      <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '10px 0' }}>
        {currencySymbol}{price.toFixed(2)}
      </div>
      <p style={{ color: isOutOfStock ? 'red' : 'green', fontSize: '13px' }}>
        {isOutOfStock ? 'Temporarily Out of Stock' : `Units available: ${stock}`}
      </p>
      <button
        disabled={isOutOfStock}
        onClick={() => onAddToCart(product)}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: isOutOfStock ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isOutOfStock ? 'not-allowed' : 'pointer'
        }}
      >
        {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    isFeatured: PropTypes.bool
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  currencySymbol: PropTypes.string
};
```

### Prop Breakdown Table
| Prop | Expected Type | Required? | Purpose |
| :--- | :--- | :--- | :--- |
| `product` | Object Shape | **Yes** | Holds item data (id, name, price, stock, isFeatured) |
| `onAddToCart` | Function | **Yes** | Callback triggered when the button is clicked |
| `currencySymbol` | String | No (default: `'$'`) | Custom currency prefix (e.g. `€`, `₹`) |

---

## 2. Modal Overlay Component

This component handles focus overlays, title configurations, and mounts nested layouts via the `children` prop.

### Implementation Code
```jsx
import React from 'react';
import PropTypes from 'prop-types';

export function DialogModal({ 
  isOpen, 
  title, 
  onClose, 
  children 
}) {
  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 1000
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking card body
        style={{
          backgroundColor: 'white', borderRadius: '8px',
          width: '450px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          fontFamily: 'sans-serif'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '20px' }}>{title}</h3>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#999' }}
          >
            &times;
          </button>
        </div>
        <div style={{ fontSize: '15px', lineHeight: '1.6', color: '#444' }}>
          {children} {/* Render nested markup */}
        </div>
      </div>
    </div>
  );
}

DialogModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};
```

### Prop Breakdown Table
| Prop | Expected Type | Required? | Purpose |
| :--- | :--- | :--- | :--- |
| `isOpen` | Boolean | **Yes** | Toggles whether the modal mounts or renders `null` |
| `title` | String | **Yes** | The header text displayed at the top of the dialog card |
| `onClose` | Function | **Yes** | Callback triggered by click event on backdrop or close button |
| `children` | React Node | **Yes** | The nested body components or HTML markup |

---

## 3. Configurable Data Table

This component dynamically builds grid tables based on a columns config and a data array.

### Implementation Code
```jsx
import React from 'react';
import PropTypes from 'prop-types';

export function DataTable({ columns, rows }) {
  return (
    <table 
      style={{
        width: '100%', borderCollapse: 'collapse', 
        fontFamily: 'sans-serif', margin: '20px 0', fontSize: '14px'
      }}
    >
      <thead>
        <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #ddd' }}>
          {columns.map((col) => (
            <th 
              key={col.key} 
              style={{ textAlign: 'left', padding: '12px', fontWeight: 'bold', color: '#444' }}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px', color: '#777' }}>
              No entries found.
            </td>
          </tr>
        ) : (
          rows.map((row, rIdx) => (
            <tr 
              key={row.id || rIdx} 
              style={{ borderBottom: '1px solid #eee', transition: 'background-color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f3f5'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {columns.map((col) => (
                <td key={col.key} style={{ padding: '12px', color: '#333' }}>
                  {/* If column has a custom cell render callback, run it. Otherwise render property */}
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      render: PropTypes.func // Optional custom cell formatter callback
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired
};
```

### Prop Breakdown Table
| Prop | Expected Type | Required? | Purpose |
| :--- | :--- | :--- | :--- |
| `columns` | Array of Shapes | **Yes** | Holds headers, mapping keys, and cell-render helpers |
| `rows` | Array of Objects | **Yes** | Holds raw dataset lists mapped in table rows |
