import authRouter from "./authRouter";
import supplierRouter from "./supplierRouter";

const appRouter = (app: any) => {
  app.use("/admin", supplierRouter);

  app.use("/", authRouter);

  app.use("/auth", authRouter);
};

export default appRouter;
