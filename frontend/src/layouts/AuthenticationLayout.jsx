import PropTypes from "prop-types";

function AuthenticationLayout({ children }) {
    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <div className="absolute inset-0 z-0">
                <img
                    src="/img/recrutement.jpeg"
                    alt="Recrutement pfe"
                    className="w-full h-full object-cover blur-md"
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Contenu par-dessus */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}

AuthenticationLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthenticationLayout;
