interface ProgressCircleProps {
    progress: number; // Progress value between 0 and 1
    size: number; // Size of the circle in pixels
    color?: string; // Color of the progress circle
    strokeWidth?: number; // Width of the stroke
}

const ProgressCircle = ({
    progress,
    size,
    strokeWidth,
}: ProgressCircleProps) => {
    // Default values
    const circleStrokeWidth = strokeWidth || 10;
    const radius = (size - circleStrokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - progress);

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                className="stroke-gray-200"
                strokeWidth={circleStrokeWidth - 7}
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                className={`stroke-primary`}
                strokeWidth={circleStrokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.5s" }}
            />
            <text
                x={size / 2}
                y={size / 2 + 8}
                textAnchor="middle"
                className={`fill-gray-600 text-3xl font-bold tracking-tighter`}
            >
                {Math.round(progress * 100)}%
            </text>
        </svg>
    );
};

export default ProgressCircle;
