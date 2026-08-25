import { useEffect, useState } from 'react';
import api from '../api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', stock: '' });
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    const res = await api.get('products/');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`products/${editId}/`, form);
        setEditId(null);
      } else {
        await api.post('products/', form);
      }
      setForm({ name: '', description: '', price: '', stock: '' });
      fetchProducts();
    } catch (err) {
      alert('Action failed — you may not have admin permission');
    }
  };

  const handleEdit = (p) => {
    setForm({ name: p.name, description: p.description, price: p.price, stock: p.stock });
    setEditId(p.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`products/${id}/`);
      fetchProducts();
    } catch (err) {
      alert('Delete failed — admin only');
    }
  };

  const isLoggedIn = !!localStorage.getItem('access');

  return (
    <div>
      <h2>Products</h2>

      {isLoggedIn && (
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
          <input name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} />
          <button type="submit">{editId ? 'Update' : 'Add'} Product</button>
        </form>
      )}

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ₹{p.price} (Stock: {p.stock})
            {isLoggedIn && (
              <>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}