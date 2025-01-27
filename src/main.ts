import { ApiExpress } from "./infra/express/api-express";
import { CreateAssociateRoute } from "./infra/express/routes/associate/create-associate-express-routes";
import { ShowAssociateRoute } from "./infra/express/routes/associate/show-associate-express-route";
import { IndexAssociatesRoute } from "./infra/express/routes/associates/index-associates-express-route";
import { ShowAssociatesRoute } from "./infra/express/routes/associates/show-associates-express-route";
import { CreateAttendRoute } from "./infra/express/routes/attend/create-attend-express-route";
import { ShowAttendRoute } from "./infra/express/routes/attend/show-attend-express-route";
import { ShowAssociatesPerBirthdayMonthRoute } from "./infra/express/routes/birthdays/show-associates-per-birthday-month-express-route";
import { LoginUserRoute } from "./infra/express/routes/login/login-user-express-route";
import { mongoDBAssociate } from "./repositories/mongoDB-repository/associate/mongoDB-associate-repository";
import { mongoDBAttend } from "./repositories/mongoDB-repository/attend/mongoDB-attend-repository";
import { MongoDBUser } from "./repositories/mongoDB-repository/user/mongoDB-user-repository";
import { CreateAssociate } from "./usecases/create-associate";
import { CreateAttend } from "./usecases/create-attend";
import { IndexAssociates } from "./usecases/index-associates";
import { LoginUser } from "./usecases/login-user";
import { ShowAssociate } from "./usecases/show-associate";
import { ShowAssociates } from "./usecases/show-associates";
import { ShowAssociatesPerBirthdayMonth } from "./usecases/show-associates-per-birthdaymonth";
import { ShowAttend } from "./usecases/show-attend";
import dotenv from "dotenv"
import { resolve } from "path";

function main() {
    dotenv.config({path: resolve(__dirname, '../.env')})
    
    const associateRepository = new mongoDBAssociate()
    const attendRepository = new mongoDBAttend()
    const userRepository = new MongoDBUser()

    const createAssociateUseCase = new CreateAssociate(associateRepository)
    const showAssociatesUseCase = new ShowAssociates(associateRepository)
    const showAssociateUseCase = new ShowAssociate(associateRepository)
    const showAssociatesPerBirthdayMonthUseCase = new ShowAssociatesPerBirthdayMonth(associateRepository)
    const indexAssociatesUseCase = new IndexAssociates(associateRepository)
    const showAttendUseCase = new ShowAttend(attendRepository)
    const createAttendUseCase = new CreateAttend(attendRepository)
    const loginUserUseCase = new LoginUser(userRepository)
    
    const createAssociateRoute = CreateAssociateRoute.create(createAssociateUseCase)
    const showAssociatesRoute = ShowAssociatesRoute.show(showAssociatesUseCase)
    const showAssociateRoute = ShowAssociateRoute.show(showAssociateUseCase)
    const showAssociatesPerBirthdayMonthRoute = ShowAssociatesPerBirthdayMonthRoute.show(showAssociatesPerBirthdayMonthUseCase)
    const indexAssociatesRoute = IndexAssociatesRoute.index(indexAssociatesUseCase)
    const showAttendRoute = ShowAttendRoute.show(showAttendUseCase)
    const createAttendRoute = CreateAttendRoute.create(createAttendUseCase)
    const loginUserRoute = LoginUserRoute.create(loginUserUseCase)

    const api = ApiExpress.create([createAssociateRoute, showAssociatesRoute, showAssociateRoute, showAssociatesPerBirthdayMonthRoute, showAttendRoute, createAttendRoute, indexAssociatesRoute, loginUserRoute])
    api.start(Number(process.env.PORT))
}
main()

