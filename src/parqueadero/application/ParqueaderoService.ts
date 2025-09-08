import ParqueaderoUseCasePort from '../domain/port/driver/usecase/ParqueaderoUseCase';
import ParquederoRepositoryPort from '../domain/port/driven/adapter/repository/ParquederoRepositoryPort';
import Balance from '../domain/model/Balance';
import Registro from '../domain/model/Registro'; 
import Vehiculo from '../domain/model/Vehiculo';
import TipoVehiculo from '../domain/model/TipoVehiculo';
import Estado from '../domain/model/Estado';
import Tarifa from '../domain/model/Tarifa';
import { randomUUID } from 'crypto';

export default class ParkingService implements ParqueaderoUseCasePort {
  constructor(private readonly repository: ParquederoRepositoryPort) {}

  async registerVehicleEntry(
    placa: string,
    tipo: TipoVehiculo
  ): Promise<Registro> {
    // Lógica para registrar el ingreso de un vehículo.
    const esCliente = await this.repository.isStoreClient(placa);
    const vehiculo = new Vehiculo(placa, tipo);

    const nuevoRegistro = new Registro(
      randomUUID(), // Generamos un ID único para el registro
      vehiculo,
      new Date(), // Hora actual de ingreso
      Estado.ACTIVO,
      esCliente
    );

    return this.repository.save(nuevoRegistro);
  }

  async processVehicleExit(placa: string): Promise<Registro> {
    // Lógica para procesar la salida.
    const registroActivo = await this.repository.findActiveByPlate(placa);

    if (!registroActivo) {
      throw new Error('No se encontró un vehículo activo con la placa proporcionada.');
    }

    // Si el cliente está registrado en la tienda, el costo es $0
    if (registroActivo.esClienteTienda) {
      registroActivo.montoPagado = 0;
    } else {
      // Calcular el costo si no es cliente
      const horaSalida = new Date();
      const horaIngreso = registroActivo.horaIngreso;
      
      // Diferencia en milisegundos
      const diffMs = horaSalida.getTime() - horaIngreso.getTime();
      // Convertir a minutos
      const minutosEstacionado = Math.ceil(diffMs / (1000 * 60));

      let costoSinIva = 0;
      if (registroActivo.vehiculo.tipo === TipoVehiculo.CARRO) {
        costoSinIva = minutosEstacionado * Tarifa.PRECIO_CARRO_MINUTO;
      } else {
        costoSinIva = minutosEstacionado * Tarifa.PRECIO_MOTO_MINUTO;
      }

      const montoIva = costoSinIva * Tarifa.IVA;
      registroActivo.montoPagado = costoSinIva + montoIva;
      registroActivo.horaSalida = horaSalida;
    }

    registroActivo.estado = Estado.FINALIZADO;
    return this.repository.update(registroActivo);
  }

  async getDailyBalance(date: Date): Promise<Balance> {
    // Lógica para generar el balance diario.
    const registrosDelDia = await this.repository.getFinishedByDate(date);

    // Calculamos el recaudo total sumando el monto de cada registro
    const recaudoTotal = registrosDelDia.reduce((suma, registro) => {
      return suma + (registro.montoPagado || 0);
    }, 0);

    return new Balance(date, recaudoTotal, registrosDelDia);
  }
}