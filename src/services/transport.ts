
const NEWS_API_KEY = '24667f909e6e46cb8598937386b7135b' // use react-native-config
const NEWS_ENDPOINT = 'https://newsapi.org/v2'
// 24667f909e6e46cb8598937386b7135b

interface Response {
  message?: string
  code?: string
}
interface SourcesResponse extends Response {
  status: string
  sources: Source[]
}
interface ArticlesResponse extends Response {
  status: string
  totalResults: number
  articles: Article[]
}
export interface Source {
  id: string
  name: string
  description: string
  url: string
  category: string
  language: string
  country: string
}
export interface Article {
  source: Pick<Source, 'id' | 'name'>
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: Date
  content: string
}
interface Pagination {
  pageSize: number
  page: number
}

const defaultHeader = {
  Authorization: NEWS_API_KEY,
  'Content-Type': 'application/json'
}

export async function getSources (): Promise<Source[]> {
  const response = await fetch(`${NEWS_ENDPOINT}/top-headlines/sources`, {
    headers: defaultHeader
  })

  const json: SourcesResponse = await response.json()
  if (json.status === 'ok') {
    return json.sources
  } else {
    throw new Error(json.message)
  }
}

export async function getArticles (sourceId: string, pagination: Pagination): Promise<Article[]> {
  const response = await fetch(
    `${NEWS_ENDPOINT}/everything?sources=${sourceId}&sortBy=popularity&page=${pagination.page}&pageSize=${pagination.pageSize}`, {
      headers: defaultHeader
    })
  const json: ArticlesResponse = await response.json()
  return json.articles
}
