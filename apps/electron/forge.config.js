/* eslint-disable @typescript-eslint/no-var-requires */
const {
  utils: { fromBuildIdentifier },
} = require('@electron-forge/core');

const isCanary = process.env.BUILD_TYPE === 'canary';

const productName = isCanary ? 'AFFiNE-Canary' : 'AFFiNE';
const icoPath = isCanary
  ? './resources/icons/icon_canary.ico'
  : './resources/icons/icon.ico';
const icnsPath = isCanary
  ? './resources/icons/icon_canary.icns'
  : './resources/icons/icon.icns';

/**
 * @type {import('@electron-forge/shared-types').ForgeConfig}
 */
module.exports = {
  buildIdentifier: isCanary ? 'canary' : 'stable',
  packagerConfig: {
    name: productName,
    appBundleId: fromBuildIdentifier({
      canary: 'pro.affine.canary',
      stable: 'pro.affine.app',
    }),
    icon: icnsPath,
    osxSign: {
      identity: 'Developer ID Application: TOEVERYTHING PTE. LTD.',
      'hardened-runtime': true,
    },
    osxNotarize: process.env.APPLE_ID
      ? {
          tool: 'notarytool',
          appleId: process.env.APPLE_ID,
          appleIdPassword: process.env.APPLE_PASSWORD,
          teamId: process.env.APPLE_TEAM_ID,
        }
      : undefined,
  },
  makers: [
    {
      name: '@electron-forge/maker-dmg',
      config: {
        format: 'ULFO',
        icon: icnsPath,
        name: 'AFFiNE',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      config: {
        name: 'affine',
        iconUrl: icoPath,
        setupIcon: icoPath,
        platforms: ['darwin', 'linux', 'win32'],
      },
    },
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'AFFiNE',
        setupIcon: icoPath,
        // loadingGif: './resources/icons/loading.gif',
      },
    },
  ],
  hooks: {
    readPackageJson: async (_, packageJson) => {
      // we want different package name for canary build
      // so stable and canary will not share the same app data
      packageJson.productName = productName;
    },
    generateAssets: async (_, platform, arch) => {
      if (process.env.SKIP_GENERATE_ASSETS) {
        return;
      }

      const { $ } = await import('zx');

      // TODO: right now we do not need the following
      // it is for octobase-node, but we dont use it for now.
      if (platform === 'darwin' && arch === 'arm64') {
        // In GitHub Actions runner, MacOS is always x64
        // we need to manually set TARGET to aarch64-apple-darwin
        process.env.TARGET = 'aarch64-apple-darwin';
      }

      if (platform === 'win32') {
        $.shell = 'powershell.exe';
        $.prefix = '';
      }

      // run yarn generate-assets
      await $`yarn generate-assets`;
    },
  },
};
