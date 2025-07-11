import { Plugin } from 'vite'
import { readFileSync } from 'fs'
import matter from 'gray-matter'
import { marked } from 'marked'

export function markdownPlugin(): Plugin {
  return {
    name: 'vite-plugin-markdown-loader',
    transform(code: string, id: string) {
      if (id.endsWith('.md?raw')) {
        // For raw imports, return the content as-is
        return code
      }
      
      if (id.endsWith('.md')) {
        const filePath = id.split('?')[0]
        const rawContent = readFileSync(filePath, 'utf-8')
        const { content, data } = matter(rawContent)
        const html = marked(content)
        
        const processed = {
          html,
          metadata: data,
          raw: content
        }
        
        return {
          code: `export default ${JSON.stringify(processed)}`,
          map: null
        }
      }
    }
  }
}