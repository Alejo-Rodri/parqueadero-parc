import Estado from "../../../domain/model/Estado";
import Registro from "../../../domain/model/Registro";
import Vehiculo from "../../../domain/model/Vehiculo";

export function mapRegistro(raw: any): Registro {
  const vehiculo = new Vehiculo(raw.vehiculo.placa, raw.vehiculo.tipo);

  const registro = new Registro(
    raw.id,
    vehiculo,
    new Date(raw.horaIngreso),
    raw.estado as Estado,
    raw.esClienteTienda
  );

  if (raw.horaSalida) {
    registro.horaSalida = new Date(raw.horaSalida);
  }

  if (raw.montoPagado !== undefined) {
    registro.montoPagado = raw.montoPagado;
  }

  return registro;
}
