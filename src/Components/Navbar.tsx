import Wallet from "./Wallet-Button";

const Navbar = () => {
    return (
        <>
            <div className="w-full mt-3 pl-3 pr-3 flex justify-between items-center ">
                <h1
                    className="text-white gradient-text text-2xl md:text-4xl font-light tracking-widest"
                    style={{ fontFamily: "'Anton SC', sans-serif" }}
                >
                    <span>SENTIO</span>
                </h1>
                <Wallet />
            </div>
            <hr className="w-full border-t border-gray-500 mt-4" />

        </>
    );
};

export default Navbar;
