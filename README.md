# MANUU Automated Hostel Allocation System

A web-based hostel application and allocation management platform designed to simplify the hostel admission process for students at **Maulana Azad National Urdu University (MANUU)**.

The system provides a digital platform for students to submit hostel applications, provide personal and academic details, upload required documents, and select their hostel and floor preferences.

## Features

- **Hostel Application Form:** Students can submit their hostel applications online.
- **Student Information:** Collects name, enrollment number, email, phone number, department, academic year, and other relevant details.
- **Hostel Preferences:** Allows students to select hostel and floor preferences.
- **Document Upload:** Supports uploading required documents, including caste certificates and academic marksheets.
- **Application Management:** Organizes student application information.
- **Responsive Interface:** Designed to provide a smooth experience across different screen sizes.

## Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend development |
| TypeScript | Type safety |
| Vite | Development server and build tool |
| Tailwind CSS | Styling |
| Framer Motion | UI animations |
| Supabase | Backend services and data integration |
| React Router | Client-side navigation |

## Project Structure

```text
ink-her-vision/
│
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── integrations/       # External service integrations
│   ├── pages/              # Application pages
│   ├── hooks/              # Custom React hooks
│   └── ...
│
├── supabase/               # Supabase configuration
├── .env.example            # Environment variable template
├── package.json
├── package-lock.json
├── vite.config.ts
└── README.md
```

## Getting Started

Follow these instructions to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Sunshine9693/ink-her-vision.git
```

### 2. Navigate to the Project Directory

```bash
cd ink-her-vision
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root and configure the required environment variables using `.env.example` as a reference.

Never upload your actual `.env` file or secret credentials to GitHub.

### 5. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal to access the application.

### 6. Build for Production

```bash
npm run build
```

## Application Workflow

1. Students open the hostel application portal.
2. They enter their personal and academic information.
3. They select their hostel and floor preferences.
4. They upload the required supporting documents.
5. They submit their application for further processing.

## Future Enhancements

- Student login and registration.
- Unique application ID generation.
- Real-time application status tracking.
- Admin dashboard for application review.
- Automated hostel seat allocation.
- Improved document verification.
- Email and notification integration.

## Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Submit a pull request.

## Repository

GitHub: https://github.com/Sunshine9693/ink-her-vision

## Author

**Sana Fatma**

B.Tech – Computer Science and Engineering  
Maulana Azad National Urdu University (MANUU)

---

*Developed to make the hostel application and allocation process more accessible, organized, and efficient.*
