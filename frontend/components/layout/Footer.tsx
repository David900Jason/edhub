
const Footer = () => {
    return (
        <footer className="border-1 border-slate-300 px-4 py-6 shadow-lg">
            <p className="text-muted-foreground text-center text-sm">
                &copy; {new Date().getFullYear()} Edhub. All rights reserved. |
                Made with ❤️ by{" "}
                <a
                    href="https://github.com/David900Jason/edhub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold hover:underline"
                >
                    Digital Dreamers
                </a>
            </p>
        </footer>
    );
};

export default Footer;
