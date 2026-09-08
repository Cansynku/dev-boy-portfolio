export const PRODUCTION_HOST = 'javier-cano-dev-boy.jcanogarcia96.chatgpt.site';
export const PREFERENCE_KEY = 'dev-boy.analytics.v1';

/** Only explicit consent on the exact production host permits the beacon. */
export function mayMeasure({
  hostname,
  token,
  preference,
  doNotTrack,
  globalPrivacyControl,
}) {
  return (
    hostname === PRODUCTION_HOST &&
    typeof token === 'string' &&
    /^[a-f0-9]{32}$/i.test(token) &&
    preference === 'allowed' &&
    doNotTrack !== '1' &&
    !globalPrivacyControl
  );
}
