"use client"

import { privyConfig } from "@/lib/privyConfig"
import { wagmiConfig } from "@/lib/wagmiConfig"
import { PrivyProvider } from "@privy-io/react-auth"
import { WagmiProvider } from "@privy-io/wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

export function Providers({
    children
}: {
    children: React.ReactNode
}) {
    const [queryClient] = useState(() => new QueryClient())

    console.log(process.env.NEXT_PUBLIC_PRIVY_APP_ID)

    return (
        <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
            config={privyConfig}
        >
            <QueryClientProvider client={queryClient}>
                <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
            </QueryClientProvider>
        </PrivyProvider>
    )
}
