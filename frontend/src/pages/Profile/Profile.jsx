import { useState, useEffect } from "react";
import UserProfileField from "./UserProfileField";
import UserProfilePasswordFields from "./UserProfilePasswordFields";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [tabs, setTabs] = useState([
    { name: "Compte", current: true },
    { name: "Mot de passe", current: false },
  ]);

  const fields = {
    username: { name: "username", label: "Pseudo" },
    email: { name: "email", label: "Email" },
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);
  }, []);

  const changeTab = (tabName) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.name === tabName
          ? { ...tab, current: true }
          : { ...tab, current: false }
      )
    );
  };

  if (!user) return <div>Loading...</div>;

  return (
      <div className="flex-1 max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">Paramètres</h1>
        <div className="mt-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => changeTab(tab.name)}
                  className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                    tab.current
                      ? "border-white text-white"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {tabs[0].current && (
            <div className="mt-10 divide-y divide-gray-200">
              <div className="space-y-1">
                <h3 className="text-lg font-medium leading-6 text-white">
                  Profil
                </h3>
                <p className="max-w-2xl text-sm text-white">
                  Vous pouvez modifier votre profil à tout moment depuis cette
                  page.
                </p>
              </div>
              <div className="mt-6">
                <div className="divide-y divide-gray-200">
                  <UserProfileField
                    userId={user._id}
                    model={fields.username}
                    value={user.username}
                    onChange={(value) =>
                      setUser((prevUser) => ({
                        ...prevUser,
                        username: value,
                      }))
                    }
                  />
                  <UserProfileField
                    userId={user._id}
                    model={fields.email}
                    value={user.email}
                    onChange={(value) =>
                      setUser((prevUser) => ({
                        ...prevUser,
                        email: value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {tabs[1].current && (
            <div className="mt-10 divide-y divide-gray-200">
              <div className="space-y-1">
                <h3 className="text-lg font-medium leading-6 text-white">
                  Mot de passe
                </h3>
                <p className="max-w-2xl text-sm text-white">
                  Vous pouvez modifier votre mot de passe à tout moment depuis
                  cette page.
                </p>
              </div>
              <div className="mt-6">
                <div className="divide-y divide-gray-200">
                  <UserProfilePasswordFields userId={user._id} />
                </div>
              </div>
            </div>
          )}

         
        </div>
      </div>
  );
};

export default Profile;
