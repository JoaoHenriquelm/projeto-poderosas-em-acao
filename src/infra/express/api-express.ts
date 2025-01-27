import { Api } from "../api";
import express, { Express } from "express";
import { Route } from "./routes/route";
import mongoose from "mongoose";
import { loginRequired } from "./middlewares/loginRequired";

export class ApiExpress implements Api {
	private app: Express;
	private constructor(routes: Route[]) {
		this.app = express();
		this.middlewares();
		this.databaseConnection();
		this.addRoutes(routes);
	}

	
    static create(routes: Route[]) {
		return new ApiExpress(routes);
	}
    
	private databaseConnection(): void {
        mongoose.connect(
			`mongodb+srv://kuckkas:${process.env.DATABASE_PASSWORD}@projeto.tqwky.mongodb.net/?retryWrites=true&w=majority&appName=Projeto`
		);
    }

	private middlewares(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

    addRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
			const handler = route.getHandler()

            if(method === 'get') {
				this.app[method](path, loginRequired, handler)
			} else if (method === 'post') {
				this.app[method](path, handler)
			}
           
        })
    }


	start(port: number): void {
		this.app.listen(port, () => {
            console.log(`Server está rodando na porta ${port}`)
        })
	}
}
