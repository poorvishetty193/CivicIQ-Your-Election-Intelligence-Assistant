"use client";

import { useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import jsPDF from "jspdf";
import { event } from "@/lib/analytics";

export function VoterGuideGenerator({ state = "General U.S." }: { state?: string }) {
  const [loading, setLoading] = useState(false);

  const generatePDF = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/voter-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state })
      });
      const data = await res.json();

      // Retrieve badge count
      const badges = JSON.parse(localStorage.getItem("civiciq_badges") || "[]");
      const badgeCount = badges.length;

      const doc = new jsPDF();
      let y = 20;

      // Header
      doc.setFillColor(27, 58, 107); // #1B3A6B
      doc.rect(0, 0, 210, 40, "F");
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("CivicIQ Personalized Voter Guide", 105, 25, { align: "center" });

      // Body
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(14);
      y = 60;
      
      doc.text(`State: ${data.state}`, 20, y);
      y += 10;
      doc.setFontSize(12);
      doc.setFont("helvetica", "italic");
      doc.text(`CivicIQ Badges Earned: ${badgeCount}`, 20, y);
      y += 15;

      doc.setFont("helvetica", "bold");
      doc.text("Registration Tip:", 20, y);
      doc.setFont("helvetica", "normal");
      const tipLines = doc.splitTextToSize(data.registration_tip, 170);
      y += 7;
      doc.text(tipLines, 20, y);
      y += tipLines.length * 7 + 5;

      doc.setFont("helvetica", "bold");
      doc.text("Key Dates:", 20, y);
      doc.setFont("helvetica", "normal");
      const dateLines = doc.splitTextToSize(data.key_dates, 170);
      y += 7;
      doc.text(dateLines, 20, y);
      y += dateLines.length * 7 + 5;

      doc.setFont("helvetica", "bold");
      doc.text("Rights Summary:", 20, y);
      doc.setFont("helvetica", "normal");
      const rightsLines = doc.splitTextToSize(data.rights_summary, 170);
      y += 7;
      doc.text(rightsLines, 20, y);
      y += rightsLines.length * 7 + 15;

      doc.setFont("helvetica", "italic");
      const encouragementLines = doc.splitTextToSize(data.encouragement_message, 170);
      doc.text(encouragementLines, 105, y, { align: "center" });

      doc.save("my-voter-guide.pdf");
      event('voter_guide_downloaded', { category: 'feature', label: 'pdf' });
    } catch (e) {
      console.error(e);
      alert("Failed to generate Voter Guide.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={generatePDF} disabled={loading} className="w-full sm:w-auto" variant="secondary">
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <FileText className="w-4 h-4 mr-2" />
      )}
      {loading ? "Generating Guide..." : "Generate Voter Guide PDF"}
    </Button>
  );
}
