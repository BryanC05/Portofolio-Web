import { useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";

export const usePortfolioData = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolioData must be used within a PortfolioProvider");
  }
  return context;
};

