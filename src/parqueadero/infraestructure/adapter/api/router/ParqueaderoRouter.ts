import AbstractRouter from '../../../../../api/domain/model/AbstractRouter';
import ParkingController from '../controller/ParqueaderoController';

export default class ParkingRouter extends AbstractRouter {
  constructor(private readonly controller: ParkingController) {
    // Definimos la ruta base para todos los endpoints del parqueadero 
    super('/api/v1.0/estacionamiento'); 
    this.routes();
  }

  protected routes(): void {
    // Asocia cada ruta y método HTTP con el método correspondiente del controlador

    // RF-01: Registro de Ingreso de Vehículos [cite: 15, 38]
    this.router.post('/ingresos', this.controller.registerEntry);

    // RF-02: Cálculo y Proceso de Salida [cite: 18, 48]
    this.router.post('/salidas', this.controller.processExit);

    // RF-04: Generación de Balance Diario [cite: 28, 51]
    this.router.get('/reportes/balance-diario', this.controller.getDailyBalance);
  }
}