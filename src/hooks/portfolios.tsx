import { useState, useCallback } from "react";
import { PortfoliosContextType } from "../contexts/portfolios";
import PortfolioService from "../services/portfolio-service";
import { PortfolioFields, PortfolioItemProps } from "../types/portfolio";

export function usePortfoliosContext(): PortfoliosContextType {
  const [portfolios, setPortFolios] = useState<PortfolioFields[]>([]);
  const [portfolio, setPortFolio] = useState<PortfolioFields|null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const fetchPortfolios = useCallback(() => {
    setIsLoading(true);
    new PortfolioService().getPortfolios(getCallback);
  }, [])

  const getCallback = (result: PortfolioFields[]) => {
    setPortFolios(result)
    setIsLoading(false);
  };

  const addPortfolio = useCallback((portfolio: PortfolioItemProps) => {

    const addPortfolioCallback = (result: []) => {
      fetchPortfolios()
      console.log(result);
      setIsLoading(false);
    };

    setIsLoading(true);
    new PortfolioService().addPortfolio(portfolio, addPortfolioCallback);
  }, [fetchPortfolios])

  const fetchPortfolio = useCallback((portfolioId: string) => {
    setIsLoading(true);
    new PortfolioService().getPortfolioById(portfolioId, getByIdCallback);
  }, [])

  const getByIdCallback = (result: PortfolioFields) => {
    setPortFolio(result)
    setIsLoading(false);
  };

  // const removePost = useCallback((postId: number) => {
  //   setIsLoading(true);
  //   fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
  //     method: 'DELETE'
  //   })
  //     .then(() => {
  //       const newPosts = [...posts];
  //       const removedPostIndex = newPosts.findIndex(post => post.id === postId);
  //       if (removedPostIndex > -1) {
  //         newPosts.splice(removedPostIndex, 1);
  //       }
  //       setPosts(newPosts);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     })
  // }, [setPosts, posts]);

  return {
    portfolios,
    portfolio,
    isLoading,
    fetchPortfolios,
    fetchPortfolio,
    addPortfolio
    // removePost
  }
}