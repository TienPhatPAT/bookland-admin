import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";

import { useAtomValue } from "jotai";

import { GlobalLoader } from "./components/common";
import ConfirmDialog from "./components/confirm-dialog/template";
import { TemplateDialog } from "./components/dialog/template";
import { TemplateDrawer } from "./components/drawer-right/template";
import configAppRoutes from "./routers";
import { globalLoaderAtom } from "./store/common";
import { ThemeProvider } from "./theme";

function App() {
  const routes = useRoutes(configAppRoutes);
  const isLoading = useAtomValue(globalLoaderAtom);
  return (
    <ThemeProvider>
      {routes}
      <TemplateDrawer />
      <TemplateDialog />
      <ConfirmDialog />
      <ToastContainer />
      <GlobalLoader isLoading={isLoading} />
    </ThemeProvider>
  );
}

export default App;
