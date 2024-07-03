import { db } from '../../FirebaseConfig';

import {
  collection,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  setDoc,
  startAt,
  endAt,
} from 'firebase/firestore';

// create user after signing up -> users collection
const createDocument = async (
  toCollection: string,
  document: unknown,
  documentName: string,
) => {
  return await setDoc(doc(db, toCollection, documentName), document);
};
// create task - > tasks collection
const createDocumentWithName = async (
  toCollection: string,
  document: any,
  documentName: string,
) => {
  return await setDoc(
    doc(collection(db, toCollection), documentName),
    document,
  );
};
// query single task by documentName
const getDocumentByDocumentName = async (
  fromCollection: string,
  documentName: string,
) => {
  return await getDoc(doc(db, fromCollection, documentName));
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
  getDocumentsByKeyWord,
  getDocumentByDocumentName,
  deleteDocumentByDocumentName,
};
