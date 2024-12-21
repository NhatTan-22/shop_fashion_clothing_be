import authRouter from "./authRouter";
import supplierRouter from "./supplierRouter";


const appRouter = (app: any) => {
  app.use("/", authRouter);

  app.use("/auth", authRouter);

  app.use("/admin", supplierRouter);
};

export default appRouter;
