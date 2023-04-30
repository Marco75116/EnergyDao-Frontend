import React from "react";
import { Routes as AppRoutes, Route } from "react-router-dom";
import SubmitProposal from "../pages/SubmitProposal/SubmitProposal";
import Proposals from "../pages/Proposals/Proposals";
import TemplatePage from "../pages/TemplatePage/TemplatePage";

const Routes = () => {
  return (
    <AppRoutes>
      <Route path="/" element={<Proposals />} />
      <Route path="/proposals" element={<Proposals />} />
      <Route path="/submitProposal" element={<SubmitProposal />} />
      <Route path="/test" element={<TemplatePage />} />
    </AppRoutes>
  );
};

export default Routes;
