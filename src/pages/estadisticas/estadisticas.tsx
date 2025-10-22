import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { API_URL } from "@/fetchs/api";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CharacterCount {
  personaje: string;
  cantidad: number;
}

const Estadisticas = () => {
  const [data, setData] = useState<CharacterCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/videos-por-personaje`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          throw new Error(`Error en la respuesta: ${res.status} ${res.statusText}`);
        }
        const json = await res.json();
        // Asumimos que la respuesta es un array de { personaje, cantidad }
        setData(json);
      } catch (err: any) {
        console.error("Error fetching videos-por-personaje:", err);
        setError(err.message || "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const maxCount = data.length > 0 ? Math.max(...data.map((d: CharacterCount) => d.cantidad)) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-20 px-4 pb-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Videos por personaje</CardTitle>
              <CardDescription>Métrica de cantidad de videos agrupados por personaje</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
                  <p className="text-gray-600">Cargando estadísticas...</p>
                </div>
              ) : error ? (
                <div className="text-red-600">{error}</div>
              ) : data.length === 0 ? (
                <div className="text-gray-600">No hay datos para mostrar.</div>
              ) : (
                <div className="space-y-4">
                  {/* Simple bar chart */}
                  <div className="w-full">
                    {data.map((item: CharacterCount) => {
                      const width = maxCount > 0 ? (item.cantidad / maxCount) * 100 : 0;
                      return (
                        <div key={item.personaje} className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-700">{item.personaje}</span>
                            <span className="text-sm text-gray-500">{item.cantidad}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-purple-600 h-3 rounded-full transition-width duration-300"
                              style={{ width: `${width}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-end">
                    <Button variant="outline" onClick={() => window.location.reload()}>
                      Refrescar
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tabla de resultados</CardTitle>
              <CardDescription>Listado detallado por personaje</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? null : error ? null : data.length === 0 ? (
                <div className="text-gray-600">No hay datos.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left table-auto border-collapse">
                    <thead>
                      <tr>
                        <th className="px-3 py-2 text-sm text-gray-600">Personaje</th>
                        <th className="px-3 py-2 text-sm text-gray-600">Cantidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item: CharacterCount) => (
                        <tr key={item.personaje} className="border-t">
                          <td className="px-3 py-2">{item.personaje}</td>
                          <td className="px-3 py-2">{item.cantidad}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
