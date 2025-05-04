import { useState } from "react";

const UserProfilePasswordFields = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    if (password === confirmPassword) {
      alert("Mot de passe mis à jour");
    } else {
      alert("Les mots de passe ne correspondent pas");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="password" className="text-sm font-medium text-white">
          Nouveau mot de passe
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="confirm-password"
          className="text-sm font-medium text-white"
        >
          Confirmer le mot de passe
        </label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        onClick={handlePasswordChange}
        className="mt-4 w-full px-4 py-2 bg-bleu text-white rounded-md"
      >
        Mettre à jour le mot de passe
      </button>
    </div>
  );
};

export default UserProfilePasswordFields;
