import ServerFactory from './api/infraestructura/api/adapter/factory/ServerFactory';
import ParkingRouterFactory from './parqueadero/infraestructure/adapter/api/factory/ParqueaderoRouterFactory';

'./parqueadero/infrastructure/factory/parqueaderoRouterFactory'
// 1. Creamos el router específico para la lógica del parqueadero
const parkingRouter = ParkingRouterFactory.create();

// 2. Le pasamos el router (o una lista de routers) a la fábrica del servidor
const server = ServerFactory.create([parkingRouter]);

// 3. Encendemos el servidor
server.start();