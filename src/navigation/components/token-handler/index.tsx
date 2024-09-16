import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { useStoreContext } from "context";

import { ROUTES } from "navigation/routes";

const TokenHandler: React.FC<PropsWithChildren<{}>> = observer(({ children }) => {
  const {
    authStore: { isAuthenticated },
  } = useStoreContext();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.map} replace />;
  } else {
    return <>{children}</>;
  }
});

export default TokenHandler;
