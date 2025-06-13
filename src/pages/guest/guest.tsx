
const Guest = () => {



  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow px-4 py-8 mt-10">
        <div className="flex">

            <div className="rounded-md flex w-1/2 justify-center items-center p-4 bg-stone-200 m-4">
                <img className="" src="https://madridtrauma.com/wp-content/uploads/2016/12/perfil-00-HomeroValencia.png" alt="" />
            </div>

            <div className="w-1/2 flex p-4 m-4 bg-stone-200 rounded-md ml-4">
              <div className="flex flex-col justify-start">
                <h1 className="font-bold text-5xl">Aprende ahora</h1>
                <p className="font-bold mt-5 text-xl">Unete hoy.</p>
              </div>
            </div>

        </div>
      </main>
    </div>
  );
};

export default Guest;
