import api from ".";

export const getUserWallet = async () => {
    try {
        const res = await api.get("/payments/wallet/me/");
        return res.data;
    } catch (error) {
        console.error(error);
        return;
    }
};

export const updateWallet = async (code: string) => {
    try {
        const res = await api.post("/payments/wallet/me/topup/", {
            code: code,
        });
        return res.data;
    } catch (error) {
        console.error(error);
        return;
    }
};

export const getUserTransactions = async (): Promise<InvoiceType[]> => {
    try {
        const res = await api.get("/payments/wallet/me/payments/");
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};