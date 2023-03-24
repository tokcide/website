import amqp from "amqplib";

export default class AMQPwrapper {
  constructor(
    private connection: amqp.Connection,
    private channel: amqp.Channel
  ) {}

  public static async fromAmqpUri(
    amqpUri: string = import.meta.env.RABBIT_AMQP
  ) {
    const connection = await amqp.connect(amqpUri);
    const channel = await connection.createChannel();
    return new this(connection, channel);
  }

  close(): void {
    this.channel
      .close()
      .then(() =>
        this.connection
          .close()
          .then(() => console.log("Connection closed."))
          .catch(() => this.close())
      )
      .catch(() => this.close());
    return;
  }

  async send(
    queue: string,
    text: string,
    options?: amqp.Options.AssertQueue
  ): Promise<void> {
    await this.channel.assertQueue(
      queue,
      options ?? { durable: true, maxLength: 5 }
    );
    await this.channel.sendToQueue(queue, Buffer.from(text), {
      persistent: true,
    });
  }

  async recieve(queue: string) {
    // Closes connection on Ctrl+C
    process.once("SIGINT", async () => {
      await this.channel?.close();
      await this.connection?.close();
    });
    // this.channel.
    const result = await this.channel.get(queue, { noAck: false });
    // const main: (amqp.ConsumeMessage | null)[] = [];
    // this.channel.consume(
    //   queue,
    //   (msg) => {
    //     main.push(msg);
    //   },
    //   { noAck: false }
    // );
    return result === false ? null : result;
  }

  async ackMessage(message: amqp.GetMessage) {
    this.channel?.ack(message);
    return this;
  }
}
