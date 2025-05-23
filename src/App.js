import React, { useState, useEffect, useMemo } from "react";
import {
  Page,
  Card,
  Button,
  TextContainer,
  Banner,
  Layout,
  Text,
  Spinner,
  InlineStack,
  BlockStack,
} from '@shopify/polaris';

function App() {
  const [status, setStatus] = useState("");
  const [result, setResult] = useState(null);
  const [elapsed, setElapsed] = useState(null);
  const [bulkStatus, setBulkStatus] = useState(null);
  const [bulkStatusLoading, setBulkStatusLoading] = useState(false);
  const [enableTrackingStatus, setEnableTrackingStatus] = useState("");
  const [inventoryQtyStatus, setInventoryQtyStatus] = useState("");
  const [csvStatus, setCsvStatus] = useState("");
  const [csvResult, setCsvResult] = useState(null);
  const [updatedQtyCount, setUpdatedQtyCount] = useState(null);
  const [availableQtyStatus, setAvailableQtyStatus] = useState("");
  const [availableQtyCount, setAvailableQtyCount] = useState(null);
  const [availableQtyElapsed, setAvailableQtyElapsed] = useState(null);
  const [moreProductsStatus, setMoreProductsStatus] = useState("");
  const [moreProductsResult, setMoreProductsResult] = useState(null);
  const [cacheStatus, setCacheStatus] = useState("");
  const [priceStatus, setPriceStatus] = useState("");
  const [priceResult, setPriceResult] = useState(null);
  const [bulkPriceStatus, setBulkPriceStatus] = useState("");
  const [bulkPriceResult, setBulkPriceResult] = useState(null);

  // Log state changes
  useEffect(() => { console.log("status:", status); }, [status]);
  useEffect(() => { console.log("result:", result); }, [result]);
  useEffect(() => { console.log("elapsed:", elapsed); }, [elapsed]);
  useEffect(() => { console.log("bulkStatus:", bulkStatus); }, [bulkStatus]);
  useEffect(() => { console.log("bulkStatusLoading:", bulkStatusLoading); }, [bulkStatusLoading]);
  useEffect(() => { console.log("enableTrackingStatus:", enableTrackingStatus); }, [enableTrackingStatus]);
  useEffect(() => { console.log("inventoryQtyStatus:", inventoryQtyStatus); }, [inventoryQtyStatus]);
  useEffect(() => { console.log("csvStatus:", csvStatus); }, [csvStatus]);
  useEffect(() => { console.log("csvResult:", csvResult); }, [csvResult]);
  useEffect(() => { console.log("updatedQtyCount:", updatedQtyCount); }, [updatedQtyCount]);
  useEffect(() => { console.log("availableQtyStatus:", availableQtyStatus); }, [availableQtyStatus]);
  useEffect(() => { console.log("availableQtyCount:", availableQtyCount); }, [availableQtyCount]);
  useEffect(() => { console.log("availableQtyElapsed:", availableQtyElapsed); }, [availableQtyElapsed]);

  const handleCreateProducts = async () => {
    console.log("handleCreateProducts called");
    setStatus("Creating products...");
    setResult(null);
    setElapsed(null);
    try {
      const resp = await fetch("http://localhost:4000/create-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await resp.json();
      console.log("/create-products response:", data);
      if (data.success) {
        setStatus("Bulk operation started!");
        setResult(data.result);
      } else {
        setStatus("Error");
        setResult(data.error);
      }
    } catch (err) {
      console.error("/create-products error:", err);
      setStatus("Error");
      setResult(err.toString());
    }
  };

  const handleUpdateInventory = async () => {
    console.log("handleUpdateInventory called");
    setStatus("Updating inventory for Dummy products...");
    setResult(null);
    setElapsed(null);
    try {
      const resp = await fetch("http://localhost:4000/update-inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await resp.json();
      console.log("/update-inventory response:", data);
      if (data.success) {
        setStatus("Bulk inventory update started!");
        setResult(data.results);
        if (data.elapsedSeconds) setElapsed(data.elapsedSeconds);
      } else {
        setStatus("Error");
        setResult(data.error);
      }
    } catch (err) {
      console.error("/update-inventory error:", err);
      setStatus("Error");
      setResult(err.toString());
    }
  };

  const handleCheckBulkStatus = async () => {
    console.log("handleCheckBulkStatus called");
    setBulkStatusLoading(true);
    setBulkStatus(null);
    try {
      const resp = await fetch("http://localhost:4000/bulk-operation-status", {
        method: "GET"
      });
      const data = await resp.json();
      console.log("/bulk-operation-status response:", data);
      setBulkStatus(data);
    } catch (err) {
      console.error("/bulk-operation-status error:", err);
      setBulkStatus({ error: err.toString() });
    }
    setBulkStatusLoading(false);
  };

  const handleEnableTracking = async () => {
    console.log("handleEnableTracking called");
    setEnableTrackingStatus("Enabling tracking...");
    try {
      const resp = await fetch("http://localhost:4000/enable-tracking", { method: "POST" });
      const data = await resp.json();
      console.log("/enable-tracking response:", data);
      setEnableTrackingStatus(data.success ? `Done in ${data.elapsedSeconds}s` : `Error: ${data.error}`);
    } catch (err) {
      console.error("/enable-tracking error:", err);
      setEnableTrackingStatus("Error: " + err.toString());
    }
  };

  const handleUpdateInventoryQty = async () => {
    console.log("handleUpdateInventoryQty called");
    setInventoryQtyStatus("Updating inventory quantities...");
    setUpdatedQtyCount(null);
    try {
      const resp = await fetch("http://localhost:4000/update-inventory-quantities", { method: "POST" });
      const data = await resp.json();
      console.log("/update-inventory-quantities response:", data);
      setInventoryQtyStatus(data.success ? `Done in ${data.inventoryQuantityElapsedSeconds}s` : `Error: ${data.error}`);
      if (data.updatedCount !== undefined) setUpdatedQtyCount(data.updatedCount);
    } catch (err) {
      console.error("/update-inventory-quantities error:", err);
      setInventoryQtyStatus("Error: " + err.toString());
    }
  };

  const handleUpdateFromCsv = async () => {
    console.log("handleUpdateFromCsv called");
    setCsvStatus("Updating inventory from CSV...");
    setCsvResult(null);
    try {
      const resp = await fetch("http://localhost:4000/update-inventory-from-csv", { method: "POST" });
      const data = await resp.json();
      console.log("/update-inventory-from-csv response:", data);
      setCsvStatus(data.success ? "Done!" : `Error: ${data.error}`);
      setCsvResult(data);
    } catch (err) {
      console.error("/update-inventory-from-csv error:", err);
      setCsvStatus("Error: " + err.toString());
    }
  };

  const handleSetAvailableQuantities = async () => {
    setAvailableQtyStatus("Setting available quantities...");
    setAvailableQtyCount(null);
    setAvailableQtyElapsed(null);
    try {
      const resp = await fetch("http://localhost:4000/set-available-quantities", { method: "POST" });
      const data = await resp.json();
      setAvailableQtyStatus(data.success ? (data.elapsedSeconds ? `Done in ${data.elapsedSeconds}s` : "Done!") : `Error: ${data.error}`);
      if (data.updatedCount !== undefined) setAvailableQtyCount(data.updatedCount);
      if (data.elapsedSeconds !== undefined) setAvailableQtyElapsed(data.elapsedSeconds);
    } catch (err) {
      setAvailableQtyStatus("Error: " + err.toString());
    }
  };

  const handleCreateMoreProducts = async () => {
    setMoreProductsStatus("Creating more products...");
    setMoreProductsResult(null);
    try {
      const resp = await fetch("http://localhost:4000/create-more-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await resp.json();
      if (data.success) {
        setMoreProductsStatus(`Bulk operation started for Dummy Product ${data.range.startNum} to ${data.range.endNum}!`);
        setMoreProductsResult(data.result);
      } else {
        setMoreProductsStatus("Error");
        setMoreProductsResult(data.error);
      }
    } catch (err) {
      setMoreProductsStatus("Error");
      setMoreProductsResult(err.toString());
    }
  };

  const handleRefreshCache = async () => {
    setCacheStatus("Refreshing inventory cache...");
    try {
      const resp = await fetch("http://localhost:4000/refresh-inventory-cache", { method: "POST" });
      const data = await resp.json();
      if (data.success) {
        setCacheStatus(`Cache refreshed: ${data.count} products`);
      } else {
        setCacheStatus("Error: " + data.error);
      }
    } catch (err) {
      setCacheStatus("Error: " + err.toString());
    }
  };

  const handleUpdatePrices = async () => {
    setPriceStatus("Updating all Dummy Product prices to 100...");
    setPriceResult(null);
    try {
      const resp = await fetch("http://localhost:4000/update-prices", { method: "POST" });
      const data = await resp.json();
      if (data.success) {
        setPriceStatus(`Updated ${data.updatedVariants} variants in ${data.batchCount} batches.`);
        setPriceResult(data.results);
      } else {
        setPriceStatus("Error: " + data.error);
      }
    } catch (err) {
      setPriceStatus("Error: " + err.toString());
    }
  };

  const handleUpdatePricesBulk = async () => {
    setBulkPriceStatus("Starting ultra-fast bulk price update...");
    setBulkPriceResult(null);
    try {
      const resp = await fetch("http://localhost:4000/update-prices-bulk", { method: "POST" });
      const data = await resp.json();
      if (data.success) {
        setBulkPriceStatus(`Bulk operation started! ID: ${data.bulkOperationId}, updating ${data.variantCount} variants.`);
        setBulkPriceResult(data);
      } else {
        setBulkPriceStatus("Error: " + data.error);
      }
    } catch (err) {
      setBulkPriceStatus("Error: " + err.toString());
    }
  };

  // Calculate theoretical times for 1M, 2M, 3M items
  const theoreticalTable = useMemo(() => {
    if (!updatedQtyCount || !inventoryQtyStatus || !inventoryQtyStatus.includes('Done in')) return null;
    // Extract seconds from status string
    const match = inventoryQtyStatus.match(/Done in ([\d.]+)s/);
    if (!match) return null;
    const seconds = parseFloat(match[1]);
    const items = updatedQtyCount;
    if (!items || !seconds) return null;
    const perItem = seconds / items;
    const calc = (n) => (perItem * n);
    const formatMinSec = (s) => {
      const min = Math.floor(s / 60);
      const sec = Math.round(s % 60);
      return `${min}m ${sec.toString().padStart(2, '0')}s`;
    };
    return [
      { label: '1,000,000', time: calc(1_000_000).toFixed(2), minsec: formatMinSec(calc(1_000_000)) },
      { label: '2,000,000', time: calc(2_000_000).toFixed(2), minsec: formatMinSec(calc(2_000_000)) },
      { label: '3,000,000', time: calc(3_000_000).toFixed(2), minsec: formatMinSec(calc(3_000_000)) },
    ];
  }, [updatedQtyCount, inventoryQtyStatus]);

  // Calculate theoretical times for 1M, 2M, 3M items for set available quantities
  const availableQtyTheoreticalTable = useMemo(() => {
    if (!availableQtyCount || !availableQtyStatus || !availableQtyStatus.includes('Done in')) return null;
    const match = availableQtyStatus.match(/Done in ([\d.]+)s/);
    if (!match) return null;
    const seconds = parseFloat(match[1]);
    const items = availableQtyCount;
    if (!items || !seconds) return null;
    const perItem = seconds / items;
    const calc = (n) => (perItem * n);
    const formatMinSec = (s) => {
      const min = Math.floor(s / 60);
      const sec = Math.round(s % 60);
      return `${min}m ${sec.toString().padStart(2, '0')}s`;
    };
    return [
      { label: '1,000,000', time: calc(1_000_000).toFixed(2), minsec: formatMinSec(calc(1_000_000)) },
      { label: '2,000,000', time: calc(2_000_000).toFixed(2), minsec: formatMinSec(calc(2_000_000)) },
      { label: '3,000,000', time: calc(3_000_000).toFixed(2), minsec: formatMinSec(calc(3_000_000)) },
    ];
  }, [availableQtyCount, availableQtyStatus]);

  return (
    <Page title="Shopify Bulk Product Tool">
      <BlockStack gap="600">
        {/* Product Actions Section */}
        <Card>
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">Product Actions</Text>
            <InlineStack gap="400">
              <Button primary onClick={handleCreateProducts}>Create 30,000 Dummy Products</Button>
              <Button onClick={handleCreateMoreProducts}>Add 30,000 More Dummy Products</Button>
              <Button onClick={handleCheckBulkStatus}>Check Bulk Operation Status</Button>
              <Button onClick={handleRefreshCache}>Refresh Inventory Cache</Button>
            </InlineStack>
            {cacheStatus && <Text variant="bodyMd" as="span">{cacheStatus}</Text>}
            {moreProductsStatus && <Text variant="bodyMd" as="span">{moreProductsStatus}</Text>}
            {moreProductsResult && (
              <Banner status="info" title="Create More Products Result">
                <pre style={{ background: "#eef", padding: 10, marginTop: 10 }}>
                  {JSON.stringify(moreProductsResult, null, 2)}
                </pre>
              </Banner>
            )}
          </BlockStack>
        </Card>

        {/* Inventory Actions Section */}
        <Card>
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">Inventory Actions</Text>
            <InlineStack gap="400">
              <Button onClick={handleUpdateInventory}>Update Dummy Product Inventory to 5</Button>
              <Button onClick={handleEnableTracking}>Enable Inventory Tracking (Step 1)</Button>
              <Button onClick={handleUpdateInventoryQty}>Update Inventory OnHand Quantities (Step 2)</Button>
              <Button onClick={handleSetAvailableQuantities}>Set Available Quantities</Button>
              <Button onClick={handleUpdateFromCsv}>Update Inventory from CSV</Button>
           
            </InlineStack>
            {/* Inventory Feedback */}
            <BlockStack gap="200">
              {enableTrackingStatus && <Text variant="bodyMd" as="span">{enableTrackingStatus}</Text>}
              {inventoryQtyStatus && (
                <Text variant="bodyMd" as="span">
                  {inventoryQtyStatus}
                  {updatedQtyCount !== null && (
                    <span style={{ marginLeft: 16 }}><strong>Items Updated:</strong> {updatedQtyCount}</span>
                  )}
                </Text>
              )}
              {csvStatus && <Text variant="bodyMd" as="span">{csvStatus}</Text>}
              {csvResult && (
                <Banner status="info" title="CSV Update Result">
                  <pre style={{ background: "#eef", padding: 10, marginTop: 10 }}>
                    {JSON.stringify(csvResult, null, 2)}
                  </pre>
                </Banner>
              )}
              {availableQtyStatus && (
                <Text variant="bodyMd" as="span">
                  {availableQtyStatus}
                  {availableQtyCount !== null && (
                    <span style={{ marginLeft: 16 }}><strong>Items Updated:</strong> {availableQtyCount}</span>
                  )}
                  {availableQtyElapsed && (
                    <span style={{ marginLeft: 16 }}><strong>Elapsed:</strong> {availableQtyElapsed}s</span>
                  )}
                </Text>
              )}
              {priceStatus && <Text variant="bodyMd" as="span">{priceStatus}</Text>}
              {priceResult && (
                <Banner status="info" title="Update Prices Result">
                  <pre style={{ background: "#eef", padding: 10, marginTop: 10, maxHeight: 300, overflow: 'auto' }}>
                    {JSON.stringify(priceResult, null, 2)}
                  </pre>
                </Banner>
              )}
              {bulkPriceStatus && <Text variant="bodyMd" as="span">{bulkPriceStatus}</Text>}
              {bulkPriceResult && (
                <Banner status="info" title="Bulk Price Update Result">
                  <pre style={{ background: "#eef", padding: 10, marginTop: 10, maxHeight: 300, overflow: 'auto' }}>
                    {JSON.stringify(bulkPriceResult, null, 2)}
                  </pre>
                </Banner>
              )}
            </BlockStack>
          </BlockStack>
        </Card>

        {/* Status & Results Section */}
        <Card>
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">Status & Results</Text>
            {status && <Text variant="bodyMd" as="p">{status}</Text>}
            {elapsed && (
              <Text variant="bodyMd" as="p">
                <strong>Elapsed Time:</strong> {elapsed} seconds
              </Text>
            )}
            {result && (
              <Banner status="info" title="Operation Result">
                <pre style={{ background: "#eef", padding: 10, marginTop: 10 }}>
                  {JSON.stringify(result, null, 2)}
                </pre>
              </Banner>
            )}
            {bulkStatusLoading && <Spinner accessibilityLabel="Loading bulk operation status" size="small" />}
            {bulkStatus && (
              <Banner status="info" title="Bulk Operation Status">
                <pre style={{ background: "#eef", padding: 10, marginTop: 10 }}>
                  {JSON.stringify(bulkStatus, null, 2)}
                </pre>
              </Banner>
            )}
            {/* Theoretical Table */}
            {theoreticalTable && (
              <Card>
                <Text variant="headingSm" as="h3">
                  Theoretical Time to Update Inventory Quantities
                </Text>
                <table style={{ width: '100%', marginTop: 12, background: '#f9f9f9', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>Items</th>
                      <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>Estimated Time (seconds)</th>
                      <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>Estimated Time (min:sec)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {theoreticalTable.map(row => (
                      <tr key={row.label}>
                        <td style={{ padding: 8 }}>{row.label}</td>
                        <td style={{ padding: 8 }}>{row.time}</td>
                        <td style={{ padding: 8 }}>{row.minsec}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            )}
            {availableQtyTheoreticalTable && (
              <Card>
                <Text variant="headingSm" as="h3">
                  Theoretical Time to Set Available Quantities
                </Text>
                <table style={{ width: '100%', marginTop: 12, background: '#f9f9f9', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>Items</th>
                      <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>Estimated Time (seconds)</th>
                      <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>Estimated Time (min:sec)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availableQtyTheoreticalTable.map(row => (
                      <tr key={row.label}>
                        <td style={{ padding: 8 }}>{row.label}</td>
                        <td style={{ padding: 8 }}>{row.time}</td>
                        <td style={{ padding: 8 }}>{row.minsec}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            )}
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}

export default App; 