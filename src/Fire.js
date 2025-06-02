import { initializeApp } from 'firebase/app'
import { getFirestore,collection,addDoc,query,orderBy,onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAcvLzalbYC3s5QCYPPcO4-EFkUcCPyFb0",
  authDomain: "blog-7e4c6.firebaseapp.com",
  projectId: "blog-7e4c6",
  storageBucket: "blog-7e4c6.firebasestorage.app",
  messagingSenderId: "715318795985",
  appId: "1:715318795985:web:6d02d204a349f29a106ff0"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const getArticles = callback => {
  const q = query(collection(db, 'articles'), orderBy('title', 'asc'))
  onSnapshot(q, snapshot => {
    let articles = []
    snapshot.forEach(doc => {
      articles.push({ id: doc.id, ...doc.data() })
    })
    callback(articles)
  })
}

export const addArticle = article => {
  addDoc(collection(db, 'articles'), article)
}

export const updateArticle = article => {
  updateDoc(doc(db, 'articles', article.id), article)
}

export const deleteArticle = article => {
  deleteDoc(doc(db, 'articles', article.id))
}

