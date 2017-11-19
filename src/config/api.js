/*
 *  api content
 *  
 */ 

 const base = 'http://60.205.183.134:3000';

 const questionSingleApi = (id) => ({
   getSingleOptionQuestion: '/question/',
   getMultiplyOptionQuestion: '/question/',
 });

 const noticeApi = () => ({
   getResult: '/result',
 });

 export {
   base,
   questionSingleApi,
   noticeApi,
 }