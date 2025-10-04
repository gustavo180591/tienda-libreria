#!/usr/bin/env ts-node
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';
import { LinearClient } from '@linear/sdk';
import { Octokit } from '@octokit/rest';
import { OpenAI } from 'openai';

// Cargar variables de entorno
config({ path: path.join(__dirname, '../.env') });

// Clientes
const linear = new LinearClient({ apiKey: process.env.LINEAR_API_KEY });
const github = new Octokit({ auth: process.env.GITHUB_TOKEN });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Directorios
const REQUIREMENTS_DIR = path.join(__dirname, '../../docs/requirements');
const OUTPUT_DIR = path.join(__dirname, '../../docs/user-stories');

// Crear directorio de salida si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Función para generar historias de usuario con IA
async function generateUserStories(requirement: string): Promise<string> {
  const prompt = fs.readFileSync(
    path.join(__dirname, '../prompts/gherkin.md'), 
    'utf-8'
  );

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `Eres un experto en análisis de requisitos. Genera historias de usuario en formato Gherkin basadas en los requisitos proporcionados. Usa la siguiente plantilla:\n\n${prompt}`
      },
      {
        role: "user",
        content: requirement
      }
    ],
    temperature: 0.7,
  });

  return completion.choices[0].message.content || '';
}

// Función para crear un issue en Linear
async function createLinearIssue(story: string) {
  if (!process.env.LINEAR_TEAM_ID) {
    console.warn('No se configuró LINEAR_TEAM_ID. Saltando creación en Linear.');
    return null;
  }

  try {
    const issue = await linear.issueCreate({
      teamId: process.env.LINEAR_TEAM_ID,
      title: story.split('\n')[0].replace('Característica: ', '').trim(),
      description: story,
      stateId: process.env.LINEAR_BACKLOG_STATE_ID,
    });
    
    return issue.issue?.id;
  } catch (error) {
    console.error('Error creando issue en Linear:', error);
    return null;
  }
}

// Función principal
async function main() {
  try {
    // Leer archivos de requisitos
    const requirementFiles = fs.readdirSync(REQUIREMENTS_DIR)
      .filter(file => file.endsWith('.md'));

    for (const file of requirementFiles) {
      const content = fs.readFileSync(
        path.join(REQUIREMENTS_DIR, file), 
        'utf-8'
      );

      console.log(`\nProcesando: ${file}`);
      
      // Generar historias de usuario
      const stories = await generateUserStories(content);
      
      // Guardar en archivo
      const outputFile = path.join(OUTPUT_DIR, `stories_${Date.now()}.feature`);
      fs.writeFileSync(outputFile, stories);
      
      console.log(`✅ Historias guardadas en: ${outputFile}`);
      
      // Crear issues en Linear
      if (process.env.LINEAR_API_KEY) {
        const issueId = await createLinearIssue(stories);
        if (issueId) {
          console.log(`📌 Issue creado en Linear: ${issueId}`);
        }
      }
    }
  } catch (error) {
    console.error('Error procesando requisitos:', error);
    process.exit(1);
  }
}

// Ejecutar
main();
