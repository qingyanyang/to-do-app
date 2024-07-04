import { db } from '../../FirebaseConfig';

import {
  collection,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  addDoc,
  startAt,
  endAt,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

// create task
const createDocument = async (toCollection: string, document: object) => {
  return await addDoc(collection(db, toCollection), {
    ...document,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};
// create user after signing up -> users collection
const createDocumentWithName = async (
  toCollection: string,
  document: object,
  documentName: string,
) => {
  return await setDoc(doc(db, toCollection, documentName), {
    ...document,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};
// query single user by uid
const getDocumentByDocumentName = async (
  fromCollection: string,
  documentName: string,
) => {
  return await getDoc(doc(db, fromCollection, documentName));
};
// query daily tasks
const getDocumentsFromLastCollection = async (fromCollection: string) => {
  const collectionRef = collection(db, fromCollection);
  const docsSnapshot = await getDocs(collectionRef);
  if (docsSnapshot.empty) {
    return null;
  }
  const docsData = docsSnapshot.docs.map((docSnapshot) => docSnapshot.data());
  return docsData;
};

/**
 * 
 * 
month:"07",
  data:[
  {day:"01",dailyTasks:[{...},{...},{...}]}, // some date might not exists
  {day:"18",dailyTasks:[{...},{...},{...}]},
  ]
}
 * @returns 
 */
const getDocumentsFromCollection = async (path: string) => {
  const monthData = {
    month: path.split('/').pop(), // Extract month from path
    data: <any>[],
  };
  const daysCollectionRef = collection(db, path);
  const daysSnapshot = await getDocs(daysCollectionRef);
  if (daysSnapshot.empty) {
    return null;
  }
  // Iterate over each day document in the month
  for (const dayDoc of daysSnapshot.docs) {
    const day = dayDoc.id;
    const dailyTasksCollectionRef = collection(dayDoc.ref, 'dailyTasks');
    const dailyTasksSnapshot = await getDocs(dailyTasksCollectionRef);

    // Initialize array to store daily tasks
    let dailyTasks = <any>[];

    // Iterate over each task document in the dailyTasks subcollection
    dailyTasksSnapshot.forEach((taskDoc) => {
      dailyTasks.push({
        ...taskDoc.data(),
      });
    });

    // Add day's tasks to monthData
    monthData.data.push({ day, dailyTasks });
  }
  return monthData;
};

// query tasks by pagination
const getDocumentsByKeyWord = async (
  fromCollection: string,
  documentStartName: string,
  documentEndName: string,
) => {
  const collectionRef = collection(db, fromCollection);
  const docStartSnap = await getDoc(doc(collectionRef, documentStartName));
  const docEndSnap = await getDoc(doc(collectionRef, documentEndName));
  return await getDocs(
    query(collectionRef, startAt(docStartSnap), endAt(docEndSnap)),
  );
};
// delete task
const deleteDocumentByDocumentName = async (
  fromCollection: string,
  documentName: string,
) => {
  return await deleteDoc(doc(db, fromCollection, documentName));
};

export const FirebaseFirestoreService = {
  createDocument,
  createDocumentWithName,
  getDocumentsFromLastCollection,
  getDocumentsFromCollection,
  getDocumentsByKeyWord,
  getDocumentByDocumentName,
  deleteDocumentByDocumentName,
};
