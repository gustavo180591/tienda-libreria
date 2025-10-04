import fs from 'fs/promises';
import path from 'path';

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

// Función para extraer secciones del archivo routes.md
async function extractSectionsFromRoutes() {
  try {
    const routesContent = await fs.readFile('routes.md', 'utf-8');
    const sections = [];
    let currentSection = null;
    
    // Expresión regular para detectar encabezados de sección
    const sectionRegex = /^##\s+(.+?)$/gm;
    let match;
    
    while ((match = sectionRegex.exec(routesContent)) !== null) {
      const sectionTitle = match[1].trim();
      if (!sectionTitle.includes('Formatos de Respuesta') && 
          !sectionTitle.includes('Códigos de Estado')) {
        sections.push({
          title: sectionTitle,
          endpoints: []
        });
      }
    }
    
    // Extraer endpoints de cada sección
    const endpointRegex = /###\s+(GET|POST|PUT|DELETE|PATCH)\s+(\S+)([\s\S]*?)(?=###|##|$)/g;
    let endpointMatch;
    
    while ((endpointMatch = endpointRegex.exec(routesContent)) !== null) {
      const [_, method, path] = endpointMatch;
      const descriptionMatch = endpointMatch[0].match(/\*\*Description\*\*: ([^\n]+)/);
      const description = descriptionMatch ? descriptionMatch[1].trim() : 'Sin descripción';
      
      // Encontrar la sección a la que pertenece este endpoint
      const sectionTitleMatch = routesContent.substring(0, endpointMatch.index).match(/##\s+([^\n]+)[^#]*$/);
      const sectionTitle = sectionTitleMatch ? sectionTitleMatch[1].trim() : 'General';
      
      const section = sections.find(s => s.title === sectionTitle) || 
                     sections.find(s => s.title.includes(sectionTitle)) ||
                     { title: sectionTitle, endpoints: [] };
      
      if (!sections.includes(section)) {
        sections.push(section);
      }
      
      section.endpoints.push({
        method,
        path,
        description
      });
    }
    
    return sections;
  } catch (error) {
    console.error('Error al leer el archivo routes.md:', error);
    return [];
  }
}

// Función para analizar tareas completadas en el roadmap
async function analyzeRoadmapProgress() {
  try {
    const roadmapContent = await fs.readFile('roadmap.md', 'utf-8');
    
    // Contar tareas totales y completadas
    const totalTasks = (roadmapContent.match(/- \[([ x])\]/g) || []).length;
    const completedTasks = (roadmapContent.match(/- \[x\]/gi) || []).length;
    
    // Contar endpoints totales y completados
    const totalEndpoints = (roadmapContent.match(/\|\s*(GET|POST|PUT|DELETE|PATCH)\s*\|/g) || []).length;
    const completedEndpoints = (roadmapContent.match(/\|\s*(GET|POST|PUT|DELETE|PATCH)\s*\|.*✅/g) || []).length;
    
    // Calcular porcentajes
    const taskPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const endpointPercentage = totalEndpoints > 0 ? Math.round((completedEndpoints / totalEndpoints) * 100) : 0;
    
    // Ponderación: 60% tareas, 40% endpoints
    const overallProgress = Math.round((taskPercentage * 0.6) + (endpointPercentage * 0.4));
    
    return {
      tasks: { completed: completedTasks, total: totalTasks, percentage: taskPercentage },
      endpoints: { completed: completedEndpoints, total: totalEndpoints, percentage: endpointPercentage },
      overall: overallProgress
    };
  } catch (error) {
    console.error('Error al analizar el progreso del roadmap:', error);
    return null;
  }
}

// Función para actualizar el archivo roadmap.md
async function updateRoadmap(sections) {
  try {
    let roadmapContent = await fs.readFile('roadmap.md', 'utf-8');
    const today = new Date().toLocaleDateString('es-AR');
    
    // Analizar el progreso actual
    const progress = await analyzeRoadmapProgress();
    
    // Crear sección de progreso general
    let progressSection = '## 📊 Progreso General\n\n';
    progressSection += `> Última actualización: ${today}\n\n`;
    
    // Barra de progreso
    const progressBarLength = 30;
    const completedBars = Math.round((progress.overall / 100) * progressBarLength);
    const progressBar = '█'.repeat(completedBars) + '░'.repeat(progressBarLength - completedBars);
    
    progressSection += `### 🎯 Progreso Total: ${progress.overall}%\n`;
    progressSection += `\`${progressBar}\`\n\n`;
    
    // Estadísticas detalladas
    progressSection += '### 📊 Estadísticas\n';
    progressSection += `- ✅ **Tareas completadas:** ${progress.tasks.completed} de ${progress.tasks.total} (${progress.tasks.percentage}%)\n`;
    progressSection += `- 🌐 **Endpoints implementados:** ${progress.endpoints.completed} de ${progress.endpoints.total} (${progress.endpoints.percentage}%)\n\n`;
    
    // Insertar la sección de progreso al inicio del archivo
    const progressRegex = /## 📊 Progreso General[\s\S]*?(?=## 🚀|$)/;
    if (progressRegex.test(roadmapContent)) {
      roadmapContent = roadmapContent.replace(progressRegex, progressSection);
    } else {
      const firstHeaderIndex = roadmapContent.indexOf('##');
      roadmapContent = roadmapContent.slice(0, firstHeaderIndex) + 
                      progressSection + '\n' + 
                      roadmapContent.slice(firstHeaderIndex);
    }
    
    // Crear sección de estado de la API
    let apiStatusSection = '## 🌐 Estado de la API\n\n';
    
    sections.forEach(section => {
      if (section.endpoints && section.endpoints.length > 0) {
        apiStatusSection += `### ${section.title}\n`;
        apiStatusSection += `| Método | Ruta | Descripción | Estado |\n`;
        apiStatusSection += `|--------|------|-------------|--------|\n`;
        
        section.endpoints.forEach(endpoint => {
          // Marcar como implementado (podríamos hacer esto más inteligente)
          const status = '✅';
          apiStatusSection += `| ${endpoint.method} | \`${endpoint.path}\` | ${endpoint.description} | ${status} |\n`;
        });
        
        apiStatusSection += '\n';
      }
    });
    
    // Actualizar o agregar la sección de estado de la API
    const apiStatusRegex = /## 🌐 Estado de la API[\s\S]*?(?=## |$)/;
    if (apiStatusRegex.test(roadmapContent)) {
      roadmapContent = roadmapContent.replace(apiStatusRegex, apiStatusSection);
    } else {
      // Agregar después de la sección de progreso general
      const progressSectionIndex = roadmapContent.indexOf('## 📊 Progreso General');
      const nextSectionIndex = roadmapContent.indexOf('##', progressSectionIndex + 1);
      
      if (nextSectionIndex !== -1) {
        roadmapContent = 
          roadmapContent.slice(0, nextSectionIndex) + 
          '\n' + apiStatusSection + '\n' + 
          roadmapContent.slice(nextSectionIndex);
      } else {
        roadmapContent += '\n' + apiStatusSection + '\n';
      }
    }
    
    // Actualizar fecha de última modificación en el encabezado
    const lastUpdateRegex = /Última actualización: \d{1,2}\/\d{1,2}\/\d{4}/;
    if (lastUpdateRegex.test(roadmapContent)) {
      roadmapContent = roadmapContent.replace(
        lastUpdateRegex, 
        `Última actualización: ${today}`
      );
    }
    
    // Guardar los cambios
    await fs.writeFile('roadmap.md', roadmapContent, 'utf-8');
    
    // Mostrar resumen en consola
    console.clear();
    console.log(`\n${colors.green}✅ Roadmap actualizado exitosamente!${colors.reset}`);
    console.log(`${colors.cyan}📅 Fecha de actualización: ${today}${colors.reset}\n`);
    
    // Mostrar resumen de progreso
    console.log(`📊 ${colors.yellow}PROGRESO GENERAL: ${progress.overall}%${colors.reset}\n`);
    
    // Mostrar barras de progreso
    console.log('📋 Tareas:');
    const tasksBar = '█'.repeat(Math.round(progress.tasks.percentage / 5)) + 
                    '░'.repeat(20 - Math.round(progress.tasks.percentage / 5));
    console.log(`${tasksBar} ${progress.tasks.percentage}% (${progress.tasks.completed}/${progress.tasks.total})`);
    
    console.log('\n🌐 Endpoints:');
    const endpointsBar = '█'.repeat(Math.round(progress.endpoints.percentage / 5)) + 
                        '░'.repeat(20 - Math.round(progress.endpoints.percentage / 5));
    console.log(`${endpointsBar} ${progress.endpoints.percentage}% (${progress.endpoints.completed}/${progress.endpoints.total})\n`);
    
    // Mostrar resumen de las secciones principales
    console.log('📌 Secciones principales:');
    const mainSections = sections.filter(s => s.endpoints && s.endpoints.length > 0)
                               .slice(0, 5);
                               
    mainSections.forEach(section => {
      const completed = section.endpoints.length; // Asumiendo que todos los endpoints listados están completos
      const percentage = 100; // Ya que solo mostramos endpoints implementados
      const bar = '█'.repeat(20);
      console.log(`\n${colors.yellow}${section.title}${colors.reset}`);
      console.log(`${bar} ${percentage}% (${completed} endpoints)`);
    });
    
    if (sections.length > 5) {
      console.log(`\n... y ${sections.length - 5} secciones más`);
    }
    
  } catch (error) {
    console.error('Error al actualizar el roadmap:', error);
  }
}
// Ejecutar el script
async function main() {
  console.log('\n🔄 Analizando rutas y actualizando roadmap...\n');
  const sections = await extractSectionsFromRoutes();
  await updateRoadmap(sections);
}

main().catch(console.error);
