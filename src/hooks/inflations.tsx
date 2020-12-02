import { useState, useEffect, useCallback } from "react";
import { InflationsContextType } from "../contexts/inflations";
import InflationService from "../services/inflation-service";
import { InflationFields, InflationItemProps } from "../types/inflation";

export function useInflationsContext(): InflationsContextType {
  const [inflations, setInflations] = useState<InflationFields[]>([]);
  const [inflation, setInflation] = useState<InflationFields|null>(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const result = new InflationService().getAll();
    setInflations(result)
  }, [])

  const fetchInflations = useCallback(() => {
    setIsLoading(true);
    const result = new InflationService().getAll();
    setInflations(result)
    setIsLoading(false);
  }, []);

  const addInflation = useCallback(
    (inflation: InflationItemProps) => {

      setIsLoading(true);
      const result = new InflationService().add(inflation);
      if(result.changes){
        const result = new InflationService().getAll();
        setInflations(result)
      }
    },
    []
  );

  const fetchInflationForYear = useCallback(
    (year: number) => {
      setIsLoading(true);
      const result = new InflationService().getInflatioForYear(year);
      setInflation(result);
    },
    []
  );

  return {
    inflations,
    inflation,
    isLoading,
    addInflation,
    fetchInflations,
    fetchInflationForYear
  };
}