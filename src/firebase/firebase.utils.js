import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCwbl0OFyoqdTFOjzFT40WP0Hk3EWyfv8c",
    authDomain: "sprint-planning-d3978.firebaseapp.com",
    databaseURL: "https://sprint-planning-d3978.firebaseio.com",
    projectId: "sprint-planning-d3978",
    storageBucket: "sprint-planning-d3978.appspot.com",
    messagingSenderId: "688309333805",
    appId: "1:688309333805:web:85f7d48dcf7c311788eda4"
  }

// export const convertSprintSnapshotToMap = (sprintSnapshot) => {
//     const transformedSprint = sprintSnapshot.docs.map(sprint => {
//         const {name,startDate,endDate} = sprint.data();  // sprint attributes
//         // get data about PBIs for the sprint 
//         const pbiRef = sprint.ref.collection('pbis');
//         const pbisArr = [];
//         pbiRef.get().then(pbis => {
//             pbis.docs.map(pbi => {
//                 const {id,description,days} = pbi.data()
//                 console.log(id,description,days)
//                 pbisArr.push({id,description,days});
//                 console.log('Array length', pbisArr.length)
//             })
//         })
//         return {
//          id: sprint.id,
//          name,
//          startDate,
//          endDate,
//          pbis:pbisArr
//         }
//     })
//     return transformedSprint;
//     // return transformedSprint.reduce((accumulator, sprint) => {
//     //     accumulator[sprint.name.toLowerCase()] = sprint;
//     //     return accumulator
//     // },{});
// }

  firebase.initializeApp(config);
  export const auth = firebase.auth();
  export const filestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;