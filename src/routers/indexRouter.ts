import authRouter from "./authRouter";

const appRouter = (app: any) => {
    app.use('/auth', authRouter);
}

export default appRouter;