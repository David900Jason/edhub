import { useLocale } from "next-intl";

const Price = ({ price }: { price: number }) => {
    const locale = useLocale();

    return (
        <div>
            {new Intl.NumberFormat(locale, {
                style: "currency",
                currency: "EGP",
                currencyDisplay: "symbol",
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            }).format(price)}
        </div>
    );
};

export default Price;
