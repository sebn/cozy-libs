import lint from '@commitlint/lint'
import cozyConfig from '.'

const rules = cozyConfig.rules
// const TOO_LONG =
//  'This is an invalid sentence since it has too much character !!!!!!!!!!!!!'

describe('Commitlint Config Cozy', () => {
  describe('Header', () => {
    it('respect type', async () => {
      const validType = [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore'
      ]
      const invalidType = ['funType', 'Feat', 'doCs']
      for (const type of validType) {
        expect((await lint(`${type}: Bar`, rules)).valid).toBeTruthy()
      }
      for (const type of invalidType) {
        expect((await lint(`${type}: Bar`, rules)).valid).toBeFalsy()
      }
    })

    it('respect scope', async () => {
      const validScope = ['LineChart', 'balance history']
      for (const scope of validScope) {
        expect((await lint(`feat(${scope}): Bar`, rules)).valid).toBeTruthy()
      }
    })

    it('respect max length', async () => {
      const valideLength = 'fix: This is a 50 characters lines !!!!!!!!!!!!!!!'
      expect((await lint(valideLength, rules)).valid).toBeTruthy()

      const invalidLength =
        'refactor: This is a 51 characters lines !!!!!!!!!!!'
      expect((await lint(invalidLength, rules)).valid).toBeFalsy()
    })

    it('can use emojis in your commit subject', async () => {
      const validEmojis = [
        'fix: 🔍 This is a valid commit',
        'fix: This is a valid commit 🔍'
      ]
      for (const emoji of validEmojis) {
        expect((await lint(emoji, rules)).valid).toBeTruthy()
      }

      const invalidEmojis = '🔍 fix: This is an invalid commit'
      expect((await lint(invalidEmojis, rules)).valid).toBeFalsy()
    })
  })

  /*
  describe('Body', () => {
    it('respect max length', async () => {
      const validBody = [`fix: Bar\n\nWith a small body`]
      for (const body of validBody) {
        expect((await lint(body, rules)).valid).toBeTruthy()
      }

      const invalidBody = [`fix: Bar\n\n${TOO_LONG}`]
      for (const body of invalidBody) {
        expect((await lint(`${body}`, rules)).valid).toBeFalsy()
      }
    })
  })
  */
})
