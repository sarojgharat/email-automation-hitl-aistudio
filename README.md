# Email Automation Solution - Human-in-the-Loop (HITL)

This project is a web application designed to streamline and automate the process of email classification and data extraction, operating with a "Human-in-the-Loop" (HITL) approach. It provides a user-friendly interface for managing emails, classifying them into predefined categories, and extracting key information into a structured format.

The application is built with modern web technologies, including React, TypeScript, and Tailwind CSS for a responsive and interactive user experience, with Firebase handling user authentication.

## ✨ Features

- **🔐 Secure Authentication:** User sign-up and login functionality powered by Firebase Authentication.
- **📊 Interactive Dashboard:** A comprehensive analytics dashboard that visualizes key metrics:
    - Total, classified, and unclassified email counts.
    - Distribution of emails across different classifications.
    - Progress of data extraction for relevant email types.
    - Day-wise trend analysis of incoming emails.
- **📥 Smart Inbox:** A clean and intuitive inbox interface to view all emails.
    - **Sorting:** Sort emails by sender, subject, date, classification, or data extraction status.
    - **Filtering:** Dynamically filter the inbox based on sender, subject, classification, and extraction status.
    - **Pagination:** Efficiently navigate through large volumes of emails with customizable rows-per-page settings.
- **📧 Detailed Email View:** A dedicated view for individual emails, providing tools for manual processing.
- **🏷️ Manual Classification:** Easily classify or re-classify emails into categories like 'Booking Creation', 'Booking Amendment', 'Booking Cancellation', or 'Not related'.
- **📝 Structured Data Extraction:** Once an email is classified, a context-specific form appears, allowing the user to input and save structured data (e.g., booking numbers, dates, locations) from the email body.
- **🌓 Light & Dark Mode:** A theme toggle for user comfort and preference.
- **📱 Responsive Design:** The UI is fully responsive, ensuring a seamless experience on desktops, tablets, and mobile devices.
- **🤖 Gemini API Ready:** The application is structured to easily integrate with the Google Gemini API for future enhancements, such as:
    - AI-powered automatic email classification.
    - Automated data extraction to pre-fill forms, requiring only user verification.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** Firebase Authentication
- **AI (Future Integration):** Google Gemini API (`@google/genai`)

## 📂 Project Structure

The codebase is organized into logical components and modules:

```
.
├── src/
│   ├── App.tsx             # Root component, manages state, routing, and user auth.
│   ├── DashboardPage.tsx   # The main analytics view.
│   ├── EmailDetailPage.tsx   # View for a single email with classification/extraction forms.
│   ├── EmailListPage.tsx   # The inbox view with table, sorting, and filtering.
│   ├── LoginPage.tsx       # Handles user sign-in and sign-up.
│   ├── data.ts             # Contains mock data and type definitions.
│   └── firebase.ts         # Firebase configuration and initialization.
├── index.html              # The main HTML entry point for the application.
├── index.tsx               # Renders the React application into the DOM.
└── metadata.json           # Project metadata.
```

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

You need a modern web browser. The project uses an `importmap` in `index.html` to load dependencies from a CDN, so no local `npm install` is required for the libraries.

### Setup Instructions

**Step 1: Clone the Repository**

First, clone this repository to your local machine.

```bash
git clone https://github.com/your-username/email-automation-hitl.git
cd email-automation-hitl
```

**Step 2: Configure Firebase**

This application requires a Firebase project to handle user authentication.

1.  Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project (or use an existing one).
2.  In your project, add a new Web App.
3.  Go to **Project Settings** (click the gear icon ⚙️) > **General** tab.
4.  Scroll down to the "Your apps" section and find your web app.
5.  Under "Firebase SDK snippet," select **Config**.
6.  Copy the `firebaseConfig` object.
7.  Open the `src/firebase.ts` file in your editor.
8.  **Replace the placeholder `firebaseConfig` object with the one you copied from your Firebase project.**

> **⚠️ Important:** The application will not work without a valid Firebase configuration. You will see an error screen if the placeholder credentials are still present.

**Step 3: Run the Application**

Since this is a static project without a build step, you can run it using any simple local web server.

1.  If you don't have a local server, you can install `serve` via npm:
    ```bash
    npm install -g serve
    ```
2.  From the root directory of the project, run the server:
    ```bash
    serve .
    ```
3.  The server will start, and you can access the application by opening the provided URL (usually `http://localhost:3000`) in your web browser.

## 📖 How to Use the Application

1.  **Sign Up / Login:** On the landing page, create a new account or sign in with existing credentials.
2.  **View the Dashboard:** After logging in, you'll see the Dashboard, which gives a high-level overview of the email processing status.
3.  **Navigate to the Inbox:** Click on the "Inbox" button in the navigation bar to see the list of all emails.
4.  **Sort and Filter:** Use the column headers to sort the email list. Use the input fields below the headers to filter the emails by sender, subject, or other criteria.
5.  **Process an Email:**
    - Click on any email in the list to open the Detail View.
    - In the "Classification" section, choose the category that best fits the email (e.g., 'Booking Creation').
    - If the classification is relevant for data extraction, a form will appear.
    - Read the email body on the left and fill in the required details in the form on the right.
    - Click "Save Data" to store the extracted information.
6.  **Review Progress:** Navigate back to the Dashboard or Inbox to see your progress reflected in the stats and status icons.
