import {createContext} from "react";

const defaultConfig = {
  maintenanceRoutes: ["/blog"]
};

const isPathUnderMaintenance = pathname =>
  defaultConfig.maintenanceRoutes.some(
    route => pathname === route || pathname.startsWith(`${route}/`)
  );

const createAppConfig = config => ({
  ...config,
  isPathUnderMaintenance
});

const AppConfigContext = createContext(createAppConfig(defaultConfig));

export function AppConfigProvider({children, config = defaultConfig}) {
  return (
    <AppConfigContext.Provider value={createAppConfig(config)}>
      {children}
    </AppConfigContext.Provider>
  );
}

export default AppConfigContext;
