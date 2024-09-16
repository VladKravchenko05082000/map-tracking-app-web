import { Route, Routes } from "react-router-dom";

import { LoginPage, MapPage } from "pages";
import { NotFoundPage } from "components";
import { RequireAuth, TokenHandler } from "./components";

import { ROUTES } from "./routes";

const Navigation: React.FC = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.login}
        element={
          <TokenHandler>
            <LoginPage />
          </TokenHandler>
        }
      />

      <Route
        path={ROUTES.map}
        element={
          <RequireAuth>
            <MapPage />
          </RequireAuth>
        }
      />

      <Route path="*" element={<NotFoundPage />} />

      {/*//TO FAMILIARIZATION: We can use TokenHandler and RequireAuth with outlet and nested routes, but count of pages is 2, so i didnt see reason for make outlet */}
    </Routes>
  );
};

export default Navigation;
