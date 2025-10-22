import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { API_URL } from "@/fetchs/api";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface CountItem {
  label: string;
  cantidad: number;
}

const Estadisticas = () => {
  // Estados para cada endpoint
  const [porPersonaje, setPorPersonaje] = useState<CountItem[]>([]);
  const [porIdioma, setPorIdioma] = useState<CountItem[]>([]);
  const [porGameplay, setPorGameplay] = useState<CountItem[]>([]);
  const [promedioPorUsuario, setPromedioPorUsuario] = useState<number | null>(null);
  const [rangoInicio, setRangoInicio] = useState<string>("");
  const [rangoFin, setRangoFin] = useState<string>("");
  const [cantidadRango, setCantidadRango] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch para los endpoints GET
  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [res1, res2, res3, res4] = await Promise.all([
          fetch(`${API_URL}/videos-por-personaje`, { method: "GET", headers:{ "Content-Type":"application/json"} }),
          fetch(`${API_URL}/videos-por-idioma`, { method: "GET", headers:{ "Content-Type":"application/json"} }),
          fetch(`${API_URL}/videos-por-gameplay`, { method: "GET", headers:{ "Content-Type":"application/json"} }),
          fetch(`${API_URL}/promedio-videos-por-usuario`, { method: "GET", headers:{ "Content-Type":"application/json"} }),
        ]);

        if (!res1.ok || !res2.ok || !res3.ok || !res4.ok) {
          throw new Error(`Uno de los endpoints devolvió error`);
        }

        const json1 = await res1.json();
        const json2 = await res2.json();
        const json3 = await res3.json();
        const json4 = await res4.json();

        const norm1: CountItem[] = (json1.data ?? []).map((item: any) => ({
          label: String(item._id ?? "Desconocido"),
          cantidad: Number(item.cantidad ?? 0),
        }));
        const norm2: CountItem[] = (json2.data ?? []).map((item: any) => ({
          label: String(item._id ?? "Desconocido"),
          cantidad: Number(item.cantidad ?? 0),
        }));
        const norm3: CountItem[] = (json3.data ?? []).map((item: any) => ({
          label: String(item._id ?? "Desconocido"),
          cantidad: Number(item.cantidad ?? 0),
        }));

        setPorPersonaje(norm1.sort((a,b)=>b.cantidad - a.cantidad));
        setPorIdioma(norm2.sort((a,b)=>b.cantidad - a.cantidad));
        setPorGameplay(norm3.sort((a,b)=>b.cantidad - a.cantidad));

        const prom = Number(json4.promedio_videos_por_usuario ?? 0);
        setPromedioPorUsuario(prom);

      } catch(err: any) {
        console.error("Error fetching estadísticas:", err);
        setError(err.message || "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Handler para el POST de rango de tiempo
  const handleRangoSubmit = async () => {
    if (!rangoInicio || !rangoFin) {
      alert("Por favor selecciona ambas fechas de inicio y fin");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/videos-por-rango-tiempo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fecha_inicio: rangoInicio,
          fecha_fin: rangoFin,
        }),
      });
      if (!res.ok) {
        throw new Error(`Error al consultar rango: ${res.status}`);
      }
      const json = await res.json();
      const cantidad = Number(json.cantidad_videos ?? 0);
      setCantidadRango(cantidad);
    } catch(err: any) {
      console.error("Error rango de tiempo:", err);
      alert("Error al consultar el rango de tiempo");
    }
  };

  // Funcion para calcular maxCount para barra
  const computeMax = (arr: CountItem[]) => arr.length > 0 ? Math.max(...arr.map(d=>d.cantidad)) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-20 px-4 pb-8 max-w-6xl mx-auto space-y-8">
        {/* Promedio por usuario */}
        <Card>
          <CardHeader>
            <CardTitle>Promedio de videos por usuario</CardTitle>
            <CardDescription>
              Muestra el promedio de cantidad de videos creados por cada usuario
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">Cargando...</div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : (
              <div className="text-3xl font-bold text-center">
                {promedioPorUsuario?.toFixed(2) ?? "0.00"}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Videos por personaje */}
          <Card>
            <CardHeader>
              <CardTitle>Videos por personaje</CardTitle>
              <CardDescription>
                Cantidad de videos agrupados por personaje
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
                  <p className="text-gray-600">Cargando...</p>
                </div>
              ) : error ? (
                <div className="text-red-600">{error}</div>
              ) : porPersonaje.length === 0 ? (
                <div className="text-gray-600">No hay datos.</div>
              ) : (
                <div className="space-y-4">
                  {porPersonaje.map(item => {
                    const maxCount = computeMax(porPersonaje);
                    const width = maxCount > 0 ? (item.cantidad / maxCount) * 100 : 0;
                    return (
                      <div key={item.label} className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-700">{item.label}</span>
                          <span className="text-sm text-gray-500">{item.cantidad}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-purple-600 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${width}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex justify-end">
                    
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Videos por idioma */}
          <Card>
            <CardHeader>
              <CardTitle>Videos por idioma</CardTitle>
              <CardDescription>
                Agrupados por idioma
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
                  <p className="text-gray-600">Cargando...</p>
                </div>
              ) : error ? (
                <div className="text-red-600">{error}</div>
              ) : porIdioma.length === 0 ? (
                <div className="text-gray-600">No hay datos.</div>
              ) : (
                <div className="space-y-4">
                  {porIdioma.map(item => {
                    const maxCount = computeMax(porIdioma);
                    const width = maxCount > 0 ? (item.cantidad / maxCount) * 100 : 0;
                    return (
                      <div key={item.label} className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-700">{item.label}</span>
                          <span className="text-sm text-gray-500">{item.cantidad}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${width}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Videos por gameplay */}
          <Card>
            <CardHeader>
              <CardTitle>Videos por gameplay</CardTitle>
              <CardDescription>
                Agrupados por nombre de gameplay
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
                  <p className="text-gray-600">Cargando...</p>
                </div>
              ) : error ? (
                <div className="text-red-600">{error}</div>
              ) : porGameplay.length === 0 ? (
                <div className="text-gray-600">No hay datos.</div>
              ) : (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left table-auto border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="px-3 py-2 text-sm text-gray-600">Gameplay</th>
                          <th className="px-3 py-2 text-sm text-gray-600">Cantidad</th>
                        </tr>
                      </thead>
                      <tbody>
                        {porGameplay.map(item => (
                          <tr key={item.label} className="border-t">
                            <td className="px-3 py-2">{item.label}</td>
                            <td className="px-3 py-2">{item.cantidad}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-end">
                    
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Estadisticas;
