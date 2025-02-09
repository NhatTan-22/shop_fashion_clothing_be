import authRouter from "./authRouter";
import supplierRouter from "./supplierRouter";
import inventoryRouter from "./inventoryRouter";
import categoryRouter from "./categoryRouter";

const appRouter = (app: any) => {
  app.use("/categories", categoryRouter);

  app.use("/auth", authRouter);

  app.use("/suppliers", supplierRouter);
  app.use("/products", inventoryRouter);
};

export default appRouter;
