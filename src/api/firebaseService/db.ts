import { FirebaseStampTask } from '../../util/constants';
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
  orderBy,
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
  const q = query(collectionRef, orderBy('scheduledStartTime'));
  const docsSnapshot = await getDocs(q);
  if (docsSnapshot.empty) {
    return null;
  }
  const docsData = docsSnapshot.docs.map((docSnapshot) => {
    return {
      ...(docSnapshot.data() as Omit<FirebaseStampTask, 'id'>),
      id: docSnapshot.id,
    };
  });
  return docsData;
};

// edit field of document
const editDocumentField = async (
  fromCollection: string,
  documentName: string,
  document: object,
) => {
  await setDoc(doc(db, fromCollection, documentName), document, {
    merge: true,
  });
};
// delete task
const deleteDocumentByDocumentName = async (
  fromCollection: string,
  documentName: string,
) => {
  return await deleteDoc(doc(db, fromCollection, documentName));
};

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

export const FirebaseFirestoreService = {
  createDocument,
  createDocumentWithName,
  getDocumentsFromLastCollection,
  editDocumentField,
  getDocumentsFromCollection,
  getDocumentsByKeyWord,
  getDocumentByDocumentName,
  deleteDocumentByDocumentName,
};
