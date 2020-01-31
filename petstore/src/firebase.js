import { initializeApp } from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDyAMcZiQF6z_WqPMQ2dgOesghodsW8J6U',
  authDomain: 'petstore-e9a5f.firebaseapp.com',
  databaseURL: 'https://petstore-e9a5f.firebaseio.com',
  projectId: 'petstore-e9a5f',
  storageBucket: 'petstore-e9a5f.appspot.com',
  messagingSenderId: '1091872074268',
  appId: '1:1091872074268:web:12eeff1ce41baaf4a48dd9',
  measurementId: 'G-504QDSNPE4'
}

const app = initializeApp(firebaseConfig)

// 데이터베이스를 es6 엑스포트를 통해 내보냄
export const db = app.database()
export const productsRef = db.ref('products')

// import firebase from 'firebase/app'
// import 'firebase/firestore'

// // Get a Firestore instance
// export const db = firebase
//   .initializeApp(firebaseConfig)
//   .firestore()
// console.log(db.collection('products'))
// // export const productsRef = db.collection('products')
// // Export types that exists in Firestore
// // This is not always necessary, but it's used in other examples
// // const { Timestamp, GeoPoint } = firebase.firestore