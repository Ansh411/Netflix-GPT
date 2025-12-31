<p align="center">
  <a href="https://gpt-flix-alpha.vercel.app/">
    <img src="https://i.ibb.co/wZ6b2Yqd/Netflix-GPT.png" alt="Netflix GPT Logo" />
  </a>
</p>

<!-- Previews of The Project -->

<div align="center">
      <img src = "https://i.ibb.co/Df0xvK24/Signup.png" width ="400" /> 
      <img src = "https://i.ibb.co/My9Ydy3W/Login.png" width ="400" /> 
      <br/>
      <img src = "https://i.ibb.co/M3QhdBP/Video-Container.png" width ="400" /> 
      <img src = "https://i.ibb.co/4ZDKnHTw/Movies-Container.png" width ="400" /> 
      <br/> 
      <img src = "https://i.ibb.co/HLGczvyx/Movie-Details.png" width ="400" />
      <img src = "https://i.ibb.co/JjWK1Lnk/GPT.png" width ="400" /> 
      <br/>
</div>
<br/><hr/>


A modern Netflix-inspired movie streaming UI powered by AI recommendations.  
**Netflix GPT** combines real-time movie data from TMDB with AI-driven suggestions using OpenRouter to deliver a smart, interactive movie discovery experience.

🌐 **Live Demo:** https://gpt-flix-alpha.vercel.app/

---

## 🚀 Features

- 🎥 Netflix-style movie browsing experience
- 🤖 AI-powered movie recommendations (GPT)
- 🔍 Smart search with natural language prompts
- 🎬 Movie trailer autoplay with sound control
- 📱 Fully responsive (mobile & desktop)
- ❤️ Watchlist functionality
- 🔐 Firebase Authentication (Login / Logout)
- 🎭 Cast carousel for each movie
- 🔄 Similar movies recommendations
- 🌙 Modern UI with Tailwind CSS
- ⚡ Fast performance with Vite + React

---

## 🔐 Authentication

This project uses **Firebase Authentication** to handle:

- User sign-up & login
- Secure session handling
- Auth-based access to watchlist and personalization

Firebase ensures scalable, secure, and production-ready authentication.

---

## 🧠 AI Recommendation System (Netflix GPT)

This project integrates **AI-based movie recommendations** using **OpenRouter**.

### How it works:
1. User enters a natural language prompt  
   *(e.g. “Suggest feel-good sci-fi movies”)*  
2. Prompt is sent to **OpenRouter**
3. OpenRouter routes the request to a Large Language Model (LLM)
4. AI returns a list of movie titles
5. Titles are matched with **TMDB** data
6. Results are displayed as interactive movie cards

This makes movie discovery **context-aware**, **personalized**, and **intelligent**.

---

## 🛠️ Tech Stack

### Frontend
- **React 19**
- **Vite**
- **React Router DOM**
- **Redux Toolkit**
- **Tailwind CSS**
- **JavaScript (ES6+)**

### State Management
- Redux Toolkit
- Custom Redux slices:
  - Movies
  - Watchlist
  - Video (mute / unmute)
  - GPT recommendations

### Authentication
- **Firebase Authentication**

### APIs & Services
- **TMDB (The Movie Database) API**
- **OpenRouter API (AI recommendations)**
- **FanArt.tv API (logos & branding)**

### Hosting
- **Frontend:** Vercel  
- **Backend:** Render
---

## 📱 UI Components

- Hero video background with autoplay trailer
- Floating mobile controls (Play / Watchlist / Mute)
- Meta info row (runtime, genres, rating)
- Cast carousel
- Similar movies section
- AI recommendation results grid


---

## 📁 Project Structure (Simplified)

```text
src/
│── components/
│   ├── Header
│   ├── VideoBackground
│   ├── MovieInfo
│   ├── MetaInfoRow
│   ├── CastCarousel
│   ├── FloatingControls
│   └── SimilarMovies
│
│── hooks/
│   ├── useMovieTrailer
│   ├── useMovieDetails
│   └── useGPTMovies
│
│── store/
│   ├── appStore
│   ├── movieSlice
│   ├── watchlistSlice
│   └── videoSlice
│
│── pages/
│   └── MovieDetails

```

## 🧪 Future Enhancements


- Personalized watch history

- Improved GPT prompt tuning

- Server-side caching

- Dark/Light theme toggle

## 👨‍💻 Author

**Ansh Gupta** <br/>

<i>Aspiring Full-Stack & AI Engineer</i>

⭐ If you like this project ❤️

**Give it a ⭐ on GitHub — it helps a lot!**

---
