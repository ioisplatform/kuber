/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PlansPage } from './pages/PlansPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { VerifyPage } from './pages/VerifyPage';
import { AdminPage } from './pages/AdminPage';
import { ContactPage } from './pages/ContactPage';
import { TrustPage } from './pages/TrustPage';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { KuberUser, PlanType } from './types';
import { loadUserFromLocalCache, clearUserLocalCache, getUserByKuberId } from './firebase/db';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('29');
  const [currentUser, setCurrentUser] = useState<KuberUser | null>(() => loadUserFromLocalCache());
  const [verifyIdParam, setVerifyIdParam] = useState<string>('');

  // Handle URL parameters on load and popstate
  useEffect(() => {
    const parseUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const page = params.get('page');
      const plan = params.get('plan') as PlanType | null;
      const verifyId = params.get('id');

      if (verifyId) {
        setVerifyIdParam(verifyId.trim().toUpperCase());
      }

      if (page) {
        setActivePage(page);
      } else if (verifyId) {
        setActivePage('verify');
      }

      if (plan === '29' || plan === '99') {
        setSelectedPlan(plan);
      }
    };

    parseUrl();
    window.addEventListener('popstate', parseUrl);
    return () => window.removeEventListener('popstate', parseUrl);
  }, []);

  const navigateTo = (page: string, extraParams?: Record<string, string>) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update query params without full reload
    const url = new URL(window.location.href);
    url.searchParams.set('page', page);
    if (extraParams) {
      Object.entries(extraParams).forEach(([k, v]) => {
        url.searchParams.set(k, v);
      });
    }
    window.history.pushState({}, '', url.toString());
  };

  const handleSelectPlan = (plan: PlanType) => {
    setSelectedPlan(plan);
    navigateTo('register', { plan });
  };

  const handleRegisteredSuccess = (user: KuberUser) => {
    setCurrentUser(user);
    // User will see pending screen or navigate to dashboard
  };

  const handleLoginSuccess = (user: KuberUser) => {
    setCurrentUser(user);
    navigateTo('dashboard');
  };

  const handleLogout = () => {
    clearUserLocalCache();
    setCurrentUser(null);
    navigateTo('home');
  };

  const handleRefreshUser = async () => {
    if (!currentUser) return;
    try {
      const refreshed = await getUserByKuberId(currentUser.kuberId);
      if (refreshed) {
        setCurrentUser(refreshed);
      }
    } catch (e) {
      console.error('Refresh error:', e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white selection:bg-[#D4AF37] selection:text-black font-sans">
      {/* Fixed Luxury Royal Header */}
      <Navbar
        activePage={activePage}
        onNavigate={(page) => navigateTo(page)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Page Content Body */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onSelectPlan={handleSelectPlan}
            onNavigate={(page) => navigateTo(page)}
          />
        )}

        {activePage === 'plans' && (
          <PlansPage
            onSelectPlan={handleSelectPlan}
            onNavigateToVerify={() => navigateTo('verify')}
          />
        )}

        {activePage === 'register' && (
          <RegisterPage
            initialPlan={selectedPlan}
            onRegisteredSuccess={handleRegisteredSuccess}
            onNavigateToLogin={() => navigateTo('login')}
          />
        )}

        {activePage === 'login' && (
          <LoginPage
            onLoginSuccess={handleLoginSuccess}
            onNavigateToRegister={() => navigateTo('register')}
            onNavigateToAdmin={() => navigateTo('admin')}
          />
        )}

        {activePage === 'dashboard' && currentUser && (
          <DashboardPage
            user={currentUser}
            onRefreshUser={handleRefreshUser}
            onNavigateToPlans={() => navigateTo('plans')}
          />
        )}

        {activePage === 'dashboard' && !currentUser && (
          <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
            <div className="max-w-md w-full p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Student Session Required</h3>
              <p className="text-xs text-zinc-400 mb-6">
                Please login with your permanent KUBER ID to view your student dashboard.
              </p>
              <button
                onClick={() => navigateTo('login')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black font-bold text-sm"
              >
                Login with KUBER ID
              </button>
            </div>
          </div>
        )}

        {activePage === 'verify' && (
          <VerifyPage
            initialId={verifyIdParam}
            onNavigateToRegister={() => navigateTo('register')}
          />
        )}

        {activePage === 'admin' && <AdminPage />}

        {activePage === 'contact' && <ContactPage />}

        {activePage === 'trust' && (
          <TrustPage
            onNavigateToPlans={() => navigateTo('plans')}
            onNavigateToVerify={() => navigateTo('verify')}
          />
        )}
      </main>

      {/* Floating Patna Student Cell WhatsApp Widget */}
      <FloatingWhatsApp />

      {/* Luxury Gold Bordered Footer */}
      <Footer onNavigate={(page) => navigateTo(page)} />
    </div>
  );
}
