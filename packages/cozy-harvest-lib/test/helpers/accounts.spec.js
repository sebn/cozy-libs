import { mergeAuth, prepareAccountData } from 'helpers/accounts'

const fixtures = {
  konnector: {
    slug: 'konnectest'
  },
  data: {
    username: 'foo',
    passphrase: 'bar'
  },
  account: {
    account_type: 'konnectest',
    auth: {
      username: 'foo',
      passphrase: 'buz',
      nested: {
        probability: 'low'
      }
    }
  }
}

describe('Accounts Helper', () => {
  describe('prepareAccountData', () => {
    it('should prepare account data', () => {
      expect(prepareAccountData(fixtures.konnector, fixtures.data)).toEqual({
        account_type: 'konnectest',
        auth: {
          username: 'foo',
          passphrase: 'bar'
        }
      })
    })
  })

  describe('mergeAuth', () => {
    it('should hydrate account', () => {
      expect(mergeAuth(fixtures.account, fixtures.data)).toEqual({
        account_type: 'konnectest',
        auth: {
          username: 'foo',
          passphrase: 'bar',
          nested: {
            probability: 'low'
          }
        }
      })
    })
  })
})