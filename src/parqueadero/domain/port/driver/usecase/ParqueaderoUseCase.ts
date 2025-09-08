import Balance from '../../../model/Balance';
import Registro from '../../../model/Registro'; 

export default interface ParkingUseCasePort {
  registerVehicleEntry(plate: string, type: string): Promise<Registro>; 
  processVehicleExit(plate: string): Promise<Registro>; 
  getDailyBalance(date: Date): Promise<Balance>;
}