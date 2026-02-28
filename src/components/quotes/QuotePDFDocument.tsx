// src\components\quotes\QuotePDFDocument.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { QuoteData } from '@/type';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  // Header Section
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#e5e5e5',
    paddingBottom: 20,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBox: {
    width: 40,
    height: 40,
    backgroundColor: '#1a1a1a',
    borderRadius: 4,
    marginRight: 12,
  },
  companyContainer: {
    flexDirection: 'column',
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    lineHeight: 1.2,
  },
  companySub: {
    fontSize: 12,
    color: '#666666',
    letterSpacing: 1,
    marginTop: 2,
  },
  quoteTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  // Meta Section
  metaSection: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  metaText: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 2,
  },
  // Client Card
  clientCard: {
    borderWidth: 2,
    borderColor: '#4f46e5',
    borderRadius: 8,
    padding: 20,
    marginBottom: 30,
  },
  clientLabel: {
    color: '#4f46e5',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 12,
    letterSpacing: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  clientDetail: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 4,
  },
  // Package Badge
  packageBadge: {
    backgroundColor: '#eef2ff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  packageText: {
    color: '#4f46e5',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Table
  table: {
    marginTop: 20,
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#e5e5e5',
    paddingBottom: 10,
    marginBottom: 10,
  },
  tableHeaderText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#666666',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    paddingVertical: 10,
  },
  roomCell: {
    flex: 3,
  },
  amountCell: {
    flex: 1,
    textAlign: 'right',
  },
  roomName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  roomItems: {
    fontSize: 9,
    color: '#666666',
    marginTop: 2,
  },
  // Totals Section
  totalsSection: {
    marginTop: 30,
    borderTopWidth: 2,
    borderTopColor: '#1a1a1a',
    paddingTop: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    fontSize: 11,
    color: '#666666',
  },
  discountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    fontSize: 11,
    color: '#dc2626',
  },
  grandTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: '#e5e5e5',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  // Footer
  footer: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 9,
    color: '#999999',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    paddingTop: 20,
  },
  footerText: {
    marginBottom: 2,
  },
});

interface QuotePDFDocumentProps {
  quote: QuoteData;
}

export const QuotePDFDocument: React.FC<QuotePDFDocumentProps> = ({ quote }) => {
  // Calculate per room amount
  const perRoomAmount = quote.rooms.length > 0 
    ? quote.estimatedTotal / quote.rooms.length 
    : 0;
  
  // Calculate discount amount
  const discountAmount = (quote.estimatedTotal * quote.discountPercent) / 100;

  // Format currency
  const formatCurrency = (amount: number): string => {
    return `$${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <View style={styles.logoBox} />
            <View style={styles.companyContainer}>
              <Text style={styles.companyName}>SURFSIDE</Text>
              <Text style={styles.companySub}>STAGING</Text>
            </View>
          </View>
          <Text style={styles.quoteTitle}>QUOTE</Text>
        </View>

        {/* Quote Meta */}
        <View style={styles.metaSection}>
          <Text style={styles.metaText}>Quote No. {quote.quoteNumber}</Text>
          <Text style={styles.metaText}>{quote.quoteDate}</Text>
        </View>

        {/* Client Information */}
        <View style={styles.clientCard}>
          <Text style={styles.clientLabel}>PREPARED FOR:</Text>
          <Text style={styles.clientName}>{quote.clientName}</Text>
          <Text style={styles.clientDetail}>{quote.clientAddress}</Text>
          <Text style={styles.clientDetail}>{quote.clientEmail}</Text>
          <Text style={styles.clientDetail}>{quote.clientPhone}</Text>
        </View>

        {/* Package (if selected) */}
        {quote.packageName && (
          <View style={styles.packageBadge}>
            <Text style={styles.packageText}>{quote.packageName}</Text>
          </View>
        )}

        {/* Rooms Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.roomCell]}>Room / Items</Text>
            <Text style={[styles.tableHeaderText, styles.amountCell]}>Amount</Text>
          </View>

          {quote.rooms.map((room, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.roomCell}>
                <Text style={styles.roomName}>{room.name}</Text>
                {room.items.length > 0 && (
                  <Text style={styles.roomItems}>{room.items.join(' • ')}</Text>
                )}
              </View>
              <Text style={styles.amountCell}>{formatCurrency(perRoomAmount)}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text>Estimated Total</Text>
            <Text>{formatCurrency(quote.estimatedTotal)}</Text>
          </View>

          {quote.discountPercent > 0 && (
            <View style={styles.discountRow}>
              <Text>Discount ({quote.discountPercent}%)</Text>
              <Text>-{formatCurrency(discountAmount)}</Text>
            </View>
          )}

          <View style={styles.grandTotal}>
            <Text>Total Amount</Text>
            <Text>{formatCurrency(quote.totalAmount)}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Thank you for choosing Surfside Staging</Text>
          <Text style={styles.footerText}>This quote is valid for 30 days from {quote.quoteDate}</Text>
        </View>
      </Page>
    </Document>
  );
};