import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Plus, Edit2, Trash2, LogOut, Search } from 'lucide-react';

const API_URL = 'http://localhost:5000';

function ProductManagementApp() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [view, setView] = useState('login');
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    price: '',
    category: '',
    description: ''
  });

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setView('products');
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchProducts();
    }
    // eslint-disable-next-line
  }, [token, searchTerm, filterCategory]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        showMessage('success', 'Registration successful!');
        setView('products');
        setFormData({ ...formData, username: '', email: '', password: '' });
      } else {
        showMessage('error', data.error || 'Registration failed');
      }
    } catch (error) {
      showMessage('error', 'Network error. Please check if backend is running.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        showMessage('success', 'Login successful!');
        setView('products');
        setFormData({ ...formData, username: '', password: '' });
      } else {
        showMessage('error', data.error || 'Login failed');
      }
    } catch (error) {
      showMessage('error', 'Network error. Please check if backend is running.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setView('login');
    setProducts([]);
    showMessage('success', 'Logged out successfully');
  };

  const fetchProducts = async () => {
    try {
      let url = `${API_URL}/products?`;
      if (searchTerm) url += `search=${searchTerm}&`;
      if (filterCategory) url += `category=${filterCategory}`;

      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();

      if (response.ok) {
        setProducts(data.products);
      } else {
        showMessage('error', data.error || 'Failed to fetch products');
      }
    } catch (error) {
      showMessage('error', 'Network error fetching products');
      console.error(error);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      description: formData.description
    };

    try {
      const url = editingProduct 
        ? `${API_URL}/products/${editingProduct.id}` 
        : `${API_URL}/products`;
      
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });

      const data = await response.json();

      if (response.ok) {
        showMessage('success', editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
        setFormData({ ...formData, name: '', price: '', category: '', description: '' });
        setEditingProduct(null);
        setView('products');
        fetchProducts();
      } else {
        showMessage('error', data.error || 'Operation failed');
      }
    } catch (error) {
      showMessage('error', 'Network error. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      ...formData,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description
    });
    setView('form');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();

      if (response.ok) {
        showMessage('success', 'Product deleted successfully!');
        fetchProducts();
      } else {
        showMessage('error', data.error || 'Delete failed');
      }
    } catch (error) {
      showMessage('error', 'Network error. Please try again.');
      console.error(error);
    }
  };

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Product Manager</h1>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Welcome, <strong>{user.username}</strong></span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {message.text && (
        <div className="max-w-7xl mx-auto mt-4 px-4">
          <div className={`p-4 rounded-lg flex items-center gap-2 ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {message.text}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!user ? (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6 flex gap-2">
              <button
                onClick={() => setView('login')}
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  view === 'login' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setView('register')}
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  view === 'register' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Register
              </button>
            </div>

            {view === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    minLength="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    minLength="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </form>
            )}
          </div>
        ) : view === 'form' ? (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => {
                  setView('products');
                  setEditingProduct(null);
                  setFormData({ ...formData, name: '', price: '', category: '', description: '' });
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Products</h2>
              <button
                onClick={() => setView('form')}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                <Plus size={20} />
                Add Product
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-4 mb-6 flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {products.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-500 text-lg">No products found. Add your first product!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                        {product.category}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-2xl font-bold text-indigo-600 mb-3">${parseFloat(product.price).toFixed(2)}</p>
                    <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
                    <p className="text-xs text-gray-400 mt-4">
                      Added: {new Date(product.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default ProductManagementApp;