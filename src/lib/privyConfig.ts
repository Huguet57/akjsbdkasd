import type { PrivyClientConfig } from '@privy-io/react-auth';

export const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: false,
    showWalletUIs: true,
  },
  loginMethods: ['email', 'sms'],
  appearance: {
    showWalletLoginFirst: true,
    theme: 'light',
    accentColor: '#43006C',
    logo: 'https://dashboard.pimlico.io/logo-small.square.png',
  },
};
