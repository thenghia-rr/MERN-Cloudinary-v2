import uploadRoutes from "./uploadRoute.js";
import userRoutes from "./userRoutes.js";

function route(app) {
  app.use("/api", uploadRoutes);
  app.use("/api", userRoutes);
}

export default route;
