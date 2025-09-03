<div align="center">
  <h1> UpTime - Frontend App <h1/>
  <img  src="https://i.imgur.com/WbLnrw0.png" alt="UpTime Screenshot 1" width="600"/>
  <br/>
  <img src="https://i.imgur.com/eot4o4g.png" alt="UpTime Screenshot 2" width="600"/>
</div>

## About the Project

UpTime is a complete service monitoring system consisting of an integrated frontend (Next.js) and backend. The frontend provides an intuitive interface to view the status of monitored services in real-time.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- UpTime Backend running ([Backend Repository](https://github.com/your-username/uptime-backend))

## Setup

### 1. Clone the repository
```bash
git clone https://github.com/williamosilva/uptime-app
cd uptime-app
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Configure environment variables
Create a `.env` file in the project root:

```env
# Login credentials
NEXT_PUBLIC_LOGIN_USERNAME=your_username
NEXT_PUBLIC_LOGIN_PASSWORD=your_password

# API URL (backend)
NEXT_PUBLIC_API_URL=http://localhost:8000

```

⚠️ **Important**: Make sure the backend is running and properly configured before starting the frontend.

## Running the Project

### Development
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

### Production
```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Authentication

The system uses simple authentication based on environment variables. Configure the credentials in the `.env` file and use them to log into the application.

## Complete Setup

For the system to work completely:

1. **Backend**: Make sure the UpTime backend is running ([Backend Repository](https://github.com/williamosilva/uptime-api))
2. **Environment Variables**: Configure all necessary variables
3. **Database**: The backend must be connected to the database
4. **Network**: Frontend and backend must be able to communicate

## Contributing

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



---

**Note**: This is the frontend of the UpTime system. For complete functionality, make sure the backend is also configured and running correctly.

---

<div align="center">
  
**Developed by** [William Silva](https://williamsilva.dev)

</div>
