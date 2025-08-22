import { useTranslations } from "next-intl";
import CountUp from "react-countup";

const Statistics = ({
    inView,
    stats,
}: {
    inView: boolean;
    stats: StatsType[];
}) => {
    const t = useTranslations("HOME.STATISTICS");

    return (
        <div className="mx-auto grid grid-cols-1 gap-4 px-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {stats.map(({ icon, title, value }: StatsType, index: number) => {
                const Icon: React.ElementType = icon;
                return (
                    <div
                        key={index}
                        className="flex items-center justify-center rounded py-8"
                    >
                        <div className="flex items-center gap-2">
                            <Icon
                                size={100}
                                className="text-secondary stroke-2"
                            />
                            <div>
                                <h3 className="bg-text-gradient-colourful text-6xl font-bold tracking-tighter">
                                    {inView && (
                                        <CountUp
                                            end={value}
                                            start={0}
                                            duration={2}
                                            suffix="+"
                                        />
                                    )}
                                    {!inView && <span>0+</span>}
                                </h3>
                                <p className="text-lg font-light">{t(`${index + 1}`)}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Statistics;
