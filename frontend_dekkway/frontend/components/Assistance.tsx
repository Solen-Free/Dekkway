"use client";

import { Send, Mic, Volume2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { FaRedo } from "react-icons/fa";
import { motion } from "framer-motion"; // Import de Framer Motion

const Assistance = () => {
  const [message, setMessage] = useState<string>("");
  const [responses, setResponses] = useState<{ text: string, sender: string }[]>([
    { text: "Bonjour, comment puis-je vous aider ?", sender: "IA" },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioMessage, setAudioMessage] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState<boolean>(false); // État pour gérer l'animation

  // Références avec les types appropriés
  const mediaRecorder = useRef<MediaRecorder | null>(null); // Typage pour MediaRecorder
  const audioChunks = useRef<Blob[]>([]); // Typage pour les morceaux audio

  // Fonction pour commencer l'enregistrement de l'audio
  const startRecording = () => {
    if (!navigator.mediaDevices) {
      alert("Désolé, votre navigateur ne supporte pas les enregistrements audio.");
      return;
    }
    setIsRecording(true);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        if (mediaRecorder.current) {
          mediaRecorder.current = new MediaRecorder(stream);
          mediaRecorder.current.ondataavailable = (event: BlobEvent) => {
            audioChunks.current.push(event.data);
          };
          mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioMessage(audioUrl); // On peut éventuellement envoyer l'URL ou le blob au serveur

            // Envoi de l'audio au serveur
            sendAudioToServer(audioBlob);
          };
          mediaRecorder.current.start();
        }
      })
      .catch((err) => {
        alert("Erreur d'enregistrement audio : " + err.message);
      });
  };

  // Fonction pour arrêter l'enregistrement de l'audio
  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
    }
  };

  // Fonction pour envoyer l'audio au serveur
  const sendAudioToServer = (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.wav");

    fetch("/api/uploadAudio", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Audio envoyé avec succès", data);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de l'audio", error);
      });
  };

  // Fonction pour envoyer le message texte
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newResponse = { text: message, sender: "user" };
    setResponses([...responses, newResponse]);
    setMessage("");
    setLoading(true);

    try {
      // const res = await fetch("/api/askAI", {
      const res = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      const aiResponse = { text: data.reply, sender: "IA" };
      setResponses([...responses, newResponse, aiResponse]);

      // Sauvegarde la conversation dans le localStorage
      localStorage.setItem("conversation", JSON.stringify([...responses, newResponse, aiResponse]));
    } catch (error) {
      setResponses([...responses, { text: "❌ Erreur de l'IA", sender: "IA" }]);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour lire le texte de la réponse
  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  // Fonction de réinitialisation
  const resetConversation = () => {
    setResponses([{ text: "Bonjour, comment puis-je vous aider ?", sender: "IA" }]);
    localStorage.removeItem("conversation");
  };

  // Fonction pour déclencher l'animation
  const handleAIClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000); // Désactive l'animation après 1 seconde
  };

  // Charger la conversation depuis le localStorage au chargement de la page
  useEffect(() => {
    const savedConversation = localStorage.getItem("conversation");
    if (savedConversation) {
      setResponses(JSON.parse(savedConversation));
    }
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center bg-white p-2 sm:p-4">
      <div className="w-full max-w-4xl bg-gray-100 shadow-lg rounded-lg overflow-hidden">
        {/* En-tête avec animation */}
        <div className="w-full bg-red-300 py-4 flex items-center px-4 sm:px-6">
          <motion.div
            className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-800 rounded-full flex items-center justify-center text-white text-lg font-bold cursor-pointer"
            onClick={handleAIClick}
            animate={{
              scale: isAnimating ? [1, 1.2, 1] : 1, // Animation de zoom
              rotate: isAnimating ? [0, 360] : 0, // Animation de rotation
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            IA
          </motion.div>
          <span className="text-white text-lg font-semibold ml-4">Assistant IA</span>
        </div>

        {/* Zone de conversation */}
        <div className="flex flex-col p-4 space-y-3 h-[calc(100vh-200px)] sm:h-[calc(100vh-250px)] overflow-y-auto">
          {responses.map((res, index) => (
            <div key={index} className={`flex items-center ${res.sender === "user" ? "justify-end" : "justify-start"}`}>
              {res.sender === "IA" && (
                <button onClick={() => handleSpeak(res.text)} className="mr-2 text-gray-500">
                  <Volume2 size={18} />
                </button>
              )}
              <div className={`px-4 py-2 rounded-full border border-red-300 max-w-xs sm:max-w-md ${res.sender === "user" ? "bg-red-300 text-white" : "bg-white"}`}>
                {res.text}
              </div>
            </div>
          ))}
          {loading && <div className="text-gray-500"> L'IA réfléchit...</div>}
        </div>

        {/* Zone de saisie */}
        <div className="w-full border-t border-red-300 px-4 py-3 flex items-center space-x-2">
          <button onClick={isRecording ? stopRecording : startRecording} className="text-gray-500">
            <Mic size={20} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 outline-none text-gray-700 bg-white px-2 py-2 rounded-full border border-red-300"
            placeholder="Écrivez un message..."
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} // Envoi au serveur avec la touche "Entrée"
          />
          <button onClick={handleSendMessage} className="p-2 bg-red-300 rounded-full text-white">
            <Send size={20} />
          </button>
          <button onClick={resetConversation} className="ml-2 p-2 bg-[#014F86] rounded-full text-white">
            <FaRedo size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assistance;