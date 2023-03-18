import type { APIRoute } from "astro";
import AMQPwrapper from "@libs/broker";
import { z } from "zod";
// import { URLSearchParams } from "url";

// ACK MESSAGE
export const head: APIRoute = async ({ params }) => {
  const message = params.message;
  if (message == undefined) {
    return new Response();
  }
  main: {
    const amqp = new AMQPwrapper();
    amqp.ackMessage(JSON.parse(message));
  }
  return new Response(null, {
    status: 200,
  });
};

// RECIEVING THE MESSAGE
export const get: APIRoute = async ({ request, params }) => {
  // const queue = new URLSearchParams(request.url).get("queue");
  const queue = params.queue;
  if (queue == null) {
    return new Response(null, { status: 400 });
  }

  main: {
    const amqp = new AMQPwrapper();
    const result = await amqp.recieve(queue);
    if (typeof result === "boolean") {
      return new Response(null, { status: 400 });
    } else {
    }
    amqp.close();
    return {
      body: JSON.stringify(result),
    };
  }
};

// SENDING THE MESSAGE
export const post: APIRoute = async ({ request }) => {
  const BodySchema = z.object({
    queue: z.string().max(10),
    message: z.string(),
  });

  const body = BodySchema.parse(await request.json());

  main: {
    const amqp = new AMQPwrapper();
    await amqp.send(body.queue, body.message);
    amqp.close();
  }
  return {
    body: "sent",
  };
};

export const del: APIRoute = async () => {
  return { body: "this deletes the  queue" };
};
