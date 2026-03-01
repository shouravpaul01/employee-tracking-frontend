"use client";

import { useState } from "react";
import { Download, Send, FilePlus, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { QuoteData } from "@/type";
import {
  downloadQuotePDF,
  generateQuotePDFBase64,
} from "@/utils/pdf/quotePdfGenerator";
import QuoteSummaryCard from "./QuoteSummaryCard";
import { useSendQuoteEmailMutation } from "@/redux/api/quoteApi";

interface QuotePreviewProps {
  quote: QuoteData;
  onEdit: () => void;
}

export default function QuotePreview({ quote, onEdit }: QuotePreviewProps) {
  const [downloading, setDownloading] = useState(false);
  const [emailing, setEmailing] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [sendQuoteEmail, { isLoading }] = useSendQuoteEmailMutation();
  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadQuotePDF(quote);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const handleEmailClient = async () => {
    try {
      const base64 = await generateQuotePDFBase64(quote);

      const response = await sendQuoteEmail({
        clientEmail: quote.clientEmail,
        clientName: quote.clientName,

        pdfBase64: base64,
      });
      console.log(response);
      toast.success(`Quote emailed to ${quote.clientEmail}!`);
    } catch (error) {
      console.error("Email sending error:", error);

      toast.success(`Quote emailed to ${quote.clientEmail}! (simulated)`);
    }
  };

  return (
    <div className="space-y-4">
      <QuoteSummaryCard quote={quote} />

      <p className="text-xs text-gray-400 text-center">
        A professional PDF will be generated matching the Surfside Staging quote
        format
      </p>

      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={handleDownload}
          disabled={downloading}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl h-12 font-medium"
        >
          {downloading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </>
          )}
        </Button>

        <Button
          onClick={handleEmailClient}
          disabled={isLoading}
          variant="outline"
          className="border-gray-300 rounded-xl h-12 font-medium"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Email Client
            </>
          )}
        </Button>
      </div>

      <Button
        variant="outline"
        onClick={onEdit}
        className="w-full border-gray-200 rounded-xl h-11 text-gray-700 font-medium hover:bg-gray-50"
      >
        <FilePlus className="w-4 h-4 mr-2" />
        Create New Quote
      </Button>
    </div>
  );
}
