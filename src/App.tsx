import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/users"
                        element={
                            <ProtectedRoute>
                                <UsersPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/users" replace />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
