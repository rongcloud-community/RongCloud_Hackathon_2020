import zhCode from 'date-fns/locale/zh-CN'
import format from 'date-fns/format'
import formatDistance from 'date-fns/formatDistance'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import differenceInYears from 'date-fns/differenceInYears'
import isSameYear from 'date-fns/isSameYear'
import isSameDay from 'date-fns/isSameDay'

function fromNow (date) {
  return formatDistanceToNow(new Date(date), { locale: zhCode, addSuffix: true })
}

function accordingToNow (date, style = 'long') {
  date = new Date(date)
  const now = new Date()

  if (style === 'long') {
    if (differenceInMinutes(now, date) <= 30) {
      return formatDistance(new Date(date), now, { locale: zhCode, addSuffix: true })
    } else if (isSameDay(now, date)) {
      return format(date, 'p', { locale: zhCode })
    } else if (differenceInYears(now, date) < 1) {
      return format(date, 'MMM do p', { locale: zhCode })
    } else {
      return format(date, 'PPP p', { locale: zhCode })
    }
  } else if (style === 'short') {
    if (isSameDay(now, date)) {
      // 显示 8:08 这种
      return format(date, 'p', { locale: zhCode })
    } else if (differenceInYears(now, date) < 1) {
      // 显示几月几日这种
      return format(date, 'MMM do', { locale: zhCode })
    } else {
      // 显示哪一年
      return format(date, 'yyyy年 MMM', { locale: zhCode })
    }
  } else {
    throw new Error(`不支持的风格：${style}`)
  }
}

export {
  fromNow,
  accordingToNow
}
