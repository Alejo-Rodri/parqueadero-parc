import AbstractRouter from '../../../../../api/domain/model/AbstractRouter';
import ParkingService from '../../../../application/ParqueaderoService';
import ParkingRepository from '../../repository/ParqueaderoRepository';
import ParkingController from '../controller/ParqueaderoController';
import ParkingRouter from '../router/ParqueaderoRouter';

export default class ParkingRouterFactory {
  static readonly create = (): AbstractRouter => {
    try {
      // 1. Creamos la implementación del repositorio (en memoria)
      const repository = new ParkingRepository();
      if (!repository) {
        throw new Error('Failed to create ParkingRepository');
      }

      // 2. Creamos el servicio (caso de uso) y le inyectamos el repositorio
      const useCase = new ParkingService(repository);
      if (!useCase) {
        throw new Error('Failed to create ParkingService (UseCase)');
      }

      // 3. Creamos el controlador y le inyectamos el caso de uso
      const controller = new ParkingController(useCase);
      if (!controller) {
        throw new Error('Failed to create ParkingController');
      }

      // 4. Creamos el router y le inyectamos el controlador
      const router = new ParkingRouter(controller);
      if (!router) {
        throw new Error('Failed to create ParkingRouter');
      }

      return router;
    } catch (error) {
      console.error('Error creating ParkingRouter:', error);
      throw error;
    }
  };
}