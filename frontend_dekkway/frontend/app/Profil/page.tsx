"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Calendar, Pencil, Save, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null); // Pour stocker les données récupérées
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Vérification du token dans localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Si aucun token, rediriger vers la page de connexion
    } else {
      fetchUserData(token); // Récupérer les données utilisateur avec le token
    }
  }, [router]);

  // Fonction pour récupérer les données de l'utilisateur
  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profil-locataire/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        credentials: "include", // Ajouter cette ligne pour inclure les cookies
      });
      
      // Vérification des logs pour le débogage
      console.log("Token envoyé:", token);
      console.log("Authorization header:", `Token ${token}`);
      console.log("Status de la réponse:", response.status);

      if (response.ok) {
        const data = await response.json();
        setUserData(data); // Stocker les données dans le state
        setLoading(false);
      } else {
        const errorData = await response.json();
        console.error("Erreur de récupération du profil:", errorData);
        setError(errorData.error || "Une erreur est survenue.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Exception lors de la récupération du profil:", error);
      setError("Impossible de récupérer les informations.");
      setLoading(false);
    }
  };
  
  // Fonction pour télécharger une photo de profil
  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const token = localStorage.getItem("token");
    if (!token) return;
    
    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append("photo_profil", file);
      
      // Ne pas définir Content-Type manuellement pour FormData, le navigateur le fait automatiquement avec la boundary
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profil-locataire/`, {
        method: "PUT", // Utiliser PUT au lieu de PATCH pour être cohérent avec le backend
        headers: {
          Authorization: `Token ${token}`,
          // Ne pas ajouter Content-Type ici pour FormData
        },
        credentials: "include",
        body: formData,
      });
      
      console.log("Token envoyé pour upload:", token);
      console.log("Authorization header upload:", `Token ${token}`);
      console.log("Status de la réponse upload:", response.status);
      
      if (response.ok) {
        const updatedData = await response.json();
        console.log("Données reçues après upload:", updatedData);
        // Vérifier si nous avons reçu des données utilisateur valides
        if (updatedData && updatedData.user) {
          setUserData(updatedData.user); // Utiliser updatedData.user car le backend renvoie {message, user}
          toast.success("Photo de profil mise à jour avec succès");
        } else if (updatedData) {
          // Si nous recevons des données mais pas dans le format attendu, utiliser directement les données
          setUserData(updatedData);
          toast.success("Photo de profil mise à jour avec succès");
        } else {
          console.error("Format de réponse inattendu:", updatedData);
          toast.success("Photo mise à jour, actualisation nécessaire");
          // Recharger les données utilisateur pour s'assurer d'avoir les dernières informations
          fetchUserData(token);
        }
      } else {
        toast.error("Échec de la mise à jour de la photo de profil");
      }
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
      toast.error("Une erreur s'est produite lors du téléchargement");
    } finally {
      setUploading(false);
    }
  };

  // Gérer les modifications des inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Ne pas permettre la modification du nom et prénom
    if (e.target.name !== 'nom' && e.target.name !== 'prenom') {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  // Activer/Désactiver le mode édition
  const toggleEdit = () => {
    if (isEditing) {
      // Si on quitte le mode édition, on sauvegarde les modifications
      saveChanges();
    }
    setIsEditing(!isEditing);
  };
  
  // Sauvegarder les modifications
  const saveChanges = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profil-locataire/`, {
        method: "PUT", // Utiliser PUT au lieu de PATCH pour être cohérent avec le backend
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          telephone: userData.telephone,
          date_de_naissance: userData.date_de_naissance,
        }),
      });
      
      console.log("Token envoyé pour saveChanges:", token);
      console.log("Authorization header saveChanges:", `Token ${token}`);
      console.log("Status de la réponse saveChanges:", response.status);
      
      if (response.ok) {
        const updatedData = await response.json();
        // Vérifier si nous avons reçu des données utilisateur valides
        if (updatedData && updatedData.user) {
          setUserData(updatedData.user); // Utiliser updatedData.user car le backend renvoie {message, user}
          toast.success("Profil mis à jour avec succès");
        } else {
          console.error("Format de réponse inattendu:", updatedData);
          toast.success("Profil mis à jour, actualisation nécessaire");
          // Recharger les données utilisateur pour s'assurer d'avoir les dernières informations
          fetchUserData(token);
        }
      } else {
        toast.error("Échec de la mise à jour du profil");
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast.error("Une erreur s'est produite lors de la sauvegarde");
    }
  };
  
  // Ouvrir le sélecteur de fichier
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Si la page est en chargement ou si erreur, on affiche un message
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      {/* Header avec image de couverture */}
      <div className="w-full bg-[#FC9B89] h-25"></div>

      {/* Photo de profil */}
      <div className="relative -mt-16">
        <div className="relative group">
          <Image
            src={userData.photo_profil ? `${process.env.NEXT_PUBLIC_API_URL}${userData.photo_profil}` : "/images/default-profile.png"} // Ajouter l'URL complète du backend
            alt="Profil"
            width={100}
            height={100}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            onClick={triggerFileInput}
          >
            <Upload className="text-white" size={24} />
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleProfileImageUpload}
          />
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
        </div>
      </div>

      {/* Informations utilisateur */}
      <div className="text-center mt-3">

        <p className="text-gray-600 text-sm">{userData.username}</p>
        <p className="text-[#FC9B89] text-lg font-medium">Locataire</p>
      </div>

      {/* Cadre des paramètres */}
      <div className="w-full max-w-3xl mt-6 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#014F86]">Paramètres</h3>
          <button
            onClick={toggleEdit}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white bg-[#FC9B89] hover:bg-[#014F86] transition"
          >
            {isEditing ? <Save size={18} /> : <Pencil size={18} />}
            {isEditing ? "Enregistrer" : "Modifier"}
          </button>
        </div>

        <form className="space-y-6">
          {/* Nom */}
          <div className="pb-3 border-b border-gray-200">
            <label className="block text-[#014F86] font-medium mb-1">Nom</label>
            <input
              type="text"
              name="nom"
              value={userData.nom || ''}
              disabled={true}
              className="w-full bg-gray-200 border border-gray-300 rounded-lg px-4 py-2 text-gray-500"
            />
          </div>

          {/* Prénom */}
          <div className="pb-3 border-b border-gray-200">
            <label className="block text-[#014F86] font-medium mb-1">Prénom</label>
            <input
              type="text"
              name="prenom"
              value={userData.prenom || ''}
              disabled={true}
              className="w-full bg-gray-200 border border-gray-300 rounded-lg px-4 py-2 text-gray-500"
            />
          </div>

          {/* Nom d'utilisateur */}
          <div className="pb-3 border-b border-gray-200">
            <label className="block text-[#014F86] font-medium mb-1">Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              value={userData.username || ''}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full bg-red-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                isEditing ? "text-black" : "text-gray-500 bg-gray-200"
              }`}
            />
          </div>

          {/* Date de naissance */}
          <div className="pb-3 border-b border-gray-200">
            <label className="block text-[#014F86] font-medium mb-1">Date de naissance</label>
            <div className="relative">
              <input
                type="date"
                name="date_de_naissance"
                value={userData.date_de_naissance || ''}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full bg-red-50 border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  isEditing ? "text-black" : "text-gray-500 bg-gray-200"
                }`}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#014F86]" />
            </div>
          </div>

          {/* Téléphone */}
          <div className="pb-3 border-b border-gray-200">
            <label className="block text-[#014F86] font-medium mb-1">Téléphone</label>
            <input
              type="tel"
              name="telephone"
              value={userData.telephone || ''}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full bg-red-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                isEditing ? "text-black" : "text-gray-500 bg-gray-200"
              }`}
            />
          </div>

          {/* Email */}
          <div className="pb-3 border-b border-gray-200">
            <label className="block text-[#014F86] font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email || ''}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full bg-red-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                isEditing ? "text-black" : "text-gray-500 bg-gray-200"
              }`}
            />
          </div>

          {/* Mot de passe */}
          <div className="pb-3 flex justify-between items-center">
            <div>
              <label className="block text-[#014F86] font-medium mb-1">Mot de passe</label>
              <input
                type="password"
                value="••••••••"
                disabled
                className="w-full bg-blue-200 border border-gray-300 rounded-lg px-4 py-2 text-gray-500"
              />
            </div>
            <button className="text-blue-500 hover:underline">
              <Link href="/Modifier_mot_de_passe">Modifier</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
