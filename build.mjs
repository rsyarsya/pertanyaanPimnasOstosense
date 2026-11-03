import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const directory = dirname(fileURLToPath(import.meta.url));
const source = await readFile(join(directory, 'build.py'), 'utf8');
const raw = source.match(/raw = '''([\s\S]*?)'''/);
if (!raw) throw new Error('Bank pertanyaan tidak ditemukan di build.py.');
const questions = raw[1].trim().split(/\r?\n/).map((line, index) => {
  const fields = line.split('|');
  if (fields.length !== 6) throw new Error(`Format pertanyaan ${index + 1} tidak valid.`);
  const [category, title, question, answer, follow, source] = fields;
  return { id: index + 1, category, title, question, answer, follow, source };
});
const template = await readFile(join(directory, 'template.html'), 'utf8');
const data = JSON.stringify(questions).replaceAll('<', '\\u003c');
const html = template.replace('__QUESTIONS__', data);
await writeFile(join(directory, 'index.html'), html);
await mkdir(join(directory, 'dist'), { recursive: true });
await writeFile(join(directory, 'dist', 'index.html'), html);
console.log(`HTML siap: ${questions.length} pertanyaan, ${new Set(questions.map(q => q.category)).size} bidang.`);
