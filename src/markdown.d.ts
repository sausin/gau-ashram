declare module '*.md' {
  interface MarkdownContent {
    html: string
    metadata: {
      title?: string
      description?: string
      author?: string
      date?: string
      tags?: string[]
      [key: string]: any
    }
    raw: string
  }
  
  const content: MarkdownContent
  export default content
}