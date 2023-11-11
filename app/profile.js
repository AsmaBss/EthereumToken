import React, { useState } from 'react'
import { parseEther } from 'viem';
import { useAccount, useConnect, useDisconnect, useToken, useBalance, useSendTransaction } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

export function Profile() {
    // Connexion 
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    });
    // Déconnexion
    const { disconnect } = useDisconnect();
    // Récupérer l'adresse de l'utilisateur
    const { address, isConnected } = useAccount();
    // Récupérer le solde 
    const { data: balence } = useBalance({
        address: address
    });
    // Adresse de contrat à ajouter
    const [contractAddress, setContractAddress] = useState('');
    // Détails de token à récupérer
    const [tokenDetails, setTokenDetails] = useState(null);
    const { data: token } = useToken({
        address: contractAddress,
    });
    // Récupérer les informations
    const getTokenInfo = () => {
        setTokenDetails(token);
    };
    // les inputs pour envoyer le token 
    const [to, setTo] = useState('');
    const [value, setValue] = useState('');
    const { isLoading, isSuccess, isError, status, sendTransaction } = useSendTransaction({
        to: to,
        value: parseEther(value),
    })

    // Une fois il est connecté
    if (isConnected) {
        return (
            <div>
                {/* écupérer l'adresse de l'utilisateur */}
                <h2>Connecté à {address}</h2>
                {/* Button de déconnexion */}
                <button onClick={() => disconnect()}>Déconnecter</button>
                {/* Information de Token */}
                <h2>Les Informations du Token</h2>
                {/* Saisir l'adresse du contrat */}
                <label>
                    Adresse du contrat:
                    <input
                        type="text"
                        value={contractAddress}
                        onChange={(e) => setContractAddress(e.target.value)}
                    />
                </label>
                <button onClick={() => getTokenInfo()}>Afficher les informations</button>
                {/* Afficher les informations de Token */}
                {tokenDetails && (
                    <div>
                        <p>Adresse: {tokenDetails.address}</p>
                        <p>Nom: {tokenDetails.name}</p>
                        <p>Symbole: {tokenDetails.symbol}</p>
                        <p>Solde: {balence.formatted} {balence.symbol}</p>
                    </div>
                )}
                {/* Transfert de Token */}
                <div>
                    <h2>Transfert de Token</h2>
                    <label>
                        Destinataire:
                        <input
                            type="text"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        />
                    </label>
                    <label>
                        Valeur:
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </label>
                    <button onClick={() => sendTransaction()}>Envoyer</button>
                    {/* Statut de la transaction */}
                    {isLoading && <div>En attente</div>}
                    {isSuccess && <div>Terminée</div>}
                    {isError && <div>Erreur</div>}
                    {/*status && <div>{status}</div>*/}
                </div>
            </div>
        );
    }
    // Button de connexion 
    return <button onClick={() => connect()}>Connecter</button>
}