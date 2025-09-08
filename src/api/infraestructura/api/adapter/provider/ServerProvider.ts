import { EnvInterface } from '../../../../domain/interface/EnvInterface';

import envJson from '../../../../../../env/.env.json'; // Importamos el JSON de configuración

export default class ServerProvider {
  private readonly env: EnvInterface;

  constructor() {
    // Aseguramos que los datos del JSON coincidan con nuestra interfaz
    this.env = envJson as EnvInterface;
  }

  // Métodos públicos para acceder a cada variable de forma controlada
  readonly getHost = (): string => this.env.HOST;
  readonly getPort = (): number => this.env.PORT;
  readonly getNodeEnv = (): string => this.env.NODE_ENV;
}