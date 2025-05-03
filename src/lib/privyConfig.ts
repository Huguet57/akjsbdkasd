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
    accentColor: '#3B82F6',
    logo: 'https://your-logo-url.com/logo.png',
  },
};
