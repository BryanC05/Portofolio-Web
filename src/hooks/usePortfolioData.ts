import { useState, useEffect } from "react";
import defaultData from "../data/portfolioData.json";

export const usePortfolioData = () => {
  const [data, setData] = useState<any>(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/portfolio");
        if (!res.ok) {
          throw new Error(`Failed to load data: ${res.statusText}`);
        }
        const jsonData = await res.json();
        if (jsonData) {
          setData(jsonData);
          localStorage.setItem("portfolio_data_cache", JSON.stringify(jsonData));
        }
      } catch (err: any) {
        console.warn("API load failed, falling back to local cache or defaults:", err);
        setError(err.message);
        
        const cache = localStorage.getItem("portfolio_data_cache");
        if (cache) {
          try {
            setData(JSON.parse(cache));
          } catch (e) {
            console.error("Failed to parse localStorage cache:", e);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const saveData = async (newData: any, passcode: string) => {
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          passcode,
          data: newData
        })
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to save portfolio data");
      }

      setData(newData);
      localStorage.setItem("portfolio_data_cache", JSON.stringify(newData));
      return { success: true, message: result.message || "Saved successfully!" };
    } catch (err: any) {
      console.error("Save failed:", err);
      return { success: false, error: err.message };
    }
  };

  return { data, loading, error, saveData };
};
