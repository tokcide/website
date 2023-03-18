import amqp from "amqplib";

export default class AMQPwrapper {
  private connection?: amqp.Connection;
  private channel?: amqp.Channel;
  constructor(amqpUri: string = import.meta.env.RABBIT_AMQP) {
    amqp
      .connect(amqpUri)
      .then((connection) => {
        this.connection = connection;
        return connection.createChannel();
      })
      .then((channel) => (this.channel = channel));
  }

  close() {
    this.channel?.close().then(
      () => {
        console.info("Channel successfully closed");
        this.connection?.close().then(
          () => console.info("Connection successfully closed"),
          () => this.close()
        );
      },
      () => this.close()
    );
  }

  async send(
    queue: string,
    text: string,
    options?: amqp.Options.AssertQueue // = {durable:true, noAck:true}
  ): Promise<void> {
    await this.channel?.assertQueue(queue, options);
    this.channel?.sendToQueue(queue, Buffer.from(text));
    console.info(" [x] Sent '%s'", text);
  }

  async recieve(queue: string): Promise<amqp.Message | boolean> {
    // Closes connection on Ctrl+C
    process.once("SIGINT", async () => {
      await this.channel?.close();
      await this.connection?.close();
    });
    return this.channel ? this.channel?.get(queue, { noAck: false }) : false;
  }

  async ackMessage(message: amqp.GetMessage) {
    this.channel?.ack(message);
  }
}
