import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

function App() {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    // Load user and cart from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedCart = localStorage.getItem('cart');

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        setCart([]);
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
    };

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === productId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    // Protected route wrapper
    const ProtectedRoute = ({ children }) => {
        if (!user) {
            return <Navigate to="/" replace />;
        }
        return children;
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
                <Route
                    path="/products"
                    element={
                        <ProtectedRoute>
                            <ProductsPage
                                user={user}
                                cart={cart}
                                onAddToCart={addToCart}
                                onLogout={handleLogout}
                            />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <CartPage
                                cart={cart}
                                onUpdateQuantity={updateQuantity}
                                onRemoveFromCart={removeFromCart}
                            />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/checkout"
                    element={
                        <ProtectedRoute>
                            <CheckoutPage
                                user={user}
                                cart={cart}
                                onClearCart={clearCart}
                            />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/order-confirmation/:orderId"
                    element={
                        <ProtectedRoute>
                            <OrderConfirmationPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
