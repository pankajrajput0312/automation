import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

// Pages
import Index from './pages/Index';
import { LoginPage } from './pages/auth/Login';
import { SignUpPage } from './pages/auth/SignUp';
import { DashboardPage } from './pages/Dashboard';
import PlannerPage from './pages/Planner';
import { ConnectSocialPage } from './pages/ConnectSocial';
import { InstagramRedirect } from './pages/auth/InstagramRedirect';

function AuthRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </SidebarProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark">
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={
              <AuthRoute>
                <LoginPage />
              </AuthRoute>
            } />
            <Route path="/signup" element={
              <AuthRoute>
                <SignUpPage />
              </AuthRoute>
            } />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AppLayout>
                  <DashboardPage />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/planner" element={
              <ProtectedRoute>
                <AppLayout>
                  <PlannerPage />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/connect-social" element={
              <ProtectedRoute>
                <AppLayout>
                  <ConnectSocialPage />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/instagram/redirect" element={
              <ProtectedRoute>
                <InstagramRedirect />
              </ProtectedRoute>
            } />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
