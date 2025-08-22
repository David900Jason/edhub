import { PrimeReactProvider } from "primereact/api";

const NotesLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <PrimeReactProvider value={{ locale: "en" }}>
            {children}
        </PrimeReactProvider>
    );
};

export default NotesLayout;
