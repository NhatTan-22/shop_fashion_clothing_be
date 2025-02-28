import authRouter from "./authRouter";
import supplierRouter from "./supplierRouter";
import productRouter from "./productRouter";
import categoryRouter from "./categoryRouter";
import brandRouter from "./brandRouter";
import orderRouter from "./orderRouter";

const appRouter = (app: any) => {
  app.use("/auth", authRouter);
  app.use("/suppliers", supplierRouter);
  app.use("/products", productRouter);
  app.use("/brands", brandRouter);
  app.use("/categories", categoryRouter);
  app.use("/orders", orderRouter);
};

export default appRouter;
