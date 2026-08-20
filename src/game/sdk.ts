/* Yandex Games SDK v2 wrapper. Safe outside of Yandex (falls back to local). */
type AnySdk = any;

let sdk: AnySdk = null;
let player: AnySdk = null;

export function hasSDK(): boolean {
  return !!sdk;
}
export function hasCloud(): boolean {
  return !!player;
}

/** Wait for the deferred SDK script (max `waitMs`) before giving up. */
function waitForScript(waitMs = 2500): Promise<void> {
  if ((window as AnySdk).YaGames) return Promise.resolve();
  return new Promise((res) => {
    const startedAt = Date.now();
    const iv = window.setInterval(() => {
      if ((window as AnySdk).YaGames || Date.now() - startedAt > waitMs) {
        window.clearInterval(iv);
        res();
      }
    }, 50);
  });
}

export async function initSDK(timeoutMs = 5000): Promise<boolean> {
  try {
    await waitForScript();
    const Ya = (window as AnySdk).YaGames;
    if (!Ya) return false;
    sdk = await Promise.race([
      Ya.init(),
      new Promise((_, rej) =>
        setTimeout(() => rej(new Error('sdk-timeout')), timeoutMs),
      ),
    ]);
    try {
      player = await sdk.getPlayer({ scopes: false });
    } catch {
      player = null;
    }
    return true;
  } catch {
    sdk = null;
    player = null;
    return false;
  }
}

export function sdkLang(): string | null {
  try {
    return sdk?.environment?.i18n?.lang ?? null;
  } catch {
    return null;
  }
}

export function loadingReady() {
  try {
    sdk?.features?.LoadingAPI?.ready?.();
  } catch {
    /* noop */
  }
}

export function gameplayStart() {
  try {
    sdk?.features?.GameplayAPI?.start?.();
  } catch {
    /* noop */
  }
}

export function gameplayStop() {
  try {
    sdk?.features?.GameplayAPI?.stop?.();
  } catch {
    /* noop */
  }
}

export async function loadCloud(): Promise<AnySdk | null> {
  try {
    if (!player) return null;
    const d = await player.getData(['save']);
    return d?.save ?? null;
  } catch {
    return null;
  }
}

let lastCloudSave = 0;
export function saveCloud(data: unknown, force = false) {
  try {
    if (!player) return;
    const now = Date.now();
    if (!force && now - lastCloudSave < 15000) return;
    lastCloudSave = now;
    player.setData({ save: data }, true).catch(() => undefined);
  } catch {
    /* noop */
  }
}

export interface RewardedHandlers {
  onOpen?: () => void;
  onReward: () => void;
  onClose: () => void;
}

/** Rewarded video. Returns false if SDK unavailable (caller may simulate). */
export function showRewarded(h: RewardedHandlers): boolean {
  try {
    if (!sdk?.adv?.showRewardedVideo) return false;
    gameplayStop();
    h.onOpen?.();
    let rewarded = false;
    sdk.adv.showRewardedVideo({
      callbacks: {
        onOpen: () => undefined,
        onRewarded: () => {
          rewarded = true;
          h.onReward();
        },
        onClose: () => {
          gameplayStart();
          h.onClose();
        },
        onError: () => {
          gameplayStart();
          if (!rewarded) h.onClose();
        },
      },
    });
    return true;
  } catch {
    return false;
  }
}
