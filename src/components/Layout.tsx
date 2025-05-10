
import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Shield } from "lucide-react";

const Layout = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <Link to="/" className="text-xl font-bold">
              FraudGuard
            </Link>
          </div>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={navigationMenuTriggerStyle()}>
                  Home
                </Link>
              </NavigationMenuItem>
              
              {user ? (
                <>
                  <NavigationMenuItem>
                    <Link 
                      to={isAdmin() ? "/admin" : "/dashboard"} 
                      className={navigationMenuTriggerStyle()}
                    >
                      Dashboard
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/help" className={navigationMenuTriggerStyle()}>
                      Help
                    </Link>
                  </NavigationMenuItem>
                </>
              ) : null}
            </NavigationMenuList>
          </NavigationMenu>

          <div>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm">Hello, {user.name}</span>
                <Button variant="outline" onClick={() => {
                  logout();
                  navigate('/');
                }}>Logout</Button>
              </div>
            ) : (
              <Button onClick={() => navigate('/login')}>Login</Button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t py-4">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} FraudGuard. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
