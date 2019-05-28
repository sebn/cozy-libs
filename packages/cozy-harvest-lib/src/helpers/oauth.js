import uuid from 'uuid/v4'

import * as konnectors from './konnectors'

/**
 * Handler to be called at the top level of an application.
 * Aimed to handle an OAuth redirect with data in query string.
 *
 * We are supposed here to be in the OAuth popup, at the end of the process.
 *
 * We first check that we are actually getting the response we were expecting
 * for, and then we sent the account Id with postMessage
 *
 * This handler should be typically used in the OAuth popup the following way:
 * ```js
 * document.addEventListener('DOMContentLoaded', handleOAuthResponse)
 * ```
 */
export const handleOAuthResponse = () => {
  /* global URLSearchParams */
  const queryParams = new URLSearchParams(window.location.search)

  const accountId = queryParams.get('account')
  if (!accountId) return

  /** As we are in a popup, get the opener window */
  const opener = window.opener
  /**
   * Key for local storage, used at the beginning of the OAuth process to store
   * data about the account currently created, and used at the end to check
   * that data are the ones we are expecting.
   */
  const oAuthStateKey = queryParams.get('state')

  opener.postMessage(
    {
      key: accountId,
      oAuthStateKey
    },
    /**
     * FIXME: Here we are using this wildcard because we cannot be sure about
     * the target origin we are sending the message to.
     * At the time this code is written, this handler is called only in
     * cozy-home, and may send message to another app.
     */
    '*'
  )

  // Close the current popup
  window.close()
}

/**
 * Initializes client OAuth workflow by storing the current information about
 * account type in local storage. Generates the OAuth URL to stack endpoint,
 * passing the local storage key as state in query string.
 * @param  {string} domain    Cozy domain
 * @param  {Object} konnector
 * @return {Object}           Object containing: `oAuthUrl` (URL of cozy stack
 * OAuth endpoint) and `oAuthStateKey` (local storage key)
 */
export const prepareOAuth = (client, konnector) => {
  const { oauth } = konnector
  const accountType = konnectors.getAccountType(konnector)

  // We use localStorage to store the account related data
  // We will later check in local storage that received information is
  // consistent.
  const oAuthState = { accountType: konnectors.getAccountType(konnector) }
  const oAuthStateKey = uuid()
  localStorage.setItem(oAuthStateKey, JSON.stringify(oAuthState))

  const cozyUrl = client.stackClient.uri

  const oAuthUrl = `${cozyUrl}/accounts/${accountType}/start?scope=${
    oauth.scope
  }&state=${oAuthStateKey}&nonce=${Date.now()}`

  return { oAuthStateKey, oAuthUrl }
}

export default {
  handleOAuthResponse,
  prepareOAuth
}
