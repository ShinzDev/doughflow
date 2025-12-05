import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles (Like CSS, but for PDF)
const styles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 30 },
  header: { marginBottom: 20, borderBottom: '1pt solid #EEE', paddingBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111' },
  subtitle: { fontSize: 12, color: '#666', marginTop: 5 },
  
  table: { display: "table", width: "auto", marginTop: 20, borderStyle: "solid", borderColor: "#bfbfbf", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableColHeader: { width: "25%", borderStyle: "solid", borderColor: "#bfbfbf", borderBottomColor: "#000", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, backgroundColor: '#f0f0f0' },
  tableCol: { width: "25%", borderStyle: "solid", borderColor: "#bfbfbf", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
  tableCellHeader: { margin: 5, fontSize: 10, fontWeight: 'bold' },
  tableCell: { margin: 5, fontSize: 10 },

  totalsSection: { marginTop: 30, alignItems: 'flex-end' },
  totalRow: { flexDirection: 'row', marginBottom: 5 },
  totalLabel: { width: 150, fontSize: 12, textAlign: 'right', paddingRight: 10 },
  totalValue: { width: 100, fontSize: 12, fontWeight: 'bold', textAlign: 'right' },
  
  grandTotal: { marginTop: 10, borderTop: '2pt solid #000', paddingTop: 10 },
  grandTotalText: { fontSize: 16, fontWeight: 'bold', color: '#0066CC' }
});

// The Component
const InvoicePDF = ({ rows, totals, prices }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* 1. Header */}
      <View style={styles.header}>
        <Text style={styles.title}>HOSPITAL BREAD INVOICE</Text>
        <Text style={styles.subtitle}>Generated on: {new Date().toLocaleDateString()}</Text>
      </View>

      {/* 2. The Table */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Date</Text></View>
          <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Big Loaves</Text></View>
          <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Small Loaves</Text></View>
          <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Daily Total</Text></View>
        </View>

        {/* Table Rows (Iterate through data) */}
        {rows.map((row) => {
           const dailyTotal = (row.big * prices.big) + (row.small * prices.small);
           return (
            <View style={styles.tableRow} key={row.id}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{row.date}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{row.big}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{row.small}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>N {dailyTotal.toLocaleString()}</Text></View>
            </View>
           );
        })}
      </View>

      {/* 3. The Totals Section */}
      <View style={styles.totalsSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Big Loaves:</Text>
          <Text style={styles.totalValue}>{totals.totalBig}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Small Loaves:</Text>
          <Text style={styles.totalValue}>{totals.totalSmall}</Text>
        </View>
        
        <View style={[styles.totalRow, styles.grandTotal]}>
           <Text style={[styles.totalLabel, styles.grandTotalText]}>TOTAL DUE:</Text>
           <Text style={[styles.totalValue, styles.grandTotalText]}>N {totals.chargeClient.toLocaleString()}</Text>
        </View>
      </View>

      <Text style={{ position: 'absolute', bottom: 30, left: 30, fontSize: 10, color: '#999' }}>
        Thank you for your business.
      </Text>

    </Page>
  </Document>
);

export default InvoicePDF;