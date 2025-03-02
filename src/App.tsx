import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => 
  React.createElement(QueryClientProvider, { client: queryClient },
    React.createElement(TooltipProvider, null,
      React.createElement(Toaster, null),
      React.createElement(Sonner, null),
      React.createElement(BrowserRouter, null,
        React.createElement(Routes, null,
          React.createElement(Route, { path: "/", element: React.createElement(Index) }),
          React.createElement(Route, { path: "*", element: React.createElement(NotFound) })
        )
      )
    )
  );

export default App;
