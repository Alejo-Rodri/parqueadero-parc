import { promises as fs } from 'fs';
import path from 'path';
import Registro from '../../../../domain/model/Registro';
import { mapRegistro } from '../../utils/MapperRegistro';

interface DbSchemaRaw {
  registros: any[];
  clientesTienda: string[];
}

interface DbSchema {
  registros: Registro[];
  clientesTienda: string[];
}

export default class JsonDatabaseHelper {
  private readonly filePath: string;

  constructor() {
    this.filePath = path.join(process.cwd(), 'database', 'db.json');
  }

  /**
   * Lee el contenido de la base de datos JSON.
   */
  public async read(): Promise<DbSchema> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const parsed: DbSchemaRaw = JSON.parse(data);

      return {
        registros: parsed.registros.map(r => mapRegistro(r)),
        clientesTienda: parsed.clientesTienda
      };
    } catch (error) {
      console.error('Error reading database file:', error);
      return { registros: [], clientesTienda: [] };
    }
  }

  /**
   * Escribe el contenido en la base de datos JSON.
   */
  public async write(data: DbSchema): Promise<void> {
    try {
      // Usamos 'null, 2' para que el JSON se guarde formateado y sea legible
      const jsonString = JSON.stringify(data, null, 2);
      await fs.writeFile(this.filePath, jsonString, 'utf-8');
    } catch (error) {
      console.error('Error writing to database file:', error);
    }
  }
}