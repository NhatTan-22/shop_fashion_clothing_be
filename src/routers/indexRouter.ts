import authRouter from "./authRouter";
import supplierRouter from "./supplierRouter";
import productRouter from "./productRouter";
import categoryRouter from "./categoryRouter";

const appRouter = (app: any) => {
  app.use("/categories", categoryRouter);

  app.use("/auth", authRouter);

  app.use("/suppliers", supplierRouter);
  app.use("/products", productRouter);
};

export default appRouter;
