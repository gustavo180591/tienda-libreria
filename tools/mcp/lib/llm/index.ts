import OpenAI from 'openai';
import { LLMResponse, LLMService, LLMRequest } from './types';
import { logger } from '../logger';

export class LLM implements LLMService {
  private openai: OpenAI;

  constructor(apiKey?: string) {
    this.openai = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY,
    });
  }

  async generateText(request: LLMRequest): Promise<LLMResponse> {
    try {
      const { prompt, model = 'gpt-4', temperature = 0.7, maxTokens = 1000 } = request;
      
      const completion = await this.openai.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: 'Eres un asistente de desarrollo de software experto en metodologías ágiles y TDD.' },
          { role: 'user', content: prompt }
        ],
        temperature,
        max_tokens: maxTokens,
      });

      const content = completion.choices[0]?.message?.content || '';
      
      return {
        success: true,
        content,
        usage: {
          promptTokens: completion.usage?.prompt_tokens || 0,
          completionTokens: completion.usage?.completion_tokens || 0,
          totalTokens: completion.usage?.total_tokens || 0,
        },
      };
    } catch (error) {
      logger.error('Error generating text with LLM:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async generateCode(request: LLMRequest): Promise<Record<string, string>> {
    const { prompt, language = 'typescript', framework = 'sveltekit' } = request;
    
    const response = await this.generateText({
      prompt: `Genera código ${language} para ${framework} siguiendo las mejores prácticas.\n\nRequisitos:\n${prompt}\n\nDevuelve SOLO el código, sin explicaciones ni comentarios adicionales.`,
      model: 'gpt-4',
      temperature: 0.2,
    });

    if (!response.success) {
      throw new Error(`Error generating code: ${response.error}`);
    }

    // Parse the response to extract code blocks
    const codeBlocks: Record<string, string> = {};
    const codeBlockRegex = /```(?:\w+)?\n([\s\S]*?)\n```/g;
    let match;
    let index = 0;

    while ((match = codeBlockRegex.exec(response.content)) !== null) {
      codeBlocks[`file${index}.${language}`] = match[1];
      index++;
    }

    return codeBlocks;
  }
}

export const llm = new LLM();
