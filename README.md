# Prompt Optimizer

An AI prompt optimization tool that helps improve prompt effectiveness through iterative refinement. This project includes both frontend and backend components for a complete prompt optimization solution.

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.8+
- Node.js 18+
- PostgreSQL 14+
- Git

## Installation

### 1. Clone the Repository
```
git clone https://github.com/wzrdl/automatic_fullstack.git
cd automatic_fullstack

### 2. Backend Setup
```
Navigate to backend directory
cd auto_backend
```
Create virtual environment
python -m venv venv
```
Activate virtual environment
On Windows:
venv\Scripts\activate
On macOS/Linux:
source venv/bin/activate
Install dependencies
```
pip install -r requirements.txt

Create .env file in auto_backend directory and add:
```
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/autodata


### 3. Database Setup
```
Access PostgreSQL
psql -U postgres
Create database
CREATE DATABASE autodata;
\q
Initialize database
flask db upgrade


### 4. Frontend Setup
```
Navigate to frontend directory
cd ../auto_frontend
Install dependencies
npm install
Create .env.local file in auto_frontend directory and add:
NEXT_PUBLIC_API_URL=http://localhost:5000/api



## Running the Application

### 1. Start the Backend Server
```
In auto_backend directory (with virtual environment activated)
flask run


The backend server will start at http://localhost:5000

### 2. Start the Frontend Development Server
```
In auto_frontend directory
npm run dev


The frontend will be available at http://localhost:3000

## Usage Guide

1. Access the application at http://localhost:3000
2. Click "Get Started" on the home page
3. Enter your prompt template
4. Specify the number of QA pairs
5. Enter your question-answer pairs
6. Set the number of iterations
7. Click "Optimize Prompt" to start the optimization process
8. View results in real-time as they are generated
9. Access optimization history through the "View History" button

## Project Structure
```
automatic_fullstack/
├── auto_backend/
│ ├── app.py # Flask application and routes
│ ├── run_cmb.py # Core optimization logic
│ ├── gradient.py # Gradient-based optimization
│ ├── optimizer.py # Prompt optimization utilities
│ ├── str_extract.py # String extraction utilities
│ └── requirements.txt # Python dependencies
└── auto_frontend/
├── app/
│ ├── page.tsx # Home page
│ ├── interact/ # Optimization interface
│ └── history/ # History view
├── components/ # React components
├── lib/ # Utilities and API
└── package.json # Node.js dependencies


## Features

- Interactive prompt optimization interface
- Real-time optimization feedback
- History tracking of all optimizations
- Markdown support for prompts
- Responsive design
- Database persistence
- OpenAI API integration

## Troubleshooting

### Common Issues

1. Database Connection Error
```
Check PostgreSQL service is running
Verify database credentials in .env file
Ensure database exists


2. API Key Error
```
Verify OPENAI_API_KEY in .env file
Check API key permissions and quota

3. Frontend Connection Error
```
Ensure backend is running
Check NEXT_PUBLIC_API_URL in .env.local
Verify network connectivity


### Error Logs

- Backend logs: Check terminal running Flask server
- Frontend logs: Check browser console
- Database logs: Check PostgreSQL logs

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
Project Link: https://github.com/wzrdl/automatic_fullstack
