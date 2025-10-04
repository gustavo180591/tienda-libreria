export interface LLMResponse {
  success: boolean;
  content?: string;
  error?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface LLMRequest {
  prompt: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  language?: string;
  framework?: string;
}

export interface LLMService {
  generateText(request: LLMRequest): Promise<LLMResponse>;
  generateCode(request: LLMRequest): Promise<Record<string, string>>;
}
