import { format } from 'date-fns'

/**
 * 日付フォーマットの基本スタイルです。
 * @param {Date} date
 */
const baseFormatDate = (date) => {
  return format(new Date(date), 'yyyy/MM/dd')
}

/**
 * News記事（index.js, news/[slug].js）。
 * @param {Date} date
 */
const formatNewsDate = (date) => {
  return baseFormatDate(date)
}

/**
 * News一覧（news/archive/[year].js）。
 * @param {Object} post
 */
const formatNewsArchiveDate = (post) => {
  const date = `${post.year}/${post.month}/${post.day}`
  return baseFormatDate(date)
}

export { formatNewsDate, formatNewsArchiveDate }
