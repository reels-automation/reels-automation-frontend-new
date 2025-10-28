    import React, { useEffect, useState } from 'react';
    import Navbar from '../../components/navbar/navbar';
    import { API_URL } from '@/fetchs/api';

interface VideoStatus {
  usuario: string | number;
  tema: string;
  status: 'IN PROGRESS' | 'COMPLETED' | string;
  [key: string]: any; // otros posibles campos
}

const statusStyles: Record<string, string> = {
  'IN PROGRESS': 'bg-yellow-200',
  'COMPLETED': 'bg-green-200',
};

const VideosStatus: React.FC = () => {
  const [videos, setVideos] = useState<Array<{ key: string; value: VideoStatus }>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`${API_URL}/get-videos-status`);
        if (!res.ok) throw new Error('Error al obtener los videos');
        const data = await res.json();
        console.log('Respuesta de /get-videos-status:', data);
        // Esperado: array de {key, value}
        if (Array.isArray(data) && data.length > 0 && data[0].value !== undefined) {
          setVideos(data);
        } else {
          setVideos([]);
        }
      } catch (err: any) {
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-24 pb-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Estado de los Videos</h1>
        {loading ? (
          <div className="text-center text-gray-600">Cargando videos...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : videos.length === 0 ? (
          <div className="text-center text-gray-600">No se encontraron videos.</div>
        ) : (
          <table className="w-full border-collapse bg-white shadow rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Usuario</th>
                <th className="border p-2">Tema</th>
                <th className="border p-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((videoObj) => {
                const { key, value: video } = videoObj;
                const bgColor = statusStyles[video.status] || 'bg-gray-100';
                let statusLabel = video.status;
                if (video.status === 'IN PROGRESS') statusLabel = 'Cargando';
                else if (video.status === 'COMPLETED') statusLabel = 'Completado';
                return (
                  <tr key={key} className={`${bgColor} text-center`}>
                    <td className="border p-2">{video.usuario}</td>
                    <td className="border p-2">{video.tema}</td>
                    <td className="border p-2 font-semibold">{statusLabel}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default VideosStatus;
