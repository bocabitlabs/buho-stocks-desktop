import { useState, useCallback } from "react";
import { PortfoliosContextType } from "../contexts/portfolios";
import { getPortfolios, addPortfolio as addPortfolioDAO, getPortfolioById } from "../daos/portfolio-dao";
import { PortfolioFields, PortfolioItemProps } from "../types/portfolio";

export function usePortfoliosContext(): PortfoliosContextType {
  const [portfolios, setPortFolios] = useState<PortfolioFields[]>([]);
  const [portfolio, setPortFolio] = useState<PortfolioFields[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchPortfolios = useCallback(() => {
    setIsLoading(true);
    getPortfolios(getCallback);
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
    addPortfolioDAO(portfolio, addPortfolioCallback);
  }, [fetchPortfolios])

  const fetchPortfolio = useCallback((portfolioId: string) => {
    setIsLoading(true);
    getPortfolioById(portfolioId, getByIdCallback);
  }, [])

  const getByIdCallback = (result: PortfolioFields[]) => {
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