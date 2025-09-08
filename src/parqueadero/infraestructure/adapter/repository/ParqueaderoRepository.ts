import ParkingRepositoryPort from '../../../domain/port/driven/adapter/repository/ParquederoRepositoryPort';
import Registro from '../../../domain/model/Registro';
import Estado from '../../../domain/model/Estado';
import JsonDatabaseHelper from './helpers/JsonDataBaseHelper';

export default class ParkingRepository implements ParkingRepositoryPort {
  private dbHelper: JsonDatabaseHelper;

  constructor() {
    this.dbHelper = new JsonDatabaseHelper();
  }

  async save(registro: Registro): Promise<Registro> {
    const db = await this.dbHelper.read();
    db.registros.push(registro);
    await this.dbHelper.write(db);
    return registro;
  }

  async findActiveByPlate(placa: string): Promise<Registro | null> {
    const db = await this.dbHelper.read();
    const registroEncontrado = db.registros.find(
      (r) => r.vehiculo.placa === placa && r.estado === Estado.ACTIVO
    );
    return registroEncontrado ? (registroEncontrado as Registro) : null;
  }

  async update(registro: Registro): Promise<Registro> {
    const db = await this.dbHelper.read();
    const index = db.registros.findIndex((r) => r.id === registro.id);
    if (index !== -1) {
      db.registros[index] = registro;
      await this.dbHelper.write(db);
    }
    return registro;
  }

  async getFinishedByDate(date: Date): Promise<Registro[]> {
    const db = await this.dbHelper.read();
    return db.registros.filter((r) => {
      if (!r.horaSalida) return false;
      const salidaDate = new Date(r.horaSalida);
      return (
        r.estado === Estado.FINALIZADO &&
        salidaDate.toISOString().startsWith(date.toISOString().substring(0, 10))
      );
    }) as Registro[];
  }

  async isStoreClient(placa: string): Promise<boolean> {
    const db = await this.dbHelper.read();
    return db.clientesTienda.includes(placa);
  }
}