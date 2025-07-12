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
        const renderer = new marked.Renderer()
        renderer.image = (href, title, text) => {
          // Placeholder for image processing
          // In a real scenario, you'd generate multiple sizes here
          // and return an <picture> or <img> with srcset
          const baseName = href.substring(0, href.lastIndexOf('.'));
          const ext = '.webp'; // Assuming all processed images are webp

          const srcset = [
            `${baseName}_small${ext} 480w`,
            `${baseName}_medium${ext} 800w`,
            `${baseName}_large${ext} 1200w`
          ].join(', ');

          const sizes = "(max-width: 600px) 480px, (max-width: 1000px) 800px, 1200px";

          return `<img src="${baseName}${ext}" alt="${text}" title="${title || ''}" srcset="${srcset}" sizes="${sizes}" loading="lazy">`;
        }
        const html = marked(content, { renderer })
        
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