import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AIWorkspaceDashboard from './pages/ai-workspace-dashboard';
import ConversationTheater from './pages/conversation-theater';
import AdministrativeConsole from './pages/administrative-console';
import AuthenticationPortal from './pages/authentication-portal';
import AIModelMarketplace from './pages/ai-model-marketplace';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdministrativeConsole />} />
        <Route path="/ai-workspace-dashboard" element={<AIWorkspaceDashboard />} />
        <Route path="/conversation-theater" element={<ConversationTheater />} />
        <Route path="/administrative-console" element={<AdministrativeConsole />} />
        <Route path="/authentication-portal" element={<AuthenticationPortal />} />
        <Route path="/ai-model-marketplace" element={<AIModelMarketplace />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
