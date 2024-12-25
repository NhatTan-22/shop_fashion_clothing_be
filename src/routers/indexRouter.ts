import authRouter from "./authRouter";
import supplierRouter from "./supplierRouter";
import inventoryRouter from "./inventoryRouter";

const appRouter = (app: any) => {
  // app.use("/products", authRouter);

  app.use("/auth", authRouter);

  app.use("/admin", supplierRouter);
  app.use("/admin", inventoryRouter);
};

export default appRouter;
