import { types } from "../types/types";

export const startLogin = ( wallet , contract, network) => {
    return async( dispatch ) => {
        localStorage.setItem('connected', true);
        let walletHidden = wallet.substr(0,2) + '...' + wallet.substr(wallet.length - 5)
        dispatch( login({ wallet, walletHidden, contract, network }) )
    }
}

export const startLogout = () => {
    return ( dispatch ) => {
        localStorage.clear();
        localStorage.setItem('connected', false);
        dispatch( logout() );
    }
};

export const startBalanceCharge = (balance) => {
    return ( dispatch ) => {
        dispatch( chargeBalance(balance) );
    }
};



const logout = () => ({ type: types.walletLogout });

const login = ( wallet ) => ({
    type: types.walletLogin,
    payload: wallet
});

const chargeBalance = ( balance ) => ({
    type: types.chargeBalance,
    payload: balance
});

const walletUpdate = ( wallet ) => ({
    type: types.walletLogin,
    payload: wallet
});
