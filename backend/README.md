# Shopify Product Creator - Professional Backend

A high-performance, enterprise-grade Node.js backend for managing large-scale Shopify product and inventory operations.

## 🏗️ Architecture

```
backend/
├── src/
│   ├── controllers/          # HTTP request handlers
│   │   ├── inventoryController.js
│   │   ├── productController.js
│   │   └── priceController.js
│   ├── services/            # Business logic layer
│   │   ├── shopifyService.js
│   │   └── inventoryService.js
│   ├── utils/               # Helper utilities
│   │   ├── logger.js
│   │   └── cache.js
│   ├── routes/              # Express route definitions
│   │   ├── inventory.js
│   │   ├── products.js
│   │   └── prices.js
│   ├── middleware/          # Express middleware
│   │   └── errorHandler.js
│   ├── config/              # Configuration management
│   │   └── shopify.js
│   └── app.js              # Express application setup
├── server.js               # Application entry point
└── README.md
```

## 🚀 Features

### Product Management
- **Bulk Product Creation**: Create 30,000+ products using Shopify's Bulk Operations API
- **Incremental Creation**: Add more products starting from the highest existing number
- **Real-time Status**: Monitor bulk operation progress

### Inventory Management
- **Cache System**: Intelligent caching with expiration for performance
- **Tracking Enablement**: Bulk enable inventory tracking with throttle management
- **Quantity Updates**: High-performance parallel quantity updates
- **CSV Import**: Update inventory from CSV files
- **Available Quantities**: Set available stock levels with dynamic throttling

### Price Management
- **Individual Updates**: Aggressive parallel price updates with throttle monitoring
- **Bulk Operations**: Ultra-fast price updates using Shopify's Bulk Operations API
- **Dynamic Scaling**: Automatically adjusts parallelism based on API throttle status

### Performance Features
- **Intelligent Throttling**: Dynamic adjustment based on Shopify's API limits
- **Parallel Processing**: Maximizes throughput while respecting rate limits
- **Error Handling**: Comprehensive error handling and retry logic
- **Logging**: Professional logging with timestamps and structured data

## 🛠️ Installation

1. **Clone and Install**:
   ```bash
   git clone https://github.com/shandut/ProductCreator.git
   cd ProductCreator
   npm install
   ```

2. **Environment Setup**:
   ```bash
   cp .env.example .env
   # Edit .env with your Shopify credentials
   ```

3. **Start Development Server**:
   ```bash
   npm run dev     # With hot-reload
   npm start       # Production mode
   ```

## 🔧 Configuration

Create a `.env` file in the project root:

```env
SHOPIFY_SHOP=your-shop.myshopify.com
SHOPIFY_ACCESS_TOKEN=shpat_your_access_token
SHOPIFY_API_VERSION=2025-07
PORT=4000
NODE_ENV=development
```

## 📚 API Endpoints

### Inventory Management
- `POST /inventory/refresh-cache` - Refresh product cache
- `POST /inventory/enable-tracking` - Enable inventory tracking
- `POST /inventory/update-quantities` - Update on-hand quantities
- `POST /inventory/set-available-quantities` - Set available quantities
- `POST /inventory/update-from-csv` - Import from CSV
- `POST /inventory/update` - Full inventory update

### Product Management
- `POST /products/create` - Create 30,000 products
- `POST /products/create-more` - Create additional products
- `GET /products/bulk-operation-status` - Check bulk operation status

### Price Management
- `POST /prices/update` - Update prices (parallel)
- `POST /prices/update-bulk` - Update prices (bulk operations)

### System
- `GET /health` - Health check endpoint

## 🏃‍♂️ Quick Start

1. **Refresh Cache**:
   ```bash
   curl -X POST http://localhost:4000/inventory/refresh-cache
   ```

2. **Create Products**:
   ```bash
   curl -X POST http://localhost:4000/products/create
   ```

3. **Update Inventory**:
   ```bash
   curl -X POST http://localhost:4000/inventory/update
   ```

4. **Update Prices**:
   ```bash
   curl -X POST http://localhost:4000/prices/update-bulk
   ```

## 🔍 Monitoring

### Logs
The application provides structured logging:
- Request/response logging
- Performance timing
- Throttle status monitoring
- Error tracking with stack traces

### Health Check
Monitor application health:
```bash
curl http://localhost:4000/health
```

## 🚦 Performance

### Benchmarks (30,000 products)
- **Product Creation**: ~2-5 minutes (bulk operations)
- **Inventory Updates**: ~3-4 seconds (parallel processing)
- **Price Updates**: ~30 seconds (bulk) vs ~2-3 minutes (parallel)

### Optimizations
- Dynamic parallelism based on API throttle status
- Intelligent batching (250 items per mutation)
- Connection pooling and keep-alive
- Memory-efficient streaming for large datasets

## 🛡️ Error Handling

- **Graceful degradation** when throttle limits are hit
- **Automatic retries** for transient failures
- **Detailed error logs** with context
- **Circuit breaker** patterns for external API calls

## 🔒 Security

- Environment variable configuration
- Input validation and sanitization
- Rate limiting protection
- Secure credential management

## 📈 Scaling

### Horizontal Scaling
- Stateless design for multi-instance deployment
- Shared cache using Redis (configurable)
- Load balancer friendly

### Vertical Scaling
- Memory-efficient processing
- Streaming for large datasets
- Configurable batch sizes

## 🧪 Development

### Scripts
```bash
npm run dev      # Development with hot-reload
npm start        # Production server
npm run legacy   # Run old monolithic version
```

### Code Structure
- **MVC Pattern**: Clear separation of concerns
- **Service Layer**: Business logic abstraction
- **Repository Pattern**: Data access abstraction
- **Dependency Injection**: Testable components

## 📝 Migration from Legacy

The new structure maintains **100% backward compatibility** with existing frontend code. All original endpoints work unchanged:

- `/refresh-inventory-cache` → `/inventory/refresh-cache`
- `/update-inventory` → `/inventory/update`
- `/create-products` → `/products/create`
- `/update-prices` → `/prices/update`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

ISC License - see LICENSE file for details. 