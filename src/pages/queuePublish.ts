import type { APIRoute } from "astro";
import amqp from "amqplib";

export const post: APIRoute = async ({ request, url }) => {
  type Good = { queueName: string; message: string };
  const { queueName, message } = (await request.json()) as Good;

  mainBlock: {
    let connection: amqp.Connection | undefined;
    try {
      connection = await amqp.connect(import.meta.env.RABBIT_AMQP);
      const channel = await connection.createChannel();

      await channel.assertQueue(queueName, { durable: false });

      // NB: `sentToQueue` and `publish` both return a boolean
      // indicating whether it's OK to send again straight away, or
      // (when `false`) that you should wait for the event `'drain'`
      // to fire before writing again. We're just doing the one write,
      // so we'll ignore it.
      channel.sendToQueue(queueName, Buffer.from(message));
      console.log(" [x] Sent '%s'", message);
      await channel.close();
    } catch (err) {
      console.warn(err);
    } finally {
      if (connection) await connection.close();
    }
  }
  return {
    body: "sent",
  };
};
