// This file handles markdown processing at build time
import matter from 'gray-matter'
import { marked } from 'marked'

export interface ContentMetadata {
  title?: string
  description?: string
  author?: string
  date?: string
  tags?: string[]
  [key: string]: any
}

export interface ProcessedContent {
  html: string
  metadata: ContentMetadata
  raw: string
}

export function processMarkdown(rawContent: string): ProcessedContent {
  const { content, data } = matter(rawContent)
  const html = marked(content) as string
  
  return {
    html,
    metadata: data as ContentMetadata,
    raw: content
  }
}