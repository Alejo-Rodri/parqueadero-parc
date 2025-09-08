import TipoVehiculo from './TipoVehiculo';

export default class Vehiculo {
  constructor(
    public readonly placa: string,
    public readonly tipo: TipoVehiculo
  ) {}
}