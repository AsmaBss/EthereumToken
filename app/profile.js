import React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

export function Profile() {
    // Connexion 
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })
    // Déconnexion
    const { disconnect } = useDisconnect()
    // Récupérer l'adresse de l'utilisateur
    const { address, isConnected } = useAccount()

    // Une fois il est connecté
    if (isConnected) {
        // Récupérer l'adresse de l'utilisateur
        // Button de déconnexion
        return (
            <div>
                <h2>Connecté à {address}</h2>
                <button onClick={() => disconnect()}>Déconnecter</button>
            </div>);
    }
    // Button de connexion 
    return <button onClick={() => connect()}>Connecter</button>
}