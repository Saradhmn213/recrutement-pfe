import { useUser } from "../hooks/useUser";

function Dashboard() {
	const { user } = useUser(); // pour afficher le nom de l'utilisateur, si disponible

	return (
		<section className="w-11/12 max-w-5xl mt-20 mx-auto">
			<div className="bg-white p-6 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold text-gray-800 mb-4">
					Bonjour {user?.name || "Utilisateur"} 👋
				</h1>
				<p className="text-gray-600">
					Vous êtes connecté au tableau de bord. Vous pouvez gérer votre profil, consulter vos données ou accéder aux paramètres via le menu à gauche.
				</p>
			</div>
		</section>
	);
}

export default Dashboard;
