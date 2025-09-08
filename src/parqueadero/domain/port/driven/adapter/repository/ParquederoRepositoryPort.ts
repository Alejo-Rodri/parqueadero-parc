import Balance from '../../../../model/Balance';
import Registro from '../../../../model/Registro'; 
import Vehiculo from '../../../../model/Vehiculo'; 

export default interface ParkingRepositoryPort {
  save(record: Registro): Promise<Registro>; 
  findActiveByPlate(plate: string): Promise<Registro | null>; 
  update(record: Registro): Promise<Registro>; 
  getFinishedByDate(date: Date): Promise<Registro[]>; 
  isStoreClient(plate: string): Promise<boolean>;
}