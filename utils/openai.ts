import { encode } from "@nem035/gpt-3-encoder";

export const openAIApiKey = process.env.AZURE_OPENAI_KEY;
export const openAIEndPoint = process.env.AZURE_OPENAI_BASE;
export const openAIChatGPTDeploymentName = process.env.AZURE_OPENAI_CHATGPT_DEPLOYMENT as string;
export const openAIGPTDeploymentName = process.env.AZURE_OPENAI_GPT_DEPLOYMENT;

export const countTextTokens = (text: string) => {
  return encode(text).length;
};
