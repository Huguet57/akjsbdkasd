import type { PrivyClientConfig } from "@privy-io/react-auth"

export const privyConfig: PrivyClientConfig = {
    embeddedWallets: {
        createOnLogin: "users-without-wallets",
        requireUserPasswordOnCreate: false,
        showWalletUIs: true
    },
    loginMethods: ["email", "sms"],
    appearance: {
        showWalletLoginFirst: true,
        theme: "dark",
        accentColor: "#ff00c8",
        logo: "https://try7702.pimlico.io/logo-small-square.png"
    }
}
