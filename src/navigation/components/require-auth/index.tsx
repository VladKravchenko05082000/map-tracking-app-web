import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { useStoreContext } from "context";

import { ROUTES } from "navigation/routes";

const RequireAuth: React.FC<PropsWithChildren<{}>> = observer(({ children }) => {
  const {
    authStore: { isAuthenticated },
  } = useStoreContext();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return <>{children}</>;
});

export default RequireAuth;
