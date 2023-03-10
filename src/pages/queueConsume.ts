import type { APIRoute } from "astro";
import amqp from "amqplib";

export const post: APIRoute = async ({ request, url }) => {
  type Good = { queueName: string; message: string };
  const { queueName, message } = (await request.json()) as Good;

  mainnBlock: {
    let connection: amqp.Connection;
    try {
      connection = await amqp.connect(import.meta.env.RABBIT_AMQP);
      const channel = await connection.createChannel();

      //   process.once("SIGINT", async () => {
      //     await channel.close();
      //     await connection.close();
      //   });

      await channel.assertQueue(queueName, { durable: false });
      await channel.consume(
        queueName,
        (message) => {
          console.log(" [x] Received '%s'", message?.content.toString());
        },
        { noAck: true }
      );

      console.log(" [*] Waiting for messages. To exit press CTRL+C");
    } catch (err) {
      console.warn(err);
    }
  }
  return {
    body: "recieved",
  };
};
