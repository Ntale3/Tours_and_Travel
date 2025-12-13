import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {RenderPage} from "@/components/admin-dashboard/render-page"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import React from "react";

export default  function Page() {



  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        {<RenderPage/>}
      </SidebarInset>
    </SidebarProvider>
  )
}
