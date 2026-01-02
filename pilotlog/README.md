# PilotLog

A secure, FAA-compliant electronic flight logbook with offline support.

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   .NET MAUI     │────▶│   Azure App     │────▶│   Azure SQL     │
│   iOS/Android   │     │   Service       │     │   Database      │
│   + SQLite      │◀────│   + DataSync    │◀────│                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │
        │                       │
        ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│  Offline Mode   │     │  Azure AD B2C   │
│  Local SQLite   │     │  Authentication │
└─────────────────┘     └─────────────────┘
```

## Features

- ✈️ FAA 14 CFR 61.51 compliant flight logging
- 📱 iOS and Android support via .NET MAUI
- 🔄 Offline-first with automatic sync
- 🔐 Secure authentication via Azure AD B2C
- ☁️ Cloud backup to Azure SQL Database
- 📊 Flight time summaries and currency tracking
- 🛫 Aircraft management
- 👨‍✈️ Endorsement tracking

## FAA Required Fields (14 CFR 61.51)

- Date of flight
- Total flight time
- Departure/arrival locations
- Aircraft type and identification (tail number)
- Name of safety pilot (if required)

## Logged Time Categories

- Pilot in Command (PIC)
- Second in Command (SIC)
- Solo
- Cross-Country
- Night
- Actual Instrument
- Simulated Instrument
- Flight Training Received
- Ground Training

## Additional Tracking

- Day/Night landings
- Instrument approaches (type, location)
- Holds
- Remarks and endorsements

## Projects

| Project | Description |
|---------|-------------|
| `PilotLog.Shared` | Shared models and DTOs |
| `PilotLog.Mobile` | .NET MAUI mobile application |
| `PilotLog.Api` | ASP.NET Core backend with DataSync |
| `PilotLog.Infrastructure` | Azure Bicep deployment templates |

## Prerequisites

- .NET 8 SDK
- Visual Studio 2022 or VS Code with C# Dev Kit
- Azure subscription
- Android SDK (for Android development)
- Xcode (for iOS development, Mac required)

## Getting Started

### 1. Clone and restore

```bash
git clone https://github.com/yourusername/pilotlog.git
cd pilotlog
dotnet restore
```

### 2. Deploy Azure infrastructure

```bash
cd src/PilotLog.Infrastructure
az deployment group create \
  --resource-group pilotlog-rg \
  --template-file main.bicep \
  --parameters environment=dev
```

### 3. Configure local development

Copy the example settings:
```bash
cp src/PilotLog.Api/appsettings.Development.example.json src/PilotLog.Api/appsettings.Development.json
```

Update with your Azure AD B2C and SQL connection strings.

### 4. Run the API

```bash
cd src/PilotLog.Api
dotnet run
```

### 5. Run the mobile app

```bash
cd src/PilotLog.Mobile
dotnet build -t:Run -f net8.0-android
# or for iOS (Mac only)
dotnet build -t:Run -f net8.0-ios
```

## Security

- All data encrypted at rest (Azure SQL TDE)
- All data encrypted in transit (TLS 1.3)
- Azure AD B2C with optional MFA
- Row-level security - pilots can only access their own data
- Audit logging for all data modifications

## License

MIT
