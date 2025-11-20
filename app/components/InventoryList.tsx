'use client';

import { useEffect, useState } from 'react';
import InventoryForm from './InventoryForm';

interface InventoryItem {
  id: number;
  name: string;
  description: string | null;
  quantity: number;
  price: number | null;
  category: string | null;
  created_at: string;
  updated_at: string;
}

interface InventoryListProps {
  user: any;
  onLogout: () => void;
}

export default function InventoryList({ user, onLogout }: InventoryListProps) {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/inventory', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setItems(data.items);
      } else {
        setError('Failed to fetch inventory items');
      }
    } catch (error) {
      setError('An error occurred while fetching items');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      const response = await fetch(`/api/inventory/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setItems(items.filter(item => item.id !== id));
      } else {
        alert('Failed to delete item');
      }
    } catch (error) {
      alert('An error occurred while deleting the item');
    }
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleFormSuccess = () => {
    fetchItems();
    handleFormClose();
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <p>Loading inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Inventory Management</h1>
        <div className="header-actions">
          <span className="user-info">Welcome, {user?.username}</span>
          <button className="btn btn-secondary" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <div className="card">
        <div className="page-header">
          <h2>Inventory Items</h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            + Add New Item
          </button>
        </div>

        {items.length === 0 ? (
          <div className="empty-state">
            <p>No inventory items found.</p>
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              Add Your First Item
            </button>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span className="badge">#{item.id}</span>
                    </td>
                    <td style={{ fontWeight: 500 }}>{item.name}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>
                      {item.description || <span style={{ color: 'var(--text-muted)' }}>—</span>}
                    </td>
                    <td>
                      {item.category ? (
                        <span className="badge">{item.category}</span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>—</span>
                      )}
                    </td>
                    <td>
                      <span style={{ fontWeight: 500 }}>{item.quantity}</span>
                    </td>
                    <td>
                      {item.price ? (
                        <span style={{ fontWeight: 500, color: 'var(--success)' }}>
                          ${item.price.toFixed(2)}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>—</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <InventoryForm
          item={editingItem}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
