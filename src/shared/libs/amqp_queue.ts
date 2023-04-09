import type { APIRoute } from "astro";
import AMQPwrapper from "shared/libs/broker";
import { z } from "zod";

// ACK MESSAGE
export const head: APIRoute = async ({ url }) => {
  const main = (message: string) => {
    AMQPwrapper.fromAmqpUri().then((amqp) =>
      amqp.ackMessage(JSON.parse(message)).then((amqp) => amqp.close())
    );
    return new Response(null, { status: 200 });
  };

  const message = url.searchParams.get("msg");
  return message == null ? new Response(null, { status: 400 }) : main(message);
};

// RECIEVING THE MESSAGE
export const get: APIRoute = async ({ url }) => {
  const queue = url.searchParams.get("queue");
  const amqp = await AMQPwrapper.fromAmqpUri();
  const msg = await amqp.recieve(queue ?? "");
  console.log(msg);
  amqp.close();
  return queue == null ? new Response() : new Response();
};

// SENDING THE MESSAGE
export const post: APIRoute = async ({ request }) => {
  const BodySchema = z.object({
    queue: z.string().max(10),
    message: z.string(),
  });

  const body = BodySchema.parse(await request.json());

  const amqp = await AMQPwrapper.fromAmqpUri();
  await amqp.send(body.queue, body.message);
  amqp.close();
  return new Response("SENT");
};

export const del: APIRoute = async () => {
  return { body: "this deletes the  queue" };
};
