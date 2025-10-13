import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AI_FaceScanning = () => {
  const [progress, setProgress] = useState(0);
  const [faceAligned, setFaceAligned] = useState(false);
  const [captured, setCaptured] = useState(false); // 🔹 To prevent multiple triggers
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const CIRCLE_SIZE = 305;
  const ALIGN_OFFSET = 0.99;

  const warningAudio = useRef(new Audio("/sounds/warning.mp3"));
  const scanningAudio = useRef(new Audio("/sounds/scanning.mp3"));
  const successAudio = useRef(new Audio("/sounds/success.mp3"));

  // Start camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    };
    startCamera();
  }, []);

  // Face detection + sound feedback
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!videoRef.current || captured) return; // stop detecting after success

      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const base64Image = canvas.toDataURL("image/jpeg");

      try {
        const response = await fetch("http://localhost:5000/detect_face", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image }),
        });

        const data = await response.json();

        if (data && data.face) {
          const box = data.face;
          const circleCenterX = canvas.width / 2;
          const circleCenterY = canvas.height / 2;
          const offsetX = ALIGN_OFFSET * CIRCLE_SIZE;
          const offsetY = ALIGN_OFFSET * CIRCLE_SIZE;

          const aligned =
            Math.abs(box.x + box.width / 2 - circleCenterX) < offsetX &&
            Math.abs(box.y + box.height / 2 - circleCenterY) < offsetY &&
            box.width > 0.4 * CIRCLE_SIZE &&
            box.width < 0.9 * CIRCLE_SIZE;

          setFaceAligned(aligned);

          // 🔊 Play sound only while aligning
          if (!captured) {
            if (aligned) {
              if (scanningAudio.current.paused) scanningAudio.current.play();
              if (!warningAudio.current.paused) warningAudio.current.pause();
            } else {
              if (warningAudio.current.paused) warningAudio.current.play();
              if (!scanningAudio.current.paused) scanningAudio.current.pause();
            }
          }
        } else {
          setFaceAligned(false);
          if (!captured) {
            if (warningAudio.current.paused) warningAudio.current.play();
            if (!scanningAudio.current.paused) scanningAudio.current.pause();
          }
        }
      } catch (err) {
        console.error("Face detection API error:", err);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [captured]);

  // Handle progress + capture logic
  useEffect(() => {
    if (captured) return; // already done

    if (faceAligned && progress < 100) {
      const timer = setTimeout(() => setProgress((p) => p + 2), 25);
      return () => clearTimeout(timer);
    } else if (progress >= 100 && !captured) {
      setCaptured(true); // 🔹 Mark as done

      // 🛑 Stop scanning + warning sounds
      scanningAudio.current.pause();
      warningAudio.current.pause();
      scanningAudio.current.currentTime = 0;
      warningAudio.current.currentTime = 0;

      // ✅ Play success sound instantly
      successAudio.current.play();

      // 🧠 Stop camera
      const stream = videoRef.current?.srcObject;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }

      // 📸 Capture final photo
      if (videoRef.current) {
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const base64Image = canvas.toDataURL("image/jpeg");

        fetch("http://localhost:5000/save_capture", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image }),
        });
      }

      // ⏳ Navigate after short delay (after success sound)
      setTimeout(() => navigate("/success"), 1200);
    }
  }, [faceAligned, progress, captured, navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#0d152b",
      }}
    >
      <div
        style={{
          background: "#232b47",
          borderRadius: 20,
          width: 350,
          height: 650,
          padding: 32,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 0 24px #0006",
        }}
      >
        <div
          style={{
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            overflow: "hidden",
            border: `4px solid ${faceAligned ? "#00ff90" : "#ff3b3b"}`,
            boxShadow: faceAligned
              ? "0 0 35px 8px rgba(0,255,144,0.5)"
              : "0 0 25px 6px rgba(255,59,59,0.4)",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scaleX(-1)",
            }}
          />
        </div>

        {/* Progress Bar */}
        <div style={{ width: "100%", marginTop: 20 }}>
          <div
            style={{
              background: "#2d3757",
              borderRadius: 8,
              height: 18,
              marginBottom: 12,
              width: "90%",
              marginLeft: "5%",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: faceAligned
                  ? "linear-gradient(90deg, #45c6ff 0%, #38a0f1 100%)"
                  : "#666",
                width: `${progress}%`,
                height: "100%",
                transition: "width 0.3s",
              }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              color: "#45c6ff",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            {progress}%
            <br />
            <span
              style={{
                fontWeight: 500,
                color: faceAligned ? "#b8f8d0" : "#ffbdbd",
                fontSize: 15,
              }}
            >
              {faceAligned ? "Scanning in progress..." : "Align your face properly"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI_FaceScanning;
