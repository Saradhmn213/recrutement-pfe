import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const emailSchema = z
  .string()
  .min(5, { message: "5 caractères minimum" })
  .max(30, { message: "30 caractères maximum" })
  .email({ message: "Email invalide" });

const passwordSchema = z
  .string()
  .regex(/[a-z]/, { message: "Lettre minuscule manquante" })
  .regex(/[A-Z]/, { message: "Lettre majuscule manquante" })
  .regex(/\d/, { message: "Chiffre manquant" })
  .regex(/[^a-zA-Z0-9]/, { message: "Symbole manquant" })
  .min(12, { message: "13 caractères minimum" });

function validateName(name) {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(name);
}

export default function Register() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.firstname || !form.lastname || !form.email || !form.password) {
      newErrors.message = "Tous les champs sont obligatoires.";
    }

    if (!validateName(form.firstname) || !validateName(form.lastname)) {
      newErrors.message =
        "Le nom et le prénom ne doivent pas contenir de chiffres ou de caractères spéciaux.";
    }

    const emailValidation = emailSchema.safeParse(form.email);
    if (!emailValidation.success) {
      newErrors.email = emailValidation.error.issues[0].message;
    }

    const passwordValidation = passwordSchema.safeParse(form.password);
    if (!passwordValidation.success) {
      newErrors.password = passwordValidation.error.issues[0].message;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/auth/register", form);
      navigate("/login");
    } catch (error) {
      setErrors({ message: "Une erreur est survenue lors de l'inscription." });
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <div className="hidden md:block w-1/2 bg-black">
        <img
          src="/public/img/recrutement.jpeg"
          alt="Image de connexion"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="w-full flex items-center justify-center bg-white py-12 px-6">
        <div className="w-full sm:w-4/5 md:w-1/2 lg:w-1/3 max-w-md p-6 rounded-md bg-white shadow-xl relative z-10 min-w-[435px]">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold text-bleu">Inscription</h1>
            <p className="text-sm text-gray-500">Inscrivez-vous pour accéder à notre site</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="firstname" className="block mb-2 text-sm text-gray-700">
                  Nom
                </label>
                <input
                  name="firstname"
                  type="text"
                  value={form.firstname}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-700"
                />
              </div>
              <div>
                <label htmlFor="lastname" className="block mb-2 text-sm text-gray-700">
                  Prénom
                </label>
                <input
                  name="lastname"
                  type="text"
                  value={form.lastname}
                  onChange={handleChange}
                  placeholder="Votre prénom"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-700"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm text-gray-700">
                  Adresse email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Votre adresse email"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-700"
                />
                {errors.email && <small className="text-red-500 block">{errors.email}</small>}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm text-gray-700">
                  Mot de passe
                </label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Votre mot de passe"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-700"
                />
                {errors.password && <small className="text-red-500 block">{errors.password}</small>}
              </div>
            </div>
            {errors.message && <p className="text-red-500">{errors.message}</p>}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-8 py-3 font-semibold rounded-full bg-bleu text-white w-full sm:w-auto"
              >
                Inscription
              </button>
            </div>
            <p className="px-6 text-sm text-center text-gray-500">
              Vous avez déjà un compte ?{" "}
              <a href="/auth/login" className="hover:underline text-bleu">
                Connectez-vous
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
