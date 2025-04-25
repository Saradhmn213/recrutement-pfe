import { useRouteError } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <DefaultLayout>
      <section className="flex items-center h-lvh p-16 dark:bg-gray-50 dark:text-gray-800 items-center bg-bleu ">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
              <span className="sr-only">Error</span>
              <span className="text-white">4</span>04
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">
              Désolée, cette page est introuvable.
            </p>
         
            
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}