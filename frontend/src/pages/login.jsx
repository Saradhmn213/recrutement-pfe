import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../hooks/useUser";
import AuthenticationLayout from "../layouts/AuthenticationLayout";

function Login() {
	const { login } = useUser(); // nettoyé
	const [formError, setFormError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;

		try {
			const response = await login(email, password);
			if (response.ok) {
				navigate("/");
			} else {
				const data = await response.json();
				setFormError(data?.message || "Email ou mot de passe incorrect");
			}
		} catch (error) {
			setFormError("Une erreur est survenue lors de la connexion.");
		}
	};

	return (
		<AuthenticationLayout>
			<section className="w-1/2 mt-28 mx-auto">
				<div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
					<div className="mx-auto w-full max-w-sm lg:w-96">
						<div>
							<h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-white mb-6">
								Connectez-vous à votre compte
							</h2>
							
						</div>
						<form method="POST" className="space-y-6" onSubmit={handleSubmit}>
							<div>
								<label htmlFor="email" className="block text-sm font-medium text-white">
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									required
									placeholder="exemple@gmail.com"
									className="block w-full pl-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div>
								<label htmlFor="password" className="block text-sm font-medium text-white">
									Mot de passe
								</label>
								<input
									type="password"
									id="password"
									name="password"
									required
									placeholder="Mot de passe"
									className="block w-full pl-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-bg-bleu placeholder:text-bg-bleu focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							{formError && (
								<div className="text-sm text-red-600 my-2">
									{formError}
								</div>
							)}
							<div className="flex items-center justify-end text-sm">
								<a href="/password-reset" className="font-semibold text-white hover:text-bleu">
									Mot de passe oublié ?
								</a>
							</div>
							<div>
								<button
									type="submit"
									className="flex w-full justify-center rounded-md bg-bleu px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-bleu focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									Se connecter
								</button>
							</div>
							<p className="mt-2 text-sm leading-6 text-white">
								Vous n'êtes pas encore inscrit ?
							</p>
							<NavLink to="/auth/register">
								<p className="font-semibold text-white hover:text-bleu">
									Inscrivez-vous ici
								</p>
							</NavLink>
						</form>
					</div>
				</div>
			</section>
		</AuthenticationLayout>
	);
}

export default Login;
