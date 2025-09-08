import Registro from './Registro';

export default class Balance {
  constructor(
    public readonly fecha: Date,
    public readonly recaudoTotal: number,
    public readonly detalleSalidas: Registro[]
  ) {}
}