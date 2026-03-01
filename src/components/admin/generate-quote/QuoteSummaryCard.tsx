"use client";

import { QuoteData } from "@/type";

interface QuoteSummaryCardProps {
  quote: QuoteData;
}

export default function QuoteSummaryCard({ quote }: QuoteSummaryCardProps) {
  const perRoomAmount =
    quote.rooms.length > 0 ? quote.estimatedTotal / quote.rooms.length : 0;
  const discountAmount = (quote.estimatedTotal * quote.discountPercent) / 100;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-bold text-gray-900 text-base">
              Quote Preview
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {quote.clientAddress}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">
              Quote #{`QT-2026-${quote.quoteNumber}`}
            </p>
            <p className="text-xs text-gray-500">{quote.quoteDate}</p>
          </div>
        </div>
      </div>

      {/* Client Info */}
      <div className="px-5 py-4 border-b border-gray-100">
        <p className="font-semibold text-gray-900 text-sm">
          {quote.clientName}
        </p>
        <p className="text-xs text-gray-500 mt-1">{quote.clientAddress}</p>
        <p className="text-xs text-gray-500">{quote.clientEmail}</p>
        <p className="text-xs text-gray-500">{quote.clientPhone}</p>
      </div>

      {/* Package */}
      {quote.packageName && (
        <div className="px-5 py-3 border-b border-gray-100 bg-blue-50">
          <p className="text-xs font-medium text-blue-600">
            {quote.packageName}
          </p>
        </div>
      )}

      {/* Room Rows */}
      <div className="px-5 py-4 space-y-3 border-b border-gray-100">
        {quote.rooms.map((room) => (
          <div key={room.name} className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-700">{room.name}</span>
            <span className="text-sm text-gray-700 shrink-0">
              $
              {perRoomAmount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="px-5 py-4 space-y-2.5">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-gray-900">
            Total Amount
          </span>
          <span className="text-base font-bold text-gray-900">
            $
            {quote.totalAmount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="border-t border-gray-100 pt-2.5 space-y-1.5">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Estimated Total</span>
            <span>
              $
              {quote.estimatedTotal.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          {quote.discountPercent > 0 && (
            <div className="flex justify-between text-sm text-gray-500">
              <span>Discount ({quote.discountPercent}%)</span>
              <span>
                -$
                {discountAmount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
