# Shopify Product Creator - Professional Full-Stack Application

A high-performance, enterprise-grade full-stack application for managing large-scale Shopify product and inventory operations. Built with **React + Shopify Polaris** frontend and **Node.js + Express** backend.

## 🏗️ Architecture

```
ProductCreator/
├── backend/                 # Professional Node.js Backend
│   ├── src/
│   │   ├── controllers/     # HTTP request handlers
│   │   ├── services/        # Business logic layer
│   │   ├── utils/           # Helper utilities
│   │   ├── routes/          # Express route definitions
│   │   ├── middleware/      # Express middleware
│   │   ├── config/          # Configuration management
│   │   └── app.js          # Express application setup
│   ├── server.js           # Application entry point
│   └── README.md           # Backend documentation
├── src/                    # React Frontend
│   ├── App.js             # Main React component
│   └── index.js           # React app entry point
├── public/                # Static frontend assets
└── package.json           # Full-stack dependencies
```

## 🚀 Quick Start

### Prerequisites
- Node.js >= 14.0.0
- npm or yarn
- Shopify store with Admin API access

### 1. Installation
```bash
git clone https://github.com/shandut/ProductCreator.git
cd ProductCreator
npm install
```

### 2. Environment Setup
Create `.env` file in the project root:
```env
SHOPIFY_SHOP=your-shop.myshopify.com
SHOPIFY_ACCESS_TOKEN=shpat_your_access_token
SHOPIFY_API_VERSION=2025-07
PORT=4000
NODE_ENV=development
```

### 3. Run the Application

#### Option A: Development Mode (Both Frontend & Backend)
```bash
npm run dev
```
This starts:
- 🔧 **Backend**: http://localhost:4000 (API server)
- 🎨 **Frontend**: http://localhost:3000 (React app)

#### Option B: Individual Components
```bash
# Backend only
npm run dev:backend

# Frontend only  
npm run dev:frontend
```

#### Option C: Production Mode
```bash
# Build frontend for production
npm run build

# Start backend in production
npm start
```

## 📚 API Endpoints

### 🏥 Health Check
- `GET /health` - Backend health status

### 📦 Product Management
- `POST /products/create` - Create 30,000 products
- `POST /products/create-more` - Create additional products
- `GET /products/bulk-operation-status` - Check bulk operation status

### 📊 Inventory Management
- `POST /inventory/refresh-cache` - Refresh product cache
- `POST /inventory/enable-tracking` - Enable inventory tracking
- `POST /inventory/update-quantities` - Update on-hand quantities
- `POST /inventory/set-available-quantities` - Set available quantities
- `POST /inventory/update-from-csv` - Import from CSV
- `POST /inventory/update` - Full inventory update

### 💰 Price Management
- `POST /prices/update` - Update prices (parallel)
- `POST /prices/update-bulk` - Update prices (bulk operations)

## 🎮 Frontend Features

### 🔧 System Status
- Backend health monitoring
- Real-time connection status

### 📦 Product Management
- Create 30,000 dummy products with one click
- Add more products incrementally
- Monitor bulk operation progress

### 📊 Inventory Management
- Smart cache management
- Full inventory updates
- Step-by-step inventory processing
- CSV import functionality
- Available quantity management

### 💰 Price Management
- Individual price updates with throttle management
- Ultra-fast bulk price updates
- Real-time progress monitoring

### 📊 Performance Analytics
- Theoretical performance calculations
- Real-time timing metrics
- Scalability projections

## 🔧 Backend Features

### 🏗️ Enterprise Architecture
- **MVC Pattern**: Clean separation of concerns
- **Service Layer**: Business logic abstraction  
- **Professional Logging**: Structured timestamps and data
- **Error Handling**: Comprehensive middleware
- **Configuration Management**: Environment variables

### ⚡ Performance Optimizations
- **Dynamic Throttling**: Adapts to Shopify API limits
- **Parallel Processing**: Maximum throughput
- **Intelligent Batching**: 250 items per mutation
- **Memory Efficiency**: Streaming for large datasets

### 🛡️ Security & Reliability
- Environment variable configuration
- Input validation and sanitization
- Rate limiting protection
- Graceful error handling and retries

## 🚦 Performance Benchmarks

### 30,000 Products
- **Product Creation**: ~2-5 minutes (bulk operations)
- **Inventory Updates**: ~3-4 seconds (parallel processing)
- **Price Updates**: ~30 seconds (bulk) vs ~2-3 minutes (parallel)

### Scalability
- **1M items**: Estimated 33-50 seconds
- **2M items**: Estimated 1-2 minutes  
- **3M items**: Estimated 2-3 minutes

## 🛠️ Development Commands

```bash
# Full development environment
npm run dev                 # Frontend (3000) + Backend (4000)

# Individual services
npm run dev:backend        # Backend only (4000)
npm run dev:frontend       # Frontend only (3000)

# Production
npm run build              # Build frontend for production
npm start                  # Start backend in production

# Testing
npm test                   # Run React tests
```

## 🌐 Ports & URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Health Check**: http://localhost:4000/health

## 🔍 Monitoring & Debugging

### Backend Logs
The backend provides structured logging:
- Request/response logging
- Performance timing  
- Throttle status monitoring
- Error tracking with stack traces

### Frontend Debug
- Browser DevTools for React debugging
- Network tab for API call monitoring
- Console logs for operation tracking

## 🚀 Deployment

### Frontend (React)
```bash
npm run build
# Deploy the build/ folder to your hosting service
```

### Backend (Node.js)
```bash
# Set environment variables
export SHOPIFY_SHOP=your-shop.myshopify.com
export SHOPIFY_ACCESS_TOKEN=your_token
export NODE_ENV=production

# Start the server
npm start
```

## 🔄 Migration from Legacy

The new architecture maintains **100% backward compatibility**. All original endpoints work unchanged while providing the new organized structure.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📄 License

ISC License - see LICENSE file for details.

## 📞 Support

For issues, questions, or contributions, please open an issue on GitHub or contact Shannon Dutton.

---

**Built with ❤️ using React, Node.js, and Shopify's powerful APIs**
