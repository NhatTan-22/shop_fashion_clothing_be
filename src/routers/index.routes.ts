import authRouter from "./auth.routes";
import supplierRouter from "./supplier.routes";
import productRouter from "./product.routes";
import categoryRouter from "./category.routes";
import brandRouter from "./brand.routes";
import orderRouter from "./order.routes";

const appRouter = (app: any) => {
  app.use("/auth", authRouter);
  app.use("/suppliers", supplierRouter);
  app.use("/products", productRouter);
  app.use("/brands", brandRouter);
  app.use("/categories", categoryRouter);
  app.use("/orders", orderRouter);
};

export default appRouter;
