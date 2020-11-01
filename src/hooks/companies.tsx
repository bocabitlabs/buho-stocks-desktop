import { useState, useCallback } from "react";
import { CompaniesContextType } from "../contexts/companies";
import { getCompanies, addCompany as addCompanyDAO } from "../daos/company-dao";
import { CompanyFields, CompanyItemProps } from "../types/company";

export function useCompaniesContext(): CompaniesContextType {
  const [companies, setCompanies] = useState<CompanyFields[]>([]);
  // const [portfolio, setPortFolio] = useState<PortfolioFields | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const fetchCompanies = useCallback(() => {
    setIsLoading(true);
    getCompanies(getCallback);
  }, [])

  const getCallback = (result: CompanyFields[]) => {
    setCompanies(result)
    setIsLoading(false);
  };

  const addCompany = useCallback((portfolio: CompanyItemProps) => {

    const addCompanyCallback = (result: []) => {
      fetchCompanies()
      console.log(result);
      setIsLoading(false);
    };

    setIsLoading(true);
    addCompanyDAO(portfolio, addCompanyCallback);
  }, [fetchCompanies])

  // const fetchPortfolio = useCallback((portfolioId: string) => {
  //   setIsLoading(true);
  //   getPortfolioById(portfolioId, getByIdCallback);
  // }, [])

  // const getByIdCallback = (result: PortfolioFields) => {
  //   setPortFolio(result)
  //   setIsLoading(false);
  // };

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
    companies,
    // portfolio,
    isLoading,
    fetchCompanies,
    // fetchPortfolio,
    addCompany
    // removePost
  }
}