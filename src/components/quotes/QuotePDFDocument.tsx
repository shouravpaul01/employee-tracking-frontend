import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { QuoteData } from "@/type";
import pdfLogo from '../../../public/pdfLogo.png'

// Create styles optimized for single page layout
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
    display: "flex",
    flexDirection: "column",
  },
  // Header Section
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 10,
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  companyContainer: {
    flexDirection: "column",
  },
  companyName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
    lineHeight: 1.1,
  },
  companySub: {
    fontSize: 10,
    color: "#000000",
    letterSpacing: 0.5,
    marginTop: 1,
  },
  quoteTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
  },
  // Meta Section
  metaSection: {
    alignItems: "flex-end",
    marginBottom: 12,
    fontSize: 10,
    color: "#000000",
  },
  metaText: {
    fontSize: 10,
    color: "#000000",
    marginBottom: 2,
  },
  // Client Card
 
  clientLabel: {
    color: "#000000",
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  clientName: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 3,
  },
  clientDetail: {
    fontSize: 10,
    color: "#000000",
    marginBottom: 2,
    lineHeight: 1.2,
  },
  // Package Badge
  packageBadge: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  packageText: {
    color: "#000000",
    fontSize: 11,
    fontWeight: "bold",
  },
  // Table
  table: {
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#000000",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingVertical: 6,
    marginBottom: 6,
  },
  tableHeaderText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e5e5e5",
    paddingVertical: 6,
  },
  roomCell: {
    flex: 3.5,
  },
  amountCell: {
    flex: 1,
    textAlign: "right",
  },
  roomName: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 2,
  },
  roomItems: {
    fontSize: 8,
    color: "#000000",
    marginTop: 2,
    lineHeight: 1.3,
  },
  // Totals Section
  totalsSection: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#000000",
    paddingTop: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    fontSize: 10,
    color: "#000000",
  },
  discountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    fontSize: 10,
    color: "#000000",
  },
  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#000000",
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
  },
  // Footer
  footer: {
    marginTop: "auto",
    textAlign: "center",
    fontSize: 8,
    color: "#000000",
    borderTopWidth: 0.5,
    borderTopColor: "#e5e5e5",
    paddingTop: 8,
  },
  footerText: {
    marginBottom: 2,
  },
});

interface QuotePDFDocumentProps {
  quote: QuoteData;
}

export const QuotePDFDocument: React.FC<QuotePDFDocumentProps> = ({
  quote,
}) => {
  // Calculate per room amount
  const perRoomAmount =
    quote.rooms.length > 0 ? quote.estimatedTotal / quote.rooms.length : 0;

  // Calculate discount amount
  const discountAmount = (quote.estimatedTotal * quote.discountPercent) / 100;

  // Format currency
  const formatCurrency = (amount: number): string => {
    return `$${amount.toLocaleString("en-US", {
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
            {/* Option 1: If you have the image as a public asset */}
            <Image src={"../../../public/pdfLogo.png"} style={styles.logoImage} />
            {/* 
            Option 2: If you want to use base64 encoded image instead:
            <Image
              src="data:image/png;base64,YOUR_BASE64_STRING_HERE"
              style={styles.logoImage}
            />
            
            Option 3: If you want to use a URL:
            <Image
              src="https://your-domain.com/pdfLogo.png"
              style={styles.logoImage}
            />
            */}

            <View style={styles.companyContainer}>
              <Text style={styles.companyName}>SURFSIDE</Text>
              <Text style={styles.companySub}>STAGING</Text>
            </View>
          </View>
          <Text style={styles.quoteTitle}>QUOTE</Text>
        </View>

        {/* Quote Meta */}

        {/* Client Information */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          {/* Client Card on the left */}
          <View>
            <Text style={styles.clientLabel}>PREPARED FOR:</Text>
            <Text style={styles.clientName}>{quote.clientName}</Text>
            <Text style={styles.clientDetail}>{quote.clientAddress}</Text>
            <Text style={styles.clientDetail}>{quote.clientEmail}</Text>
            <Text style={styles.clientDetail}>{quote.clientPhone}</Text>
          </View>

          {/* Meta Section on the right */}
          <View style={styles.metaSection}>
            {/* <Text style={styles.metaText}>Quote No. {quote.quoteNumber}</Text> */}
            <Text style={styles.metaText}>{quote.quoteDate}</Text>
          </View>
        </View>

        {/* Rooms Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.roomCell]}>
              {quote.packageName}
            </Text>
            <Text style={[styles.tableHeaderText, styles.amountCell]}>
              Total
            </Text>
          </View>

          {quote.rooms.map((room, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.roomCell}>
                <Text style={styles.roomName}>{room.name}</Text>
                {room.items.length > 0 && (
                  <Text style={styles.roomItems}>{room.items.join(", ")}</Text>
                )}
              </View>
              {/* <Text style={styles.amountCell}>
                {formatCurrency(perRoomAmount)}
              </Text> */}
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
            <Text>Total</Text>
            <Text>{formatCurrency(quote.totalAmount)}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Thank you for choosing Surfside Staging
          </Text>
          
        </View>
      </Page>
    </Document>
  );
};
