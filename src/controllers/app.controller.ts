import { Client, IChannel, IMessageEvent, WebhookController } from '@zenvia/sdk';
import { IConfig } from "../config/config";

declare type MessageEventCallback = (event: IMessageEvent) => void;


class AppController {
  webhook: WebhookController;
  channel: IChannel;

  constructor(config: IConfig) {
    const client = new Client(config.zenviaToken);
    this.channel = client.getChannel('whatsapp');
    this.webhook = new WebhookController({
      port: config.port,
      messageEventHandler: undefined,
      channel: 'whatsapp',
    });
  }

  public startZenviaWebhook = async (messageCallback: MessageEventCallback) => {

    if (this.webhook == undefined) {
      console.log('Webhook not initialized');
      return;
    }

    this.webhook.options.messageEventHandler = messageCallback;


    this.webhook.on('listening', () => {
      console.log('Webhook is listening');
    });

    this.webhook.init();
  }
}


export default AppController;