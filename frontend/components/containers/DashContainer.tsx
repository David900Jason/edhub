
const DashContainer = ({ children }: { children?: React.ReactNode }) => {
    return (
        <main className="min-h-screen flex flex-1">
            {children}
        </main>
    );
};

export default DashContainer;
