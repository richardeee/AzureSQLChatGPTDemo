import { openAIApiKey, openAIChatGPTDeploymentName,openAIEndPoint } from "@/utils";
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";
import { NextRequest } from "next/server";
import { Configuration, OpenAIApi } from "azure-openai"; 

export const config = {
  runtime: "edge",
};

const handler = async (req: NextRequest) => {
  const reqBody = await req.json();
  // const openAIApi = new OpenAIApi(
  //   new Configuration({ 
  //     apiKey: openAIApiKey,
  //     azure: {
  //       endpoint: openAIEndPoint,
  //       apiKey: openAIApiKey,
  //       deploymentName: openAIChatGPTDeploymentName,
  //     }
  //   })
  // );

  // console.log("reqBody", reqBody)
  // const res = await openAIApi.createChatCompletion({
  //   model: openAIChatGPTDeploymentName,
  //   prompt: reqBody.messages,
  //   temperature: 0,
  //   frequency_penalty: 0.0,
  //   presence_penalty: 0.0,
  //   max_tokens: 1000,
  // });

  // console.log("response:"+res)

  // if (!res.ok) {
  //   return new Response(res.body, {
  //     status: res.status,
  //     statusText: res.statusText,
  //   });
  // }
  const url = `${openAIEndPoint}/openai/deployments/${openAIChatGPTDeploymentName}/chat/completions?api-version=2023-03-15-preview`
  const rawRes = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "api-key": `${openAIApiKey}`,
    },
    method: "POST",
    body: JSON.stringify({
      // model: "gpt-3.5-turbo",
      messages: reqBody.messages,
      temperature: 0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stream: true,
    }),
  });
  if (!rawRes.ok) {
    return new Response(rawRes.body, {
      status: rawRes.status,
      statusText: rawRes.statusText,
    });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const stream = new ReadableStream({
    async start(controller) {
      const streamParser = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            // console.log(json)
            const text = json.choices[0].delta?.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };
      const parser = createParser(streamParser);
      for await (const chunk of rawRes.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });
  return new Response(stream);
};

export default handler;
