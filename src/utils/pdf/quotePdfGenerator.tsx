// src\utils\pdf\quotePdfGenerator.tsx
import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { QuoteData } from '@/type';
import { QuotePDFDocument } from '@/components/quotes/QuotePDFDocument';

/**
 * Generate PDF blob from quote data
 */
export const generateQuotePDFBlob = async (quote: QuoteData): Promise<Blob> => {
  try {
    return await pdf(<QuotePDFDocument quote={quote} />).toBlob();
  } catch (error) {
    console.error('Error generating PDF blob:', error);
    throw new Error('Failed to generate PDF');
  }
};

/**
 * Generate PDF and trigger download
 */
export const downloadQuotePDF = async (quote: QuoteData): Promise<void> => {
  try {
    // Generate PDF blob
    const blob = await generateQuotePDFBlob(quote);
    
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Quote-${quote.quoteNumber}-${quote.clientName.replace(/\s+/g, '_')}.pdf`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Cleanup
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw new Error('Failed to download PDF');
  }
};

/**
 * Generate PDF and return as base64 string
 */
export const generateQuotePDFBase64 = async (quote: QuoteData): Promise<string> => {
  try {
    const blob = await generateQuotePDFBlob(quote);
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64String = result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error generating PDF base64:', error);
    throw new Error('Failed to generate PDF');
  }
};

/**
 * Generate PDF and get buffer (for API routes)
 */
export const generateQuotePDFBuffer = async (quote: QuoteData): Promise<Buffer> => {
  try {
    const blob = await generateQuotePDFBlob(quote);
    const arrayBuffer = await blob.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('Error generating PDF buffer:', error);
    throw new Error('Failed to generate PDF');
  }
};