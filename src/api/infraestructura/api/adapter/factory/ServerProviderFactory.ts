import ServerProvider from '../provider/ServerProvider';

export default class ServerProviderFactory {
  public static create(): ServerProvider {
    return new ServerProvider();
  }
}