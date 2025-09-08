import Estado from './Estado';
import Vehiculo from './Vehiculo';

export default class Registro {
  public horaSalida?: Date;
  public montoPagado?: number;

  constructor(
    public readonly id: string, // Usaremos un UUID
    public readonly vehiculo: Vehiculo,
    public readonly horaIngreso: Date,
    public estado: Estado,
    public readonly esClienteTienda: boolean
  ) {}
}