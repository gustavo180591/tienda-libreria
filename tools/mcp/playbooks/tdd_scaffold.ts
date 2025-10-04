import { createPlaybook } from '@mcp/core';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { LLM } from '../lib/llm';
import { FileSystem } from '../lib/filesystem';

export const tddScaffold = createPlaybook({
  name: 'tdd_scaffold',
  description: 'Genera esqueletos de pruebas TDD basados en la especificación OpenAPI',
  inputs: {
    openapiPath: {
      type: 'string',
      default: process.env.OPENAPI_PATH || './openapi.yaml',
      description: 'Ruta al archivo OpenAPI/Swagger',
    },
    outputDir: {
      type: 'string',
      default: process.env.OUTPUT_DIR || './test',
      description: 'Directorio de salida para los tests',
    },
    testFramework: {
      type: 'string',
      enum: ['jest', 'vitest', 'mocha'],
      default: 'vitest',
      description: 'Framework de testing a utilizar',
    },
  },
  async execute({ inputs, context }) {
    const { openapiPath, outputDir, testFramework } = inputs;
    const fs = new FileSystem();
    const llm = new LLM();

    // Leer el archivo OpenAPI
    const openapiContent = await readFile(openapiPath, 'utf-8');
    
    // Generar prompt para el LLM
    const prompt = `
    Basado en la siguiente especificación OpenAPI, genera esqueletos de pruebas TDD para ${testFramework}.
    Incluye pruebas unitarias y de integración siguiendo las mejores prácticas.
    
    Especificación OpenAPI:
    ${openapiContent}
    
    Genera el código en formato TypeScript con los siguientes archivos:
    1. test/unit/ - Para pruebas unitarias
    2. test/integration/ - Para pruebas de integración
    3. test/e2e/ - Para pruebas end-to-end
    `;

    // Generar los tests usando el LLM
    const testFiles = await llm.generateCode({
      prompt,
      language: 'typescript',
      framework: testFramework,
    });

    // Guardar los archivos generados
    for (const [filePath, content] of Object.entries(testFiles)) {
      const fullPath = join(outputDir, filePath);
      await fs.ensureDir(fullPath);
      await fs.writeFile(fullPath, content);
      context.logger.info(`Archivo de prueba generado: ${fullPath}`);
    }

    return {
      success: true,
      message: `Se generaron ${Object.keys(testFiles).length} archivos de prueba en ${outputDir}`,
      testFiles: Object.keys(testFiles),
    };
  },
});

export default tddScaffold;
