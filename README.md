# Requirements, Usage and Installation

### Prerequisite
```Node.js - v16.16.0```

```Python - v3.9```

---------------------------------------------------------------------------------------
<h1>Setup Backend - Flask</h1>

### 1. Access backend and create virtual Environtment
   
```cd backend```

### 2. Setup virtual environment

```python -m venv venv```
 
### 3. Activate virtual environment

```venv/Scripts/activate```

### 3 .Install dependencies

```
pip install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu11
pip install -r requirements.txt
```

### 4. Setup database

```
flask db init
flask db migrate
flask db upgrade
```

<h1>Run Backend - Flask</h1>

### 1. Access backend and create virtual Environtment
   
```cd backend```

### 2. Activate the environment

```venv/Scripts/activate```

### 3. Run flask app

```flask run```

-------------------------------------------------------------------------------------------------------------------
<h1>Frontend - React</h1>

### Installation

You just need to install the packages listed on package.json, on the frontend folder.

```
cd frontend
npm install --legacy-peer-deps
```

`npm start`




