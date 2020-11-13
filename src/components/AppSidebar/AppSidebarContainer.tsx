import React, { ReactElement } from "react";
import { IsCollapsedContext } from "../../contexts/is-collapsed";
import { useIsCollapsedContext } from "../../hooks/is-collapsed";
import AppSidebar from "./AppSidebar";

interface Props {}

export default function AppSidebarContainer(): ReactElement {
  const isCollapsedContext = useIsCollapsedContext();
  return (
    <IsCollapsedContext.Provider value={isCollapsedContext}>
      <AppSidebar />
    </IsCollapsedContext.Provider>
  );
}
