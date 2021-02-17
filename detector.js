import { syllabify } from 'syllables-ru'

const vowelsRegex = /[аеёиоуыэюя]/ig

const syllableCount = (text) => syllabify(text)
  .replace(/\s+/g, ' ')
  .split(' ')
  .reduce((acc, v) => {
    return acc + (
      v.split('·').length === 1
        // Пропускаем предлоги и т.п. без гласных
        ? (v.match(vowelsRegex) ? 1 : 0)
        : v.split('·').length
    )
  }, 0)

export const getHaiku = (text) => {
  if (syllableCount(text) !== 17) return false

  // TODO: переделывать числа в слова, чтобы считать слоги в них
  if (/\d/.test(text)) return false

  const words = text.replace(/\s+/g, ' ').split(' ')
  const haiku = [[], [], []]
  let paragraph = 0

  for (let word of words) {
    haiku[paragraph].push(word)

    const paragraphSyllableCount = syllableCount(haiku[paragraph].join(' '))
    const maxSyllables = [5, 7, 5]

    if (paragraphSyllableCount === maxSyllables[paragraph]) {
      if (paragraph<2) paragraph++
      continue
    }

    if (paragraphSyllableCount > maxSyllables[paragraph]) {
      return false
    }
  }

  return haiku.map(line => line.join(' ')).join('\n')
}
