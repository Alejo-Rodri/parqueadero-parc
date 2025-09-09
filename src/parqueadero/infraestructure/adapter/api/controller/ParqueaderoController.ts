import { Request, Response } from 'express';
import AbstractController from '../../../../../api/domain/model/AbstractController';
import ParkingUseCasePort from '../../../../domain/port/driver/usecase/ParqueaderoUseCase';

export default class ParqueaderoController extends AbstractController {
  constructor(private readonly useCase: ParkingUseCasePort) {
    super();
  }

  /**
   * Maneja la petición para registrar el ingreso de un vehículo.
   * RF-01
   */
  public registerEntry = async (req: Request, res: Response): Promise<void> => {
    const { placa, tipo } = req.body;

    if (!placa || !tipo) {
      res.status(this.HTTPStatusCode.BAD_REQUEST).json({ error: 'Placa y tipo son requeridos.' });
      return;
    }

    try {
      const result = await this.useCase.registerVehicleEntry(placa, tipo);
      res.status(this.HTTPStatusCode.CREATED).json(result);
    } catch (error) {
      console.error('Error en registerEntry:', error);
      res.status(this.HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Error interno del servidor.' });
    }
  };

  /**
   * Maneja la petición para procesar la salida de un vehículo.
   * RF-02
   */
  public processExit = async (req: Request, res: Response): Promise<void> => {
    const { placa } = req.body;

    if (!placa) {
      res.status(this.HTTPStatusCode.BAD_REQUEST).json({ error: 'La placa es requerida.' });
      return;
    }

    try {
      const result = await this.useCase.processVehicleExit(placa);
      res.status(this.HTTPStatusCode.OK).json(result);
    } catch (error) {
      console.error('Error en processExit:', error);
      res.status(this.HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Error interno del servidor.' });
    }
  };

  /**
   * Maneja la petición para obtener el balance diario.
   * RF-04
   */
  public getDailyBalance = async (_req: Request, res: Response): Promise<void> => {
    try {
      // Usamos new Date() para obtener la fecha y hora actual automáticamente.
      const hoy = new Date();
      const result = await this.useCase.getDailyBalance(hoy);
      res.status(this.HTTPStatusCode.OK).json(result);
    } catch (error) {
      console.error('Error en getDailyBalance:', error);
      res.status(this.HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Error interno del servidor.' });
    }
  };
}