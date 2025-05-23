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

// API Configuration
const API_BASE_URL = "http://localhost:4000";

// API Service
const apiService = {
  // Product endpoints
  products: {
    create: () => fetch(`${API_BASE_URL}/products/create`, { method: "POST", headers: { "Content-Type": "application/json" } }),
    createMore: () => fetch(`${API_BASE_URL}/products/create-more`, { method: "POST", headers: { "Content-Type": "application/json" } }),
    getBulkStatus: () => fetch(`${API_BASE_URL}/products/bulk-operation-status`),
  },
  
  // Inventory endpoints
  inventory: {
    refreshCache: () => fetch(`${API_BASE_URL}/inventory/refresh-cache`, { method: "POST" }),
    enableTracking: () => fetch(`${API_BASE_URL}/inventory/enable-tracking`, { method: "POST" }),
    updateQuantities: () => fetch(`${API_BASE_URL}/inventory/update-quantities`, { method: "POST" }),
    setAvailableQuantities: () => fetch(`${API_BASE_URL}/inventory/set-available-quantities`, { method: "POST" }),
    updateFromCSV: () => fetch(`${API_BASE_URL}/inventory/update-from-csv`, { method: "POST" }),
    fullUpdate: () => fetch(`${API_BASE_URL}/inventory/update`, { method: "POST" }),
  },
  
  // Price endpoints
  prices: {
    update: () => fetch(`${API_BASE_URL}/prices/update`, { method: "POST" }),
    updateBulk: () => fetch(`${API_BASE_URL}/prices/update-bulk`, { method: "POST" }),
  },
  
  // Health check
  health: () => fetch(`${API_BASE_URL}/health`),
};

function App() {
  // Product state
  const [productStatus, setProductStatus] = useState("");
  const [productResult, setProductResult] = useState(null);
  const [moreProductsStatus, setMoreProductsStatus] = useState("");
  const [moreProductsResult, setMoreProductsResult] = useState(null);
  const [bulkStatus, setBulkStatus] = useState(null);
  const [bulkStatusLoading, setBulkStatusLoading] = useState(false);

  // Inventory state
  const [cacheStatus, setCacheStatus] = useState("");
  const [enableTrackingStatus, setEnableTrackingStatus] = useState("");
  const [inventoryQtyStatus, setInventoryQtyStatus] = useState("");
  const [updatedQtyCount, setUpdatedQtyCount] = useState(null);
  const [availableQtyStatus, setAvailableQtyStatus] = useState("");
  const [availableQtyCount, setAvailableQtyCount] = useState(null);
  const [availableQtyElapsed, setAvailableQtyElapsed] = useState(null);
  const [csvStatus, setCsvStatus] = useState("");
  const [csvResult, setCsvResult] = useState(null);
  const [fullUpdateStatus, setFullUpdateStatus] = useState("");
  const [fullUpdateElapsed, setFullUpdateElapsed] = useState(null);

  // Price state
  const [priceStatus, setPriceStatus] = useState("");
  const [priceResult, setPriceResult] = useState(null);
  const [bulkPriceStatus, setBulkPriceStatus] = useState("");
  const [bulkPriceResult, setBulkPriceResult] = useState(null);

  // Health state
  const [healthStatus, setHealthStatus] = useState("");

  // Generic error handler
  const handleApiCall = async (apiCall, setStatus, setResult = null, successMessage = null) => {
    try {
      setStatus("Loading...");
      const response = await apiCall();
      const data = await response.json();
      
      if (data.success !== false) {
        setStatus(successMessage || data.message || "Success!");
        if (setResult) setResult(data);
        return data;
      } else {
        setStatus(`Error: ${data.error || 'Unknown error'}`);
        if (setResult) setResult(data);
        return null;
      }
    } catch (error) {
      console.error('API call failed:', error);
      setStatus(`Error: ${error.message}`);
      if (setResult) setResult({ error: error.message });
      return null;
    }
  };

  // Product handlers
  const handleCreateProducts = async () => {
    console.log("Creating 30,000 products...");
    const data = await handleApiCall(
      apiService.products.create,
      setProductStatus,
      setProductResult,
      "Bulk product creation started!"
    );
  };

  const handleCreateMoreProducts = async () => {
    console.log("Creating more products...");
    const data = await handleApiCall(
      apiService.products.createMore,
      setMoreProductsStatus,
      setMoreProductsResult
    );
    if (data?.range) {
      setMoreProductsStatus(`Bulk operation started for Dummy Product ${data.range.startNum} to ${data.range.endNum}!`);
    }
  };

  const handleCheckBulkStatus = async () => {
    console.log("Checking bulk operation status...");
    setBulkStatusLoading(true);
    try {
      const response = await apiService.products.getBulkStatus();
      const data = await response.json();
      setBulkStatus(data);
    } catch (error) {
      setBulkStatus({ error: error.message });
    }
    setBulkStatusLoading(false);
  };

  // Inventory handlers
  const handleRefreshCache = async () => {
    console.log("Refreshing inventory cache...");
    const data = await handleApiCall(
      apiService.inventory.refreshCache,
      setCacheStatus,
      null
    );
    if (data?.count) {
      setCacheStatus(`Cache refreshed: ${data.count} products`);
    }
  };

  const handleEnableTracking = async () => {
    console.log("Enabling inventory tracking...");
    const data = await handleApiCall(
      apiService.inventory.enableTracking,
      setEnableTrackingStatus
    );
    if (data?.elapsedSeconds) {
      setEnableTrackingStatus(`Done in ${data.elapsedSeconds}s`);
    }
  };

  const handleUpdateInventoryQty = async () => {
    console.log("Updating inventory quantities...");
    const data = await handleApiCall(
      apiService.inventory.updateQuantities,
      setInventoryQtyStatus
    );
    if (data) {
      if (data.elapsedSeconds) setInventoryQtyStatus(`Done in ${data.elapsedSeconds}s`);
      if (data.updatedCount !== undefined) setUpdatedQtyCount(data.updatedCount);
    }
  };

  const handleSetAvailableQuantities = async () => {
    console.log("Setting available quantities...");
    const data = await handleApiCall(
      apiService.inventory.setAvailableQuantities,
      setAvailableQtyStatus
    );
    if (data) {
      if (data.elapsedSeconds) {
        setAvailableQtyStatus(`Done in ${data.elapsedSeconds}s`);
        setAvailableQtyElapsed(data.elapsedSeconds);
      }
      if (data.updatedCount !== undefined) setAvailableQtyCount(data.updatedCount);
    }
  };

  const handleUpdateFromCSV = async () => {
    console.log("Updating from CSV...");
    const data = await handleApiCall(
      apiService.inventory.updateFromCSV,
      setCsvStatus,
      setCsvResult
    );
  };

  const handleFullInventoryUpdate = async () => {
    console.log("Running full inventory update...");
    const data = await handleApiCall(
      apiService.inventory.fullUpdate,
      setFullUpdateStatus
    );
    if (data) {
      const totalElapsed = (parseFloat(data.enableTracking?.elapsedSeconds || 0) + 
                           parseFloat(data.updateQuantities?.elapsedSeconds || 0)).toFixed(2);
      setFullUpdateElapsed(totalElapsed);
      setFullUpdateStatus(`Full update completed in ${totalElapsed}s`);
    }
  };

  // Price handlers
  const handleUpdatePrices = async () => {
    console.log("Updating prices...");
    const data = await handleApiCall(
      apiService.prices.update,
      setPriceStatus,
      setPriceResult
    );
    if (data?.updatedVariants && data?.elapsedSeconds) {
      setPriceStatus(`Updated ${data.updatedVariants} variants in ${data.elapsedSeconds}s`);
    }
  };

  const handleUpdatePricesBulk = async () => {
    console.log("Starting bulk price update...");
    const data = await handleApiCall(
      apiService.prices.updateBulk,
      setBulkPriceStatus,
      setBulkPriceResult
    );
    if (data?.bulkOperationId && data?.variantCount) {
      setBulkPriceStatus(`Bulk operation started! ID: ${data.bulkOperationId}, updating ${data.variantCount} variants.`);
    }
  };

  // Health check
  const handleHealthCheck = async () => {
    try {
      const response = await apiService.health();
      const data = await response.json();
      setHealthStatus(`✅ Backend healthy - Uptime: ${Math.floor(data.uptime)}s`);
    } catch (error) {
      setHealthStatus(`❌ Backend offline: ${error.message}`);
    }
  };

  // Check health on mount
  useEffect(() => {
    handleHealthCheck();
  }, []);

  // Calculate theoretical performance tables
  const theoreticalTable = useMemo(() => {
    if (!updatedQtyCount || !inventoryQtyStatus || !inventoryQtyStatus.includes('Done in')) return null;
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
    <Page title="Shopify Bulk Product Manager - Professional Edition">
      <BlockStack gap="600">
        {/* System Status */}
        <Card>
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">🔧 System Status</Text>
            <InlineStack gap="400">
              <Button onClick={handleHealthCheck} tone="success" size="slim">Check Backend Health</Button>
            </InlineStack>
            {healthStatus && <Text variant="bodyMd" as="span">{healthStatus}</Text>}
          </BlockStack>
        </Card>

        {/* Product Management */}
        <Card>
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">📦 Product Management</Text>
            <InlineStack gap="400" wrap>
              <Button primary onClick={handleCreateProducts}>Create 30,000 Dummy Products</Button>
              <Button onClick={handleCreateMoreProducts}>Add 30,000 More Products</Button>
              <Button onClick={handleCheckBulkStatus}>Check Bulk Operation Status</Button>
            </InlineStack>
            
            <BlockStack gap="200">
              {productStatus && <Text variant="bodyMd" as="span">{productStatus}</Text>}
              {moreProductsStatus && <Text variant="bodyMd" as="span">{moreProductsStatus}</Text>}
              
              {productResult && (
                <Banner status="info" title="Product Creation Result">
                  <pre style={{ background: "#eef", padding: 10, marginTop: 10, maxHeight: 200, overflow: 'auto' }}>
                    {JSON.stringify(productResult, null, 2)}
                  </pre>
                </Banner>
              )}
              
              {moreProductsResult && (
                <Banner status="info" title="Additional Products Result">
                  <pre style={{ background: "#eef", padding: 10, marginTop: 10, maxHeight: 200, overflow: 'auto' }}>
                    {JSON.stringify(moreProductsResult, null, 2)}
                  </pre>
                </Banner>
              )}
            </BlockStack>
          </BlockStack>
        </Card>

        {/* Inventory Management */}
        <Card>
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">📊 Inventory Management</Text>
            <InlineStack gap="400" wrap>
              <Button onClick={handleRefreshCache}>Refresh Cache</Button>
              <Button onClick={handleFullInventoryUpdate} tone="critical">Full Inventory Update</Button>
              <Button onClick={handleEnableTracking}>Enable Tracking (Step 1)</Button>
              <Button onClick={handleUpdateInventoryQty}>Update Quantities (Step 2)</Button>
              <Button onClick={handleSetAvailableQuantities}>Set Available Quantities</Button>
              <Button onClick={handleUpdateFromCSV}>Update from CSV</Button>
            </InlineStack>
            
            <BlockStack gap="200">
              {cacheStatus && <Text variant="bodyMd" as="span">🗂️ {cacheStatus}</Text>}
              {fullUpdateStatus && (
                <Text variant="bodyMd" as="span" tone="success">
                  🚀 {fullUpdateStatus}
                  {fullUpdateElapsed && <span style={{ marginLeft: 16 }}><strong>Total Time:</strong> {fullUpdateElapsed}s</span>}
                </Text>
              )}
              {enableTrackingStatus && <Text variant="bodyMd" as="span">🔄 {enableTrackingStatus}</Text>}
              {inventoryQtyStatus && (
                <Text variant="bodyMd" as="span">
                  📈 {inventoryQtyStatus}
                  {updatedQtyCount !== null && (
                    <span style={{ marginLeft: 16 }}><strong>Items Updated:</strong> {updatedQtyCount.toLocaleString()}</span>
                  )}
                </Text>
              )}
              {availableQtyStatus && (
                <Text variant="bodyMd" as="span">
                  ✅ {availableQtyStatus}
                  {availableQtyCount !== null && (
                    <span style={{ marginLeft: 16 }}><strong>Items Updated:</strong> {availableQtyCount.toLocaleString()}</span>
                  )}
                  {availableQtyElapsed && (
                    <span style={{ marginLeft: 16 }}><strong>Time:</strong> {availableQtyElapsed}s</span>
                  )}
                </Text>
              )}
              {csvStatus && <Text variant="bodyMd" as="span">📄 {csvStatus}</Text>}
              
              {csvResult && (
                <Banner status="info" title="CSV Update Result">
                  <pre style={{ background: "#eef", padding: 10, marginTop: 10, maxHeight: 200, overflow: 'auto' }}>
                    {JSON.stringify(csvResult, null, 2)}
                  </pre>
                </Banner>
              )}
            </BlockStack>
          </BlockStack>
        </Card>

        {/* Price Management */}
        <Card>
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">💰 Price Management</Text>
            <InlineStack gap="400" wrap>
              <Button onClick={handleUpdatePrices}>Update Prices (Individual)</Button>
              <Button onClick={handleUpdatePricesBulk} primary>Update Prices (Bulk - Faster)</Button>
            </InlineStack>
            
            <BlockStack gap="200">
              {priceStatus && <Text variant="bodyMd" as="span">💵 {priceStatus}</Text>}
              {bulkPriceStatus && <Text variant="bodyMd" as="span">⚡ {bulkPriceStatus}</Text>}
              
              {priceResult && (
                <Banner status="info" title="Price Update Result">
                  <pre style={{ background: "#eef", padding: 10, marginTop: 10, maxHeight: 200, overflow: 'auto' }}>
                    {JSON.stringify(priceResult, null, 2)}
                  </pre>
                </Banner>
              )}
              
              {bulkPriceResult && (
                <Banner status="info" title="Bulk Price Update Result">
                  <pre style={{ background: "#eef", padding: 10, marginTop: 10, maxHeight: 200, overflow: 'auto' }}>
                    {JSON.stringify(bulkPriceResult, null, 2)}
                  </pre>
                </Banner>
              )}
            </BlockStack>
          </BlockStack>
        </Card>

        {/* Bulk Operation Status */}
        <Card>
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">📋 Operation Status</Text>
            {bulkStatusLoading && <Spinner accessibilityLabel="Loading bulk operation status" size="small" />}
            {bulkStatus && (
              <Banner status="info" title="Current Bulk Operation Status">
                <pre style={{ background: "#eef", padding: 10, marginTop: 10, maxHeight: 300, overflow: 'auto' }}>
                  {JSON.stringify(bulkStatus, null, 2)}
                </pre>
              </Banner>
            )}
          </BlockStack>
        </Card>

        {/* Performance Analytics */}
        {(theoreticalTable || availableQtyTheoreticalTable) && (
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">📊 Performance Analytics</Text>
              
              {theoreticalTable && (
                <div>
                  <Text variant="headingSm" as="h3">Theoretical Time to Update Inventory Quantities</Text>
                  <div style={{ background: '#f9f9f9', padding: 16, marginTop: 12, borderRadius: 8 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'left', padding: 8, borderBottom: '2px solid #ddd', fontWeight: 600 }}>Items</th>
                          <th style={{ textAlign: 'left', padding: 8, borderBottom: '2px solid #ddd', fontWeight: 600 }}>Estimated Time (seconds)</th>
                          <th style={{ textAlign: 'left', padding: 8, borderBottom: '2px solid #ddd', fontWeight: 600 }}>Estimated Time (min:sec)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {theoreticalTable.map(row => (
                          <tr key={row.label}>
                            <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{row.label}</td>
                            <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{row.time}</td>
                            <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{row.minsec}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {availableQtyTheoreticalTable && (
                <div>
                  <Text variant="headingSm" as="h3">Theoretical Time to Set Available Quantities</Text>
                  <div style={{ background: '#f9f9f9', padding: 16, marginTop: 12, borderRadius: 8 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'left', padding: 8, borderBottom: '2px solid #ddd', fontWeight: 600 }}>Items</th>
                          <th style={{ textAlign: 'left', padding: 8, borderBottom: '2px solid #ddd', fontWeight: 600 }}>Estimated Time (seconds)</th>
                          <th style={{ textAlign: 'left', padding: 8, borderBottom: '2px solid #ddd', fontWeight: 600 }}>Estimated Time (min:sec)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {availableQtyTheoreticalTable.map(row => (
                          <tr key={row.label}>
                            <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{row.label}</td>
                            <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{row.time}</td>
                            <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{row.minsec}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </BlockStack>
          </Card>
        )}
      </BlockStack>
    </Page>
  );
}

export default App; 